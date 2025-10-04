import React, { useState } from "react";
import axios from "../api/axios";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "/users/change-password",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Current Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm New Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;

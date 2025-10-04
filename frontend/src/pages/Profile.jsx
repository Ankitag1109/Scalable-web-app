import React, { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import { ThemeContext } from "../context/ThemeContext";

const Profile = () => {
  const { darkMode } = useContext(ThemeContext); // ✅ global theme
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    joinedAt: "",
    profilePic: "",
  });
  const [editing, setEditing] = useState(false);
  const [password, setPassword] = useState("");
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile({
        ...res.data,
        name: res.data.username || "",
      });
    } catch (err) {
      console.error("Failed to fetch profile", err);
      alert(err.response?.data?.message || "Failed to fetch profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        "/users/profile",
        { username: profile.name, email: profile.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile({ ...res.data, name: res.data.username || "" });
      setEditing(false);
      alert("Profile updated successfully ✅");
    } catch (err) {
      console.error("Failed to update profile", err);
      alert(err.response?.data?.message || "Failed to update profile ❌");
    }
  };

  const handlePasswordChange = async () => {
    if (!password) return alert("Password cannot be empty!");
    try {
      const currentPassword = prompt("Enter current password") || "";
      if (!currentPassword) return;

      const res = await axios.put(
        "/users/change-password",
        { currentPassword, newPassword: password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPassword("");
      setShowPasswordChange(false);
      alert(res.data.message);
    } catch (err) {
      console.error("Password update failed", err);
      alert(err.response?.data?.message || "Failed to update password ❌");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-500 ${
        darkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-lg p-8 rounded-2xl shadow-2xl transition-colors duration-500 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={
              profile.profilePic ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-md"
          />
          <h2 className="text-2xl font-bold mt-4">{profile.name || "User"}</h2>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-500"}`}>
            {profile.email}
          </p>
          <p
            className={`${
              darkMode ? "text-gray-400" : "text-gray-400"
            } text-sm mt-1`}
          >
            Joined:{" "}
            {profile.joinedAt
              ? new Date(profile.joinedAt).toDateString()
              : "N/A"}
          </p>
        </div>

        {/* Profile Edit Form */}
        <div className="space-y-4">
          <div>
            <label
              className={`block font-semibold ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Name:
            </label>
            <input
              type="text"
              value={profile.name}
              disabled={!editing}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className={`border p-2 w-full rounded transition-colors duration-500 ${
                editing
                  ? darkMode
                    ? "bg-gray-700 border-gray-600 text-gray-100"
                    : "bg-white border-gray-300 text-gray-900"
                  : darkMode
                  ? "bg-gray-700 border-gray-600 text-gray-100"
                  : "bg-gray-100 border-gray-300 text-gray-900"
              }`}
            />
          </div>

          <div>
            <label
              className={`block font-semibold ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email:
            </label>
            <input
              type="email"
              value={profile.email}
              disabled={!editing}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              className={`border p-2 w-full rounded transition-colors duration-500 ${
                editing
                  ? darkMode
                    ? "bg-gray-700 border-gray-600 text-gray-100"
                    : "bg-white border-gray-300 text-gray-900"
                  : darkMode
                  ? "bg-gray-700 border-gray-600 text-gray-100"
                  : "bg-gray-100 border-gray-300 text-gray-900"
              }`}
            />
          </div>

          {/* Action Buttons */}
          {editing ? (
            <button
              onClick={handleUpdate}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
            >
              💾 Save Changes
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
            >
              ✏️ Edit Profile
            </button>
          )}

          {/* Change Password */}
          {showPasswordChange ? (
            <div className="space-y-3">
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`border p-2 w-full rounded transition-colors duration-500 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-gray-100"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
              <button
                onClick={handlePasswordChange}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition"
              >
                🔒 Update Password
              </button>
              <button
                onClick={() => setShowPasswordChange(false)}
                className="w-full bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg font-semibold transition"
              >
                ❌ Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowPasswordChange(true)}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold transition"
            >
              🔑 Change Password
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

import { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Admin = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/users", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setUsers(res.data);
      } catch (err) {
        setError("You are not authorized to access this page.");
      }
    };
    fetchUsers();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      const res = await axios.put(
        `/users/${id}`,
        { role },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setUsers(users.map((u) => (u._id === id ? res.data : u)));
    } catch (err) {
      console.error(err);
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - User Management</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="text-center">
                <td className="px-4 py-2 border">{u.name}</td>
                <td className="px-4 py-2 border">{u.email}</td>
                <td className="px-4 py-2 border">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;

import { useState } from "react";
import axios from "../api/axios";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/contact", form); // Backend API to save contact
      setStatus("✅ Message sent successfully!");
    } catch (err) {
      setStatus("❌ Error sending message. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="4"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-indigo-600 text-white w-full py-2 rounded-lg hover:bg-indigo-700"
          >
            Send
          </button>
        </form>
        {status && <p className="mt-3 text-sm">{status}</p>}
      </div>
    </div>
  );
}

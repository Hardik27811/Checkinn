import axios from "axios";
import React, { useEffect, useState } from "react";
import api from '../../services/api'

const AdminLayout = () => {
  const [admin, setAdmin] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
  });

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await api.get("/admin/admin-details", {
          withCredentials: true,
        });
        if (res) setAdmin(res.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAdmin();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOwner = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(
        "/admin/add-owner",
        formData,
        { withCredentials: true }
      );
      alert(res.data.message || "Owner added successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        password: "",
      });
    } catch (error) {
      console.error("Error adding owner:", error);
      alert("Error adding owner. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        {/* Admin Info */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Admin Dashboard
        </h1>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">
            Admin Details
          </h2>
          {admin ? (
            <ul className="text-gray-700 space-y-1">
              <li><strong>Name:</strong> {admin.firstName}</li>
              <li><strong>Email:</strong> {admin.email}</li>
              <li><strong>Gender:</strong> {admin.gender}</li>
              <li><strong>Phone:</strong> {admin.phone}</li>
            </ul>
          ) : (
            <p>Loading admin details...</p>
          )}
        </div>

        {/* Add Owner Form */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Add New Hotel Owner
        </h2>
        <form
          onSubmit={handleAddOwner}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add Owner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLayout;

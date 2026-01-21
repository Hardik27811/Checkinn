import React, { useState, useEffect } from "react";
import api from "../services/api";
import { format } from "date-fns";
import { useUser } from "../context/UserContext";


const UserProfile = () => {

  const { user, role, logout } = useUser();
  //   const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  // console.log(user);
  const timestamp = user?.iat;
  const date = new Date(timestamp * 1000);
  const formatted = format(date, "MMMM do, yyyy 'at' h:mm:ss a 'UTC'");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
       

        // Fetch users bookings
        const bookingsRes = await api.get("/bookings/booking", {
          withCredentials: true,
        });
        setBookings(bookingsRes.data.bookings || []);


      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // console.log(bookings);




  const handleEdit = () => setEditing(prev => !prev);

  const handleSave = async () => {
    try {
      await api.put(
        "/api/user/profile",
        formData,
        { withCredentials: true }
      );
      setUser({ ...user, ...formData });
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">Unable to load profile. Please log in.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mt-15">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Profile Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center text-4xl font-bold text-indigo-600 mb-4">
                  <img src={`${user.userImage}`} alt="" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">{user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1) || "Guest User"}</h2>
                <p className="text-gray-600 mt-1">{user.email}</p>

                <button
                  onClick={handleEdit}
                  className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  {editing ? "Cancel Edit" : "Edit Profile"}
                </button>
              </div>

              <div className="mt-8 border-t pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium">
                      {formatted}
                    </p>
                  </div>
                  {role === 'user' && <div>
                    <p className="text-sm text-gray-500">Total Bookings</p>
                    <p className="text-2xl font-bold text-indigo-600">{bookings.length}</p>
                  </div>}
                </div>
              </div>
            </div>
          </div>

        
          <div className="lg:col-span-2 space-y-8">

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
              {editing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <button
                    onClick={handleSave}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1) + " " + user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1) || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{user.phone || "Not provided"}</p>
                  </div>
                </div>
              )}
            </div>

   
            {role === 'user' && <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Booking History</h3>
              {bookings.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No bookings yet. Start exploring hotels!</p>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-lg">{booking.hotel.name}</h4>
                          <p className="text-gray-600">{booking.hotel.location}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Room: {booking.room.type} ({booking.room.maxGuests} guests)
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${booking.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                          >
                            {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Check-in</p>
                          <p className="font-medium">
                            {format(new Date(booking.checkIn), "dd MMM yyyy")}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Check-out</p>
                          <p className="font-medium">
                            {format(new Date(booking.checkOut), "dd MMM yyyy")}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Guests</p>
                          <p className="font-medium">{booking.guests}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Payment</p>
                          <p className="font-medium text-indigo-600">On Arrival</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
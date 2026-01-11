import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { assets, dashboardDummyData } from "../../assets/assets";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { useDropzone } from "react-dropzone";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(dashboardDummyData);
  const [hotelInfo, setHotelInfo] = useState([]);
  const [bookings,setBookings]= useState([])



  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFile) => {
      setFiles(acceptedFile.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ))
    }
  })
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    pricePerNight: "",
    roomsAvailable: "",
  });

  const { setHotelId } = useUser();

  useEffect(() => {
    const hotelDetail = async () => {
      try {
        const bookingsRes = await axios.get("https://checkinn-rh1m.onrender.com/booking", {
          withCredentials: true,
        });
        console.log(bookingsRes.data.bookings );
        
        setBookings(bookingsRes.data.bookings || []);
        const res = await axios.get("https://checkinn-rh1m.onrender.com/owner/dashboard", {
          withCredentials: true,
        });
        setHotelInfo(res.data);


  

        // setHotelId(res.data[0]?._id);
      } catch (err) {
        console.error(err);
      }
    };
    hotelDetail();
  }, [setHotelId]);
  // useEffect(()=>{
  //   setRoomsData(hotelInfo[0]?.rooms);
  // },[setRoomsData])



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddHotel = async (e) => {
    e.preventDefault();
    try {
      const newFormData = new FormData();

      // Append text fields from state
      newFormData.append("name", formData.name);
      newFormData.append("location", formData.location);
      newFormData.append("description", formData.description);
      newFormData.append("pricePerNight", formData.pricePerNight);
      // newFormData.append("roomsAvailable", formData.roomsAvailable); // Note: This field is commented out in your JSX

      // Append image files
      // The name 'images' must match the key used in the backend's upload.array('images', 10)
      files.forEach((file) => {
        newFormData.append("images", file);
      });

      const res = await axios.post(
        "https://checkinn-rh1m.onrender.com/owner/add-hotel",
        newFormData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert(res.data.message || "Hotel added successfully!");
      setFormData({
        name: "",
        location: "",
        description: "",
        pricePerNight: "",
        roomsAvailable: "",
      });
      // Refresh hotel data
      const updated = await axios.get("https://checkinn-rh1m.onrender.com/owner/dashboard", {
        withCredentials: true,
      });
      setHotelInfo(updated.data);
      setHotelId(updated.data[0]?._id);
    } catch (error) {
      console.error("Error adding hotel:", error);
      alert("Error adding hotel. Please try again.");
    }
  };

  
  

  return (
    <div className="p-6  overflow-scroll ">
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subTitle="Monitor your room listings, track bookings and analyze revenue—all in one place."
      />

      {/* If owner has no hotel */}
      {hotelInfo.length === 0 ? (
        <div className="mt-10 bg-white shadow-lg rounded-2xl p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Add Your Hotel
          </h2>
          <form
            onSubmit={handleAddHotel}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 "
          >
            <input
              type="text"
              name="name"
              placeholder="Hotel Name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Hotel Location"
              value={formData.location}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              type="number"
              name="pricePerNight"
              placeholder="Price per Night (₹)"
              value={formData.pricePerNight}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            {/* <input
              type="number"
              name="roomsAvailable"
              placeholder="Total Rooms"
              value={formData.roomsAvailable}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            /> */}
            <textarea
              name="description"
              placeholder="Hotel Description"
              value={formData.description}
              onChange={handleChange}
              className="md:col-span-2 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none  resize-none "
              required
            />
            <div
              {...getRootProps()}
              className={`border-2 border-dashed translate rounded p-6 text-center  cursor-pointer mb-4 transition-all ${isDragActive ? "bg-blue-100 border-blue-400" : "bg-gray-50"}`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here...</p>
              ) : (
                <p className="text-gray-600">
                  Drag & drop room images here, or click to select files
                </p>
              )}

            </div>

            <div className="flex gap-2 flex-wrap">
              {files.map((file) => (
                <img
                  key={file.name}
                  src={file.preview}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded"
                />
              ))}
            </div>


            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Add Hotel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          {/*Dashboard Data */}
          <div className="mt-6">
            <img src={hotelInfo[0]?.hotelImage} alt="hotel-Image" className="h-50 w-50 rounded-xl mb-2 object-cover object-top border border-gray-300" />
            <p className="text-2xl font-semibold">{hotelInfo[0]?.name}</p>
            <div className="text-md text-gray-600">{hotelInfo[0]?.location}</div>
            <div className="text-sm text-gray-600">
              {hotelInfo[0]?.description}
            </div>

            <div className="mt-2">
              Total Rooms:{" "}
              <span className="font-medium">{hotelInfo[0]?.rooms.length}</span>
            </div>

            <div className="flex gap-4 my-8">
              {/* Total Bookings */}
              <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
                <img
                  src={assets.totalBookingIcon}
                  alt=""
                  className="max-sm:hidden h-10"
                />
                <div className="flex flex-col sm:ml-4 font-medium">
                  <p className="text-blue-500 text-lg">Total Bookings</p>
                  <p className="text-neutral-400 text-base">
                    {dashboardData.totalBookings}
                  </p>
                </div>
              </div>

              {/* Total Revenue */}
              <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
                <img
                  src={assets.totalRevenueIcon}
                  alt=""
                  className="max-sm:hidden h-10"
                />
                <div className="flex flex-col sm:ml-4 font-medium">
                  <p className="text-blue-500 text-lg">Total Revenue</p>
                  <p className="text-neutral-400 text-base">
                    ₹{dashboardData.totalRevenue}
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <h2 className="text-xl text-blue-950/70 font-medium mb-5">
              Recent Bookings
            </h2>

            <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
              <table className="w-full ">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-gray-800 font-medium">
                      User Name
                    </th>
                    <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                      Room Name
                    </th>
                    <th className="py-3 px-4 text-gray-800 font-medium text-center">
                      Total Amount
                    </th>
                    <th className="py-3 px-4 text-gray-800 font-medium text-center">
                      Payment Status
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm overflow-scroll">
                  {dashboardData.bookings.map((item, index) => (
                    <tr key={index}>
                      <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                        {item.user.username}
                      </td>
                      <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                        {item.room.roomType}
                      </td>
                      <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center mb-10">
                        {item.totalPrice}
                      </td>
                      <td className="py-3 px-4 text-gray-700 border-t border-gray-300 flex">
                        <button
                          className={`py-1 px-3 text-xs rounded-full mx-auto ${item.isPaid
                            ? "bg-green-200 text-green-600"
                            : "bg-amber-200 text-yellow-600"
                            }`}
                        >
                          {item.isPaid ? "Completed" : "Pending"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Title from "../../components/Title";
import { useDropzone } from "react-dropzone";

const AddRoom = () => {
  const [hotelId, setHotelId] = useState("");
  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: "",
    amenities: "",
    capacity: "",
    isAvailable: "Yes",
  });
  const [files, setFiles] = useState([]);

  // Dropzone Configuration
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   accept: { "image/*": []  },
  //   multiple: true,
  //   onDrop: (acceptedFiles) => {
  //     setFiles(
  //       acceptedFiles.map((file) =>
  //         Object.assign(file, { preview: URL.createObjectURL(file) })
  //       )
  //     );
  //   },

  // });
  const {getRootProps,getInputProps,isDragActive} = useDropzone({
    accept : {"image/*":[]},
    multiple : true,
    onDrop : (acceptedFiles)=>{
      setFiles(prevFiles =>[
        ...prevFiles,
        ...acceptedFiles.map((file)=>
          Object.assign(file,{preview:URL.createObjectURL(file)}
      )
        )
      ])
    }
  })

  // Fetch Hotel ID (on mount)
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await axios.get("https://checkinn-rh1m.onrender.com/owner/dashboard", {
          withCredentials: true,
        });
        if (res.data.length > 0) {
          setHotelId(res.data[0]._id);
        } else {
          console.error("No hotel found for this owner");
        }
      } catch (err) {
        console.error("Error fetching hotel:", err);
      }
    };
    fetchHotel();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hotelId) return alert("Hotel ID not found");

    try {
      const formData = new FormData();
      formData.append("roomType", inputs.roomType);
      formData.append("pricePerNight", inputs.pricePerNight);
      formData.append("amenities", inputs.amenities);
      formData.append("capacity", inputs.capacity);
      formData.append("isAvailable", inputs.isAvailable);

      files.forEach((file) => formData.append("images", file));

      const res = await axios.post(
        `https://checkinn-rh1m.onrender.com/owner/add-room/${hotelId}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert(res.data.message || "Room added successfully!");
      console.log("Room Added:", res.data);

      // Reset form
      setInputs({
        roomType: "",
        pricePerNight: "",
        amenities: "",
        capacity: "",
        isAvailable: "Yes",
      });
      setFiles([]);
    } catch (err) {
      console.error("Error adding room:", err);
      alert("Error adding room. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-items-start">
      <Title align="left" font="outfit" title="Add Rooms" />

      <form onSubmit={handleSubmit} className="max-w-md w-auto p-1 space-y-4">
        {/* Room Type */}
        <input
          type="text"
          name="roomType"
          value={inputs.roomType}
          onChange={handleChange}
          placeholder="Enter room type"
          className="w-full border border-gray-300 rounded-md p-2"
          required
        />

        {/* Price Per Night */}
        <input
          type="number"
          name="pricePerNight"
          value={inputs.pricePerNight}
          onChange={handleChange}
          placeholder="Enter price per night"
          className="w-full border border-gray-300 rounded-md p-2"
          required
        />

        {/* Amenities */}
        <input
          type="text"
          name="amenities"
          value={inputs.amenities}
          onChange={handleChange}
          placeholder="Enter amenities (comma separated)"
          className="w-full border border-gray-300 rounded-md p-2"
        />

        {/* Capacity */}
        <input
          type="text"
          name="capacity"
          value={inputs.capacity}
          onChange={handleChange}
          placeholder="Enter capacity (e.g., 2 persons)"
          className="w-full border border-gray-300 rounded-md p-2"
        />

        {/* Image Dropzone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded p-6 text-center cursor-pointer mb-4 transition-all ${
            isDragActive ? "bg-blue-100 border-blue-400" : "bg-gray-50"
          }`}
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

        {/* Image Preview */}
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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Room
        </button>
      </form>
    </div>
  );
};

export default AddRoom;

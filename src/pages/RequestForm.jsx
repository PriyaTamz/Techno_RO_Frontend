import { useState, useEffect } from "react";
import downArrow from "../assets/downArrow.png";
import Cross from "../assets/Cross.png";
import axios from "axios";

const BASE_URL = "https://techno-ro-server-wwns.onrender.com/api";

const RequestForm = ({ onClose }) => {

  const stateCityData = {
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
    "Delhi": ["New Delhi", "Dwarka", "Rohini", "Karol Bagh", "Connaught Place"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol"],
    "Punjab": ["Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Ajmer", "Kota"]
  };

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    category: "",
    pinCode: "",
    state: "",
    city: "",
    serviceType: "",
    address: "",
    landmark: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [cities, setCities] = useState([]);

  // Disable scrolling when the form is open
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "state") {
      setCities(stateCityData[value] || []);
      setFormData((prev) => ({ ...prev, city: "" })); // Reset city selection
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const requestbody = {
      fullName: formData.fullName,
      mobile: formData.mobileNumber,
      email: formData.email,
      address: formData.address,
      pinCode: formData.pinCode,
      state: formData.state,
      city: formData.city,
    };

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }

      const response = await axios.post(`${BASE_URL}/booking/create`, requestbody, {
        headers: {
          Authorization: `Bearer ${token}`,  // Include token in header
          "Content-Type": "application/json",
        },
      });

      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);

      if (response.status === 200 || response.data.message === "Booking successful") {
        console.log("Booking Successfully:", response.data);
        alert("Booking Successfully");
      } else {
        console.log("Booking failed:", response.data);
        alert(`Booking failed: ${response.data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("An error occurred while submitting the booking.");
    } finally {
      setTimeout(() => {
        setSubmitted(false);
        onClose(); // Close the form after submission
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {submitted ? (
        <div className="bg-green-500 text-white p-3 rounded-md text-center">
          Request submitted, you will receive a call from us.
        </div>
      ) : (
        <div className="relative max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 bg-white shadow-lg rounded-lg">
          <button onClick={onClose} className="absolute top-2 right-2">
            <img src={Cross} alt="Close" className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-bold mb-4">Submit Your Request</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Enter Full Name"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="mobileNumber"
              placeholder="Enter Mobile Number"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              required
            />

            <div className="flex space-x-2">
              <div className="relative w-1/2">
                <select
                  name="category"
                  className="w-full p-2 border rounded appearance-none"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="home">Home</option>
                </select>
                <img
                  src={downArrow}
                  className="absolute right-3 top-3 w-4"
                  alt="Dropdown"
                />
              </div>
              <input
                type="text"
                name="pinCode"
                placeholder="Enter Pin Code"
                className="w-1/2 p-2 border rounded"
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex space-x-2">
              <div className="relative w-1/2">
                <select
                  name="state"
                  className="w-full p-2 border rounded appearance-none"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select State</option>
                  {Object.keys(stateCityData).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <img
                  src={downArrow}
                  className="absolute right-3 top-3 w-4"
                  alt="Dropdown"
                />
              </div>
              <div className="relative w-1/2">
                <select
                  name="city"
                  className="w-full p-2 border rounded appearance-none"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <img
                  src={downArrow}
                  className="absolute right-3 top-3 w-4"
                  alt="Dropdown"
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-1">
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-100">
                  <input
                    type="radio"
                    name="serviceType1"
                    value="Services"
                    onChange={handleChange}
                    required
                    className="w-5 h-5 accent-blue-500"
                  />
                  <span className="text-gray-800 font-semibold">Services</span>
                </label>
              </div>
              <div className="flex-1">
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-100">
                  <input
                    type="radio"
                    name="serviceType2"
                    value="New Purchase"
                    onChange={handleChange}
                    required
                    className="w-5 h-5 accent-blue-500"
                  />
                  <span className="text-gray-800">New Purchase</span>
                </label>
              </div>
            </div>
            <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-100">
              <input
                type="radio"
                name="serviceType3"
                value="Repair or Service"
                onChange={handleChange}
                required
                className="w-5 h-5 accent-blue-500"
              />
              <span className="text-gray-800">Repair or Service</span>
            </label>
            <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-100">
              <input
                type="radio"
                name="serviceType4"
                value="Installation or Uninstallation"
                onChange={handleChange}
                required
                className="w-5 h-5 accent-blue-500"
              />
              <span className="text-gray-800">
                Installation or Uninstallation
              </span>
            </label>
            <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-100">
              <input
                type="radio"
                name="serviceType5"
                value="AMC Plan"
                onChange={handleChange}
                required
                className="w-5 h-5 accent-blue-500"
              />
              <span className="text-gray-800">AMC Plan</span>
            </label>

            <input
              type="text"
              name="address"
              placeholder="Enter Full Address"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="landmark"
              placeholder="Enter Landmark"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RequestForm;


import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import searchImg from '../assets/search.svg'
import Mixer from '../assets/mixer.webp'
import axios from 'axios';

const BASE_URL = "https://techno-ro-server-wwns.onrender.com/api";

// static 
const userId = "67bcad89e80739615e5468c9";

const MyBooking = () => {
  const [Change, setChange] = useState('')
  const navigate = useNavigate();
  const Orderstatus = ['On the way', 'Delivered', 'Canceled', 'Refunded', 'Completed']
  const OrderTime = ['Last 30 Days', '2024', '2023', 'Older']

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchBookingService = async () => {
      try {
        //const token = localStorage.getItem("token");
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2QwN2ViNjMxODg3Y2JjYmUzMmE1OGYiLCJpYXQiOjE3NDE4NTQxOTEsImV4cCI6MTc0MTk0MDU5MX0.cMkzexaqjBdMCbA6SQKnCPpquXlBnrZv21_IwUu0O_U';
        const response = await axios.get(`${BASE_URL}/booking`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItems(response.data);
      } catch (error) {
        console.log("Error fetching books:", error.response?.data?.message || error.message);
      }
    };

    fetchBookingService();
  }, []);

  /*const MyItems = [
    {
      img: Mixer,
      name: "Whole house filter with two replacement filter",
      warranty: "NA",
      price: "₹299",
      status: "On the Way",
      date: "Delivery on March 15,2025",
      routing: "/beforeComplete",
    },

    {
      img: Mixer,
      name: "Gold AMC Plan",
      warranty: "1 Year",
      price: "₹1999",
      status: "Purchased on March 15,2025",
      date: "Amc plan has been purchased",
      routing: "/beforeComplete",
    },

    {
      img: Mixer,
      name: "Whole house filter with two replacement filter",
      warranty: "NA",
      price: "₹299",
      status: "Delivered on March 15,2025",
      date: "Your item has been deliveried",
      routing: "/orderCompleted",
    },

    {
      img: Mixer,
      name: "Whole house filter with two replacement filter",
      warranty: "NA",
      price: "₹299",
      status: "Canceled on March 15,2025",
      date: "Your item has been canceled",
      routing: "/orderCancelled",
    },

    {
      img: Mixer,
      name: "Whole house filter with two replacement filter",
      warranty: "NA",
      price: "₹1999",
      status: "Completed on March 15,2025",
      date: "Your item has been completed",
      routing: "/orderCompleted",
    },

    {
      img: Mixer,
      name: "Whole house filter with two replacement filter",
      warranty: "NA",
      price: "₹1999",
      status: "Refunded on March 15,2025",
      date: "Your item has been refunded",
    },
  ];*/

  const handleChange = (e) => {
    setChange(e.target.value)
  }

  const handleNavigate = (id) => {
    navigate(`/beforeComplete/${id}`);
  }  

  return (
    <>
      <div className="heading flex gap-4 items-center justify-center my-8">
        <div className="w-[40vw] h-[1px] bg-black"></div>
        <h1 className="text-4xl font-bold tracking-wide">My Bookings</h1>
        <div className="w-[40vw] h-[1px] bg-black"></div>
      </div>
      <div className="w-screen h-screen flex overflow-hidden">
        <div className="orderFilter w-[25vw] relative">
          <div className="w-[12vw] h-[55vh] border absolute top-0 left-20 flex flex-col gap-4">
            <div className="orderStatus flex flex-col px-4 pt-4">
              <h1 className="text-lg font-[600] text-wider">Order Status</h1>
              <hr className="w-[56%] my-3 custom-dotted" />
              {Orderstatus.map((items, index) => (
                <label
                  key={index}
                  htmlFor={items}
                  className="flex gap-4 items-center justify-start my-1 w-fit"
                >
                  <input type="checkbox" id={items} className="size-4" />
                  <span className="text-sm font-[600]">{items}</span>
                </label>
              ))}
            </div>
            <div className="orderStatus flex flex-col px-4 py-2">
              <h1 className="text-lg font-[600] text-wider">Order Time</h1>
              <hr className="w-[56%] my-3 custom-dotted" />
              {OrderTime.map((items, index) => (
                <label
                  key={index}
                  htmlFor={items}
                  className="flex gap-4 items-center justify-start my-1 w-fit"
                >
                  <input type="checkbox" id={items} className="size-4" />
                  <span className="text-sm font-[600]">{items}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="myBooking w-[75vw] h-[80vh] flex gap-8 flex-col">
          <label htmlFor="search" className="relative flex">
            <input
              onChange={handleChange}
              type="text"
              value={Change}
              id="search"
              name="search"
              className="w-[80%] h-[6vh] pl-4 pr-10 py-4 rounded-sm border border-[#cccccb] placeholder:text-[#8d8d8c] placeholder:text-sm"
              placeholder="Search your bookings here"
            />
            <img
              src={searchImg}
              alt="search"
              className="absolute opacity-[0.6] right-60 top-3"
            />
          </label>
          <div className="BookedProducts overflow-hidden hide-scrollbar w-[75vw] h-[90vh] pb-5 flex flex-col gap-5">



            {items.map((item) => (
              <div
                key={item._id}
                onClick={() => handleNavigate(item._id)}
                className="border w-[80%] min-h-[12vh] flex items-center pl-4 cursor-pointer hover:shadow-md shadow-orange-600 hover:-translate-y-1"
              >
                <div className="rightSide flex gap-4 w-[65%]">
                  <img src={item.img || Mixer} alt="product" className="w-11" />
                  <div className="productDetails flex flex-col gap-1">
                    <span className="name text-md font-[500] tracking-wide">
                      {item.service?.name || "Service Name Not Available"}
                    </span>
                    <span className="name text-md text-[#c7c7c5]">
                      Warranty: {item.service?.warranty || "NA"}
                    </span>
                  </div>
                </div>
                <span className="font-[500] text-md w-[10%]">
                  {item.service?.price ? `₹${item.service.price}` : "₹0"}
                </span>

                <div className="leftSide flex flex-col gap-1 w-[30%]">
                  {item.status !== "On the Way" ? (
                    <div className="status flex items-center justify-center gap-2">
                      <div className="p-2 rounded-full bg-red-500"></div>
                      <span className="text-md font-[500] tracking-wide">
                        {item.status}
                      </span>
                    </div>
                  ) : (
                    <span className="status text-md">{item.status}</span>
                  )}
                  <span className="date text-md text-[#c7c7c5]">
                    {item.date || "Date not available"}
                  </span>
                </div>
              </div>
            ))}





          </div>
        </div>
      </div>
    </>
  );
}

export default MyBooking


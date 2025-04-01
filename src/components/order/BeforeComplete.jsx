import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import chat from "../../assets/chat.svg";
import star from "../../assets/Star.svg";
import file from "../../assets/file.svg";
import Mixer from "../../assets/mixer.webp";
import axios from 'axios';

const BASE_URL = "https://techno-ro-server-wwns.onrender.com/api";

const BeforeComplete = () => {
  const repeatCount = 1;
  const [cancel, setCancel] = useState(false);
  const [reschedule, setReschedule] = useState(false);
  const [booking, setBooking] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();   

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("No token found");
          return;
        }

        const response = await axios.get(`${BASE_URL}/booking/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooking(response.data);
      } catch (error) {
        console.log("Error fetching booking data:", error.response?.data?.message || error.message);
      }
    };
    fetchBooking();
  }, [id]);

  useEffect(() => {
    if (cancel) {
      navigate("/cancelReason");
    }
  }, [cancel, navigate]);

  if (!booking) {
    return <div>Loading...</div>;
  }

  /*const Timeline = {
    service: {
      date: "28/12/2024",
      time: "06:30 PM",
      status: "Service Registered",
      info: "Issue: Beeping Sound",
    },
  };*/

  return (
    <>
      <div className="flex gap-10 relative">
        <div className="leftSide flex flex-col w-[55vw] min-h-[100vh] items-end">
          <div className="ProductDetail border-2 border-[#c7c7c5] w-[85%] h-[24vh] mt-8 mb-4 flex items-center justify-between px-4 shadow-inner shadow-slate-50">
            <div className="left flex flex-col gap-3">
              <h3 className="text-[#c7c7c5] text-md">
                Service Booking ID - {booking._id}
              </h3>
              <h1 className="text-lg font-[600] tracking-wide">
                {booking.service?.name || "Service Name Not Available"}
              </h1>
              <h2 className="text-md font-[400] tracking-wide">
                Estimated Time: {booking.service?.estimatedTime || "Not Available"}
              </h2>
              <h1 className="text-lg font-[600] tracking-wide">
                ₹{booking.service?.price || "0"}
              </h1>
            </div>
            <div className="right border-2 border-[#c7c7c5] mx-4 px-2 py-1">
              <img src={Mixer} alt="Mixer" className="size-32" />
            </div>
          </div>


          <div className="CompletionTimeline border-2 border-[#c7c7c5] w-[85%] max-h-[85vh] flex flex-col gap-1 mb-4 px-6 py-6 shadow-inner shadow-slate-50">
            <div className="ServiceRegister flex items-center gap-8">
              <div className="dateTime flex flex-col gap-1 relative bottom-6">
                <span className="">{Timeline.service.date}</span>
                <span className="">{Timeline.service.time}</span>
              </div>
              <div className="Dot relative flex flex-col gap-[1px] items-center">
                <div className="p-[10px] rounded-full bg-red-600"></div>
                <div className="h-[11vh] w-[4px] bg-red-600"></div>
              </div>
              <div className="dateTime flex flex-col gap-1 relative bottom-6">
                <span className="text-lg font-[600]">
                  {Timeline.service.status}
                </span>
                <span className="text-md font-[400]">
                  {Timeline.service.info}
                </span>
              </div>
            </div>
          </div>


          <div className="Rating border-2 border-[#c7c7c5] w-[85%] h-[8vh] mb-4 px-4 flex items-center gap-8 shadow-inner shadow-slate-50">
            <h1
              onClick={() => setCancel(true)}
              className="text-[#c7c7c5] text-xl font-semibold cursor-pointer"
            >
              Cancel
            </h1>
            <h1
              onClick={() => setReschedule(true)}
              className="text-[#c7c7c5] text-xl font-semibold cursor-pointer"
            >
              Reschedule
            </h1>
          </div>
          <div className="Chat border-2 border-[#c7c7c5] w-[85%] h-[8vh] mb-4 flex gap-2 items-center px-4 shadow-inner shadow-slate-50">
            <img src={chat} alt="" className="size-5 cursor-pointer" />
            <span className="text-lg tracking-wide font-[500] cursor-pointer">
              Chat with us
            </span>
          </div>
        </div>
        <div className="rightSide flex flex-col w-[40vw] min-h-[100vh] items-center">
          <div className="download border-2 border-[#c7c7c5] w-[65%] h-[8vh] mb-4 mt-8 flex gap-2 items-center px-4 shadow-inner shadow-slate-50">
            <img src={file} alt="" className="opacity-[0.6] cursor-pointer" />
            <span className="text-lg text-[#8d8d8c] font-[500] cursor-pointer">
              Download Invoice
            </span>
          </div>
          <div className="ServiceAddress border-2 border-[#c7c7c5] w-[65%] h-[30vh] mb-4 shadow-inner shadow-slate-50 flex px-4 py-4 flex-col gap-3">
            <span className="text-[1.4rem] font-[600]">
              Service Address Details
            </span>
            <hr className="bg-[#a5a3a3] h-[2px] my-2" />
            <div className="address flex flex-col">
              <span className="text-[1.4rem] font-[600]"> {booking.fullname} </span>
              <span className="text-[1.1rem] font-[600]">
              {booking.address}
              </span>
              <span className="text-[1.1rem] font-[600]">Kentucky 39495</span>
              <span className="text-[1.1rem] font-[600]">
              Phone Number: {booking.mobile}
              </span>
            </div>
          </div>
          <div className="PriceDetail border-2 border-[#c7c7c5] w-[65%] h-[62vh] mb-4 shadow-inner shadow-slate-50 flex px-4 py-6 flex-col gap-2">
            <span className="text-[1.4rem] font-[600]">Price Details</span>
            <hr className="bg-[#a5a3a3] h-[2px] my-2" />
            <div className="price flex items-center justify-between">
              <span className="text-[1.2rem] text-[#8d8d8c] font-[600]">
                Price (1 Items)
              </span>
              <span className="text-[1.2rem] text-[#8d8d8c]  font-[600]">
                ₹2499
              </span>
            </div>
            <div className="discount flex items-center justify-between">
              <span className="text-[1.2rem] text-[#8d8d8c] font-[600]">
                Discount
              </span>
              <span className="text-[1.2rem] text-[#bcbc86]  font-[600]">
                -₹500
              </span>
            </div>
            <div className=" PlatformFee flex items-center justify-between">
              <span className="text-[1.2rem] text-[#8d8d8c] font-[600]">
                Platform Fee
              </span>
              <span className="text-[1.2rem] text-[#8d8d8c]  font-[600]">
                ₹1
              </span>
            </div>
            <div className="debitCard flex items-center justify-between">
              <span className="text-[1.2rem] text-[#8d8d8c] font-[600]">
                Debit Card Off
              </span>
              <span className="text-[1.2rem] text-[#bcbc86]  font-[600]">
                -₹100
              </span>
            </div>
            <div className="debitCard flex items-center justify-between">
              <span className="text-[1.2rem] text-[#8d8d8c] font-[600]">
                Delivery Charges
              </span>
              <div className="deliveryCharge flex items-center justify-center gap-2">
                <div className="relative text-[1.2rem] text-[#8d8d8c] font-[600]">
                  ₹100
                  <div className="absolute inset-x-0 top-1/2 h-0.5 bg-[#8d8d8c]"></div>
                </div>
                <span className="text-[1.2rem] text-[#8d8d8c] font-[600]">
                  Free
                </span>
              </div>
            </div>
            <hr className="h-[2px] my-1 custom-dotted2" />
            <div className=" PlatformFee flex items-center justify-between">
              <span className="text-[1.2rem] text-[#242423] font-[600]">
                Total Amount
              </span>
              <span className="text-[1.2rem] text-[#1d1d1c]  font-[600]">
                ₹1900
              </span>
            </div>
            <hr className="h-[2px] my-1 custom-dotted2" />
            <span className="text-[1rem] text-[#b5b4b4] font-[600]">
              You total saved on this order ₹700
            </span>
            <hr className="h-[2px] my-1 custom-dotted2" />
            <div className="offer flex gap-2 items-center">
              <span className="w-10 h-10 bg-black opacity-[0.3] text-lg text-white wrounded-full flex justify-center items-center rounded-full">
                %
              </span>
              <div className=" PlatformFee flex flex-col justify-center">
                <span className="text-[1rem] text-[#242423] font-[600]">
                  1 Offer Applied On This Order
                </span>
                <span className="text-[0.85rem] text-[#1d1d1c] font-[600]">
                  Debit Card Off ₹100
                </span>
              </div>
            </div>
          </div>
          <div className="PriceDetail border-2 border-[#c7c7c5] w-[65%] h-[8vh] mb-4 shadow-inner shadow-slate-50 cursor-pointer flex items-center px-4">
            <span className="text-lg text-[#8d8d8c] font-[500] ">
              Payment Mode : Debit Card
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BeforeComplete;


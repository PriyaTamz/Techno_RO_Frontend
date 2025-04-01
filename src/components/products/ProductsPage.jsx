import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import downArrow from "../../assets/downArrow.png";
import Quality from "../../assets/Quality.png";
import Customer from "../../assets/Customer.png";
import Gift from "../../assets/GiftBox.png"
import BlueStar from "../../assets/BlueStar.png";
import Offer1 from "../../assets/Offer1.png";
import Offer2 from "../../assets/Offer2.png";
import Offer3 from "../../assets/Offer3.png";
import Offer4 from "../../assets/Offer4.png";
import Offer5 from "../../assets/Offer5.png";
import Offer6 from "../../assets/Offer6.png";
import Purifier from "../../assets/Purifier.png"

const BASE_URL = "https://techno-ro-server-wwns.onrender.com/api";

const ProductsPage = () => {

  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchoffers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/offers`);
        setOffers(response.data);
      } catch (error) {
        console.log("Error fetching offers:", error);
      }
    };

    fetchoffers();
  }, []);

  const reviews = [
    {
      name: "Devon Lane",
      date: "24 Dec, 2024",
      review: "Lorem ipsum dolor sit amet consectetur. Sed lacus facilisi semper lacus rhoncus cursus...",
      rating: 4, // 4 stars filled
    },
    {
      name: "Eleanor Pena",
      date: "20 Jul, 2024",
      review: "Lorem ipsum dolor sit amet consectetur. Sed lacus facilisi semper lacus rhoncus cursus...",
      rating: 5, // 5 stars filled
    },
    {
      name: "Jane Cooper",
      date: "15 Jan, 2024",
      review: "Lorem ipsum dolor sit amet consectetur. Sed lacus facilisi semper lacus rhoncus cursus...",
      rating: 4, // 4 stars filled
    },
  ];

  const products = [
    { img: Offer1, title: "Whole House Filter with Two Replacement Filters" },
    { img: Offer2, title: "3000 Gallon Replacement Water Filter" },
    { img: Offer3, title: "VYAIR 10\" x 2.5\" Water Filter Cartridge" },
    { img: Offer4, title: "Domestic RO Membrane Set of 1" },
    { img: Offer5, title: "EVERPURE Microfilter Pretreatment System" },
    { img: Offer6, title: "Kent Complete Filter Replacement" },
    { img: Purifier, title: "KENT Gold Spare Kit Gold Pleated Filter Cartridge" },
    { img: Offer2, title: "Kent Automated Water Softener, 3000 LPH" },
  ];

  return (
    <div className="flex flex-col gap-5 mx-4 my-6">
      {/*Title */}
      <div className="flex items-center">
        <div className="flex-grow border-t border-gray-900"></div>
        <span
          className="mx-2
                text-3xl font-semibold "
        >
          Products
        </span>
        <div className="flex-grow border-t border-gray-900"></div>
      </div>
      {/*Middle */}
      <div className="flex gap-x-40 mx-20">
        {/* Sidebar */}
        <div className=" flex flex-col w-1.5/5 p-6 gap-10">
          {/*Product Brands */}
          <div>
            <h3 className="text-lg font-semibold ">Product Brands </h3>
            {/* Gray Dashed Line */}
            <div className="my-2 border-t border-dashed border-gray-400"></div>
            <ul className="space-y-3">
              <li>
                <input type="checkbox" id="popular" className="mr-2" />
                <label>KENT</label>
              </li>
              <li>
                <input type="checkbox" id="price-low-high" className="mr-2" />
                <label>Pure it</label>
              </li>
              <li>
                <input type="checkbox" id="price-low-high" className="mr-2" />
                <label>Livpure</label>
              </li>
              <li>
                <input type="checkbox" id="price-high-low" className="mr-2" />
                <label>Eureka FORBES</label>
              </li>
              <li>
                <input type="checkbox" id="latest" className="mr-2" />
                <label>BLUE MOUNT</label>
              </li>
            </ul>
          </div>
          {/*Sort by */}
          <div>
            <h3 className="text-lg font-semibold ">Sort By</h3>
            {/* Gray Dashed Line */}
            <div className="my-2 border-t border-dashed border-gray-400"></div>
            <ul className="space-y-3">
              <li>
                <input type="checkbox" id="popular" className="mr-2" />
                <label htmlFor="popular">Popular</label>
              </li>
              <li>
                <input type="checkbox" id="price-low-high" className="mr-2" />
                <label htmlFor="price-low-high">Price Low - High</label>
              </li>
              <li>
                <input type="checkbox" id="price-high-low" className="mr-2" />
                <label htmlFor="price-high-low">Price High - Low</label>
              </li>
              <li>
                <input type="checkbox" id="latest" className="mr-2" />
                <label htmlFor="latest">Latest</label>
              </li>
            </ul>
          </div>

          {/* Price Section */}
          <div>
            <h3 className="text-lg font-semibold">Price</h3>
            <div className=" items-center space-x-4">
              {/* Two black circles connected with gray line */}
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-black"></div>
                <div className="h-[10px] w-[100%] bg-gray-300"></div>{" "}
                {/* Increased height */}
                <div className="w-5 h-5 rounded-full bg-black"></div>
              </div>

              {/* Price Range */}
              <span className="flex items-center mt-2">
                <FaRupeeSign className=" text-md" />
                <span className="text-xl">99 -</span>
                <FaRupeeSign className=" text-md" />
                <span className="text-xl">9999 </span>
              </span>
            </div>
          </div>

          {/* Offers Section */}
          <div>
            <h3 className="text-lg font-semibold">Offers</h3>
            <div className="my-2 border-t border-dashed border-gray-400"></div>

            <div className="space-y-4">
              {offers.length > 0 ? (
                offers.map((offer, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-[#7EC1B1] flex items-center justify-center text-white">
                      <span>%</span>
                    </div>
                    <div>
                      <div className="font-medium">{offer.title}</div>
                      <div className="text-sm text-gray-600">{offer.description}</div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No offers available at the moment</p>
              )}
            </div>

            {offers.length > 3 && (
              <button className="bg-transparent text-[#7EC1B1] hover:text-lg transition-all">
                View More Offers
              </button>
            )}
          </div>

          {/*Customer Reviews */}
          <div>
            <h3 className="text-lg font-semibold">Customer Reviews</h3>
            <div className="my-2 border-t border-dashed border-gray-400"></div>
            {reviews.map((review, index) => (
              <div key={index}>
                <div className="flex items-center space-x-4 mb-1 justify-between">
                  <div className="flex items-center space-x-4 mb-1 ">
                    <img
                      src={Customer}
                      alt="Customer"
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex flex-col">
                      <p className="text-sm text-gray-600">{review.name}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={`text-2xl ${index < review.rating
                          ? "text-[#7EC1B1]"
                          : "text-gray-300"
                          }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{review.review}</p>
              </div>
            ))}

            {/* Button to view more reviews */}
            <button className="bg-transparent text-[#7EC1B1] hover:text-lg transition-all">
              View More Reviews
            </button>
          </div>

          {/* Techno RO Promise */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Techno RO Promise</h3>
            <div className="my-2 border-t border-dashed border-gray-400"></div>
            <div className="flex gap-3">
              <ul className="space-y-3">
                <li>
                  <span className="text-xl mx-1">✓</span>Verified
                  Professionals
                </li>
                <li>
                  <span className="text-xl mx-1">✓</span>assle-Free Booking
                </li>
                <li>
                  <span className="text-xl mx-1">✓</span>Transparent Pricing
                </li>
                <li>
                  <span className="text-xl mx-1">✓</span>Genuine Spare Parts
                </li>
              </ul>
              <img src={Quality} alt="" />
            </div>
          </div>
        </div>

        {/*Products Available */}
        <div className="w-full p-2 border border-gray-500">
          <h1 className="text-2xl ">Spare Parts </h1>
          {/* Gray Dashed Line */}
          <div className="my-2 border-t border border-gray-200"></div>
          <div className="grid grid-cols-2 grid-rows-4 gap-x-20 gap-y-10 px-20 py-5">
            {products.map((offer, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center border border-gray-300 rounded-lg gap-2 py-5"
              >
                <img
                  src={offer.img}
                  alt={offer.title}
                  className="w-[160px] h-[160px] mb-3 border border-gray-200 rounded-lg p-4"
                />
                <h3 className="text-lg font-semibold mb-2">{offer.title}</h3>
                {/* Rating Row */}
                <div className="flex items-center text-gray-600">
                  <img src={BlueStar} alt="Star" className="w-4 h-4 mr-1" />
                  <span className="font-semibold">4.81</span>
                  <span className="ml-1">(1.9M Reviews)</span>
                </div>
                {/* Price & Time */}
                <div className="flex items-center text-gray-600 gap-2">
                  <span className="font-semibold text-lg">₹299.00</span>
                  <span className=" flex items-center">
                    <div className="w-3 h-3 rounded-full bg-black"></div>{" "}
                    Time: 30 mins
                  </span>
                </div>
                <NavLink to={"/buynow"}>
                  <button className="px-4 py-2 bg-[#7EC1B1] text-white rounded-lg">
                    Buy Now
                  </button>
                </NavLink>

              </div>
            ))}
          </div>
        </div>
      </div>
      {/*Rewads & Gifts */}
      <div
        className="w-[1860px] max-w-[100%] h-[400px] flex items-center justify-between 
                                        bg-[#E5DAA1] px-[50px] mx-auto  rounded-[16px]"
      >
        {/* Left Side - Text Content */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Refer and Earn Rewards
          </h2>
          <p className="text-lg text-gray-600">
            Invite and get{" "}
            <span className="font-semibold">₹100 cash back</span> on your
            purchase.
          </p>
          <button
            className="w-[160px] h-[48px] bg-[#0000004D]
                         text-white font-medium rounded-lg"
          >
            Learn More
          </button>
        </div>

        <div>
          <img
            src={Gift}
            alt="Gift Box"
            className="w-[200px] h-auto object-cover"
          />
        </div>
      </div>
    </div >
  );
}

export default ProductsPage;
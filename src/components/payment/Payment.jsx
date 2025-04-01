import { useState, useEffect } from "react";
import axios from "axios";
import { Landmark, CheckCircle, ShoppingBag } from "lucide-react";
import phonePeLogo from "../../assets/images.jpg";
import { NavLink, useNavigate } from "react-router-dom";

const BASE_URL = "https://techno-ro-server-wwns.onrender.com/api";

const Payment = () => {

  const userId = "65f2b6c8a8e4c2b3d4f5e6a7";

  const [selectedMethod, setSelectedMethod] = useState("");

  {/* Razorpay */ }
  const [amount, setAmount] = useState("");
  const [orderId, setOrderId] = useState(null);

  const handlePayment = async () => {

    const numericAmount = Number(amount);

    if (!numericAmount || isNaN(numericAmount) || numericAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      const { data } = await axios.post(
        "https://techno-ro-server-wwns.onrender.com/api/create-payment",
        { amount: numericAmount * 100 }
      );

      console.log("Payment API Response:", data);

      if (!data.success) {
        alert("Payment creation failed");
        return;
      }

      const { id: razorpay_order_id, amount: order_amount, currency } = data.payment;

      if (!razorpay_order_id || !order_amount || !currency) {
        alert("Invalid response from server");
        return;
      }

      const generatedOrderId = "67bc5b387d0d82291038280b";
      setOrderId(generatedOrderId);

      const options = {
        key: "rzp_test_KWJ59bejaPxjyp",
        amount: order_amount,
        currency: currency,
        name: "Talentrise Technokrate",
        description: "Test Transaction",
        order_id: razorpay_order_id,
        handler: async (response) => {
          alert("Payment Successful!");
          console.log("Razorpay Response:", response);

          const paymentId = response.razorpay_payment_id || "MISSING_PAYMENT_ID";
          const paymentMethod = "UPI";
          const paymentStatus = "Paid";

          if (!generatedOrderId) {
            console.error("Missing orderId!");
            alert("Error: Order ID is missing!");
            return;
          }

          try {
            const saveResponse = await axios.put(
              "https://techno-ro-server-wwns.onrender.com/api/save-payment-info",
              {
                orderId: generatedOrderId,
                paymentId: paymentId,
                paymentMethod: paymentMethod,
                paymentStatus: paymentStatus,
              }
            );

            console.log("Save Payment Info Response:", saveResponse.data);
            if (saveResponse.data.success) {
              alert("Payment and order details saved successfully!");
            } else {
              alert("Failed to save payment details.");
            }
          } catch (error) {
            console.error("Error saving payment info:", error.response?.data);
            alert("Error saving payment information.");
          }
        },
      };

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded!");
        return;
      }

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Full error response:", error.response?.data);
      alert(error.response?.data?.message || "Payment failed");
    }
  };


  {/* Offfers */ }
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


  {/* UPI */ }
  const [upiList, setUpiList] = useState([
    { provider: "PhonePe", upiId: "phonepe@upi", _id: "default-phonepe" },
  ]);
  const [showInput, setShowInput] = useState(false);
  const [newUpi, setNewUpi] = useState("");
  const [provider, setProvider] = useState("Google Pay");
  const [selectedUpi, setSelectedUpi] = useState(null);

  const addUpi = async () => {
    if (!newUpi.trim()) {
      alert("Please enter a valid UPI ID");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/insert-upi`,
        {
          userId,
          upiId: newUpi,
          provider,
        }
      );

      if (response.data.paymentMethod) {
        setUpiList([...upiList, response.data.paymentMethod.upi.at(-1)]);
      }

      setNewUpi("");
      setShowInput(false);
      alert("UPI added successfully!");
    } catch (error) {
      console.error("Error adding UPI:", error);
      alert("Failed to add UPI. Try again!");
    }
  };

  {/* Net Banking */ }
  const [netBankingList, setNetBankingList] = useState([]);
  const [newNetBanking, setNewNetBanking] = useState({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
  });
  const [showNetBankingInput, setShowNetBankingInput] = useState(false);

  const addNetBanking = async () => {
    if (!newNetBanking.bankName || !newNetBanking.accountNumber || !newNetBanking.ifscCode) {
      alert("Please fill all the details correctly");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/insert-net-banking`, {
        userId,
        bankName: newNetBanking.bankName,
        accountNumber: newNetBanking.accountNumber,
        ifscCode: newNetBanking.ifscCode,
      });

      if (response.data.paymentMethod) {
        setNetBankingList([...netBankingList, response.data.paymentMethod.netBanking.at(-1)]);
      }

      setNewNetBanking({ bankName: "", accountNumber: "", ifscCode: "" });
      alert("Net Banking added successfully!");

    } catch (error) {
      console.error("Error adding Net Banking:", error);
      alert("Failed to add Net Banking. Try again!");

    }
  };


  {/* Card */ }
  const [cardList, setCardList] = useState([]);
  const [newCard, setNewCard] = useState({
    cardType: "",
    cardNumber: "",
    cardHolderName: "",
    expiryDate: "",
  });
  const [showCardInput, setShowCardInput] = useState(false);

  const addCard = async () => {
    if (!newCard.cardType || !newCard.cardNumber || !newCard.cardHolderName || !newCard.expiryDate) {
      alert("Please fill all the details correctly");
      return;
    }

    try {
      console.log("Sending Data:", {
        userId,
        cardType: newCard.cardType,
        cardNumber: newCard.cardNumber,
        cardHolderName: newCard.cardHolderName,
        expiryDate: newCard.expiryDate,
      });
      const response = await axios.post(`${BASE_URL}/insert-card`, {
        userId,
        cardType: newCard.cardType,
        cardNumber: newCard.cardNumber,
        cardHolderName: newCard.cardHolderName,
        expiryDate: newCard.expiryDate,
      });

      console.log("Response Data:", response.data);

      if (response.data.paymentMethod?.cards) {
        setCardList([...cardList, response.data.paymentMethod.cards.at(-1)]);
      } else {
        console.error("Unexpected API response:", response.data);
        alert("Unexpected API response. Check console for details.");
        return;
      }

      setNewCard({ cardType: "", cardNumber: "", cardHolderName: "", expiryDate: "" });
      setShowCardInput(false);
      alert("Card added successfully!");

    } catch (error) {
      console.error("Error adding Card:", error.response?.data || error.message);
      alert("Failed to add Card. Try again!");

    }
  }



  {/* Coupon */ }
  const [coupon, setCoupon] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState(null);

  const verifyCoupon = async () => {
    if (!coupon.trim()) {
      alert("Please enter a coupon code.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/verify-coupon`, {
        coupon,
        orderId: "67bd4ca4ed13d50bd6258266",
      });

      if (response.data.success) {
        setIsVerified(true);
        setDiscountedPrice(response.data.order.finalAmount);
        alert(`Coupon applied successfully! New Price: ₹${response.data.order.finalAmount}`);
      } else {
        alert(response.data.message || "Coupon is not valid for this order.");
      }
    } catch (error) {
      console.error("Error verifying coupon:", error);
      alert(error.response?.data?.message || "Failed to verify coupon. Try again!");
    }
  };



  const goToSuccessPage = () => {
    navigate("/paymentSuccess");
  };

  return (
    <div>
      <div className="w-350 mx-auto mt-12 p-6 bg-white  rounded-lg  border-gray-200">
        <div className="grid grid-cols-3 gap-6">
          {/* Left Section: Payment Methods */}
          <div className="col-span-2 space-y-6">
            <div className=" border border-gray-300 rounded w-223  p-4 mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-sm text-gray-600">Deliver to: </span>
                  <span className="font-medium">Jane Cooper, 39495</span>
                  <span className="bg-gray-100 px-2 py-0.5 text-xs ml-2">
                    Home
                  </span>
                  <div className="text-sm text-gray-600 mt-1">
                    4517 Washington Ave, Manchester, Kentucky 39495
                  </div>
                </div>
                <button className="text-teal-500 border border-teal-500  px-2 py-1 rounded text-sm">
                  Change
                </button>
              </div>
            </div>

            {/* Apply Coupon Section */}
            <div className="p-4 border border-gray-300 rounded-lg">
              <div className="font-semibold text-gray-700 mb-2">Apply Coupon</div>
              <div>
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter Coupon Code"
                  className="border p-2 rounded w-full"
                  disabled={isVerified}
                />

                {/* Verify Button */}
                {!isVerified && (
                  <button
                    onClick={verifyCoupon}
                    className="bg-blue-500 text-white px-3 py-1 rounded w-full mt-2"
                  >
                    Verify Coupon
                  </button>
                )}

                {/* Show discounted price after verification */}
                {isVerified && discountedPrice && (
                  <p className="text-green-600 font-semibold mt-2">
                    🎉 Discount Applied! Final Price: ₹{discountedPrice}
                  </p>
                )}
              </div>
            </div>






            {/* UPI */}
            <div className="p-4 border border-gray-300 rounded-lg">
              <div className="flex justify-between items-center font-semibold text-gray-700">
                <span>UPI</span>
                <button onClick={() => setShowInput(true)} className="text-teal-500 border border-teal-500 px-2 py-1 rounded text-sm">
                  Add New UPI
                </button>
              </div>
              <div onClick={() => setSelectedUpi("phonepe@upi")} className="flex items-center gap-3 p-3 border border-gray-300 rounded mt-2">
                <img src={phonePeLogo} alt="PhonePe Logo" className="w-8 h-8" />
                <span>PhonePe UPI</span>
              </div>
              {/* Show "Pay" button when PhonePe is clicked */}
              {selectedUpi === "phonepe@upi" && (
                <button className="mt-2 bg-teal-500 text-white px-3 py-1 rounded w-full">
                  Pay
                </button>
              )}
            </div>
            {/* Input Field (Visible when "Add New UPI" is clicked) */}
            {showInput && (
              <div className="mt-2 p-3 border border-gray-300 rounded">
                <select
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  className="border p-2 rounded w-full mt-2"
                >
                  <option value="Google Pay">Google Pay</option>
                  <option value="Paytm">Paytm</option>
                  <option value="PhonePe">PhonePe</option>
                </select>
                <input
                  type="text"
                  value={newUpi}
                  onChange={(e) => setNewUpi(e.target.value)}
                  placeholder="Enter UPI ID"
                  className="border p-2 rounded w-full"
                />
                <button
                  onClick={addUpi}
                  className="mt-2 bg-teal-500 text-white px-3 py-1 rounded w-full"
                >
                  Pay
                </button>
              </div>
            )}
            {/* Added UPI List */}
            {upiList
              .filter((upi) => upi._id !== "default-phonepe")
              .map((upi) => (
                <div key={upi._id}>
                  <div
                    className="flex items-center gap-3 p-3 border border-gray-300 rounded mt-2 cursor-pointer"
                    onClick={() => setSelectedUpi(upi.upiId)}
                  >
                    <span>{upi.provider} - {upi.upiId}</span>
                  </div>
                  {selectedUpi === upi.upiId && (
                    <button className="mt-2 bg-teal-500 text-white px-3 py-1 rounded w-full">
                      Pay
                    </button>
                  )}
                </div>
              ))}





            {/* Net Banking */}
            <div className="p-4 border border-gray-300 rounded-lg">
              <div className="flex justify-between items-center font-semibold text-gray-700">
                <span>Net Banking</span>
                <button onClick={() => setShowNetBankingInput(true)}
                  className="text-teal-500 border border-teal-500 px-2 py-1 rounded text-sm">
                  Add New Bank
                </button>
              </div>

              {/* Existing Net Banking List */}
              {netBankingList.map((bank) => (
                <div key={bank._id} className="flex items-center gap-3 p-3 border border-gray-300 rounded mt-2">
                  <span>{bank.bankName} - {bank.accountNumber}</span>
                </div>
              ))}

              {/* Input Fields for Adding Net Banking */}
              {showNetBankingInput && (
                <div className="mt-2 p-3 border border-gray-300 rounded">
                  <select
                    value={newNetBanking.bankName}
                    onChange={(e) => setNewNetBanking({ ...newNetBanking, bankName: e.target.value })}
                    className="border p-2 rounded w-full"
                  >
                    <option value="">Select Bank</option>
                    <option value="HDFC">HDFC</option>
                    <option value="SBI">State Bank of India</option>
                    <option value="ICICI">ICICI</option>
                    <option value="Axis">Axis Bank</option>
                    <option value="Kotak">Kotak Mahindra Bank</option>
                    <option value="Yes Bank">Yes Bank</option>
                    <option value="Other">Other</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Account Number"
                    value={newNetBanking.accountNumber}
                    onChange={(e) => setNewNetBanking({ ...newNetBanking, accountNumber: e.target.value })}
                    className="border p-2 rounded w-full mt-2"
                  />
                  <input
                    type="text"
                    placeholder="IFSC Code"
                    value={newNetBanking.ifscCode}
                    onChange={(e) => setNewNetBanking({ ...newNetBanking, ifscCode: e.target.value })}
                    className="border p-2 rounded w-full mt-2"
                  />
                  <button
                    onClick={addNetBanking}
                    className="mt-2 bg-teal-500 text-white px-3 py-1 rounded w-full"
                  > Add Bank </button>
                </div>
              )}

              <div className="flex items-center gap-3 p-3 border border-gray-300 rounded mt-2">
                <Landmark className="text-gray-600 w-6 h-6" />
                <span>SBI Net Banking</span>
              </div>
            </div>





            {/* Credit/Debit Cards */}
            <div className="p-4 border border-gray-300 rounded-lg">
              <div className="flex justify-between items-center font-semibold text-gray-700">
                <span>Credit/ Debit/ ATM Card</span>
                <button onClick={() => setShowCardInput(true)} className="text-teal-500 border border-teal-500 px-2 py-1 rounded text-sm">
                  Add New Card
                </button>
              </div>
              {/* Existing Credit/Debit Cards List */}
              {cardList.map((card) => (
                <div key={card._id} className="flex items-center gap-3 p-3 border border-gray-300 rounded mt-2">
                  <span>{card.cardNumber}</span>
                </div>
              ))}
              {/* Input Fields for Adding Net Banking */}
              {showCardInput && (
                <div className="mt-2 p-3 border border-gray-300 rounded">
                  <select
                    value={newCard.cardType}
                    onChange={(e) => setNewCard({ ...newCard, cardType: e.target.value })}
                    className="border p-2 rounded w-full"
                  >
                    <option value="cardType">Select Card Type</option>
                    <option value="Visa">Visa</option>
                    <option value="Mastercard">Mastercard</option>
                    <option value="RuPay">RuPay</option>
                    <option value="Maestro">Maestro</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Card Name"
                    value={newCard.cardHolderName}
                    onChange={(e) => setNewCard({ ...newCard, cardHolderName: e.target.value })}
                    className="border p-2 rounded w-full mt-2"
                  />
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={newCard.cardNumber}
                    onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value })}
                    className="border p-2 rounded w-full mt-2"
                  />
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={newCard.expiryDate}
                    onChange={(e) => setNewCard({ ...newCard, expiryDate: e.target.value })}
                    className="border p-2 rounded w-full mt-2"
                  />
                  <button
                    onClick={addCard}
                    className="mt-2 bg-teal-500 text-white px-3 py-1 rounded w-full"
                  > Add Card </button>
                </div>
              )}
              <div className="mt-2 space-y-2">
                <div
                  className={`flex items-center gap-3 p-3 border rounded cursor-pointer ${selectedMethod === "mastercard"
                    ? "border-green-500"
                    : "border-gray-300"
                    }`}
                  onClick={() => setSelectedMethod("mastercard")}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                    alt="Mastercard Logo"
                    className="w-8 h-6"
                  />
                  <span>**** **** **** 3456</span>
                </div>
                <div
                  className={`flex items-center gap-3 p-3 border rounded cursor-pointer ${selectedMethod === "visa"
                    ? "border-green-500"
                    : "border-gray-300"
                    }`}
                  onClick={() => setSelectedMethod("visa")}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                    alt="Visa Logo"
                    className="w-10 h-6"
                  />
                  <span>**** **** **** 5678</span>
                  {selectedMethod === "visa" && (
                    <CheckCircle className="text-green-500 ml-auto" />
                  )}
                </div>
              </div>
            </div>




            {/* Payment Options */}
            <div className="p-5 border border-gray-300 rounded-lg shadow-md bg-white">
              <h3 className="font-semibold text-gray-600 text-lg mb-4">Select Payment Method</h3>

              {/* Amount Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Enter Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter Amount"
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Pay Online Button */}
              <button
                onClick={handlePayment}
                disabled={!amount || isNaN(amount) || amount <= 0}
                className={`w-full py-3 rounded-lg text-white font-semibold text-center transition duration-200 ease-in-out 
      ${!amount || isNaN(amount) || amount <= 0 ? "bg-blue-500 cursor-not-allowed" : "bg-green-500 hover:bg-blue-600"}
    `}
              >
                Pay Online
              </button>

              {/* OR Divider */}
              <div className="flex items-center my-4">
                <hr className="w-full border-gray-300" />
                <span className="mx-3 text-gray-500">OR</span>
                <hr className="w-full border-gray-300" />
              </div>

              {/* Cash on Delivery */}
              <div className="flex items-center justify-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                <ShoppingBag className="text-green-500" />
                <span className="text-gray-800 font-medium">Pay Cash</span>
              </div>
            </div>






            {/* Buttons */}
            <div className="flex justify-end mt-4">
              <NavLink to={"/cart"}>
                <button
                  className="border border-teal-500 text-teal-500 px-4 py-2 rounded mr-2"
                  onClick={() => setShowPaymentSection(false)}
                >
                  Back to Cart
                </button>
              </NavLink>

              <button
                onClick={goToSuccessPage}
                className="bg-teal-500 text-white px-4 py-2 rounded"
              >
                Continue
              </button>
            </div>
          </div>






          {/* Right Section: Price Details & Offers */}
          <div className="col-span-1 space-y-6">
            {/* Price Details */}
            <div className="bg-white rounded  p-6  border border-gray-300">
              <h2 className="font-semibold mb-4">Price Details</h2>
              <div className="space-y-2 text-sm border-t pt-2 p-5 border-gray-300">
                <div className="flex justify-between">
                  <span>Price (3 items)</span>
                  <span>₹1187</span>
                </div>
                <div className="flex justify-between text-green-500">
                  <span>Discount</span>
                  <span>-₹300</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee</span>
                  <span>₹3</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span>
                    <span className="text-gray-400 line-through">₹300</span>
                    <span className="text-green-500 ml-1">Free</span>
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between border-gray-300 font-semibold">
                  <span>Total Amount</span>
                  <span>₹900</span>
                </div>
                <div className="text-green-500 border-t border-gray-300 text-xs">
                  Your total savings on this order ₹600
                </div>
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


            <div className="flex items-center justify-center mt-6 p-4 bg-gray-50 rounded shadow text-sm text-gray-700">
              <svg
                className="w-14 h-10 text-gray-600 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4"
                ></path>
              </svg>
              Safe and Secure Payments. Easy Returns. 100% Authentic Products
              and Services.
            </div>
            <div className="flex items-center justify-center text-sm gap-2">
              <span className="text-gray-600">Need Help? Visit the</span>
              <a href="#" className="text-teal-500">
                Help Center
              </a>
              <span className="text-gray-600">or</span>
              <a href="#" className="text-teal-500">
                Contact Us
              </a>

            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Payment;

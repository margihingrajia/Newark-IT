import React, { useState } from "react";
import EditProfile from "./EditProfile";  // Corrected to default import
import CreditCardManager from "./CreditCardManager";  // Corrected to default import
import ShippingAddressManager from "./ShippingAddressManager";  // Corrected to default import

function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const customerId = 123;  // Example customerId, replace with actual if needed

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "profile" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Edit Profile
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "card" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("card")}
        >
          Credit Cards
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "address" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("address")}
        >
          Shipping Addresses
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        {activeTab === "profile" && <EditProfile customerId={customerId} />}
        {activeTab === "card" && <CreditCardManager />}
        {activeTab === "address" && <ShippingAddressManager />}
      </div>
    </div>
  );
}

export default CustomerDashboard;

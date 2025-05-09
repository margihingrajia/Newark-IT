import React, { useState } from "react";
import axios from "axios";

const PlaceOrder = () => {
  const [orderData, setOrderData] = useState({
    CID: "",
    ProductID: "",
    Quantity: "",
    PriceSold: "",
    CCNumber: "",
    SAName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/placeOrder", orderData)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        alert("Error placing order");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="CID"
        placeholder="Customer ID"
        value={orderData.CID}
        onChange={handleChange}
      />
      <input
        type="text"
        name="ProductID"
        placeholder="Product ID"
        value={orderData.ProductID}
        onChange={handleChange}
      />
      <input
        type="number"
        name="Quantity"
        placeholder="Quantity"
        value={orderData.Quantity}
        onChange={handleChange}
      />
      <input
        type="number"
        name="PriceSold"
        placeholder="Price Sold"
        value={orderData.PriceSold}
        onChange={handleChange}
      />
      <input
        type="text"
        name="CCNumber"
        placeholder="Credit Card Number"
        value={orderData.CCNumber}
        onChange={handleChange}
      />
      <input
        type="text"
        name="SAName"
        placeholder="Shipping Address Name"
        value={orderData.SAName}
        onChange={handleChange}
      />
      <button type="submit">Place Order</button>
    </form>
  );
};

export default PlaceOrder;

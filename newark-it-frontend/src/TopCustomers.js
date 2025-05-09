import React, { useState, useEffect } from "react";
import axios from "axios";

const TopCustomers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/topCustomers")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        alert("Error fetching customers");
      });
  }, []);

  return (
    <div>
      <h3>Top 10 Customers</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Spent</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.FName} {customer.LName}</td>
              <td>${customer.TotalSpent.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopCustomers;

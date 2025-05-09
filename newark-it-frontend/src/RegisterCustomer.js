// RegisterCustomer.js
import React, { useState } from "react";

const RegisterCustomer = () => {
  const [formData, setFormData] = useState({
    FName: "",
    LName: "",
    EMail: "",
    Address: "",
    Phone: "",
    Status: "regular",
    Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      alert(data.message || "Registration successful");
    } catch (err) {
      alert("Registration failed");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Register New Customer</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {["FName", "LName", "EMail", "Address", "Phone"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={formData[field]}
            onChange={handleChange}
            required
            style={styles.input}
          />
        ))}

        <select name="Status" value={formData.Status} onChange={handleChange} style={styles.input}>
          <option value="regular">Regular</option>
          <option value="silver">Silver</option>
          <option value="gold">Gold</option>
          <option value="platinum">Platinum</option>
        </select>

        <input
          type="password"
          name="Password"
          placeholder="Password"
          value={formData.Password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
};

const styles = {
  form: { display: "flex", flexDirection: "column", width: "300px", gap: "10px" },
  input: { padding: "10px", fontSize: "16px" },
  button: { padding: "10px", fontWeight: "bold", backgroundColor: "#2e7d32", color: "white", border: "none", cursor: "pointer" }
};

export default RegisterCustomer;

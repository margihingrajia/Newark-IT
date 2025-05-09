// LoginCustomer.js
import React, { useState } from "react";

const LoginCustomer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ EMail: email, Password: password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Welcome back, ${data.customer.FName}!`);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Login error");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Customer Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  form: { display: "flex", flexDirection: "column", width: "300px", gap: "10px" },
  input: { padding: "10px", fontSize: "16px" },
  button: { padding: "10px", fontWeight: "bold", backgroundColor: "#1976d2", color: "white", border: "none", cursor: "pointer" }
};

export default LoginCustomer;

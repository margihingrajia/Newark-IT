// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RegisterCustomer from "./RegisterCustomer";
import LoginCustomer from "./LoginCustomer";
import PlaceOrder from "./PlaceOrder";
import Statistics from "./Statistics";
import Home from "./Home";
import CustomerDashboard from "./CustomerDashboard"; // <- Import the dashboard

const App = () => {
return (
<Router>
<div style={styles.app}>
<nav style={styles.navbar}>
<h2 style={styles.logo}>Newark-IT</h2>
<ul style={styles.navList}>
<li><Link to="/" style={styles.link}>Home</Link></li>
<li><Link to="/register" style={styles.link}>Register</Link></li>
<li><Link to="/login" style={styles.link}>Login</Link></li>
<li><Link to="/place-order" style={styles.link}>Place Order</Link></li>
<li><Link to="/statistics" style={styles.link}>Statistics</Link></li>
<li><Link to="/dashboard" style={styles.link}>Dashboard</Link></li>
</ul>
</nav>
    <div style={styles.container}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterCustomer />} />
        <Route path="/login" element={<LoginCustomer />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
      </Routes>
    </div>
  </div>
</Router>
);
};

const styles = {
app: {
fontFamily: "Segoe UI, sans-serif",
backgroundColor: "#f9f9f9",
minHeight: "100vh",
},
navbar: {
display: "flex",
justifyContent: "space-between",
backgroundColor: "#1a1a1a",
padding: "12px 24px",
alignItems: "center",
},
logo: {
color: "#ffffff",
fontSize: "24px",
margin: 0,
},
navList: {
listStyle: "none",
display: "flex",
gap: "18px",
margin: 0,
padding: 0,
},
link: {
color: "#ffffff",
textDecoration: "none",
fontWeight: 500,
transition: "color 0.2s",
},
container: {
padding: "30px",
},
};

export default App;
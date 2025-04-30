require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/authRoutes");
const pool = require("./config/db");

app.use(express.json());
app.use("/auth", authRoutes);

(async () => {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log("✅ Connection to MariaDB successful!");
  } catch (error) {
    console.error("❌ Connection error:", error);
  }
})();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

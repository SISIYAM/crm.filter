const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://crm.apars.shop/product/all?uid=xkvyx85Lw3fO3eEND3mNQd3gXVO2"
    );
    const products = response.data.products || [];
    res.render("index", { products });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).send("Server Error");
  }
});

app.get("/filter", async (req, res) => {
  const { product_code, start_date, end_date } = req.query;

  try {
    const transactionsUrl = `https://api.ahmmedimtiaz.com/apars/crm/?start_date=${start_date}&end_date=${end_date}&product_code=${product_code}`;
    const transactionsResponse = await axios.get(transactionsUrl);
    const transactions = transactionsResponse.data;
    res.render("filter", { transactions, product_code, start_date, end_date });
  } catch (error) {
    console.error(
      "Error fetching transactions:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Server Error");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

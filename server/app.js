const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const paypal = require("@paypal/checkout-server-sdk");
const connectDB = require("./db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const Card = require("./card");

// Configure PayPal Environment
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_SECRET
);
const paypalClient = new paypal.core.PayPalHttpClient(environment);

connectDB();

const sampleCardData = [
  {
    id: 1,
    dish: "punjabi",
    imgdata:
      "https://b.zmtcdn.com/data/pictures/9/18857339/8f53919f1175c08cf0f0371b73704f9b_o2_featured_v2.jpg?output-format=webp",
    address: "North Indian, Biryani, Mughlai",
    delimg:
      "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp",
    somedata: " 1175 + order placed from here recently",
    price: 3.5,
    rating: "3.8",
    arrimg:
      "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp",
    qnty: 0,
  },
  {
    id: 2,
    dish: "Jugaadi Adda vadapav",
    imgdata:
      "https://b.zmtcdn.com/data/pictures/chains/5/19295245/089cbcf1d3307542c72f77272556b28b_o2_featured_v2.jpg?output-format=webp",
    address: "Street Food",
    delimg:
      "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp",
    somedata: " 2525 + order placed from here recently",
    price: 0.25,
    rating: "3.9",
    arrimg:
      "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp",
    qnty: 0,
  },
  {
    id: 3,
    dish: "La Milano Pizza",
    imgdata:
      "https://b.zmtcdn.com/data/pictures/chains/1/19708611/10f90d4a69678d98662514d173b29665_o2_featured_v2.jpg",
    address: "Pizza, Fast Food, Pasta",
    delimg:
      "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp",
    somedata: " 650 + order placed from here recently",
    price: 1.5,
    rating: "4.2",
    arrimg:
      "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp",
    qnty: 0,
  },
  {
    id: 4,
    dish: "Momoman Momos",
    imgdata:
      "https://b.zmtcdn.com/data/pictures/chains/1/113401/59f29399060caefcc575d59dc9402ce8_o2_featured_v2.jpg",
    address: "Momos",
    delimg:
      "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp",
    somedata: " 300 + order placed from here recently",
    price: 0.7,
    rating: "3.8",
    arrimg:
      "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp",
    qnty: 0,
  },
  {
    id: 5,
    dish: "Jassi De Parathe",
    imgdata:
      "https://b.zmtcdn.com/data/pictures/chains/5/110225/3978e28854b7496dbef9496546734811_o2_featured_v2.jpg",
    address: "North Indian",
    delimg:
      "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp",
    somedata: "1050 + order placed from here recently",
    price: 2.1,
    rating: "4.0",
    arrimg:
      "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp",
    qnty: 0,
  },
  {
    id: 6,
    dish: "Spring Rolls",
    imgdata:
      "https://b.zmtcdn.com/data/pictures/5/113895/3c06f6fbb8f667a2537dfdb6f060dc8b_o2_featured_v2.jpg",
    address: "Wraps FastFood, Chines",
    delimg:
      "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp",
    somedata: " 1100 + order placed from here recently",
    price: 1,
    rating: "3.8",
    arrimg:
      "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp",
    qnty: 0,
  },
  {
    id: 7,
    dish: "Hocco Eatery",
    imgdata:
      "https://b.zmtcdn.com/data/pictures/chains/5/110155/811c01a5430d50d3260f77917da99e12_o2_featured_v2.jpg",
    address: "North Indian, Fast Food",
    delimg:
      "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp",
    somedata: "500 + order placed from here recently",
    price: 3,
    rating: "3.8",
    arrimg:
      "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp",
    qnty: 0,
  },
  {
    id: 8,
    dish: "Chai Wai",
    imgdata:
      "https://b.zmtcdn.com/data/pictures/3/18514413/0a17b72e9fec52a3ca736f4c2ea3646f_o2_featured_v2.jpg",
    address: "Tea, Coffee, Shake, Beverages",
    delimg:
      "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp",
    somedata: "500 + order placed from here recently",
    price: 1,
    rating: "3.2",
    arrimg:
      "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp",
    qnty: 0,
  },
  {
    id: 9,
    dish: "HL Frankie",
    imgdata:
      "https://b.zmtcdn.com/data/pictures/7/19639627/94c0a4cf15c02d3982d154e2c5dd8cbb_o2_featured_v2.jpg",
    address: "Burger, Sandwich, Fast Food",
    delimg:
      "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp",
    somedata: "2525 + order placed from here recently",
    price: 1,
    rating: "3.8",
    arrimg:
      "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp",
    qnty: 0,
  },
];

app.post("/add-cards", async (req, res) => {
  try {
    // Insert the sample data into the CardsData collection
    const addedCards = await Card.insertMany(sampleCardData);
    res
      .status(201)
      .json({ message: "Data added successfully", data: addedCards });
  } catch (err) {
    console.error("Error adding data:", err);
    res.status(500).send("Error adding data");
  }
});

// Example route to fetch all cards data from the 'cardsData' collection
app.get("/cards", async (req, res) => {
  try {
    const cards = await Card.find(); // Fetch all cards from the database
    res.json(cards); // Send the data as JSON response
    console.log("cards", cards);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("network error");
  }
});

// Stripe Checkout Session Route
app.post("/api/create-checkout-session", async (req, res) => {
  const { products } = req.body;

  const lineItems = products.map((item) => ({
    price_data: {
      currency: "USD",
      product_data: { name: item.name },
      unit_amount: item.price * 100,
    },
    quantity: item.qnty,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });
    res.status(200).json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create Stripe session" });
  }
});

// PayPal Order Route
app.post("/api/create-paypal-order", async (req, res) => {
  const { products } = req.body;

  const totalAmount = products.reduce(
    (acc, product) => acc + product.price * product.qnty,
    0
  );

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: totalAmount.toFixed(2),
        },
      },
    ],
  });

  try {
    const order = await paypalClient.execute(request);
    res.status(200).json({ id: order.result.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create PayPal order" });
  }
});

// PayPal Order Capture Route
app.post("/api/capture-paypal-order", async (req, res) => {
  const { orderId } = req.body;

  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await paypalClient.execute(request);
    res.status(200).json({ status: "success", capture: capture.result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to capture PayPal order" });
  }
});

// Start Server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

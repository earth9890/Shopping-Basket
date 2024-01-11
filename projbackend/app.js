require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// My Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const paymentBRoutes = require("./routes/paymentBRoutes");


//DB Connection
let URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.6rybxxq.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB Connected");
});

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routes

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentBRoutes);



//PORT
const port = process.env.PORT;

app.listen(port, () => {
    
    console.log(`app is running at ${port}`);
    
})


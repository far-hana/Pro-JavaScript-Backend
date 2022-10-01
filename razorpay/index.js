const express = require("express");
const Razorpay = require("razorpay");
const app = express();

app.use(express.static("./public"));
app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("HIIIIII");
// });

app.post("/order", async (req, res) => {
    const amount = req.body.amount;

    var instance = new Razorpay({ 
        key_id: "rzp_test_IHZ4WN3gpdOmLp", 
        key_secret: "fwFz7TldX9eJq6Uxw8GHNioO"
        // these needs to go in .env
    });

    const myorder = await instance.orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt: "receipt#1",
        notes: {
            key1: "value3",
            key2: "value2"
        }
    });

    res.status(200).json({
        success: true,
        amount,
        order: myorder,
    });

});

app.listen(4000, () => console.log(`Server is running at port 4000..`));
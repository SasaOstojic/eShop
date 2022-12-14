
require("dotenv").config()
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to eShop website.')
});

const array = []
const calculateOrderAmount = (items) => {
   
        items.map((item) => {
            const {cartQuantity} = item;
            const quantity = cartQuantity;
            return array.push(quantity)
        })
        const totalAmount = array.reduce((a, b) => {
            return a + b;
        }, 0)
    
    
    return totalAmount * 100
};

app.post('/create-payment-intent', async (req, res) => {
  const {items, shipping, description} = req.body;

  const paymentIntent = await stripe.paymentIntent.create({
    amount: calculateOrderAmount(items),
    currency: 'usd',
    automatic_payment_methods: {
        enabled:true,
    },
    description,
    shipping: {
        address: {
            line1: shipping.line1,
            line2: shipping.line2,
            city: shipping.city,
            country: shipping.country,
            postal_code: shipping.postal_code,
        },
        name: shipping.name,
        phone: shipping.phone
    },
});
  
  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
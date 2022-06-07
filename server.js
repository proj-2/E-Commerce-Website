// import applications
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const stripe = require('stripe')('sk_test_51L717DLeZJfOOS7R9PGEvoW19j7j1a7QeZ2jBQMMWzH4JMwZGWAbZbGBQymhp42JRCKxPCOWfPEYjItul7a9ulgI00ruhiZlhX');

// import other files
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({ helpers })

// set up session
const sess = {
    secret: 'cb3bcxm4w7yrccn428f734',
    cookie: {
        expires: 30 * 60 * 1000
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    })
};

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: '{{PRICE_ID}}',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success.html`,
      cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });
  
    res.redirect(303, session.url);
});

// set up handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session(sess));
app.use(require("./controllers"));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Listening on ${PORT}`))
});
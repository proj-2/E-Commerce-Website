const router = require("express").Router();
const { User, Product, Category, Tag, ShippingProvider, ProductTag } = require("../models");

// import validation function
const validation = require("../utils/validation")
// import nodemailer to send mail
const nodemailer = require('nodemailer');

require('dotenv').config();

// go to my profile page
router.get('/', validation, (req, res) => {
    User.findOne({
        where: {
            id: req.session.user_id
        },
        attributes: ['id', 'first_name', 'last_name', 'currency', 'verified', 'verificationSent']
    })
        .then(userData => {
            let products;
            let verified;
            
            // get user data
            const user = userData.get({ plain: true });
            const verificationSent = user.verificationSent;

            // if there is no verified property in user, user is not verified
            if (user.verified === 0) {
                verified = false;
            }

            // get all the products that belongs to the user
            Product.findAll({
                where: {
                    user_id: req.session.user_id
                },
                attributes: ['id', 'name', 'description', 'price', 'SKU', 'origin', 'category_id', 'user_id', 'shipping_id', 'stock', 'length', 'width', 'height', 'dimension_units', 'weight', 'weight_units'],
                include: [
                    {
                        model: User,
                        attributes: ['id', 'first_name', 'last_name', 'currency', 'verified', 'verificationSent']
                    },
                    {
                        model: Category,
                        attributes: ['id', 'category_name']
                    },
                    {
                        model: ShippingProvider,
                        attributes: ['id', 'shipping_name']
                    },
                    {
                        model: Tag,
                        attributes: ['id', 'name'],
                        through: ProductTag,
                        as: 'tags'
                    }
                ]
            })
                .then(productData => {
                    // get product data
                    products = productData.map(product => product.get({ plain: true }));
                    res.render("profile", { products, verificationSent, verified, loggedIn: true });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// go to list item page
router.get("/list-item", validation, (req, res) => {
    Tag.findAll({
        attributes: ['id', 'name']
    })
        .then(tagData => {
            // get tag data
            const tags = tagData.map(tag => tag.get({ plain: true }));
            res.render("list-item", { tags, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// send dEv Commerce team a message to verify the user
router.post("/verify", validation, (req, res) => {
    User.findOne({
        where: {
            id: req.session.user_id
        },
        attributes: ['id', 'first_name', 'last_name', 'email']
    })
        .then(userData => {
            // get user data
            const user = userData.get({ plain: true });

            // send verification request mail
            async function verificationEmail() {
                // set up transporter to send email
                let transporter = nodemailer.createTransport({
                    host: "smtp-mail.outlook.com",
                    port: 587,
                    secure: false,
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.EMAIL_PW,
                    },
                    tls: {
                        ciphers: 'SSLv3'
                    }
                });

                // send email and get response
                let info = await transporter.sendMail({
                    from: process.env.EMAIL,
                    to: process.env.EMAIL,
                    subject: `${user.first_name} ${user.last_name
                        }, email: ${user.email}`,
                    text: "I would like to verify my account on dEv Commerce.",
                    html: `${req.body.text}`,
                });

                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }
            verificationEmail();
        });
});

module.exports = router;

const router = require("express").Router();
const { User, Product, Category, Tag, ShippingProvider, ProductTag } = require("../models/");

const validation = require("../utils/validation")
const nodemailer = require('nodemailer');
require('dotenv').config();

router.get('/', validation, (req, res) => {
    User.findOne({
        where: {
            id: req.session.user_id
        },
        attributes: ['id', 'first_name', 'last_name', 'currency', 'verified', 'verificationSent']
    })
        .then(userData => {
            let products;
            const user = userData.get({ plain: true });
            let verified;
            if (user.verified === 0) {
                verified = false;
            }
            const verificationSent = user.verificationSent;

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
                    products = productData.map(product => product.get({ plain: true }));
                    res.render("profile", { products, verificationSent, verified, loggedIn: true });
                });

        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
});

router.get("/listItem", validation, (req, res) => {
    Tag.findAll({
        attributes: ['id', 'name']
    })
        .then(tagData => {
            const tags = tagData.map(tag => tag.get({ plain: true }))
            res.render("list-item", { tags, loggedIn: true })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
});


router.post("/verify", validation, (req, res) => {

    async function verificationEmail() {

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

        let info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: "Requesting Account Verification",
            text: "I would like to verify my account on dEv Commerce.",
            html: "I would like to verify my account on dEv Commerce.",
        });

        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
    verificationEmail();
});

module.exports = router
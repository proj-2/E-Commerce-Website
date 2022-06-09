const router = require("express").Router();
const { User, Product, Category, Tag, ShippingProvider, ProductTag } = require("../models/");

const validation = require("../utils/validation")
// const nodemailer = require('nodemailer');
require('dotenv').config();

router.get('/', validation, (req, res) => {
    console.log(req.session)
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
            let products;
            let verified;
            let verificationSent;
            console.log(productData);

            if (productData = []) {
                User.findOne({
                    where: {
                        id: req.session.user_id
                    },
                    attributes: ['id', 'first_name', 'last_name', 'currency', 'verified', 'verificationSent']
                })
                    .then(userData => {
                        const user = userData.get({ plain: true });
                        if (user.verified === 0) {
                            verified = false;
                        }
                        verificationSent = user.verificationSent;
                    });
            } else {
                products = productData.map(product => product.get({ plain: true }));
                verified = products[0].user.verified;
                verificationSent = products[0].user.verificationSent;
            }
            res.render("profile", { products, verificationSent, verified, loggedIn: true });
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


// router.post("/verify", validation, (req, res) => {
//     //verify email params


//     //send email
//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.EMAIL,
//             pass: process.env.EMAIL_PW
//         }
//     });

//     var mailOptions = {
//         from: 'youremail@gmail.com',
//         to: process.env.EMAIL,
//         subject: 'Sending Email using Node.js',
//         text: '<a href="localhost/verify?id=[HASH]&email=user@address.com">Verify</a>'
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });

//     //update user.verificationSent = HASH (random 16bit string)
//     //include string in link ie. localhost/verify?id=[HASH]&email=user@address.com
//     //use params to search db
//     //set verified = true for first found item

// });

module.exports = router
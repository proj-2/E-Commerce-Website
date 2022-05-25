// import applications
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");

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

const path = require("path");
const express = require("express");
const session = require('express-session');
const exphbs = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config();
const sess = {
    secret: 'ncnc48wincto4w8hct4wo',
    cookie: {
        expires: 15 * 60 * 1000
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    })
};
app.use(session(sess));
const helpers = require("./utils/helpers");
// makes all helper functions accessible to handlebars
const hbs = exphbs.create({ helpers })

// makes handlebars the template being used by the app
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// ensures that the CSS and JS files in public are accessisble to use
app.use(express.static(path.join(__dirname, 'public')));

app.use(require("./controllers/"));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Listening on ${PORT}`))
})
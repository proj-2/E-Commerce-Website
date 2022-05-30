const validation = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/')
    } else {
        next();
    }
}

module.exports = validation
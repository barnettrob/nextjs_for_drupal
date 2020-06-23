// ./src/auth-routes.js

const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get('/login',
    passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
    function(req, res) {
        res.redirect('/profile');
    }
);

router.post("/saml/callback", (req, res, next) => {
    passport.authenticate("saml",  (err, user) => {
        console.log("error", err);
        if (err) return next(err);
        if (!user) return res.redirect("/login");
        req.logIn(user, (err) => {
            if (err) return next(err);
            res.redirect("/profile");
        });
    })(req, res, next);
});

router.get("/logout", (req, res) => {
    req.logout();

    const {OKTA_DOMAIN, OKTA_CLIENT_ID, BASE_URL} = process.env;
    res.redirect(`https://${OKTA_DOMAIN}/logout?client_id=${OKTA_CLIENT_ID}&returnTo=${BASE_URL}`);
});

module.exports = router;
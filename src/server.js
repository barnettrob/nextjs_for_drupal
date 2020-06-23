// ./src/server.js

require("dotenv").config();
const express = require("express");
const http = require("http");
const next = require("next");
const session = require("express-session");


const passport = require("passport");
const SamlStrategy = require('passport-saml').Strategy;
const uid = require('uid-safe');
const authRoutes = require("./auth-routes");

const dev = process.env.NODE_ENV !== "production";
const app = next({
    dev,
    dir: "./src"
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    const bodyParser = require('body-parser');
    server.use(bodyParser.urlencoded({ extended: false }));

    // 2 - add session management to Express
    const sessionConfig = {
        secret: uid.sync(18),
        cookie: {
            maxAge: 86400 * 1000 // 24 hours in milliseconds
        },
        resave: false,
        saveUninitialized: true
    };
    server.use(session(sessionConfig));

    // 3 - configuring OktaStrategy
    const oktaStrategy = new SamlStrategy({
            path: process.env.OKTA_CALLBACK_URL,
            entryPoint: process.env.OKTA_ISSUER_URL,
            issuer: 'http://www.okta.com/exks8u5zgxrHFZF4U0h7'
        },
        (profile, done) => {
            user = profile;
            done(null, user);
        }
    );

    // 4 - configuring Passport
    passport.use(oktaStrategy);
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));

    // 5 - adding Passport and authentication routes
    server.use(passport.initialize());
    server.use(passport.session());
    server.use(authRoutes);



    // 6 - you are restricting access to some routes
    const restrictAccess = (req, res, next) => {
        if (!req.isAuthenticated()) return res.redirect("/login");
        next();
    };

    server.use("/profile", restrictAccess);

    // handling everything else with Next.js
    server.get("*", handle);

    http.createServer(server).listen(process.env.PORT, () => {
        console.log(`listening on port ${process.env.PORT}`);
    });
});
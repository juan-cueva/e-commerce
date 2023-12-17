import { Router } from 'express';
import usersModel from '../dao/models/users.js';
import { createHash, isValidPassword } from '../utils.js';
import passport from 'passport';

const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/failregister' }), async (req, res) => {
    res.send({ status: "success", message: "User registered" });
});

router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/faillogin' }), async (req, res) => {
    if (!req.user) return res.status(400).send({ status: "error", error: "Invalid credentials" });
    console.log(req.user);
    if (req.user.email === "adminCoder@coder.com") {
        req.session.user = {
            name: "Admin Coder",
            email: "adminCoder@coder.com",
            role: "admin"
        }
    } else {
        console.log("Problema aqui");
        req.session.user = {
            name: req.user.first_name + ' ' + req.user.last_name,
            email: req.user.email,
            role: "usuario"
        }
    }
    res.status(200).send(
        {
            status: 'success',
            payload: req.user
        }
    )
})

router.post('/logout', async (req, res) => {
    req.session.destroy();
    res.status(200).send(
        {
            status: 'success',
            payload: 'Logout successful'
        });

});

router.get('/failregister', async (req, res) => {
    res.send({ error: "Registration failed" })
});

router.get('/faillogin', async (req, res) => {
    res.send({ error: "Login failed" })
});

router.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] }),
    async (req, res) => { }
);

router.get("/githubcallback", passport.authenticate("github", { failureRedirect: '/' }), (req, res) => {
    req.session.user = {
        name: req.user.first_name + ' ' + req.user.last_name,
        email: req.user.email,
        role: "usuario"
    };
    res.redirect("/products");
});


export default router;
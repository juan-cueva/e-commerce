import { Router } from 'express';
import usersModel from '../dao/models/users.js';
import { createHash, isValidPassword } from '../utils.js';

const router = Router();

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    if(!first_name || !last_name || !email || !age || !password) {
        return res.status(400).send(
            {
                status: 'error',
                payload: 'Missing fields'
            }
        );
    }
    let user = {
        first_name,
        last_name,
        email,
        age,
        password: createHash(password)
    }
    const result = await usersModel.create(user);
    if (result) {
        res.status(200).send(
            {
                status: 'success',
                payload: user
            }
        );
    } else {
        res.status(400).send(
            {
                status: 'error',
                payload: 'User not created'
            }
        );
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).send(
            {
                status: 'error',
                payload: 'Missing fields'
            }
        );
    }
    let user = {
        email,
        password
    }
    
    const result = await usersModel.findOne({ email: user.email});
    if (!result) {
        if (user.email === "adminCoder@coder.com" && user.password === "adminCod3r123") {
            req.session.user = {
                name: "Admin Coder",
                email: "adminCoder@coder.com",
                role: "admin"
            }
            res.status(200).send(
                {
                    status: 'success',
                    payload: 'Login successful'
                }
            );  
        }
        else {
            res.status(400).send(
                {
                    status: 'error',
                    payload: 'Invalid username or password'
                }
            );
        }
    } else {
        console.log(user.password, result.password)
        if(!isValidPassword(result.password, user.password)) {
            return res.status(400).send(
                {
                    status: 'error',
                    payload: 'Invalid username or password'
                }
            );
        }
        let userInfo = {
            name: result.first_name + ' ' + result.last_name,
            email: result.email,
            role: "usuario"
        };
        req.session.user = userInfo;
        res.status(200).send(
            {
                status: 'success',
                payload: userInfo
            }
        );
    }
});

router.post('/logout', async (req, res) => {
    req.session.destroy();
    res.status(200).send(
        {
            status: 'success',
            payload: 'Logout successful'
        });

});

export default router;
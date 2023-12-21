import passport from "passport";
import local from "passport-local";
import usersModel from "../dao/models/users.model.js";
import {CartsDAO} from '../dao/dbManagers/carts.manager.js';
import { createHash, isValidPassword } from "../utils.js";

const cartsDAO = new CartsDAO();

const LocalStrategy = local.Strategy;
const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true, usernameField: 'email'
    }, async (req, email, password, done) => {
        const { first_name, last_name, age } = req.body;
        try {
            let user = await usersModel.findOne({ email: email });
            let newCart = await cartsDAO.create();
            if (user) {
                return done(null, false, { message: 'User already exists' });
            }
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
                cart: newCart._id
            }
            let result = await usersModel.create(newUser)
            return done(null, result)
        } catch (err) {
            return done("Error al obtener el usuario" + err)
        }
    }
    ))

    passport.use("login", new LocalStrategy(
        { usernameField: "email" }, async (email, password, done) => {
            try {
                const user = await usersModel.findOne({ email: email });
                const adminUser = {
                    _id: 1,
                    name: "Admin Coder",
                    email: "adminCoder@coder.com",
                    role: "admin"
                }
                if(!user) {
                    done(null, false)
                }
                if (!user && email == ! "adminCoder@coder.com" && password == ! "adminCod3r123") {
                    done(null, false)
                }
                if (email === "adminCoder@coder.com", password === "adminCod3r123") {
                    return done(null, adminUser)
                }
                console.log(user);
                if (!isValidPassword(user.password, password)) return done(null, false)
                done(null, user)
            } catch (err) {
                return done(err)
            }

        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = usersModel.findById(id)
        done(null, user)
    })
}

export default initializePassport
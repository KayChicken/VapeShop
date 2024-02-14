const { validationResult } = require("express-validator")
const bcrypt = require('bcrypt')
const db = require('../db')
const jwt = require('jsonwebtoken')

class UserController {
    async registration(req,res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }
        const {login, password , email} = req.body
        const findUser = await db.query('SELECT * FROM users WHERE login = $1', [login]);
        if (findUser.rows.length > 0) {
            return res.status(400).json({"message" : "Такой аккаунт уже существует"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const createUser = await db.query('INSERT INTO users (login, passwordHash, email) VALUES ($1, $2, $3) RETURNING *', [login, hashPassword, email]);
        const {passwordhash , ...userData} = createUser.rows[0]
        const token = jwt.sign({
            id : userData.id,
            login : userData.login
        }, 'SECRET_KEY_ERROR_I' , {expiresIn : '30d'})
        const user = {
            ...userData,
            token
        }
        return res.status(200).json(user)
        
        

    }

    async login(req,res) {
        const {login, password} = req.body
        const findUser = await db.query('SELECT * FROM users WHERE login = $1', [login]);
        if (findUser.rows.length <= 0) {
            return res.status(400).json({"message" : "Неверный логин или пароль"})
        }
        const hashPassword = findUser.rows[0].passwordhash
        const isValidPass = await bcrypt.compare(password,hashPassword)
        if (!isValidPass) {
            return res.status(400).json({"message" : "Неверный логин или пароль"}) 
        }
        const {passwordhash , ...userData} = findUser.rows[0]
        const token = jwt.sign({
            id : userData.id,
            login : userData.login
        }, 'SECRET_KEY_ERROR_I', {expiresIn : '30d'})
        const user = {
            ...userData,
            token
        }
        return res.status(200).json(user)
        
    }


    async getMe(req,res) {
        try {
            const findUser = await db.query("SELECT * FROM users WHERE id = $1" , [req.userId])
            const {passwordhash , ...userData} = findUser.rows[0]
            return res.json({
                ...userData
            })
        }


        catch (e) {
            console.log(e)
        }
    }


    async getOneUser(req,res) {

    }

    async updateUser(req,res) {

    }

    async deleteUser(req,res) {

    }
}




module.exports = new UserController()
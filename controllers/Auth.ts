const jwt = require("jsonwebtoken")

const bcrypt= require("bcrypt") 

const uuid = require("uuid")

const UserModel = require ("../models/User")

function login(req,res) {
    const {email, password} = req.body

    UserModel.findOne({email}).then(async response =>{
        if(response?.id){
            const isMatch = await bcrypt.compare(
                password,
                response.password
            )
            if (isMatch) {
                jwt.sign(
                    {
                        user:{
                            role:response.role,
                            id:response.id,
                        },
                    },
                    process.env.SECRET,
                    {
                        expiresIn:"5h"
                    },
                    (err,token)=>{
                        if(err)res.sendStatus(403)
                        else{
                            res.status(200).json({
                                token,
                                user:{
                                    email:response.email,
                                    id:response.id,
                                    name:response.name,
                                    role:response.role
                                },
                            })
                        }
                    }
                )
            }else{
                res.status(401).json({
                    message: "Invalid credentials",
                })
            }
        }else{
            res.status(401).json({
                message:"Invalid credentials"
            })
        }
    })
}

async function register  (req,res) {
    try{
        const {username,password,email,address} =req.body 

        const salt = bcrypt.genSaltSync(10) 
        const hash = await bcrypt.hash(password,salt)

        const data = new UserModel({
            id : uuid.v4(),
            username,
            password : hash,
            email,
            address,
            role : "client",
        })
        data.save()
        res.status(201).json({create : true})
    }catch(error){
        res.status(400).json({
            message : error.message
        })
    }
}

module.exports = {
    login,
    register
}
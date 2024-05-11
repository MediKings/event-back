import { PrismaClient } from "@prisma/client"
import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken"

const prisma = new PrismaClient;

export const signup = async (req, res) => {
    const {firstname, lastname, email, password} = req.body;

    if(!firstname || !lastname || !email || !password) setMessage('Veillez remplir tous les champs')

    const existingEmail = await prisma.user.findFirst({where: {email}})
    if(existingEmail) res.status(500).json("Cette adresse email existe déjà")

    try {
        const user = await prisma.user.create({
            data: {firstname, lastname, email, password: hashSync(password, 10)}
        });
        const token = jwt.sign({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            admin: user.admin,
        }, "dtF0gybhjn7h")
        res.status(200).json({user, token})
    } catch (error) {

    }
}

export const signin = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) setMessage('Veillez remplir tous les champs')

    try {
        const user = await prisma.user.findFirst({where: {email}});
        if(!user) res.status(404).json("Cette adresse email n'existe pas")
        if(!compareSync(password, user.password)) res.status(500).json("Mot de passe incorrect")
        const token = jwt.sign({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            admin: user.admin,
        }, "dtF0gybhjn7h")
        res.status(200).json({user, token})
    } catch (error) {
        
    }
}


export const getUser = async (req, res) => {
    const {id} = req.params
    try {
        const user = await prisma.user.findUnique({where:{id: id}, include: {Event: true, Follow: true}})
            .then(u=>res.json(u))
    } catch (error) {
        res.status(500).json(error)
    }
}

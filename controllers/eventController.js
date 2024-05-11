import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient;

export const createCategory = async (req, res) => {
    const {name} = req.body;

    if(!name) res.status(500).json("Veillez remplir le champ")

    const existingCategory = await prisma.category.findFirst({where: {name}})
    if(existingCategory) res.status(500).json("La categorie existe déjà")

    try {
        const category = await prisma.category.create({data: {name}});
        res.status(200).json(category)
    } catch (error) {
        // res.status(500).json(error)
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany()
            .then(categorie=>res.json(categorie))
    } catch (error) {
        res.status(500).json(error)
    }
}

export const createEvent = async (req, res) => {
    const {authorId, categoryId, title, desc, place, limit, image, startDate, endDate, startHour, endHour} = req.body;

    if(!authorId || !categoryId || !title || !desc || !place || !limit || !image || !startDate || !startHour) {
        res.status(500).json("Veillez remplir tous les champs")
    } else {
        try {
            const event = await prisma.event.create({
                data: {
                    authorId, 
                    categoryId, 
                    title, 
                    desc, 
                    place, 
                    limit,
                    image,
                    startDate, 
                    endDate,
                    startHour, 
                    endHour,
                }
            });
            res.status(200).json(event)
        } catch (error) {
            res.status(500).json(error)
        }
    } 
}

export const getHomeEvents = async (req, res) => {
    try {
        const event = await prisma.event.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {category: true},
            take: 3,
        })
            .then(events=>res.json(events))
    } catch (error) {
        res.status(500).json(err)
    }
}

export const getEvents = async (req, res) => {
    try {
        const event = await prisma.event.findMany({orderBy: {createdAt: 'desc'}, include: {category: true}})
            .then(events=>res.json(events))
    } catch (error) {
        res.status(500).json(err)
    }
}

export const getOneEvent = async (req, res) => {
    const {id} = req.params
    try {
        const event = await prisma.event.findUnique({where:{id: id}, include: {category: true, followers: true}})
            .then(event=>res.json(event))
    } catch (error) {
        res.status(500).json(error)
    }
}

export const followEvent = async (req, res) => {
    const {eventId, authorId} = req.body;
    try {
        const followers = await prisma.follow.create({
            data: {
                authorId,
                eventId,
            },
            
        })
            // .then(follow=>res.json(follow))
        res.status(200).json("Ajouté avec succès")
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getEventByUser = async (req, res) => {
    const {id} = req.params
    try {
        const events = await prisma.event.findMany({
            where: {authorId: id},
            include: {followers: true},
            orderBy: {createdAt: 'desc'},
        })
        res.status(200).json(events)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getFollowedEvent = async (req, res) => {
    const {id} = req.params
    try {
        const events = await prisma.follow.findMany({
            where: {authorId: id},
            include: {author: true, event: true}
        })
        res.status(200).json(events)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const subscribe = async (req, res) => {
    const {email} = req.body;
    try {
        const newEmail = await prisma.newsletter.create({
            data: {email},
        })
        res.status(200).json("Merci d'avoir souscrit!")
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getEmails = async (req, res) => {
    try {
        const emails = await prisma.newsletter.findMany()
        res.status(200).json(emails)
    } catch (error) {
        res.status(500).json(error)
    }
}

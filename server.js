
import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


const app = express();
app.use(express.json());
const users = []

app.post('/users',async(req, res) =>{

    await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    })

    res.status(201).json(req.body);
});
app.get('/users', async (req, res) =>{

    const users = await prisma.user.findMany();
    res.status(200).json(users);
});
app.listen(8082);

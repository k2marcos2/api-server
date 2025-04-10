import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors'

const prisma = new PrismaClient();

const app = express(); 
app.use(express.json());
app.use(cors('http://localhost:5173'));

//Criar dados / ususarios / fazer requeisição POST
app.post('/users', async (req, res) => {
    await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    })
    res.status(201).json(req.body);
})

//Mostrar /dados / usuarios / fazer requeisição GET

app.get('/users', async (req, res) => {

    let users = [];

    if (req.query) { 
        users = await prisma.user.findMany({
            where: {
                name: req.query.name
            }
        })
        return res.status(200).json(users);
    }else{

        const users = await prisma.user.findMany();
        res.status(200).json(users);
    }
});


//Deletar dados dados / ususarios / fazer requeisição PUT
app.put('/users/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }

    })
    res.status(201).json({ messege: 'Usuario atualizado com sucesso!' });
})

//Deletar dados dados 44 / ususarios / fazer requeisição DELETE 
app.put('/users/:id', async (req, res) => {

    await prisma.user.delete({
        where: {
            id: req.params.id
        },
        
    })
    res.status(201).json({ messege: 'Usuario atualizado com sucesso!' });
})

//ip 127.0.0.1:8082
app.listen(8082);
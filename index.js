import express from 'express'
import mongoose from 'mongoose';
import authRouter from './routes/authRouter.js'
import dataRouter from './routes/dataRouter.js'
import FeaturedEvent from './models/featuredevents.js';
import cors from 'cors';
import newevent from './models/newevents.js';
import bodyParser from 'body-parser';
import userModel from './models/users.js';

import dotenv from 'dotenv';
dotenv.config();

const port = 5000;
const mongo_url = process.env.mongo_url
const app = express();
app.use(express.json({ limit: '10mb' })); // Set a larger limit for JSON payload
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Set a larger limit for URL-encoded payloads

app.use(cors({
    origin: process.env.frontend_url, // Allow requests from this origin
}));
app.use(bodyParser.json())
app.use('/auth',authRouter)
app.use('/home',dataRouter)

app.get('/', async (req, res)=>{
    try {
        let events = await FeaturedEvent.find({});
        return res.status(200).json({
            length: events.length,
            events: events,
        });
    } catch (error) {
        console.log(error);
        res.status(404).send("Page not found")
    }
})

app.get('/events/by_id/:id', async (req,res)=>{
    try {
        const {id} = req.params
        const event = await newevent.findById(id);
        return res.status(200).json({events:event})

    } catch (error) {
        console.log(error);
        res.status(404).send("page not found")
    }
})

app.get('/events/by_type/:type/:city', async (req,res)=>{
    try {
        const { type, city } = req.params;
        let filter = {};

        if (type !== 'all') {
            filter.type = type;
        }
        if (city !== 'all') {
            filter.location = city;
        }
        const event = await newevent.find(filter);
        return res.status(200).json({
            length: event.length,
            events: event
        })

    } catch (error) {
        console.log(error);
        res.status(404).send("page not found")
    }
})

app.get('/:organized_by', async (req,res)=>{
    try {
        const { organized_by } = req.params;
        const event = await newevent.find({organized_by: organized_by});
        // console.log(event)
        return res.status(200).json({
            length: event.length,
            events: event
        })

    } catch (error) {
        console.log(error);
        res.status(404).send("page not found")
    }
})

app.post('/host', async (req, res) => {
    try {
        let createevent = {
            title: req.body.title,
            venue: req.body.venue,
            location: req.body.location,
            type: req.body.type,
            fee: Number(req.body.fee),
            prize: Number(req.body.prize),
            registration: req.body.registration,
            eventdate: req.body.eventdate,
            creation: new Date(),
            organized_by: req.body.organized_by,
            image: req.body.image,
            description: req.body.description,
            contact: req.body.contact
        }

        let event = await newevent.create(createevent)
        // console.log("creation");
        
        return res.status(200).send(event)

    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
})

app.put('/feedback/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const { incrementValue } = req.body; // Get the increment value from the request body

        // Validate that incrementValue is a number and greater than 0
        if (typeof incrementValue !== 'number' || incrementValue <= 0) {
            return res.status(400).send("Invalid increment value. It must be a positive number.");
        }

        // Find the user and update their rating and rating_count
        const user = await userModel.findOneAndUpdate(
            { username: username }, // Filter to find the user
            {
                $inc: {
                    rating: incrementValue, // Increment the rating by the provided value
                    rating_count: 1          
                }
            },
            { new: true } 
        );

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.status(200).json({ message: "Feedback updated successfully", user });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
});

app.get('/view_profile/:username', async(req,res)=>{
    try {
        const {username} = req.params;
        // console.log(username);
        
        const user = await userModel.find({username: username})
        // console.log(user);
        
        return res.status(200).json({
            success: true,
            user: user
        })
    } catch (error) {
        console.log(error);
        
        res.status(404).send('Nai Mila')
    }
})


mongoose.connect(mongo_url).then(() => {
    console.log("Connection done");
    app.listen(port, () => {
        console.log("Server is on");
    })
}).catch((error) => {
    console.log(error);
})
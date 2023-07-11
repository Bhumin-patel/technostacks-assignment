const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

let brightness = 0;

//SingIn
app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

//Login
app.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

//Brightness Control
app.post('users/brightness',auth, async (req,res) =>{
    try{
        const brightness = 0;

        io.on('connection', (socket) => {
            console.log('New WebSocket connection')
        
            socket.emit('brightnessUpdated', brightness)
        
            socket.on('increment', () => {
                brightness++
                socket.broadcast.emit('brightnessUpdated', brightness)
            })
        
            socket.on('decrement', () => {
                brightness--
                socket.broadcast.emit('brightnessUpdated', brightness)
            })
        })
    } catch (e){
        res.status(400).send()
    }
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})
// console.log("run test success"); 

const express = require('express'); 
const shortid = require('shortid'); 


const server = express();
//Add ability to read the body of a request as JSON 
server.use(express.json());

//Create one user for test and to define schema 
let users = [
    { id: shortid.generate(), name: "Joe", bio: "OG user" },
    { id: shortid.generate(), name: "Maricela", bio: "number two user" }
];

//helper functions to interact with users table 
const User = {
    getAll() {
        return users;
    }, 
    getById(id) {
        return users.find(u => u.id === id )
    }, 
    createNew(user) { 
        const newUser = { id: shortid.generate(), ...user};
        users.push(newUser); 
        return newUser;  
    }
};

//endpoints 
server.post('/api/users', (req, res) => {
    const userFromClient = req.body; 
    if (!userFromClient.name || !userFromClient.bio) {
        res.status(400).json({ message: 'name and bio required!' });
    } else {
        const newleyCreatedUser = User.createNew(userFromClient)
        res.status(201).json(newleyCreatedUser); 
    }
});

server.get('/api/users', (req, res) => {
    // 1 - Gather infro from the request object 
    // 2 - Interact with DB
    const users = User.getAll(); 
    // 3 - Sent appropriate responce to client 
    res.status(200).json(users); 
})

server.get('/api/users/:id', (req, res) => {
    //Pull id from url params 
    const { id } = req.params;
    const user = User.getById(id); 
    if (user) {
        res.status(200).json(user); 
    } else { 
        res.status(400).json({ message: `user not found with id of ${id}` });
    }
});
//catchall enpoint 
server.use('*', (req, res) => {
    res.status(404).json({ message: 'not found' })
});

server.listen(5000, () => {
    console.log('listening on port 5000');
});

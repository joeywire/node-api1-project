// console.log("run test success"); 

const express = require('express'); 
const shortid = require('shortid'); 


const server = express();
//Add ability to read the body of a request as JSON 
server.use(express.json());

//Create one user for test and to define schema 
let users = [{ id: shortid.generate(), name: "Joe", bio: "OG user"}];

//helper functions to interact with users table 
const User = {
    getAll() {
        return users;
    }
};

//endpoints 

server.get('/api/users', (req, res) => {
    // 1 - Gather infro from the request object 
    // 2 - Interact with DB
    const users = User.getAll(); 
    // 3 - Sent appropriate responce to client 
    res.status(200).json(users); 
})

//catchall enpoint 
server.use('*', (req, res) => {
    res.status(404).json({ message: 'not found' })
});

server.listen(5000, () => {
    console.log('listening on port 5000');
});

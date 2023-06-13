const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Simple node server running');
});

app.use(cors());
app.use(express.json());

// username: dbusercomment 
//password: 6omsAJKuXriNDCnh

//---------------------------Mongo db---------------------------------//



const uri = "mongodb+srv://dbusercomment:6omsAJKuXriNDCnh@cluster0.d00iw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     const collection = client.db("azad-fruit-shop").collection("comments");
//     // perform actions on the collection object
//     console.log('database connected');
//     client.close();
// });

// async function run() {
//     try {
//         const commentCollection = client.db("azad-fruit-shop").collection('comments');
//         app.get('/comment', async (req, res) => {
//             const cursor = commentCollection.find({});
//             const comments = await cursor.toArray();
//             res.send(comments);
//         });
//         app.post('/comment', async (req, res) => {
//             console.log('post api called');
//             const comment = req.body;
//             const result = await commentCollection.insertOne(comment);
//             console.log(result);
//             comment._id = result.insertedId;

//             res.send(comment);
//         });

//     }
//     finally {

//     }
// }
// run().catch(err => console.log(err))

async function run() {
    try {
        const serviceCollection = client.db("azad-fruit-shop").collection('services');
        const commentCollection = client.db("azad-fruit-shop").collection('comments');
        const userCollection = client.db("azad-fruit-shop").collection('users');
        const postCollection = client.db("azad-fruit-shop").collection('posts');
        const ratingCollection = client.db("azad-fruit-shop").collection('rating');


        //------------------services-----------------------------------//
        app.get('/services', async (req, res) => {
            const cursor = serviceCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        });

        //------------------------------comment---------------------//
        app.get('/comment', async (req, res) => {
            const cursor = commentCollection.find({});
            const comments = await cursor.toArray();
            res.send(comments);
        });
        app.post('/comment', async (req, res) => {
            console.log('post api called');
            const comment = req.body;
            const result = await commentCollection.insertOne(comment);
            console.log(result);
            comment._id = result.insertedId;

            res.send(comment);
        });
        //----------------------------------all user----------------------//  

        app.get('/user', async (req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        });
        app.post('/user', async (req, res) => {
            // console.log('post api called');
            const user = req.body;

            const result = await userCollection.insertOne(user);
            console.log(result);
            user._id = result.insertedId;

            res.send(user);
        });

        //----------------------------------posts-----------------------//
        app.get('/post', async (req, res) => {
            const cursor = postCollection.find({});
            const posts = await cursor.toArray();
            res.send(posts);
        });
        app.post('/post', async (req, res) => {
            // console.log('post api called');
            const post = req.body;

            const result = await postCollection.insertOne(post);
            console.log(result);
            post._id = result.insertedId;

            res.send(post);
        });

        //-------------rating----------------------------------------------//
        app.get('/rating', async (req, res) => {
            const cursor = ratingCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        });
        app.post('/rating', async (req, res) => {
            // console.log('post api called');
            const user = req.body;

            const result = await ratingCollection.insertOne(user);
            console.log(result);
            user._id = result.insertedId;

            res.send(user);
        });

    }
    finally {

    }
}
run().catch(err => console.log(err))

// async function run() {
//     try {
//         const userCollection = client.db("azad-fruit-shop").collection('users');

//         // app.get('/user', async (req, res) => {
//         //     const cursor = userCollection.find({});
//         //     const users = await cursor.toArray();
//         //     res.send(users);
//         // });
//         app.post('/user', async (req, res) => {
//             // console.log('post api called');
//             const user = req.body;

//             const result = await userCollection.insertOne(user);
//             console.log(result);
//             user._id = result.insertedId;

//             res.send(user);
//         });

//     }
//     finally {

//     }
// }
// run().catch(err => console.log(err))

app.listen(port, () => {
    console.log(`simple node running on port ${port}`);
})

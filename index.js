const express = require('express');
const cors = require('cors');
// const teachableMachine = require("@sashido/teachablemachine-node");
const teachableMachine = require("@sashido/teachablemachine-node")
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


async function run() {

    try {
        const model = new teachableMachine({
            modelUrl: "https://teachablemachine.withgoogle.com/models/AokBBWx0A/",
        });

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


        //-----------------------classification------------------//
        app.post("/classification", async (req, res) => {
            const url = req.body.url;
            // const url = req.body.imgData.url
            console.log(url);

            return await model
                .classify({
                    imageUrl: url,
                })
                .then((predictions) => {
                    console.log(predictions);
                    return res.send(predictions);
                })
                .catch((e) => {
                    console.error(e);
                    res.status(500).send("Something went wrong!");
                });
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

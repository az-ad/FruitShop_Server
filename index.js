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

async function run() {
    try {
        const commentCollection = client.db("azad-fruit-shop").collection('comments');
        // const comment = { name: 'mahi', content: 'very good' }
        // const result = await commentCollection.insertOne(comment);
        // console.log(result);
        app.get('/comment', async (req, res) => {
            const cursor = commentCollection.find({});
            const comments = await cursor.toArray();
            res.send(comments);
        });
        app.post('/comment', async (req, res) => {
            // console.log('post api called');
            const comment = req.body;
            //const result = await commentCollection.insertOne(comment);
            //comment.name = comments.length + 1;
            // comments.push(comment);
            // console.log(req.body);
            //console.log(comment);
            const result = await commentCollection.insertOne(comment);
            console.log(result);
            comment._id = result.insertedId;

            res.send(comment);
        });

    }
    finally {

    }
}
run().catch(err => console.log(err))

async function run() {
    try {
        const serviceCollection = client.db("azad-fruit-shop").collection('services');

        app.get('/services', async (req, res) => {
            const cursor = serviceCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        });


    }
    finally {

    }
}


run().catch(err => console.log(err))


app.listen(port, () => {
    console.log(`simple node running on port ${port}`);
})

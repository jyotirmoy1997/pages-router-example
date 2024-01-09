import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email } = req.body;

        try {
            const client = await MongoClient.connect(process.env.MONGO_URI);
            const db = client.db('events');
            
            await db.collection('emails').insertOne({ email });

            client.close();
            
            return res.status(201).json({ msg: "OK" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

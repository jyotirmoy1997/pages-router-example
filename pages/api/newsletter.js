import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email } = req.body;

        try {
            const client = await MongoClient.connect("mongodb+srv://dosjoehan1997:fwyqf81unG40TeX4@cluster0.pkfeb8q.mongodb.net/newsletter?retryWrites=true&w=majority");
            const db = client.db('events');
            
            await db.collection('emails').insertOne({ email });

            client.close();
            
            return res.status(201).json({ msg: "OK" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

import { MongoClient } from 'mongodb';


export default async function handler(req, res){
    if(req.method === "POST"){
        const { email, name, comment} = req.body
        const eventId = req.query.eventId
        const newComment = {email, name, comment, eventId}
        try {
            const client = await MongoClient.connect("mongodb+srv://dosjoehan1997:fwyqf81unG40TeX4@cluster0.pkfeb8q.mongodb.net/events?retryWrites=true&w=majority");
            const db = client.db('events');
            
            const result = await db.collection('comments').insertOne({ newComment });
            console.log(result)

            client.close();
            
            return res.status(201).json({ msg: "OK" });
        } 
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    else if(req.method === "GET"){
        try {
            const client = await MongoClient.connect("mongodb+srv://dosjoehan1997:fwyqf81unG40TeX4@cluster0.pkfeb8q.mongodb.net/events?retryWrites=true&w=majority");
            const db = client.db('events');
            
            const result = await db.collection('comments').find().toArray();
            console.log(result);

            client.close();
            
            return res.status(200).json({ result : result });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
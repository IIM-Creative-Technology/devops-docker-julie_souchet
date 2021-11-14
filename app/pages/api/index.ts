// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect, model, models, Schema } from 'mongoose';

connect(`mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/db`);

type Data = { count: number }
type ErrorResponse = { error: string }

const counterSchema = new Schema<Data>({count: Number});
const CounterModel = models.Counter || model<Data>('Counter', counterSchema);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
) {
  switch (req.method) {
    case "POST": {
      try {
        const {count} = req.body;
        const counter = new CounterModel({count: parseInt(count)});
        await counter.save();
        console.log(`count: ${count}`);
        res.status(200).json({count});
        return;
      } catch (e) {
        res.status(400).json({error: "error"});
      }
    }
    case "GET": {
      try {
        const counter = await CounterModel.findOne().exec();
        res.status(200).json({count: counter?.count || 0})
        return;
      } catch (e) {
        res.status(500).json({error: "could not read counter"});
      }
    }
    default:
      res.status(501).json({error: "Method not allowed"});
  }
}

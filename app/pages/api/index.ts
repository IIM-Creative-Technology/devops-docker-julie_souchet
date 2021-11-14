// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';

mongoose.connect(`mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/db`);

type Data = { count: number } | { error: string }

let counter = 0;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | null>
) {
  switch (req.method) {
    case "POST":
      try {
        const {count} = req.body;
        counter = parseInt(count);
        console.log(`count: ${count}`);
        res.status(200).json({ count });
      } catch (e) {
        res.status(400).json({ error: "Count missing" });
      }
      return;
    case "GET":
      res.status(200).json({ count: counter })
      return;
    default:
      res.status(501).send(null);
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { upload } from "./crust";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).send({ message: `${req.method} not allowed` });
        return;
    }
    const ipfsdata = req.body;

    try {
        const { crustRes } = await upload(ipfsdata.cid, ipfsdata.size);
        res.status(200).json({ crustResponse: crustRes });
    } catch (err) {
        res.status(500).json({
            msg: "upload to CRUST failed",
            error: err.message,
        });
    }
}

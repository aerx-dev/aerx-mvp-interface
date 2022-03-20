// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { upload } from "./crust";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).send({ message: `${req.method} not allowed` });
        return;
    }
    const ipfsdata = req.body;

    try {
        const { hash, uri } = await upload(ipfsdata.cid, ipfsdata.size);
        res.status(200).json({ cid: hash, uri: uri });
    } catch (err) {
        res.status(500).json({ msg: "upload failed", error: err.message });
    }
}

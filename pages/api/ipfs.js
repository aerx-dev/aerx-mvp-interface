// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { upload } from "./crust";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "GET not allowed" });
    return;
  }
  const metadata = JSON.stringify(req.body);

  try {
    const { hash, uri } = await upload(metadata);
    res.status(200).json({ cid: hash, uri: uri });
  } catch (err) {
    res.status(500).json({ msg: "upload failed", error: err.message });
  }
}

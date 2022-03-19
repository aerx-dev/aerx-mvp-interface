// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { upload } from "./crust";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "GET not allowed" });
    return;
  }
  const metadata = JSON.stringify(req.body);

  try {
    const { crustRes } = await upload(metadata);
    res.status(200).json({ crustResponse: crustRes });
  } catch (err) {
    res.status(500).json({ msg: "upload to CRUST failed", error: err.message });
  }
}

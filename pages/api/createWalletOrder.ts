import type { NextApiRequest, NextApiResponse } from "next";
import { createWalletOrder } from "../../lib/wyre";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405).end();

  const walletOrder: any = await createWalletOrder();

  res.json({ status: "success", data: walletOrder });
};

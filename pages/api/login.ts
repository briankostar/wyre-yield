import { Magic } from "@magic-sdk/admin";
import Iron from "@hapi/iron";
import CookieService from "../../lib/cookie";
import { createAccount, createWallet, getWallet } from "../../lib/wyre";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

export default async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  const did = req.headers.authorization.split("Bearer").pop().trim();
  const magicUser = await new Magic(
    process.env.MAGIC_SECRET_KEY
  ).users.getMetadataByToken(did);

  console.log("magicUser", magicUser);

  await dbConnect();

  const { email } = magicUser;

  const user = await User.findOne({ email });
  console.log("found user", user);

  if (user) {
    const wallet = await getWallet(user.wyreWallet);
    res.json({ status: "success", data: { account: user, wallet } });
  } else {
    const wyreAccount = await createAccount(email);
    const wyreWallet = await createWallet(email, wyreAccount);

    const newUser = await User.create({ email, wyreAccount, wyreWallet });
    console.log("newUser: ", newUser, email, wyreAccount, wyreWallet);

    const wallet = await getWallet(newUser.wyreWallet);

    res.json({ status: "success", data: { account: newUser, wallet } });
  }

  // Author a couple of cookies to persist a user's session
  // const token = await Iron.seal(
  //   user,
  //   process.env.ENCRYPTION_SECRET,
  //   Iron.defaults
  // );
  // CookieService.setTokenCookie(res, token);

  // res.end();
};

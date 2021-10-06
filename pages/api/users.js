import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        console.log("New user:", req.body);
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

// import Iron from "@hapi/iron";
// import CookieService from "../../lib/cookie";

// export default async (req, res) => {
//   let user;
//   try {
//     user = await Iron.unseal(
//       CookieService.getAuthToken(req.cookies),
//       process.env.ENCRYPTION_SECRET,
//       Iron.defaults
//     );
//   } catch (error) {
//     res.status(401).end();
//   }

//   // now we have access to the data inside of user
//   // and we could make database calls or just send back what we have
//   // in the token.

//   res.json(user);
// };

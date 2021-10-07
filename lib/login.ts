import axios from "axios";
import { Magic } from "magic-sdk";

export async function login(email: string) {
  const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY);
  const did = await magic.auth.loginWithMagicLink({
    email,
  });

  const config = {
    headers: { Authorization: `Bearer ${did}` },
  };
  return axios
    .post("/api/login", {}, config)
    .then((res) => {
      console.log("Success loggin in");
      return res;
    })
    .catch((err) => {
      console.log("Error loggin in", err);
    });
}

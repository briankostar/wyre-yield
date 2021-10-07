import { Magic } from "magic-sdk";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { login } from "../lib/login";
import { AppContext } from "../pages/_app";

function fetcher(route) {
  /* our token cookie gets sent with this request */
  return fetch(route)
    .then((r) => r.ok && r.json())
    .then((user) => user || null);
}

export default async function useAuth() {
  const router = useRouter();
  const [app, setApp] = React.useContext(AppContext);
  const magic: any = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY);
  const loggedIn = await magic.user.isLoggedIn();

  if (loggedIn) {
    if (!app?.account) {
      const magicUser = await magic.user.getMetadata();
      const response: any = await login(magicUser.email);

      setApp(response.data.data);
    }
  } else {
    router.push("/login");
  }
}

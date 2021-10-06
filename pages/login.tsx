import React from "react";
import { useRouter } from "next/router";
import { Magic } from "magic-sdk";
import Link from "next/link";
import axios from "axios";
import { AppContext } from "./_app";

export default function Login() {
  const router = useRouter();
  const [app, setApp] = React.useContext(AppContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { elements } = event.target;

    const did = await new Magic(
      process.env.NEXT_PUBLIC_MAGIC_PUB_KEY
    ).auth.loginWithMagicLink({ email: elements.email.value });

    console.log("did", did);

    const config = {
      headers: { Authorization: `Bearer ${did}` },
    };
    const response: any = await axios.post("/api/login", {}, config);
    console.log("response", response);

    setApp(response.data.data);

    if (response.status === 200) {
      router.push("/dashboard");
    } else {
      /* handle errors */
      console.log("Error logging in!", response);
    }
  };

  return (
    <div>
      <nav className="flex items-center justify-between align-middle flex-wrap bg-gradient-to-r from-green-400 to-blue-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link href="/">
            <span className="font-semibold text-xl tracking-tight cursor-pointer">
              Thresholds.io
            </span>
          </Link>
        </div>
      </nav>

      <div className="w-full max-w-xs mx-auto mt-16">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="yourname@domain.com"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="text-center text-gray-500 text-xs">
          &copy;2021 Thresholdz Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}

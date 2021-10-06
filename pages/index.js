import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head></Head>
      <nav className="flex items-center justify-between align-middle flex-wrap bg-gradient-to-r from-green-400 to-blue-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link href="/">
            <span className="font-semibold text-xl tracking-tight cursor-pointer">
              Thresholds.io
            </span>
          </Link>
        </div>

        <div>
          <Link href="/login">
            <div className="text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white">
              Login
            </div>
          </Link>
        </div>
      </nav>
      <div className="mt-16 text-2xl text-center">
        Welcome to Thresholds <br /> Easiest way to stake crypto
      </div>
    </>
  );
}

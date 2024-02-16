import Providers from "@/providers";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>IXChat</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
        <meta charSet="UTF-8" />
        <meta name="author" content="Cleiton Salvagni" />
        <meta name="robots" content="index" />
      </Head>

      <Providers>
        <Component {...pageProps} />
      </Providers>
    </>
  );
}

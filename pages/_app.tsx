import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../lib/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout state={false}>
      <Component {...pageProps} />
    </Layout>
  );
}

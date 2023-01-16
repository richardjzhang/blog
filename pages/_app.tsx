import "styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "components/Layout";
import { Josefin_Sans, Permanent_Marker } from "@next/font/google";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-josefin-sans",
});

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-permanent-marker",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${josefinSans.variable} ${permanentMarker.variable}`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

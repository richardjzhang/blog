import { Montserrat, Permanent_Marker, Varela_Round } from "@next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat",
});

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-permanent-marker",
});

const varelaRound = Varela_Round({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-varela-round",
});

export { montserrat, permanentMarker, varelaRound };

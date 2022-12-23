import Header from "components/Header";
import { montserrat, permanentMarker, varelaRound } from "utils/fonts";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <main
      className={`${montserrat.variable} ${permanentMarker.variable} ${varelaRound.variable} px-5 py-10 h-screen overflow-auto bg-zinc-900`}
    >
      <div className="mx-auto max-w-2xl">
        <Header />
        <div className="mt-20">{children}</div>
      </div>
    </main>
  );
}

import Header from "components/Header";
import Footer from "components/Footer";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="px-5 pt-10 h-screen overflow-auto bg-zinc-900 flex flex-col">
      <div className="mx-auto mb-20 max-w-4xl flex-1 w-full">
        <Header />
        <main className="mt-14">{children}</main>
      </div>
      <Footer />
    </div>
  );
}

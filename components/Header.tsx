import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const isHome = router.pathname === "/";
  const headerSize = isHome ? "text-4xl" : "text-2xl";
  const headerColor = isHome ? "text-indigo-400" : "text-yellow-300";
  return (
    <Link href="/">
      <h1 className={`${headerSize} ${headerColor} font-header`}>
        Ramblings and Musings
      </h1>
    </Link>
  );
}

import Link from "next/link";
import { useRouter } from "next/router";

export default function CustomLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const currentPath = router.pathname;
  return (
    <Link
      className={`p-2 font-body text-yellow-300 uppercase text-sm font-bold ${
        currentPath === href ? "rounded bg-slate-800" : ""
      }`}
      href={href}
    >
      {children}
    </Link>
  );
}

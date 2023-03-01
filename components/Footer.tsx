import Link from "next/link";

export default function Footer() {
  return (
    <footer className="-mx-5 px-5 pt-8 pb-14 border-t border-slate-600 bg-slate-800">
      <div className="mx-auto max-w-4xl flex justify-between font-body text-gray-200 ">
        <div className="flex space-x-3">
          <Link href="/">Home</Link>
          <Link href="/posts">Posts</Link>
          <Link href="/rss/feed.xml">RSS</Link>
        </div>
        <div className="ml-4 text-right">
          © {new Date().getFullYear()} Richard Zhang. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

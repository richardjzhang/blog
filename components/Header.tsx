import CustomLink from "components/Link";

export default function Header() {
  return (
    <header className="flex space-x-4">
      <CustomLink href="/">Home</CustomLink>
      <CustomLink href="/posts">Posts</CustomLink>
    </header>
  );
}

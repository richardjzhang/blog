import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rangeParser from "parse-numeric-range";
import Link from "next/link";

// Todo: Convert to Typescript
export default function Markdown({ children }) {
  return (
    <div className="prose max-w-none mt-10">
      <ReactMarkdown
        className="markdown"
        components={{
          a: (props) => (
            <Link href={props.href} target="_blank">
              {props.children}
            </Link>
          ),
          p: (props) => {
            const { node, children } = props;
            if (node.children[0].tagName === "img") {
              const image = node.children[0];
              const metastring = image.properties.alt;
              const alt = metastring?.replace(/ *\{[^)]*\} */g, "");
              const src = `https:${image.properties.src}`;
              return (
                <p className="h-60 relative sm:h-96">
                  <Image className="object-contain" src={src} alt={alt} fill />
                </p>
              );
            }
            return <p>{children}</p>;
          },
          hr: () => (
            <div className="w-full flex space-x-4 justify-center text-4xl text-gray-400">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          ),
          code({ node, inline, className, children }) {
            const match = /language-(\w+)/.exec(className || "");
            const hasMeta = node?.data?.meta;

            return inline || !match ? (
              <code>{children}</code>
            ) : (
              <SyntaxHighlighter
                style={dracula}
                language={match[1]}
                PreTag="div"
                showLineNumbers
                wrapLines
                lineProps={(lineNumber) => {
                  const style = {
                    display: "block",
                    minWidth: "fit-content",
                  };

                  if (hasMeta) {
                    const RE = /{([\d,-]+)}/;
                    const metadata = node.data.meta.replace(/\s/g, "");
                    const strlineNumbers = RE?.test(metadata)
                      ? RE?.exec(metadata)[1]
                      : "0";
                    const highlightLines = rangeParser(strlineNumbers);
                    if (highlightLines.includes(lineNumber)) {
                      style.backgroundColor = "rgb(71 85 105)";
                    }
                  }

                  return { style };
                }}
              >
                {children}
              </SyntaxHighlighter>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

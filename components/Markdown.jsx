import Image from "next/image";
import ReactMarkdown from "react-markdown";

// Todo: Convert to Typescript
export default function Markdown({ children }) {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        className="markdown"
        components={{
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
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

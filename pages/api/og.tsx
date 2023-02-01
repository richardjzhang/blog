import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

// Make sure the font exists in the specified path:
const font = fetch(
  new URL("../../assets/JosefinSans-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function (req: NextRequest) {
  const fontData = await font;
  try {
    const { searchParams } = new URL(req.url);
    const hasTitle = searchParams.has("title");
    const title = hasTitle ? searchParams.get("title") : "My default title";
    const hasSpoiler = searchParams.has("spoiler");
    const hasDate = searchParams.has("publishDate");
    const publishDate = hasDate
      ? searchParams.get("publishDate")
      : new Date().toLocaleDateString();

    return new ImageResponse(
      (
        <div
          tw="p-6 h-full w-full flex justify-center items-center"
          style={{
            background:
              "linear-gradient(133deg, rgb(6, 182, 212) 0%, rgb(59, 130, 246) 45%, rgb(168, 85, 247) 100%)",
            fontFamily: '"Josefin-Sans"',
          }}
        >
          <div tw="rounded p-10 bg-zinc-900 h-full w-full flex flex-col">
            <div tw="h-full flex flex-col">
              <div tw="mt-10 mb-3 flex items-center">
                <img
                  width="84"
                  height="84"
                  src={`${process.env.WEBSITE_URL}/profile-pic.png`}
                  tw="border-2 border-white rounded-full"
                />
                {/* <div tw="ml-4 text-4xl text-gray-200">Richard Zhang</div> */}
              </div>
              <div tw="mt-16 text-6xl leading-normal text-gray-200">
                {title}
              </div>
              {hasSpoiler && (
                <div tw="mt-5 text-3xl text-gray-300">
                  {searchParams.get("spoiler")}
                </div>
              )}
              <div tw="mt-5 text-xl flex items-center text-gray-300">
                <div>richardjzhang.com</div>
                <div tw="-mt-2 ml-3">.</div>
                <div tw="ml-3">{publishDate}</div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Josefin-Sans",
            data: fontData,
            style: "normal",
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

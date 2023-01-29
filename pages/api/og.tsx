import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

// Make sure the font exists in the specified path:
const font = fetch(
  new URL("../../assets/PermanentMarker-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function (req: NextRequest) {
  const fontData = await font;
  try {
    const { searchParams } = new URL(req.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "My default title";

    return new ImageResponse(
      (
        <div tw="bg-zinc-900 h-full w-full flex justify-center items-center">
          <div tw="flex flex-col max-w-4xl">
            <div tw="mb-3 flex items-center">
              <img
                width="84"
                height="84"
                src={`${process.env.WEBSITE_URL}/profile-pic.png`}
                tw="border-2 border-white rounded-full"
              />
              <div tw="ml-4 text-2xl text-gray-200">Richard Zhang</div>
            </div>
            <div
              style={{
                fontFamily: '"PermanentMarker"',
              }}
              tw="text-5xl text-indigo-500"
            >
              {title}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "PermanentMarker",
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

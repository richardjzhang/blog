import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

// Make sure the font exists in the specified path:
const font = fetch(
  new URL("../../assets/JosefinSans-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const fontData = await font;
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "My default title";
    const description =
      searchParams.get("description") || "My default description";
    const publishDate =
      searchParams.get("publishDate") || new Date().toLocaleDateString();

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
            <div tw="mt-10 mb-3 flex items-center">
              <img
                width="84"
                height="84"
                src={`${process.env.WEBSITE_URL}/profile-pic.png`}
                tw="border-2 border-white rounded-full"
              />
            </div>
            <div tw="mt-16 flex text-6xl leading-normal text-gray-200">
              {title}
            </div>
            <div tw="mt-5 flex text-3xl text-gray-300">{description}</div>
            <div tw="mt-5 flex items-center text-xl text-gray-300">
              <div>richardjzhang.com</div>
              <div tw="-mt-2 ml-3">.</div>
              <div tw="ml-3">{publishDate}</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "JosefinSans-Regular",
            data: fontData,
            style: "normal",
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(e.message);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

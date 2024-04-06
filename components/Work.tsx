import Image from "next/image";

export default function Work() {
  return (
    <>
      <WorkRow
        src="/vercel-icon-light.png"
        alt="Vercel Logo"
        title="Vercel"
        date="2023 - Present"
        role="Sales Engineer"
        jobDescription="Vercel's goal is to empower developers to build and publish high-performant apps and websites. My role is to help organisations across the Asia-Pacific region scale on the web."
      />
      <WorkRow
        src="/rangeme-light-logo.png"
        alt="RangeMe Logo"
        padding="p-1"
        title="RangeMe"
        date="2021 - 2023"
        role="Fullstack Engineer"
        jobDescription="At RangeMe, I helped streamline the platform to make it easier for retailers in the consumer packaged goods industry to discover and source new products."
      />
      <WorkRow
        src="/mathspace-logo.png"
        alt="Mathspace Logo"
        title="Mathspace"
        date="2017 - 2021"
        role="Frontend Engineer"
        jobDescription="At Mathspace, I developed features that empowered teachers to gain actionable insights on their students' data to better cater to their learning needs."
      />
    </>
  );
}

function WorkRow({
  src,
  alt,
  title,
  date,
  role,
  jobDescription,
  padding = "p-3",
}: {
  src: string;
  alt: string;
  title: string;
  date: string;
  role: string;
  jobDescription: string;
  padding?: string;
}) {
  return (
    <div className="mt-10 flex items-start font-body">
      <div className="relative rounded-full w-12 h-12 bg-slate-800 flex justify-center items-center">
        <Image
          src={src}
          alt={alt}
          fill
          className={`${padding} object-contain`}
        />
      </div>
      <div className="ml-4 w-full">
        <h3 className="text-xl text-gray-200">{title}</h3>
        <div className="mt flex items-center justify-between text-gray-400">
          <p>{role}</p>
          <p>{date}</p>
        </div>
        <p className="mt-2 text-gray-300">{jobDescription}</p>
      </div>
    </div>
  );
}

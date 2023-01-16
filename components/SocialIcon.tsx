import { SocialIcon as Icon } from "react-social-icons";

interface Props {
  url: string;
}

export default function SocialIcon({ url }: Props) {
  return (
    <div className="rounded-xl bg-slate-800">
      <Icon
        bgColor="transparent"
        fgColor="rgb(229 231 235)"
        url={url}
        target="_blank"
        style={{ height: 40, width: 40 }}
      />
    </div>
  );
}

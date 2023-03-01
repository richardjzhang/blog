import { SocialIcon as Icon } from "react-social-icons";

interface Props {
  network?: string;
  url: string;
}

export default function SocialIcon({ network, url }: Props) {
  return (
    <div className="rounded-xl bg-slate-800">
      <Icon
        bgColor="transparent"
        fgColor="rgb(229 231 235)"
        url={url}
        target="_blank"
        style={{ height: 40, width: 40 }}
        network={network}
      />
    </div>
  );
}

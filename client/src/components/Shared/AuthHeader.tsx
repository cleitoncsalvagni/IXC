import Image from "next/image";

interface Props {
  title: string;
  subtitle: string;
}

export const AuthHeader: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col">
      <Image
        alt="logo"
        src="/img/logo_ixc.png"
        width={100}
        height={100}
        className="w-20 h-20 self-center"
      />

      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-sm text-zinc-400 mt-1">{subtitle}</p>
    </div>
  );
};

import Image from "next/image";
import logoImage from "@/public/logo.png";
import Link from "next/link";

export const SidebarHeader = () => {
  return (
    <div>
      <Link href={"/"} className="flex items-center gap-2 cursor-pointer">
        <Image src={logoImage} alt="logo" width={40} height={40} />
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Feedfoward
        </h4>
      </Link>
    </div>
  );
};

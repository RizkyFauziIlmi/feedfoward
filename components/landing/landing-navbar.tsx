import Image from "next/image";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import logoImage from "@/public/logo.png";
import Link from "next/link";

export const LandingNavbar = () => {
  return (
    <nav className="flex items-center justify-center md:justify-between py-4">
      <div className="md:flex hidden items-center justify-end w-1/5">
        <Link
          href={"/"}
          scroll
          className="cursor-pointer gap-2 flex items-center"
        >
          <Image src={logoImage} alt="logo" width={30} height={30} />
          <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
            FeedFoward
          </h4>
        </Link>
      </div>
      <div className="w-3/5 flex items-center justify-center">
        <Link href={"/#features"} scroll>
          <Button
            variant={"link"}
            className="text-muted-foreground hover:text-primary"
          >
            Features
          </Button>
        </Link>
        <Link href={"/#about-us"} scroll>
          <Button
            variant={"link"}
            className="text-muted-foreground hover:text-primary"
          >
            About Us
          </Button>
        </Link>
        <Link href={"/#contact"} scroll>
          <Button
            variant={"link"}
            className="text-muted-foreground hover:text-primary"
          >
            Contact
          </Button>
        </Link>
        <Link href={"/#faq"} scroll>
          <Button
            variant={"link"}
            className="text-muted-foreground hover:text-primary"
          >
            FAQ
          </Button>
        </Link>
      </div>
      <div className="md:w-1/5 hidden md:flex justify-start">
        <ModeToggle />
      </div>
    </nav>
  );
};

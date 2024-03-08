import Image from "next/image";
import candimadamImage from "@/public/candimadam.png";
import { CiGlobe, CiInstagram } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export const LandingAboutUs = () => {
  return (
    <section
      className="w-screen md:h-screen px-12 md:px-24 py-4 space-y-4"
      id="about-us"
    >
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex flex-col w-fit">
          <Image src={candimadamImage} alt="candimadam" width={700} />
          <div className="flex justify-between items-start mt-4 gap-2">
            <div>
              <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                Candimadam
              </h4>
              <p className="text-xs text-muted-foreground">
                UI/UX, Project Manager
              </p>
            </div>
            <div className="flex gap-2 mt-1">
              <Link href={"https://www.instagram.com/cnm.adam"} target="_blank">
                <CiInstagram className="h-4 w-4 cursor-pointer" />
              </Link>
              <Link href={"https://github.com/Candimadam"} target="_blank">
                <FaGithub className="h-4 w-4 cursor-pointer" />
              </Link>
              <Link href={"https://candimadam.vercel.app"} target="_blank">
                <CiGlobe className="h-4 w-4 cursor-pointer" />
              </Link>
            </div>
          </div>
        </div>
        <div>
          <p className="leading-7 [&:not(:first-child)]:mt-6 md:line-clamp-none line-clamp-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            corrupti aspernatur quis quisquam possimus excepturi, odit quidem,
            molestias quo fugit architecto nihil? Numquam laborum qui aspernatur
            provident corporis similique quaerat? Tempore facilis repellat sint
            repudiandae, officiis optio, fugiat excepturi libero perferendis
            architecto minima commodi unde expedita est beatae eligendi, ex
            saepe? Quidem consectetur minus illo architecto quod nisi id
            voluptatum?
          </p>
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            "After all," he said, "everyone enjoys a good joke, so it's only
            fair that they should pay for the privilege."
          </blockquote>
        </div>
      </div>
      <div className="flex flex-col md:flex-row-reverse gap-2 pt-4">
        <div className="flex flex-col w-fit">
          <Image src={candimadamImage} alt="candimadam" width={700} />
          <div className="flex justify-between items-start mt-4 gap-2">
            <div>
              <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                Rizky Fauzi Ilmi
              </h4>
              <p className="text-xs text-muted-foreground">
                Full Stack Developer
              </p>
            </div>
            <div className="flex gap-2 mt-1">
              <Link
                href={"https://www.instagram.com/fauzirizkyw"}
                target="_blank"
              >
                <CiInstagram className="h-4 w-4 cursor-pointer" />
              </Link>
              <Link href={"https://github.com/RizkyFauziIlmi"} target="_blank">
                <FaGithub className="h-4 w-4 cursor-pointer" />
              </Link>
              <Link href={"https://rizkyfauziilmi.vercel.app"} target="_blank">
                <CiGlobe className="h-4 w-4 cursor-pointer" />
              </Link>
            </div>
          </div>
        </div>
        <div>
          <p className="leading-7 [&:not(:first-child)]:mt-6 md:text-end md:line-clamp-none line-clamp-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            corrupti aspernatur quis quisquam possimus excepturi, odit quidem,
            molestias quo fugit architecto nihil? Numquam laborum qui aspernatur
            provident corporis similique quaerat? Tempore facilis repellat sint
            repudiandae, officiis optio, fugiat excepturi libero perferendis
            architecto minima commodi unde expedita est beatae eligendi, ex
            saepe? Quidem consectetur minus illo architecto quod nisi id
            voluptatum?
          </p>
          <blockquote className="mt-6 border-l-2 md:border-r-2 pl-6 md:pr-6 italic md:text-end">
            "After all," he said, "everyone enjoys a good joke, so it's only
            fair that they should pay for the privilege."
          </blockquote>
        </div>
      </div>
    </section>
  );
};

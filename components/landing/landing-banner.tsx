import Link from "next/link";
import { Button } from "../ui/button";

import { LandingMarquee } from "./landing-marquee";

export const LandingBanner = () => {
  return (
    <section className="text-center flex flex-col">
      <div className="py-16 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2 w-full md:w-1/2 px-4">
          <h1 className="scroll-m-20 text-2xl md:text-4xl font-extrabold tracking-tight lg:text-5xl">
            Share Your Plate, Share Hope: Transforming Surplus into Survival.
          </h1>
          <p className="text-md md:text-xl text-muted-foreground">
            In a world of abundance, hunger should be a problem of the past.
            Let's turn our leftovers into someone else's tomorrow.
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 mt-4">
          <Link href={"/dashboard"}>
            <Button className="rounded-full">Get Started</Button>
          </Link>
          <Link href={"/#faq"}>
            <Button variant={"outline"} className="rounded-full">
              Learn more
            </Button>
          </Link>
        </div>
      </div>
      <LandingMarquee />
      {/* <ParticlesComponent /> */}
    </section>
  );
};

import Marquee from "react-fast-marquee";
import { TbBrandNextjs } from "react-icons/tb";
import { SiAuth0, SiPostgresql, SiPrisma, SiVercel } from "react-icons/si";
import { DiDocker } from "react-icons/di";

export const LandingMarquee = () => {
  return (
    <Marquee className="text-muted-foreground mt-8">
      <div className="flex items-center mx-16">
        <TbBrandNextjs className="w-8 h-8" />
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          NextJS
        </h3>
      </div>
      <div className="flex items-center mx-16">
        <SiPrisma className="w-8 h-8" />
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          PrismaORM
        </h3>
      </div>
      <div className="flex items-center mx-16">
        <SiPostgresql className="w-8 h-8" />
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          PostgreSQL
        </h3>
      </div>
      <div className="flex items-center mx-16">
        <SiAuth0 className="w-8 h-8" />
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Authjs
        </h3>
      </div>
      <div className="flex items-center mx-16">
        <DiDocker className="w-8 h-8" />
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Docker
        </h3>
      </div>
      <div className="flex items-center mx-16">
        <SiVercel className="w-8 h-8" />
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Vercel
        </h3>
      </div>
    </Marquee>
  );
};

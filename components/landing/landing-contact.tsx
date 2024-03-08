import firstImage from "@/public/contact-first.jpeg";
import secondImage from "@/public/contact-second.jpeg";
import Image from "next/image";

export const LandingContact = () => {
  return (
    <section
      className="h-screen w-screen font-semibold px-12 md:px-24 py-4 flex justify-between"
      id="contact"
    >
      <div className="flex flex-col justify-around h-full">
        <h1 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Contact Us
        </h1>
        <div>
          <div className="mb-4">
            <p className="leading-7 text-sm">Indonesia</p>
            <p className="leading-7 text-sm">Bandung, Pasir Honje</p>
          </div>
          <div className="flex md:flex-row flex-col gap-1 md:gap-12">
            <p className="leading-7 text-sm">feedfoward@gmail.com</p>
            <p className="leading-7 text-sm">+6289627030604</p>
          </div>
        </div>
        <div className="flex gap-4">
          <p className="leading-7 text-sm text-muted-foreground hover:text-primary cursor-pointer">
            Github
          </p>
          <p className="leading-7 text-sm text-muted-foreground hover:text-primary cursor-pointer">
            Feedback
          </p>
          <p className="leading-7 text-sm text-muted-foreground hover:text-primary cursor-pointer">
            Issue
          </p>
          <p className="leading-7 text-sm text-muted-foreground hover:text-primary cursor-pointer">
            Email
          </p>
        </div>
        <div className="flex gap-4">
          <p className="leading-7 text-sm cursor-pointer">Terms of Service</p>
          <p className="leading-7 text-sm cursor-pointer">Privacy Policy</p>
          <p className="leading-7 text-sm cursor-pointer">Legal</p>
        </div>
        <p className="leading-7 text-sm md:hidden block">feedfoward(c) 2024</p>
      </div>
      <div className="hidden md:flex flex-col justify-around items-end h-full w-full font-semibold">
        <div className="relative w-1/2 h-2/3">
          <Image
            className="absolute top-48 right-44 -z-10"
            src={firstImage}
            alt="first-image"
            width={200}
          />
          <Image
            className="absolute top-0 right-0"
            src={secondImage}
            alt="second-image"
            width={300}
          />
        </div>
        <p className="leading-7 text-sm">feedfoward(c) 2024</p>
      </div>
    </section>
  );
};

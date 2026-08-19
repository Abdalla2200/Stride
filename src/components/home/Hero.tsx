import Image from "next/image";
import Link from "next/link";
import landingImg from "@/assets/landing-image.png";
import { Button } from "@/components/UI/button";

export default function Hero() {
  return (
    <section className="relative h-[90dvh]">
      <Image
        loading="eager"
        src={landingImg}
        alt="Hero image : a man wearing suit"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 w-full h-full z-10 bg-primary-tx/40"></div>
      <div className="z-20 mx-8 sm:ml-12 md:ml-16 absolute top-1/2 -translate-y-1/2">
        <span className="text-primary-bg bg-gold/60 text-xs py-1 px-3 rounded-sm">
          NEW SEASON
        </span>
        <h1 className="font-bold text-4xl md:text-[64px] text-primary-bg leading-[50px] md:leading-17.5 mb-4 mt-3">
          DETAILS MAKE <br />
          THE MAN.
        </h1>
        <p className="text-primary-bg/90 leading-6 max-w-110 mb-10">
          Curated shirts, shoes, watches, and eyewear for men who don&apos;t
          settle for anything less than perfection.
        </p>
        <Button
          asChild
          className="bg-primary-bg hover:bg-primary-bg/85 text-inverse font-semibold duration-300 py-3 md:py-4 px-8 md:px-8 rounded-md h-auto text-sm tracking-wide"
        >
          <Link href="#categories">SHOP NEW ARRIVALS</Link>
        </Button>
      </div>
    </section>
  );
}

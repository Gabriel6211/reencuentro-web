import MultipleImages from "@/components/Home/MainBanner/MultipleImages";
import BannerText from "@/components/Home/MainBanner/BannerText";

export default function MainBanner() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-10 items-center h-fit relative my-16">
      {/* Text section */}
      <BannerText />
      {/* Image section */}
      <MultipleImages />
      <div className="absolute z-0 bottom-20 left-0 w-[200px] h-[200px] rounded-full blur-3xl bg-[var(--primary)]/30" />
      <div className="absolute z-0 top-0 left-1/2 w-[200px] h-[200px] rounded-full blur-3xl bg-[var(--secondary)]/50" />
    </section>
  );
}

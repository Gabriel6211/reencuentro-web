import MultipleImages from "@/components/Home/MainBanner/MultipleImages";
import BannerText from "@/components/Home/MainBanner/BannerText";

export default function MainBanner() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-10 items-center h-fit relative my-15">
      {/* Text section */}
      <BannerText />
      {/* Image section */}
      <MultipleImages />
      <div className="absolute z-0 bottom-0 left-0 w-100 h-100 rounded-full blur-3xl bg-[var(--primary)]/15" />
      <div className="absolute z-0 top-0 right-0 w-100 h-100 rounded-full blur-3xl bg-[var(--secondary)]/30" />
    </section>
  );
}

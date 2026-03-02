import MainBanner from "@/components/Home/MainBanner/MainBanner";
import HowToHelp from "@/components/Home/HowToHelp/HowToHelp";
import LastReports from "@/components/Home/LastReports/LastReports";
import Alerts from "@/components/Home/Alerts/Alerts";

export default function Home() {
  return (
    <section className="container flex flex-col items-center w-full">
      <MainBanner />
      <HowToHelp />
      <LastReports />
      <Alerts />
    </section>
  );
}

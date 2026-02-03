import MainBanner from "@/components/Home/MainBanner/MainBanner";
import HowToHelp from "@/components/Home/HowToHelp/HowToHelp";
import LastReports from "@/components/Home/LastReports/LastReports";
import Alerts from "@/components/Home/Alerts/Alerts";

export default function Home() {
  return (
    <div>
      <main className="container flex flex-col items-center justify-center">
        <MainBanner />
        <HowToHelp />
        <LastReports />
        <Alerts />
      </main>
    </div>
  );
}

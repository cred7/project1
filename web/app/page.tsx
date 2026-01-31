// "use client";
import Hero from "@/components/Hero";
import HomeNews from "@/components/News";
import PlayerList from "@/components/Players";

export default function Home() {
  // const user = useAuthStore((state) => state.user?.name);
  return (
    <div className="relative">
      <Hero />
      <HomeNews />
      <PlayerList />
      {/* <div className="fixed left-[calc(100%-200px)] bottom-0 rounded-full overflow-hidden bg-green-200">
        <LiveMatchUpdates matchId="4" />
      </div> */}
    </div>
  );
}

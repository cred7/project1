// "use client";
import Hero from "@/components/Hero";
import HomeNews from "@/components/News";
import PlayersList from "@/components/Players";

export default function Home() {
  // const user = useAuthStore((state) => state.user?.name);
  return (
    <div className="">
      <Hero />
      <HomeNews />
      <PlayersList />
    </div>
  );
}

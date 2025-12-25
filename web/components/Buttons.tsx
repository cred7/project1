"use client";
import { useAuthStore } from "@/lib/hooks/useAuthStore";
import { User } from "lucide-react";
import Link from "next/link";

const Buttons = () => {
  const user = useAuthStore((state) => state.user?.name || "Login");
  let hrefs;
  if (user === "Login") {
    hrefs = "login";
  } else {
    hrefs = "/";
  }
  return (
    <>
      <Link href={hrefs}>
        <div className="font-xs items-center justify-center gap-1 lowercase flex rounded-full px-2 p-1 border text-white ">
          <User className="10" size={15} />
          {user}
        </div>
      </Link>{" "}
    </>
  );
};

export default Buttons;

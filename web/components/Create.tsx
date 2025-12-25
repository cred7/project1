"use client";

import { useAuthStore } from "@/lib/hooks/useAuthStore";
import { fetchWithCredentials } from "@/lib/utils/api";
import { useState } from "react";
import { Button } from "./ui/button";
type types = {
  first_name: string;
  last_name: string;
  position: string;
  number: number;
  team: string;
  bio: string;
  nationality: string;
  dob: string;
  height: number;
  weight: number;
};
const hh: types = {
  first_name: "",
  last_name: "",
  position: "",
  number: 0,
  team: "",
  bio: "",
  nationality: "",
  dob: "",
  height: 0,
  weight: 0,
};

const Create = () => {
  const [e, sete] = useState(null);
  const [c, setC] = useState(false);
  const [item, setITem] = useState<types>(hh);
  const user = useAuthStore((state) => state.user?.name);
  const Creates = async () => {
    console.log(item);
    try {
      const d = await fetchWithCredentials(`http://localhost:7000/player/`, {
        method: "POST",
        credentials: "include",
      });
      console.log(d);
    } catch (e: any) {
      sete(e.data?.detail);
      setInterval(() => {
        sete(null);
      }, 3000);
      console.log(e.data?.detail);
    }
  };
  return (
    <div className={`${user ? "flex" : "hidden"} flex-col `}>
      <Button
        onClick={() => {
          setC((d) => !d);
        }}
        className="bg-green-700 max-w-20 text-white px-4 mt-2 left-10"
      >
        {!c ? "Add players" : "remove"}
      </Button>
      {c && (
        <>
          <div className="w-full p-2">
            {Object.keys(hh).map((key) => (
              <input
                type="text"
                onChange={(e) =>
                  setITem((p) => ({ ...p, [key]: e.target.value }))
                }
                placeholder={key}
                className=" w-full border p-2 rounded my-1"
              />
            ))}
          </div>

          <Button
            onClick={Creates}
            className=" bg-green-700 text-white p-2 mt-2"
          >
            Create
          </Button>
          {e && <p className="text-xs text-green-400 font-bold">{e}</p>}
        </>
      )}
    </div>
  );
};

export default Create;

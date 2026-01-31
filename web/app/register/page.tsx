"use client";
import { FormEvent, useState } from "react";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";
type dd = {
  names: string;
  name: string;
  nam: string;
};
const pages = () => {
  const [names, setnames] = useState("");
  const [name, setname] = useState("");
  const [nam, setnam] = useState("");
  const [data, setData] = useState<dd[]>([]);
  const handle = async (e: FormEvent) => {
    e.preventDefault();
    console.log(nam);
    try {
      const home = await fetch(`backend/admit`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ names, nam, name }),
        method: "POST",
      });

      const data: dd[] = await home.json();
      console.log("datadddd", data);
      setData(data);
      console.log("kk", data);
    } catch (e) {
      console.log("erooror", e);
    }
  };
  return (
    <div className="max-w-5xl m-auto flex items-center justify-center">
      <div className="p-1 mt-10">
        <h1 className="font-bold">register your works</h1>
        <div className="flex flex-row w-full">
          here is your data
          {data.map((d) => (
            <div className="w-full">
              {" "}
              <h1 className="bg-red-200 text-black w-full">{d.names}</h1>
              <h1>{d.name}</h1>
              <h1>{d.nam}</h1>
            </div>
          ))}
        </div>
        <form className="p-2 flex gap-2 flex-col" onSubmit={handle}>
          <div className="flex flex-row gap-1">
            {" "}
            <label htmlFor="Name">Name</label>
            <input
              className="w-full bg-red-100 rounded"
              type="text"
              onChange={(e) => {
                setnames(e.target.value);
              }}
              value={names}
            />
          </div>
          <div className="flex flex-row gap-1">
            {" "}
            <label htmlFor="Name">Name</label>
            <input
              className="w-full bg-red-100 rounded"
              type="text"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-row gap-1">
            {" "}
            <label htmlFor="Name">Name</label>
            <input
              className="w-full bg-red-100 rounded"
              type="text"
              value={nam}
              onChange={(e) => {
                setnam(e.target.value);
              }}
            />
          </div>
          <button className="bg-red-300">add</button>
        </form>
        <button onClick={() => {}} className="bg-blue-300">
          Delete
        </button>
      </div>
    </div>
  );
};

export default pages;

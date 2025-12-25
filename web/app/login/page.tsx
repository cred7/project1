"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/hooks/useAuthStore";
import { fetchWithCredentials } from "@/lib/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    setError("");

    try {
      await fetchWithCredentials("http://localhost:7000/account/login/", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const user = await fetchWithCredentials(
        "http://localhost:7000/account/me/"
      );

      login(user);
      router.push("/");
    } catch (err: any) {
      console.log("LOGIN ERROR:", err);
      setError(err.data?.detail || "Invalid login");
    }
  };

  const handleSignup = async () => {
    setError("");
    try {
      console.log(name, email, password);
      // Step 1: send credentials to backend
      const hi = await fetchWithCredentials(
        "http://localhost:7000/account/register/",
        {
          method: "POST",
          body: JSON.stringify({ email, password, name, role: "fan" }),
        }
      );

      console.log("Signed up response:", await hi);
      // Step 1: send credentials to backend
      const h = await fetchWithCredentials(
        "http://localhost:7000/account/login/",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
        }
      );
      console.log("Login response:", h);

      //   Step 2: fetch user identity from /me
      const user = await fetchWithCredentials(
        "http://localhost:7000/account/me/"

        // { headers: { Authorization: `Bearer ${t.access}` } }
      );
      console.log("Logged in user:", user);
      login(user); // update Zustand
      console.log("all,lllll ia swelll");
      router.push("/"); // redirect to protected page
    } catch (err: any) {
      console.log(err);
      console.log("LOGIN ERROR:", err);
      setError(err.data?.detail || "Invalid login");
    }
  };

  const home =
    <T extends HTMLInputElement>(setter: (value: string) => void) =>
    (e: React.ChangeEvent<T>) => {
      setter(e.target.value);
    };
  const [user, setuser] = useState(false);
  return !user ? (
    <div className="max-w-md mx-auto mt-20 p-4 border rounded">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={home(setEmail)}
        // onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={home(setPassword)}
        // onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />

      <button
        onClick={handleLogin}
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Login
      </button>
      <div className="w-full justify-end flex-col flex pt-2">
        <label htmlFor="signup">Yuo dont Have an account ?</label>
        <Button onClick={() => setuser((p) => !p)}>Sign Up</Button>
      </div>
    </div>
  ) : (
    <div className="max-w-md mx-auto mt-20 p-4 border rounded">
      <p>{error}</p>
      <h1 className="font-bold text-xl">Sign Up</h1>
      <input
        onChange={home(setEmail)}
        className="w-full border p-2 mt-2"
        placeholder="Email"
      ></input>
      <input
        onChange={home(setName)}
        className="w-full border p-2 mt-2 rounded"
        placeholder="Name"
      ></input>
      <input
        onChange={home(setPassword)}
        className="w-full border p-2 mt-2 rounded"
        placeholder="Password"
      ></input>
      <button
        onClick={handleSignup}
        className="bg-blue-500 w-full p-2 mt-2 rounded text-white"
      >
        Sign Up
      </button>
      <div className="w-full justify-end flex pt-2">
        <Button
          onClick={() => {
            setuser((p) => !p);
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

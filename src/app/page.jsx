"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [err, setError] = useState(null);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target[0].value.trim();
    const key = e.target[1].value.trim();
    try {
      const res = await fetch("/api/checkkey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          key,
        }),
      });
      let data = await res.json();
      if (res.status === 200) {
        console.log(data);
        sessionStorage.setItem("key_todo_app_session", data);
        router.push("/dashboard");
      } else if (res.status === 403) {
        setError("Invalid credentials");
      } else {
        setError("No response from server");
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 md:p-24">
      <div className=" rounded-md flex flex-col justify-center items-center space-y-4 bg-slate-700 shadow-[0px_0px_24px_24px_rgba(147,51,247)]  p-4  text-white ">
        <span className="font-[700] font-mono italic text-lg">
          Enter the key to visit your ToDo list
        </span>
        <form
          className="w-full flex flex-col justify-center items-center space-y-3"
          onSubmit={handleSubmit}
        >
          <input
            className="text-black px-2 py-1 outline-none border-4 font-mono rounded-full w-full border-purple-500"
            type="text"
            name=""
            placeholder="Enter your name here..."
            id=""
          />
          <input
            className="text-black px-2 py-1 outline-none border-4 font-mono rounded-full w-full border-purple-500"
            type="text"
            name=""
            placeholder="Place your key here..🔑"
            id=""
          />
          <button className="p-2 w-24 font-semibold rounded-lg bg-purple-500 ">
            Enter
          </button>
        </form>
        {err && <div className="text-red-500 italic">{err}</div>}
        <div className="italic space-x-1">
          <span className="text-sm font-[400]">First time here?</span>
          <Link href="/newkey">
            <span className="font-[900] font-xs cursor-pointer text-purple-400 font-mono">
              Get a new key
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}

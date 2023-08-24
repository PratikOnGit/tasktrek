"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const NewKey = () => {
  const [err, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;

    try {
      const res = await fetch("/api/sendkey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
        }),
      });
      res.status === 409 && setError("User already exists");
      res.status === 201 && router.push("/?key sent successfully");
    } catch (error) {
      setError("Something went wrong");
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 md:p-24">
      <div className=" rounded-md w-full md:w-2/6 flex flex-col justify-center items-center space-y-4 bg-slate-700 shadow-[0px_0px_24px_24px_rgba(147,51,247)]  p-4  text-white ">
        <span className="font-[700] font-mono italic text-lg">
          Fill out following
        </span>
        <form
          className="w-full flex flex-col justify-center items-center space-y-3"
          onSubmit={handleSubmit}
        >
          <input
            className="text-black px-2 py-1 outline-none border-4 font-mono rounded-full w-full border-purple-500"
            type="text"
            name=""
            placeholder="Name"
            id=""
          />
          <input
            className="text-black px-2 py-1 outline-none border-4 font-mono rounded-full w-full border-purple-500"
            type="email"
            name=""
            placeholder="Email"
            id=""
          />
          <button className="p-2 w-24 font-semibold rounded-lg bg-purple-500 ">
            Get Key
          </button>
        </form>
        <div className="italic space-x-1 flex flex-col justify-center items-center">
          {err && (
            <span className="text-sm font-[400] text-red-500">{err}</span>
          )}
          <span className="text-sm font-[400]">
            Key will be sent to respective email
          </span>
          <span className="font-[900] font-xs cursor-pointer text-purple-400 font-mono">
            Name and email will be required for login
          </span>
        </div>
      </div>
    </main>
  );
};

export default NewKey;

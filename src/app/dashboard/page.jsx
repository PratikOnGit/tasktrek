"use client";
import { notFound } from "next/navigation";

import React, { useState } from "react";
import useSWR from "swr";

const Page = () => {
  const key = sessionStorage.getItem("key_todo_app_session");
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(
    `/api/getpost?userKey=${key}`,
    fetcher
  );
  console.log(data);
  const [creatediv, setcreatediv] = useState(false);
  const [disabled, setdisabled] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    let title = e.target[0].value;
    let desc = e.target[1].value;
    let time = e.target[2].value;
    let date = e.target[3].value;

    try {
      setdisabled(true);
      let response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, desc, time, date, key }),
      });
      setdisabled(false);

      if (response.status === 200) {
        setcreatediv((prev) => !prev);
      }
      mutate();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (event, objID) => {
    event.preventDefault();
    try {
      setdisabled(true);

      let response = await fetch("/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: key, objID: objID }),
      });
      setdisabled(false);

      if (response.status === 200) {
        mutate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlecreatediv = () => {
    setcreatediv((prev) => !prev);
  };
  console.log(data);

  if (key) {
    return (
      <>
        <div className=" flex flex-col gap-3 md:w-full justify-center items-center">
          <span
            onClick={handlecreatediv}
            className="bg-purple-500 cursor-pointer flex justify-center max-w-xs md:max-w-2xl mx-auto text-white font-bold text-lg rounded-lg py-4 px-6"
          >
            Create Task ➕
          </span>
          {/* idar task form hidden rahega */}
          {creatediv && (
            <div className="p-8 ">
              <form
                onSubmit={handleCreate}
                className="flex flex-col w-full md:w-[40rem]  bg-purple-500 justify-center items-center p-4 gap-4 shadow-[0px_0px_12px_12px_rgba(147,51,247)]"
              >
                <input
                  className="outline-none border-b-2 rounded-lg p-2 w-full border-purple-700"
                  type="text"
                  placeholder="Title"
                />
                <textarea
                  className="outline-none border-b-2 rounded-lg p-2 w-full border-purple-700"
                  cols={10}
                  placeholder="Description"
                ></textarea>
                <input
                  className="outline-none border-b-2 rounded-lg p-2 w-full border-purple-700"
                  type="time"
                  placeholder="Time to go"
                />
                <input
                  className="outline-none border-b-2 rounded-lg p-2 w-full border-purple-700"
                  type="date"
                  placeholder="End date"
                />
                <div className="flex gap-3 justify-between items-center">
                  <button
                    disabled={disabled}
                    type="submit"
                    className="px-3 disabled:opacity-25 py-2 bg-emerald-400 rounded-lg text-white font-[500]"
                  >
                    Create task
                  </button>
                  <button
                    type="reset"
                    className="px-3 py-2 bg-orange-400 rounded-lg text-white font-[500]"
                  >
                    Reset feilds
                  </button>
                  <button
                    onClick={handlecreatediv}
                    className="px-3 py-2 bg-rose-400 rounded-lg text-white font-[500]"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          )}
          {/* End create task */}
        </div>
        <div className=" max-w-7xl mx-auto mt-11 flex  flex-wrap justify-evenly">
          {data &&
            data.map((item) => (
              <div
                key={item._id}
                className={`${
                  item.isCompleated ? `bg-emerald-300` : `bg-yellow-200`
                } p-8 flex flex-col max-w-xs md:max-w-xl relative gap-10 rounded-lg shadow-[0px_0px_12px_12px_rgba(147,51,247)]`}
              >
                <h1 className="text-4xl font-bold p-2">{item.title}</h1>
                <span className="text-md font-[600]">{item.content}</span>
                <div className="flex justify-evenly items-center gap-3 ">
                  <span className="p-2 rounded-md text-white  bg-green-400">
                    Completed
                  </span>
                  <span className="p-2 rounded-md text-white bg-yellow-400">
                    Update
                  </span>
                  <button
                    key={item._id}
                    onClick={(event) => handleDelete(event, item._id)}
                    disabled={disabled}
                    className="p-2 rounded-md text-white bg-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </>
    );
  } else {
    return notFound();
  }
};

export default Page;

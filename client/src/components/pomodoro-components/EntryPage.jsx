import React from "react";
import EPForm from "./EPForm";
import EPSessionTip from "./EPSessionTip";

function EntryPage() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center pb-4">
      <header className="text-start inline-block text-3xl text-gray-800 my-5 font-bold font-sans shadow-sm transition-transform duration-300 whitespace-nowrap">
        <h1 className="text-3xl font-bold">Your Pomodoro, User</h1>
      </header>

      <main className="flex flex-col lg:flex-row justify-center items-stretch gap-8 mt-8 px-4 lg:px-16 w-full max-w-7xl">
        <div className="bg-white shadow-lg rounded-lg p-6 flex-1">
          <EPForm />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex-1">
          <EPSessionTip />
        </div>
      </main>
    </div>
  );
}

export default EntryPage;

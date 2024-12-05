import React from "react";
import arrowBack from "../../assets/arrow-back.png";

function SPBuilder() {
  return (
    <>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center pb-4">
        <button className="flex items-center gap-2 lg:!gap-4 pt-4 lg:pt-10 pl-4 lg:pl-10 bg-purple-700 self-start">
          <img
            src={arrowBack}
            alt="Back Arrow"
            className="h-5 w-5 lg:h-8 lg:w-8"
          />
          <span className="text-gray-800 font-semibold text-base lg:text-4xl">
            Back
          </span>
        </button>
        <header className="text-start inline-block text-3xl text-gray-800 my-5 font-bold font-sans shadow-sm transition-transform duration-300 whitespace-nowrap">
          <h1 className="text-3xl font-bold">BUILD YOUR SESSION</h1>
        </header>
      </div>
    </>
  );
}

export default SPBuilder;

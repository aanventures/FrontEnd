"use client";

import { useState } from "react";

export default function HeroSearch() {
  const [activeTab, setActiveTab] = useState("stays");

  const searchConfig = {
    flights: { placeholder: "Where from? To?", icon: "✈️", color: "bg-blue-500" },
    stays: { placeholder: "Enter a city, hotel, or landmark", icon: "🏨", color: "bg-orange-600" },
    cars: { placeholder: "Pickup location", icon: "🚗", color: "bg-emerald-600" },
  };

  return (
    <div className="z-10 flex flex-col justify-center">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
        Compare {activeTab} deals <br />
        from <span className="text-orange-600">100s of sites.</span>
      </h2>

      {/* TAB SWITCHER */}
      <div className="flex gap-6 mt-10 mb-6">
        {Object.keys(searchConfig).map((id) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className="flex flex-col items-center gap-2 group outline-none"
          >
            <div className={`p-4 rounded-2xl transition-all duration-300 ${
                activeTab === id
                  ? `${searchConfig[id].color} text-white shadow-lg scale-110`
                  : "bg-white/80 hover:bg-white text-gray-600 shadow-sm"
              }`}
            >
              <span className="text-xl">{searchConfig[id].icon}</span>
            </div>
            <span className={`text-xs font-bold capitalize ${
                activeTab === id ? "text-slate-900" : "text-gray-400"
              }`}
            >
              {id === 'cars' ? 'Car Rental' : id}
            </span>
          </button>
        ))}
      </div>

      {/* DYNAMIC SEARCH BAR */}
      <div className="bg-white border border-gray-100 shadow-2xl rounded-3xl p-3 flex flex-col md:flex-row items-center gap-2 w-full max-w-3xl transition-all duration-500">
        <div className="flex-[2] flex items-center px-4 w-full">
          <span className="mr-3 text-gray-400">{searchConfig[activeTab].icon}</span>
          <input
            type="text"
            placeholder={searchConfig[activeTab].placeholder}
            className="w-full py-3 bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none"
          />
        </div>
        <div className="h-8 w-[1px] bg-gray-200 hidden md:block"></div>
        <div className="flex-1 px-4 w-full">
          <input
            type="text"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            placeholder="Dates"
            className="w-full py-3 bg-transparent text-slate-700 focus:outline-none"
          />
        </div>
        <button className={`${searchConfig[activeTab].color} hover:opacity-90 text-white p-4 rounded-2xl transition-all flex items-center justify-center w-full md:w-16 h-14`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
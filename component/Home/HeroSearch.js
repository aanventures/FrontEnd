"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, Search, MapPin, Plane, Car, Hotel, X } from "lucide-react";
import "./HeroSearch.css";

export default function HeroSearch() {
  const router = useRouter();
  const params = useParams();

  const rawType = params.type ? params.type[0] : "hotels";
  const activeTab = ["flights", "hotels", "cars"].includes(rawType)
    ? rawType
    : "hotels";

  const [dateRange, setDateRange] = useState([null, null]);
  const [monthsToDisplay, setMonthsToDisplay] = useState(2);
  const [startDate, endDate] = dateRange;

  const searchConfig = {
    flights: {
      label: "Flights",
      placeholder: "Where from? To?",
      icon: <Plane size={22} />,
      color: "bg-blue-600",
      path: "/flights",
    },
    hotels: {
      label: "Hotels",
      placeholder: "Enter a city or hotel",
      icon: <Hotel size={22} />,
      color: "bg-orange-600",
      path: "/hotels",
    },
    cars: {
      label: "Cars",
      placeholder: "Pickup location",
      icon: <Car size={22} />,
      color: "bg-emerald-600",
      path: "/cars",
    },
  };

  const handleTabClick = (id) => {
    router.push(searchConfig[id].path, { scroll: false });
  };

  const clearDates = (e) => {
    e.stopPropagation();
    setDateRange([null, null]);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMonthsToDisplay(1);
      } else {
        setMonthsToDisplay(2);
      }
    };

    // Set initial value
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="z-10 flex flex-col justify-center w-full">
      {/* Title Section - Adjusted font sizes for mobile */}
      <h2 className="text-3xl sm:text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter text-center lg:text-left">
        Compare {activeTab} <br className="hidden sm:block" />
        <span className="text-orange-600 underline decoration-slate-200 underline-offset-8 uppercase text-2xl sm:text-4xl">
          {activeTab} made simple.
        </span>
      </h2>

      {/* TAB SWITCHER - Scrollable on very small screens */}
      <div className="flex gap-2 sm:gap-3 mt-8 mb-6 bg-slate-100 p-1.5 rounded-[2rem] w-fit mx-auto lg:mx-0 overflow-x-auto no-scrollbar max-w-full">
        {Object.keys(searchConfig).map((id) => (
          <button
            key={id}
            onClick={() => handleTabClick(id)}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
              activeTab === id
                ? `bg-white text-slate-900 shadow-md`
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {searchConfig[id].icon}
            {searchConfig[id].label}
          </button>
        ))}
      </div>

      {/* SEARCH BAR - Main Responsive Logic */}
      <div className="bg-white border border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2rem] lg:rounded-[2.5rem] p-2 sm:p-3 flex flex-col lg:flex-row items-center gap-2 w-full">
        {/* Location Section */}
        <div className="flex-[1.5] flex items-center px-5 py-3 lg:py-4 bg-slate-50 rounded-[1.5rem] lg:rounded-[1.8rem] w-full group transition-colors hover:bg-slate-100/80">
          <MapPin className="mr-3 text-slate-400 shrink-0" size={18} />
          <div className="flex flex-col flex-1">
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">
              Location
            </span>
            <input
              type="text"
              placeholder={searchConfig[activeTab]?.placeholder || "Search..."}
              className="bg-transparent text-slate-900 font-bold placeholder-slate-400 focus:outline-none w-full text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Calendar Section */}
        <div className="flex-1 flex items-center px-5 py-3 lg:py-4 ... relative">
          <Calendar className="mr-3 text-slate-400 shrink-0" size={18} />
          <div className="flex flex-col flex-1">
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">
              Dates
            </span>
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              monthsShown={monthsToDisplay} // <--- Uses the dynamic state
              placeholderText="Add dates"
              className="bg-transparent text-slate-900 font-bold placeholder-slate-400 focus:outline-none w-full cursor-pointer text-sm sm:text-base"
              dateFormat="dd MMM"
              minDate={new Date()}
              shouldCloseOnSelect={false}
              disabledKeyboardNavigation
            />
          </div>

          {startDate && (
            <button
              onClick={clearDates}
              className="absolute right-4 p-1.5 bg-white rounded-full shadow-md text-slate-400 hover:text-orange-600 transition-all z-20"
            >
              <X size={14} strokeWidth={3} />
            </button>
          )}
        </div>

        {/* Search Button */}
        <button
          className={`${
            searchConfig[activeTab]?.color || "bg-slate-900"
          } text-white px-10 h-14 lg:h-16 rounded-[1.5rem] lg:rounded-[1.8rem] flex items-center justify-center gap-2 font-black shadow-xl w-full lg:w-auto active:scale-95 transition-all`}
        >
          <Search size={20} />
          <span className="text-sm uppercase tracking-wider">Search</span>
        </button>
      </div>
    </div>
  );
}

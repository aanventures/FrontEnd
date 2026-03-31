"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Search,
  MapPin,
  Plane,
  Users,
  Calendar,
  Plus,
  Minus,
  ChevronDown,
  Hotel,
  Car,
} from "lucide-react";

export default function HeroSearch() {
  const router = useRouter();
  const pathname = usePathname();

  // --- 1. TAB STATE ---
  const [activeTab, setActiveTab] = useState(() => {
    if (pathname.includes("/hotels")) return "Hotels";
    if (pathname.includes("/cars")) return "Cars";
    return "Flights";
  });

  // Sync state if URL changes externally
  useEffect(() => {
    if (pathname.includes("/hotels")) setActiveTab("Hotels");
    else if (pathname.includes("/cars")) setActiveTab("Cars");
    else setActiveTab("Flights");
  }, [pathname]);

  // --- 2. INPUT STATE ---
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  
  // Date Logic: Single date for Flights, Range for Hotels & Cars
  const [singleDate, setSingleDate] = useState(new Date());
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [monthsShown, setMonthsShown] = useState(2);
  const [showGuests, setShowGuests] = useState(false);
  const [counts, setCounts] = useState({ adults: 1, children: 0, infants: 0 });
  const guestRef = useRef(null);

  // --- 3. EFFECTS ---
  useEffect(() => {
    const handleResize = () => setMonthsShown(window.innerWidth < 1024 ? 1 : 2);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (guestRef.current && !guestRef.current.contains(event.target)) setShowGuests(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- 4. HELPERS ---
  const updateCount = (type, operation) => {
    setCounts((prev) => {
      let newValue = operation === "inc" ? prev[type] + 1 : prev[type] - 1;
      if (type === "adults" && newValue < 1) newValue = 1;
      if (newValue < 0) newValue = 0;
      return { ...prev, [type]: newValue };
    });
  };

  const totalGuests = counts.adults + counts.children + counts.infants;

  const formatDate = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // --- 5. SEARCH HANDLER ---
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (activeTab === "Flights") {
      if (!origin || !destination || !singleDate) {
        alert("Please select origin, destination, and departure date.");
        return;
      }
      params.append("from", origin.trim());
      params.append("to", destination.trim());
      params.append("startDate", formatDate(singleDate));
      router.push(`/flights?${params.toString()}`);
    } 
    else if (activeTab === "Hotels") {
      if (!origin || !startDate || !endDate) {
        alert("Please select destination and check-in/out dates.");
        return;
      }
      params.append("location", origin.trim());
      params.append("startDate", formatDate(startDate));
      params.append("endDate", formatDate(endDate));
      params.append("adults", String(counts.adults));
      params.append("children", String(counts.children));
      router.push(`/hotels?${params.toString()}`);
    }
    else if (activeTab === "Cars") {
      if (!origin || !startDate || !endDate) {
        alert("Please select pick-up location and rental dates.");
        return;
      }
      params.append("pickup", origin.trim());
      params.append("startDate", formatDate(startDate));
      params.append("endDate", formatDate(endDate));
      router.push(`/cars?${params.toString()}`);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-2 md:px-4 font-montserrat">
      {/* 1. TAB SELECTORS */}
      <div className="flex gap-1.5 mb-3 justify-center lg:justify-start overflow-x-auto pb-1 no-scrollbar">
        {[
          { name: "Flights", icon: <Plane size={14} /> },
          { name: "Hotels", icon: <Hotel size={14} /> },
          { name: "Cars", icon: <Car size={14} /> },
        ].map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`px-5 py-2 rounded-full text-[11px] font-black transition-all flex items-center gap-2 whitespace-nowrap border ${
              activeTab === tab.name
                ? "bg-white text-slate-900 shadow-lg border-white"
                : "bg-black/30 text-white border-transparent hover:bg-black/40"
            }`}
          >
            {tab.icon}
            {tab.name.toUpperCase()}
          </button>
        ))}
      </div>

      {/* 2. MAIN SEARCH BOX */}
      <div className="bg-white/95 backdrop-blur-md p-2 rounded-[2rem] lg:rounded-full flex flex-col lg:flex-row items-center shadow-2xl w-full border border-white/20">
        
        {/* Location Input (Used for From, Hotel Destination, or Car Pick-up) */}
        <div className="flex-1 flex items-center px-5 py-3 border-b lg:border-b-0 lg:border-r border-slate-100 w-full group">
          <MapPin className="text-slate-400 mr-3 group-hover:text-amber-600" size={18} />
          <div className="flex flex-col items-start w-full">
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest leading-tight">
              {activeTab === "Hotels" ? "Location" : activeTab === "Cars" ? "Pick-up Location" : "From"}
            </span>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder={activeTab === "Flights" ? "Enter City" : "Where to?"}
              className="bg-transparent outline-none text-slate-900 w-full text-sm font-bold placeholder:text-slate-300"
            />
          </div>
        </div>

        {/* Destination Input (Only for Flights) */}
        {activeTab === "Flights" && (
          <div className="flex-1 flex items-center px-5 py-3 border-b lg:border-b-0 lg:border-r border-slate-100 w-full group">
            <Plane className="text-slate-400 mr-3 group-hover:text-amber-600 rotate-90" size={18} />
            <div className="flex flex-col items-start w-full">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest leading-tight">To</span>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter Destination"
                className="bg-transparent outline-none text-slate-900 w-full text-sm font-bold placeholder:text-slate-300"
              />
            </div>
          </div>
        )}

        {/* Date Section */}
        <div className="flex-1 flex items-center px-5 py-3 border-b lg:border-b-0 lg:border-r border-slate-100 w-full group">
          <Calendar className="text-slate-400 mr-3 group-hover:text-amber-600" size={18} />
          <div className="flex flex-col items-start flex-1 w-full">
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest leading-tight">
              {activeTab === "Flights" ? "Departure" : activeTab === "Cars" ? "Rental Period" : "Check-in & Out"}
            </span>
            <DatePicker
              selected={activeTab === "Flights" ? singleDate : null}
              selectsRange={activeTab !== "Flights"}
              startDate={activeTab !== "Flights" ? startDate : null}
              endDate={activeTab !== "Flights" ? endDate : null}
              onChange={(update) => {
                if (activeTab === "Flights") setSingleDate(update);
                else setDateRange(update);
              }}
              monthsShown={monthsShown}
              placeholderText={activeTab === "Flights" ? "Select Date" : "Pick-up - Drop-off"}
              className="bg-transparent outline-none text-slate-900 w-full text-sm font-bold cursor-pointer"
              dateFormat="dd MMM, yyyy"
              minDate={new Date()}
            />
          </div>
        </div>

        {/* Travelers/Guests (Hidden for Cars usually, but keeping available if needed) */}
        {activeTab !== "Cars" && (
          <div className="flex-1 relative w-full" ref={guestRef}>
            <div
              onClick={() => setShowGuests(!showGuests)}
              className="flex items-center px-5 py-3 border-b lg:border-b-0 lg:border-r border-slate-100 w-full group cursor-pointer"
            >
              <Users className="text-slate-400 mr-3 group-hover:text-amber-600" size={18} />
              <div className="flex flex-col items-start flex-1">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest leading-tight">Travelers</span>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-slate-900">
                    {totalGuests} {totalGuests > 1 ? "Travelers" : "Traveler"}
                  </span>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform ${showGuests ? "rotate-180" : ""}`} />
                </div>
              </div>
            </div>

            {showGuests && (
              <div className="absolute top-full left-0 lg:left-auto lg:right-0 mt-4 w-full sm:w-80 bg-white rounded-3xl shadow-2xl p-6 border border-slate-50 z-[1000] animate-in fade-in zoom-in duration-200">
                <div className="space-y-6">
                  <CounterRow label="Adults" sub="12+ Years" count={counts.adults} onDec={() => updateCount("adults", "dec")} onInc={() => updateCount("adults", "inc")} />
                  <CounterRow label="Children" sub="2-12 Years" count={counts.children} onDec={() => updateCount("children", "dec")} onInc={() => updateCount("children", "inc")} />
                  <CounterRow label="Infants" sub="Under 2 Years" count={counts.infants} onDec={() => updateCount("infants", "dec")} onInc={() => updateCount("infants", "inc")} />
                </div>
                <button onClick={() => setShowGuests(false)} className="w-full mt-6 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-600 transition-colors shadow-lg shadow-slate-200">
                  Apply Selection
                </button>
              </div>
            )}
          </div>
        )}

        {/* Search Button */}
        <div className="w-full lg:w-auto p-1.5">
          <button
            onClick={handleSearch}
            className="bg-amber-600 hover:bg-slate-900 text-white px-10 py-4 lg:py-6 rounded-full lg:rounded-full w-full font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl shadow-amber-600/20 active:scale-95 transition-all"
          >
            <Search size={20} strokeWidth={3} /> SEARCH
          </button>
        </div>
      </div>
    </div>
  );
}

function CounterRow({ label, sub, count, onInc, onDec }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-sm font-black text-slate-900">{label}</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{sub}</span>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onDec}
          className="w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center hover:bg-slate-50 text-slate-900 transition-all active:scale-90 disabled:opacity-20"
          disabled={label === "Adults" ? count <= 1 : count <= 0}
        >
          <Minus size={16} strokeWidth={3} />
        </button>
        <span className="text-base font-black text-slate-900 w-6 text-center">
          {count}
        </span>
        <button
          type="button"
          onClick={onInc}
          className="w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center hover:bg-slate-50 text-slate-900 transition-all active:scale-90"
        >
          <Plus size={16} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
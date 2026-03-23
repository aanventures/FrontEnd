"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
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

  // --- 1. ROUTING LOGIC ---
  const getActiveTab = () => {
    if (pathname.includes("/hotels")) return "Hotels";
    // if (pathname.includes("/cars")) return "Cars";
    return "Flights";
  };
  const activeTab = getActiveTab();

  // --- 2. STATE MANAGEMENT ---
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [monthsShown, setMonthsShown] = useState(2);
  const [showGuests, setShowGuests] = useState(false);
  const [counts, setCounts] = useState({ adults: 1, children: 0, infants: 0 });
  const guestRef = useRef(null);

  // --- 3. EFFECTS ---
  useEffect(() => {
    const handleResize = () => {
      setMonthsShown(window.innerWidth < 1024 ? 1 : 2);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (guestRef.current && !guestRef.current.contains(event.target)) {
        setShowGuests(false);
      }
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

// --- 5. SEARCH HANDLER ---
const handleSearch = () => {
  // 1. Validation: Prevent search if essential data is missing
  if (!origin || !destination || !startDate) {
    alert("Please select origin, destination, and departure date.");
    return;
  }

  const params = new URLSearchParams();

  // Helper to format Date object to YYYY-MM-DD correctly
  const formatDate = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 2. Add Dates (MMT and your API expect YYYY-MM-DD)
  const formattedStart = formatDate(startDate);
  const formattedEnd = formatDate(endDate);
  
  if (formattedStart) params.append("startDate", formattedStart);
  if (formattedEnd) params.append("endDate", formattedEnd);
  
  // 3. Add Traveler Counts
  params.append("adults", String(counts.adults));
  params.append("children", String(counts.children));
  params.append("infants", String(counts.infants));

  // 4. Determine Path and Specific Params
  let targetPath = "/flights";

  if (activeTab === "Flights") {
    targetPath = "/flights";
    // We trim and lowercase to ensure consistency in the Cache/DB
    params.append("from", origin.trim());
    params.append("to", destination.trim());
  } else if (activeTab === "Hotels") {
    targetPath = "/hotels";
    params.append("location", origin.trim());
  }

  // 5. Execute Redirect
  // This will result in: /flights?startDate=2026-03-25&endDate=2026-03-26&adults=1&from=bangalore&to=patna
  router.push(`${targetPath}?${params.toString()}`);
};

  return (
    <div className="w-full max-w-6xl mx-auto px-2 md:px-4">
      {/* Tab Selectors - Made smaller on mobile */}
      <div className="flex gap-1.5 mb-3 justify-center lg:justify-start overflow-x-auto pb-1 no-scrollbar">
        {[
          { name: "Flights", path: "/flights", icon: <Plane size={14} /> },
          { name: "Hotels", path: "/hotels", icon: <Hotel size={14} /> },
        ].map((tab) => (
          <Link
            key={tab.name}
            href={tab.path}
            className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all flex items-center gap-2 whitespace-nowrap border border-transparent ${
              activeTab === tab.name
                ? "bg-white text-slate-900 shadow-md border-white"
                : "bg-black/20 text-white hover:bg-black/30"
            }`}
          >
            {tab.icon}
            {tab.name}
          </Link>
        ))}
      </div>

      {/* Main Search Container - Reduced padding and rounding for mobile */}
      <div className="bg-white/95 backdrop-blur-md p-1.5 rounded-[1.5rem] lg:rounded-full flex flex-col lg:flex-row items-center shadow-2xl w-full border border-white/20">
        
        {/* Input 1: From / Location */}
        <div className="flex-1 flex items-center px-4 py-2 md:py-3 border-b lg:border-b-0 lg:border-r border-gray-100 w-full group">
          {activeTab === "Hotels" ? (
            <MapPin className="text-gray-400 mr-2 group-hover:text-[#C29263]" size={16} />
          ) : (
            <Plane className="text-gray-400 mr-2 group-hover:text-[#C29263]" size={16} />
          )}
          <div className="flex flex-col items-start w-full">
            <span className="text-[9px] font-bold uppercase text-gray-400 leading-tight">
              {activeTab === "Hotels" ? "Destination" : "From"}
            </span>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder={activeTab === "Hotels" ? "Where to?" : "City/Airport"}
              className="bg-transparent outline-none text-gray-800 w-full text-sm font-bold placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Input 2: To (Hidden for Hotels) */}
        {activeTab !== "Hotels" && (
          <div className="flex-1 flex items-center px-4 py-2 md:py-3 border-b lg:border-b-0 lg:border-r border-gray-100 w-full group">
            <MapPin className="text-gray-400 mr-2 group-hover:text-[#C29263]" size={16} />
            <div className="flex flex-col items-start w-full">
              <span className="text-[9px] font-bold uppercase text-gray-400 leading-tight">To</span>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Destination"
                className="bg-transparent outline-none text-gray-800 w-full text-sm font-bold placeholder:text-gray-400"
              />
            </div>
          </div>
        )}

        {/* Date Picker */}
        <div className="flex-1 flex items-center px-4 py-2 md:py-3 border-b lg:border-b-0 lg:border-r border-gray-100 w-full group">
          <Calendar className="text-gray-400 mr-2 group-hover:text-[#C29263]" size={16} />
          <div className="flex flex-col items-start flex-1 w-full">
            <span className="text-[9px] font-bold uppercase text-gray-400 leading-tight">
              {activeTab === "Flights" ? "Dates" : "Duration"}
            </span>
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              monthsShown={monthsShown}
              placeholderText="Select range"
              className="bg-transparent outline-none text-gray-800 w-full text-sm font-bold cursor-pointer"
              dateFormat="dd MMM"
              minDate={new Date()}
            />
          </div>
        </div>

        {/* Guest Dropdown */}
        <div className="flex-1 relative w-full" ref={guestRef}>
          <div
            onClick={() => setShowGuests(!showGuests)}
            className="flex items-center px-4 py-2 md:py-3 border-b lg:border-b-0 lg:border-r border-gray-100 w-full group cursor-pointer"
          >
            <Users className="text-gray-400 mr-2 group-hover:text-[#C29263]" size={16} />
            <div className="flex flex-col items-start flex-1">
              <span className="text-[9px] font-bold uppercase text-gray-400 leading-tight">Travelers</span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-gray-800">
                  {totalGuests} {totalGuests > 1 ? "People" : "Person"}
                </span>
                <ChevronDown size={12} className={`text-gray-400 transition-transform ${showGuests ? "rotate-180" : ""}`} />
              </div>
            </div>
          </div>

          {showGuests && (
            <div className="absolute top-full left-0 lg:left-auto lg:right-0 mt-2 w-full sm:w-72 bg-white rounded-2xl shadow-2xl p-4 border border-gray-100 z-[100] animate-in fade-in zoom-in duration-200">
              <div className="space-y-4">
                <CounterRow label="Adults" sub="12+" count={counts.adults} onDec={() => updateCount("adults", "dec")} onInc={() => updateCount("adults", "inc")} />
                <CounterRow label="Children" sub="2-12" count={counts.children} onDec={() => updateCount("children", "dec")} onInc={() => updateCount("children", "inc")} />
                <CounterRow label="Infants" sub="Under 2" count={counts.infants} onDec={() => updateCount("infants", "dec")} onInc={() => updateCount("infants", "inc")} />
              </div>
              <button onClick={() => setShowGuests(false)} className="w-full mt-4 py-2.5 bg-[#1D3178] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-colors">
                Apply
              </button>
            </div>
          )}
        </div>

        {/* Search Button - Smaller padding on mobile */}
        <div className="w-full lg:w-auto p-1">
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-[#C29263] to-[#A67C52] text-white px-8 py-3.5 lg:py-5 rounded-full lg:rounded-full w-full font-bold uppercase text-[10px] lg:text-xs tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
          >
            <Search size={16} /> Search
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
        <span className="text-sm font-bold text-gray-800">{label}</span>
        <span className="text-[10px] text-gray-400">{sub}</span>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onDec}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-all active:scale-90 disabled:opacity-30"
          disabled={label === "Adults" ? count <= 1 : count <= 0}
        >
          <Minus size={14} />
        </button>
        <span className="text-sm font-bold text-gray-800 w-4 text-center">
          {count}
        </span>
        <button
          type="button"
          onClick={onInc}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-all active:scale-90"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}

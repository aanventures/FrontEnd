"use client";
import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Plane,
  Shield,
  Luggage,
  AlertCircle,
  Loader2,
  Filter,
  X,
} from "lucide-react";

// 1. MAIN EXPORT (Wraps the content in Suspense)
export default function FlightResultsPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-[#F5F1EB] flex flex-col items-center justify-center">
          <Loader2 className="animate-spin text-[#B39371] mb-4" size={48} />
          <h2 className="text-xl font-serif text-gray-800">Loading search engine...</h2>
        </div>
      }
    >
      <FlightResultsContent />
    </Suspense>
  );
}

// 2. ACTUAL CONTENT COMPONENT
const FlightResultsContent = () => {
  const searchParams = useSearchParams();

  const [allFlights, setAllFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Mobile filter toggle

  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [selectedStops, setSelectedStops] = useState([]);

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const adults = searchParams.get("adults") || 1;
  const children = searchParams.get("children") || 0;
  const infants = searchParams.get("infants") || 0;

  // useEffect(() => {
  //   const fetchFlights = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_URL}/api/flight/search`,
  //         {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({
  //             origin: from,
  //             destination: to,
  //             departureDate: startDate,
  //             returnDate: endDate,
  //             passengers: {
  //               adults: Number(adults),
  //               children: Number(children),
  //               infants: Number(infants),
  //             },
  //           }),
  //         }
  //       );

  //       const result = await response.json();
  //       if (result.success) {
  //         setAllFlights(result.data.flights || []);
  //       } else {
  //         setError(result.error || "No flights available for this route.");
  //       }
  //     } catch (err) {
  //       setError("Unable to connect to Tripaango Engine.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (from && to) fetchFlights();
  // }, [from, to, startDate, endDate, adults, children, infants]);

  const filteredFlights = useMemo(() => {
    return allFlights.filter((flight) => {
      const airlineMatch =
        selectedAirlines.length === 0 ||
        selectedAirlines.includes(flight.flight_details.name);
      const stopsMatch =
        selectedStops.length === 0 ||
        selectedStops.includes(flight.flight_details.stops);
      return airlineMatch && stopsMatch;
    });
  }, [allFlights, selectedAirlines, selectedStops]);

  const handleFilterToggle = (item, type) => {
    if (type === "Airlines") {
      setSelectedAirlines((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );
    } else {
      setSelectedStops((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#F5F1EB] flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="animate-spin text-[#B39371] mb-4" size={48} />
        <h2 className="text-xl font-serif text-gray-800 italic">
          Finding the best deals from {from} to {to}...
        </h2>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C2C2C] font-serif">
      {/* Hero Section */}
      <div className="relative bg-[#020D32] text-white px-4 py-10 lg:py-16">
        <div className="container mx-auto">
          <h1 className="text-2xl lg:text-4xl font-light mb-2 text-[#C9A67F]">
            Flight Search Results
          </h1>
          <p className="text-xs text-gray-400 mb-6 uppercase tracking-widest">
            {from} → {to} • {startDate}
          </p>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-2 border border-white/10">
            <div className="p-2 border border-white/10 rounded text-center">
              <p className="text-[10px] text-gray-400">FROM</p>
              <p className="font-bold text-xs md:text-sm uppercase truncate">{from}</p>
            </div>
            <div className="p-2 border border-white/10 rounded text-center">
              <p className="text-[10px] text-gray-400">TO</p>
              <p className="font-bold text-xs md:text-sm uppercase truncate">{to}</p>
            </div>
            <div className="p-2 border border-white/10 rounded text-center">
              <p className="text-[10px] text-gray-400">DATE</p>
              <p className="font-bold text-xs md:text-sm uppercase truncate">{startDate}</p>
            </div>
            <div className="p-2 border border-white/10 rounded text-center">
              <p className="text-[10px] text-gray-400">TRAVELERS</p>
              <p className="font-bold text-xs md:text-sm truncate">
                {Number(adults) + Number(children) + Number(infants)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        {/* Mobile Filter Toggle */}
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="lg:hidden flex items-center justify-center gap-2 bg-white p-3 rounded-xl border border-gray-200 font-bold text-sm shadow-sm"
        >
          <Filter size={16} /> Filter Results
        </button>

        {/* Sidebar (Desktop) / Drawer (Mobile) */}
        <aside className={`
          fixed inset-0 z-[100] bg-white p-6 transform transition-transform duration-300 lg:relative lg:translate-x-0 lg:z-0 lg:inset-auto lg:block lg:bg-transparent lg:p-0
          ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          <div className="flex items-center justify-between mb-8 lg:hidden">
            <h2 className="text-xl font-bold">Filters</h2>
            <button onClick={() => setIsFilterOpen(false)}><X /></button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-8">
            <FilterGroup
              title="Airlines"
              items={["IndiGo", "Air India", "SpiceJet", "Vistara", "Air India Express"]}
              selected={selectedAirlines}
              onChange={(item) => handleFilterToggle(item, "Airlines")}
            />
            <FilterGroup
              title="Stops"
              items={["Non-stop", "1 Stop", "2+ Stops"]}
              selected={selectedStops}
              onChange={(item) => handleFilterToggle(item, "Stops")}
            />
            <button 
              onClick={() => setIsFilterOpen(false)}
              className="w-full lg:hidden bg-[#020D32] text-white py-3 rounded-xl font-bold"
            >
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Results Area */}
        <section>
          {/* Top Recommendations - Horizontal scroll on mobile */}
          <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar lg:grid lg:grid-cols-2 lg:overflow-visible mb-6">
            {allFlights
              .filter((f) => f.tag)
              .map((flight, i) => (
                <div key={i} className="min-w-[280px] lg:min-w-0">
                  <TopTagCard flight={flight} />
                </div>
              ))}
          </div>

          {/* Detailed Flight List */}
          <div className="space-y-4">
            {filteredFlights.length > 0 ? (
              filteredFlights.map((flight, index) => (
                <FlightCard key={index} flight={flight} from={from} to={to} />
              ))
            ) : (
              <div className="bg-white p-12 rounded-2xl text-center border border-gray-100">
                <p className="text-gray-400 italic">No flights matching your filters.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

// COMPONENT: Responsive Flight Card
const FlightCard = ({ flight, from, to }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Airline Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#020D32] text-[#C9A67F] rounded-full flex items-center justify-center font-bold text-sm md:text-base">
            {flight.flight_details.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-sm md:text-lg">{flight.flight_details.name}</p>
            <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-tighter">
              {flight.flight_details.number} • {flight.flight_details.aircraft_type}
            </p>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="flex items-center justify-between md:justify-center gap-4 md:gap-8 text-center flex-1">
          <div className="text-left md:text-center">
            <p className="text-lg md:text-xl font-bold">08:00</p>
            <p className="text-[10px] text-gray-400 uppercase font-bold">{from}</p>
          </div>
          <div className="flex flex-col items-center flex-1 max-w-[120px]">
            <p className="text-[9px] text-[#B39371] uppercase font-black">{flight.flight_details.stops}</p>
            <div className="h-[1px] w-full bg-gray-200 relative my-1.5">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#B39371]"></div>
            </div>
            <p className="text-[10px] text-gray-400">
              {Math.floor(flight.flight_details.duration_minutes / 60)}h {flight.flight_details.duration_minutes % 60}m
            </p>
          </div>
          <div className="text-right md:text-center">
            <p className="text-lg md:text-xl font-bold">10:45</p>
            <p className="text-[10px] text-gray-400 uppercase font-bold">{to}</p>
          </div>
        </div>

        {/* Pricing */}
        <div className="text-left md:text-right border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-8">
          <p className="text-[10px] text-gray-400 uppercase font-bold">Fare</p>
          <p className="text-xl md:text-2xl font-bold text-[#020D32]">
            ₹{flight.pricing.per_adult_fare.toLocaleString()}
          </p>
          <p className="text-[10px] text-[#B39371] font-bold">Total: ₹{flight.pricing.total_group_fare.toLocaleString()}</p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-5 pt-4 border-t border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1"><Luggage size={14} /> {flight.flight_details.baggage}</span>
          <span className="flex items-center gap-1"><Shield size={14} /> Partial Refund</span>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {flight.platforms.map((p, idx) => (
            <a
              key={idx}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border border-[#B39371] text-[#B39371] hover:bg-[#B39371] hover:text-white transition-all"
            >
              Book via {p.platform}
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// COMPONENT: Recommendation Tag
const TopTagCard = ({ flight }) => (
  <div className="bg-white p-4 rounded-2xl border-2 border-[#C9A67F] shadow-sm relative overflow-hidden h-full">
    <div className="absolute top-0 right-0 bg-[#C9A67F] text-white px-3 py-1 text-[9px] font-black uppercase rounded-bl-lg">
      {flight.tag}
    </div>
    <p className="text-[10px] text-gray-400 font-black uppercase mb-1">{flight.flight_details.name}</p>
    <div className="flex justify-between items-end">
      <div>
        <p className="text-xl font-black text-[#020D32]">₹{flight.pricing.per_adult_fare.toLocaleString()}</p>
        <p className="text-[9px] text-gray-500 uppercase font-bold tracking-tighter">{flight.flight_details.duration_minutes} min journey</p>
      </div>
      <Plane className="text-gray-100 -rotate-45" size={32} />
    </div>
  </div>
);

const FilterGroup = ({ title, items, selected, onChange }) => (
  <div className="space-y-3">
    <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">{title}</h3>
    <div className="space-y-2">
      {items.map((item) => (
        <label key={item} className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer group">
          <input
            type="checkbox"
            checked={selected.includes(item)}
            onChange={() => onChange(item)}
            className="w-4 h-4 rounded border-gray-300 text-[#B39371] focus:ring-[#B39371] cursor-pointer"
          />
          <span className="group-hover:text-[#B39371] transition-colors">{item}</span>
        </label>
      ))}
    </div>
  </div>
);
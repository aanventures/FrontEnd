"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  Plane,
  Clock,
  Shield,
  Luggage,
  AlertCircle,
  Loader2,
} from "lucide-react";

const FlightResultsPage = () => {
  const searchParams = useSearchParams();

  // 1. STATE MANAGEMENT
  const [allFlights, setAllFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [selectedStops, setSelectedStops] = useState([]);

  // Extract Search Params from URL
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const adults = searchParams.get("adults") || 1;
  const children = searchParams.get("children") || 0;
  const infants = searchParams.get("infants") || 0;

  // 2. DATA FETCHING LOGIC
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/flight/search`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              origin: from,
              destination: to,
              departureDate: startDate,
              returnDate: endDate,
              passengers: {
                adults: Number(adults),
                children: Number(children),
                infants: Number(infants),
              },
            }),
          },
        );

        const result = await response.json();
        if (result.success) {
          // result.data.flights is the array stored in your Mongoose Cache
          setAllFlights(result.data.flights || []);
        } else {
          setError(result.error || "Failed to fetch flights");
        }
      } catch (err) {
        setError("Unable to connect to Tripaango Engine.");
      } finally {
        setLoading(false);
      }
    };

    if (from && to) fetchFlights();
  }, [from, to, startDate, endDate, adults, children, infants]);

  // 3. FILTERING LOGIC (Computed)
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
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
      );
    } else {
      setSelectedStops((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
      );
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#F5F1EB] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#B39371] mb-4" size={48} />
        <h2 className="text-xl font-serif text-gray-800">
          Tripaango is finding the best deals...
        </h2>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-[#F5F1EB] flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="text-red-500 mb-4" size={48} />
        <h2 className="text-2xl font-serif mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-600 max-w-md">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 bg-[#B39371] text-white px-6 py-2 rounded"
        >
          Try Again
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F5F1EB] text-[#2C2C2C] font-serif">
      {/* Hero Section */}
      <div className="relative bg-[#020D32] text-white px-6 py-12 lg:py-20">
        <div className="container mx-auto">
          <h1 className="text-3xl lg:text-4xl font-light mb-4 text-[#C9A67F]">
            Compare and Book Flights
          </h1>
          <p className="text-sm text-gray-400 mb-8 capitalize">
            Home &gt; {from} to {to}
          </p>

          {/* Dynamic Search Display */}
          <div className="bg-white text-black p-4 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-4 shadow-xl border border-gray-200">
            <div className="p-3 border rounded bg-gray-50 font-bold uppercase text-xs">
              {from}
            </div>
            <div className="p-3 border rounded bg-gray-50 font-bold uppercase text-xs">
              {to}
            </div>
            <div className="p-3 border rounded bg-gray-50 font-bold uppercase text-xs">
              {startDate}
            </div>
            <div className="p-3 border rounded bg-gray-50 font-bold uppercase text-xs">
              {Number(adults) + Number(children) + Number(infants)} Travelers
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 mt-10">
        {/* Filters Sidebar */}
        <aside className="hidden lg:block bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-8 h-fit">
          <h2 className="text-lg font-bold text-[#B39371]">Filters</h2>
          <FilterGroup
            title="Airlines"
            items={[
              "IndiGo",
              "Air India",
              "SpiceJet",
              "Vistara",
              "Air India Express",
            ]}
            selected={selectedAirlines}
            onChange={(item) => handleFilterToggle(item, "Airlines")}
          />
          <FilterGroup
            title="Stops"
            items={["Non-stop", "1 Stop", "2+ Stops"]}
            selected={selectedStops}
            onChange={(item) => handleFilterToggle(item, "Stops")}
          />
        </aside>

        {/* Results Area */}
        <section>
          <h2 className="text-xl lg:text-2xl font-light mb-8 text-[#B39371]">
            Available Options from{" "}
            <span className="font-bold uppercase">{from}</span> to{" "}
            <span className="font-bold uppercase">{to}</span>
          </h2>

          {/* Top Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {allFlights
              .filter((f) => f.tag)
              .map((flight, i) => (
                <TopTagCard key={i} flight={flight} />
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
                <p className="text-gray-400">
                  No flights found matching your selected filters.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

// SUB-COMPONENT: Flight Card
const FlightCard = ({ flight, from, to }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#020D32] text-[#C9A67F] rounded-full flex items-center justify-center font-bold">
            {flight.flight_details.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-lg">{flight.flight_details.name}</p>
            <p className="text-xs text-gray-500">
              {flight.flight_details.number} •{" "}
              {flight.flight_details.aircraft_type}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-8 text-center">
          <div>
            <p className="text-xl font-bold">08:00</p>
            <p className="text-xs text-gray-400 uppercase">{from}</p>
          </div>
          <div className="flex flex-col items-center min-w-[100px]">
            <p className="text-[10px] text-gray-400 uppercase font-bold">
              {flight.flight_details.stops}
            </p>
            <div className="h-[2px] w-full bg-gray-200 relative my-1">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#B39371]"></div>
            </div>
            <p className="text-[10px] text-gray-500">
              {Math.floor(flight.flight_details.duration_minutes / 60)}h{" "}
              {flight.flight_details.duration_minutes % 60}m
            </p>
          </div>
          <div>
            <p className="text-xl font-bold">10:45</p>
            <p className="text-xs text-gray-400 uppercase">{to}</p>
          </div>
        </div>

        <div className="text-right border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-8">
          <p className="text-xs text-gray-400">Per Adult</p>
          <p className="text-2xl font-bold text-[#2C2C2C]">
            ₹{flight.pricing.per_adult_fare.toLocaleString()}
          </p>
          <p className="text-[10px] text-[#B39371] font-bold mt-1">
            Total: ₹{flight.pricing.total_group_fare.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-50 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-4 text-[11px] text-gray-500 font-medium">
          <span className="flex items-center gap-1">
            <Luggage size={14} /> {flight.flight_details.baggage}
          </span>
          <span className="flex items-center gap-1">
            <Shield size={14} /> Partial Refundable
          </span>
        </div>
        <div className="flex gap-2">
          {flight.platforms.map((p, idx) => (
            <a
              key={idx}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-xs font-bold border border-[#B39371] text-[#B39371] hover:bg-[#B39371] hover:text-white transition-colors"
            >
              Book via {p.platform}
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const TopTagCard = ({ flight }) => (
  <div className="bg-white p-5 rounded-2xl border-2 border-[#C9A67F] shadow-sm relative overflow-hidden">
    <div className="absolute top-0 right-0 bg-[#C9A67F] text-white px-3 py-1 text-[10px] font-bold uppercase rounded-bl-lg">
      {flight.tag}
    </div>
    <p className="text-xs text-gray-400 font-bold uppercase mb-1">
      {flight.flight_details.name}
    </p>
    <div className="flex justify-between items-end">
      <div>
        <p className="text-2xl font-bold">
          ₹{flight.pricing.per_adult_fare.toLocaleString()}
        </p>
        <p className="text-[10px] text-gray-500">
          {flight.flight_details.duration_minutes} min duration
        </p>
      </div>
      <Plane className="text-gray-100 -rotate-45" size={40} />
    </div>
  </div>
);

const FilterGroup = ({ title, items, selected, onChange }) => (
  <div className="space-y-3">
    <h3 className="text-xs font-bold uppercase text-gray-400 tracking-widest">
      {title}
    </h3>
    {items.map((item) => (
      <label
        key={item}
        className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer hover:text-[#B39371]"
      >
        <input
          type="checkbox"
          checked={selected.includes(item)}
          onChange={() => onChange(item)}
          className="w-4 h-4 rounded border-gray-300 text-[#B39371] focus:ring-[#B39371]"
        />
        {item}
      </label>
    ))}
  </div>
);

export default FlightResultsPage;

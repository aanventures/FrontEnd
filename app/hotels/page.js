"use client";
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Star, MapPin, Coffee, ShieldCheck, Wifi, Car, Search, ChevronRight, Clock } from 'lucide-react';

const hotelsData = {
  mmt: { ota: 'MakeMyTrip.com', price: '₹8,250', duration: 'Best Value', features: 'Free Cancelation' },
  booking: { ota: 'Booking.com', price: '₹8,150', duration: 'Lowest Price', features: 'Pay at Hotel' },
  cleartrip: { ota: 'Cleartrip.com', price: '₹8,300', duration: 'Premium Choice', features: 'Breakfast Included' },
  detailedHotels: [
    { name: 'Kingsbury Grand', rating: 4, location: '1.5 km From India Gate', features: ['Set-key Room', 'Free Cancelation', 'Breakfast'], price: '₹8,150', ota: 'IndiGo Hotels', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800' },
    { name: 'Imperial Plaza', rating: 3, location: '2.2 km From Connaught Place', features: ['WiFi', 'Parking', 'Breakfast'], price: '₹6,875', ota: 'Booking.com', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800' },
    { name: 'Heritage Royale', rating: 5, location: '0.5 km From Airport', features: ['Pool', 'Gym', 'Free Cancelation'], price: '₹12,600', ota: 'MakeMyTrip.com', image: 'https://images.unsplash.com/photo-1551882547-ff43c63efe8c?auto=format&fit=crop&q=80&w=800' },
  ]
};

const HotelResultsPage = () => {
  return (
    <main className="min-h-screen bg-[#FAF7F2] font-montserrat text-slate-900 pt-[90px]">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative w-full pb-10 sm:pb-0 sm:h-[400px] bg-slate-900 flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1600"
          alt="Hotel Banner"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#FAF7F2] z-10" />

        <div className="relative z-20 container mx-auto px-6 text-center">
          {/* <p className="text-amber-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4">Luxury Stays & Comfort</p>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none m-0">
            Delhi <span className="text-amber-500 not-italic">Hotels</span>
          </h1> */}
          
          {/* Compact Search Bar Overlay */}
          <div className="mt-12 max-w-5xl mx-auto bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 border border-slate-100">
             <div className="flex-1 flex items-center px-4 py-3 gap-3 border-r border-slate-50">
                <MapPin size={18} className="text-amber-600" />
                <input type="text" defaultValue="Delhi, India" className="w-full outline-none font-bold text-sm text-slate-700 bg-transparent" />
             </div>
             <div className="flex-1 flex items-center px-4 py-3 gap-3 border-r border-slate-50">
                <Clock size={18} className="text-amber-600" />
                <span className="text-sm font-bold text-slate-700 whitespace-nowrap">14 Jun - 17 Jun</span>
             </div>
             <button className="bg-amber-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-900 transition-all active:scale-95 flex items-center justify-center gap-2">
                Update <Search size={14} />
             </button>
          </div>
        </div>
      </section>

      {/* 2. RESULTS GRID */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
        
        {/* Filters Sidebar */}
        <aside className="space-y-8">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <h2 className="text-xl font-black text-slate-900 mb-8 tracking-tight border-b border-slate-50 pb-4">Filters</h2>
            
            <FilterGroup title="Star Rating" items={['5 Stars', '4 Stars', '3 Stars']} />
            <FilterGroup title="Price Range" items={['Under ₹2,000', '₹2,000 - ₹5,000', '₹5,000+']} />
            <FilterGroup title="Amenities" items={['WiFi', 'Pool', 'Breakfast', 'Parking']} />
          </div>
        </aside>

        {/* Results Area */}
        <section className="space-y-10">
          
          {/* Top Comparison Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <OTACard data={hotelsData.mmt} />
            <OTACard data={hotelsData.booking} />
            <OTACard data={hotelsData.cleartrip} />
          </div>

          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Best Deals in New Delhi</h2>

          {/* Hotel List */}
          <div className="space-y-6">
            {hotelsData.detailedHotels.map((hotel, index) => (
              <div key={index} className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col md:flex-row">
                
                {/* Hotel Image */}
                <div className="md:w-72 h-64 md:h-auto relative overflow-hidden">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                    <span className="text-[10px] font-black">{hotel.rating}.0</span>
                  </div>
                </div>

                {/* Info Content */}
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-amber-600 transition-colors tracking-tight">{hotel.name}</h3>
                    <div className="flex items-center gap-1 text-slate-400 text-xs font-bold mb-6">
                       <MapPin size={12} /> {hotel.location}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                       {hotel.features.map(f => (
                         <div key={f} className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                            <CheckCircle2 size={12} className="text-amber-600" />
                            <span className="text-[10px] font-black uppercase text-slate-500">{f}</span>
                         </div>
                       ))}
                    </div>
                  </div>
                </div>

                {/* Pricing Area */}
                <div className="md:w-64 bg-slate-50/50 p-8 flex flex-col items-center justify-center border-l border-slate-100 text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Via {hotel.ota}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl font-black text-slate-900">{hotel.price}</span>
                    <span className="text-[10px] font-black text-slate-400">/night</span>
                  </div>
                  <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-amber-600 transition-all shadow-xl shadow-slate-200">
                    View Deal
                  </button>
                </div>

              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

/* --- Sub-Components --- */

const FilterGroup = ({ title, items }) => (
  <div className="mb-10 last:mb-0">
    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">{title}</h3>
    <div className="space-y-4">
      {items.map(item => (
        <label key={item} className="flex items-center gap-3 cursor-pointer group">
          <div className="relative flex items-center justify-center">
            <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-slate-100 rounded-lg checked:bg-amber-600 checked:border-amber-600 transition-all" />
            <div className="absolute opacity-0 peer-checked:opacity-100 text-white font-bold text-[10px]">✓</div>
          </div>
          <span className="text-sm font-bold text-slate-600 group-hover:text-amber-600 transition-colors">{item}</span>
        </label>
      ))}
    </div>
  </div>
);

const OTACard = ({ data }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-lg shadow-slate-200/30 flex flex-col items-center text-center hover:border-amber-500 transition-all group">
    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center font-black text-amber-600 mb-4 group-hover:bg-amber-600 group-hover:text-white transition-all">
        {data.ota.charAt(0)}
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{data.ota}</p>
    <p className="text-2xl font-black text-slate-900 mb-1">{data.price}</p>
    <p className="text-[10px] font-black text-amber-600 uppercase tracking-tighter">{data.duration}</p>
  </div>
);

/* Utility Icons added locally for the file */
const CheckCircle2 = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default HotelResultsPage;
"use client";
import { useState } from "react";
import { 
  Save, MapPin, IndianRupee, BedDouble, Image as ImageIcon, 
  Users, Bath, ShieldCheck, Clock, Globe, Info, ListChecks 
} from "lucide-react";

export default function AddPropertyPage() {
  const [formData, setFormData] = useState({
    title: "", description: "", price: "", location: "", propertyname: "",
    state: "", country: "", pincode: "", category: "Villa", maxGuest: 1,
    bedrooms: 0, beds: 0, washrooms: 0, securityDeposit: 0, summary: "",
    aboutSpace: "", cancellationPolicy: "", directionUrl: "", executiveName: "",
    executiveNumber: "", isLive: false, isHomePage: false,
    checkIn: { time: "" }, checkOut: { time: "" },
    amenities: "", houseRules: "", thingsToKnow: ""
  });

  const categories = ["Apartment", "House", "Villa", "Studio", "Office"];

  return (
    <div className="max-w-6xl mx-auto pb-20 space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Add New Property</h2>
          <p className="text-sm text-slate-500">Fill all required fields to list the property.</p>
        </div>
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-2xl font-bold shadow-lg flex items-center gap-2 transition-all active:scale-95">
          <Save size={18} /> Publish Property
        </button>
      </div>

      <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Basic & Location Info */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section 1: Core Details */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Info size={18} className="text-orange-600"/> Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Property Title *</label>
                <input required type="text" className="w-full mt-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-orange-500/10 outline-none" 
                  onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Building/Property Name</label>
                <input type="text" className="w-full mt-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none" 
                  onChange={(e) => setFormData({...formData, propertyname: e.target.value})} />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category *</label>
                <select required className="w-full mt-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold"
                  onChange={(e) => setFormData({...formData, category: e.target.value})}>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Location Details */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <MapPin size={18} className="text-orange-600"/> Address & Location
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Exact Location *</label>
                <input required type="text" className="w-full mt-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none" 
                  onChange={(e) => setFormData({...formData, location: e.target.value})} />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">State</label>
                <input type="text" className="w-full mt-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none" 
                   onChange={(e) => setFormData({...formData, state: e.target.value})} />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pincode</label>
                <input type="text" className="w-full mt-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none" 
                   onChange={(e) => setFormData({...formData, pincode: e.target.value})} />
              </div>
              <div className="col-span-full">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Direction URL (Google Maps)</label>
                 <input type="url" className="w-full mt-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none" 
                    onChange={(e) => setFormData({...formData, directionUrl: e.target.value})} />
              </div>
            </div>
          </div>

          {/* Section 3: Descriptions */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
             <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <ListChecks size={18} className="text-orange-600"/> Content & Rules
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Summary (300 chars)</label>
                <textarea maxLength="300" className="w-full mt-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none" rows="2"
                  onChange={(e) => setFormData({...formData, summary: e.target.value})}></textarea>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">About Space (Full Description)</label>
                <textarea maxLength="2000" className="w-full mt-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none" rows="5"
                  onChange={(e) => setFormData({...formData, aboutSpace: e.target.value})}></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Configuration & Media */}
        <div className="space-y-8">
          
          {/* Price & Deposit */}
          <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-white space-y-6">
            <div>
              <label className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Price per night *</label>
              <div className="relative mt-2">
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input required type="number" className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/10 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none font-bold text-xl" 
                  onChange={(e) => setFormData({...formData, price: e.target.value})} />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Security Deposit</label>
              <input type="number" className="w-full mt-2 p-4 bg-white/10 border border-white/10 rounded-2xl outline-none" 
                onChange={(e) => setFormData({...formData, securityDeposit: e.target.value})} />
            </div>
          </div>

          {/* Stats & Guests */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
            <div className="flex justify-between items-center text-sm font-bold text-slate-600">
              <span className="flex items-center gap-2"><Users size={16}/> Max Guests</span>
              <input type="number" className="w-16 bg-slate-50 p-2 rounded-lg text-center" defaultValue="1"
                 onChange={(e) => setFormData({...formData, maxGuest: e.target.value})} />
            </div>
            <div className="flex justify-between items-center text-sm font-bold text-slate-600">
              <span className="flex items-center gap-2"><BedDouble size={16}/> Bedrooms</span>
              <input type="number" className="w-16 bg-slate-50 p-2 rounded-lg text-center"
                 onChange={(e) => setFormData({...formData, bedrooms: e.target.value})} />
            </div>
            <div className="flex justify-between items-center text-sm font-bold text-slate-600">
              <span className="flex items-center gap-2"><Bath size={16}/> Washrooms</span>
              <input type="number" className="w-16 bg-slate-50 p-2 rounded-lg text-center"
                 onChange={(e) => setFormData({...formData, washrooms: e.target.value})} />
            </div>
          </div>

          {/* Timing (CheckIn/Out) */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Clock size={14}/> Timings
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Check-In Time" className="p-3 bg-slate-50 rounded-xl text-xs border border-slate-100 outline-none" 
                onChange={(e) => setFormData({...formData, checkIn: { ...formData.checkIn, time: e.target.value }})} />
              <input type="text" placeholder="Check-Out Time" className="p-3 bg-slate-50 rounded-xl text-xs border border-slate-100 outline-none" 
                onChange={(e) => setFormData({...formData, checkOut: { ...formData.checkOut, time: e.target.value }})} />
            </div>
          </div>

          {/* Switches (Live / HomePage) */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm font-bold text-slate-700">Set as Live</span>
              <input type="checkbox" className="w-5 h-5 accent-orange-600" 
                onChange={(e) => setFormData({...formData, isLive: e.target.checked})} />
            </label>
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm font-bold text-slate-700">Show on Home Page</span>
              <input type="checkbox" className="w-5 h-5 accent-blue-600" 
                onChange={(e) => setFormData({...formData, isHomePage: e.target.checked})} />
            </label>
          </div>

        </div>
      </form>
    </div>
  );
}
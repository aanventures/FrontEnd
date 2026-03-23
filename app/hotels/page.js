import React from 'react';
import Head from 'next/head';

const hotelsData = {
  mmt: { ota: 'MakeMyTrip.com', price: '₹8,250', duration: 'From 3h 30mins', features: 'Free Check-In, Starts' },
  booking: { ota: 'Booking.com', price: '₹8,150', duration: 'From 2h 50min', features: 'Free Check-In, Starts' },
  cleartrip: { ota: 'Cleartrip.com', price: '₹8,300', duration: 'From 2h 55min', features: 'Free Check-In, Seats' },
  detailedHotels: [
    { name: 'Kingsbury Grand', rating: '4 star', location: '1.5 km From India Gate', features: ['Set-key Room', 'Free Cancelation', 'Breakfast', 'Deals included'], price: '₹8,150', ota: 'IndiGo (example OTA label)' },
    { name: 'Imperial Plaza', rating: '3 star', location: '1.5 km From Major Road', features: ['Set-key Room', 'Free Cancelation', 'Breakfast', 'Deals included'], price: '₹6,875', ota: 'Booking.com (example)' },
    { name: 'Heritage Royale', rating: '3 star', location: '1.5 km From major Landmark', features: ['Set-key Room', 'Free Cancelation', 'Breakfast', 'Deals included'], price: '₹5,600', ota: 'MakeMyTrip.com (example)' },
  ]
};

const HotelResultsPage = () => {
  return (
    <>
      <Head>
        <title>Tripaango | Compare and Book Hotels in Delhi</title>
      </Head>

      <div className="min-h-screen bg-[#F5F1EB] text-[#2C2C2C] font-serif">
        {/* Header/Navbar (identical to flights) */}
        <header className="bg-white border-b border-gray-100 shadow-sm">
          <nav className="container mx-auto px-6 py-4 flex items-center justify-between text-[#B39371]">
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-[#B39371] flex items-center justify-center text-white font-bold">T</div>
              <div>
                <span className="text-2xl font-bold">tripaango</span>
                <p className="text-xs text-gray-500">Discover, Relax and Go Beyond</p>
              </div>
            </div>
            <div className="flex items-center gap-8 text-sm font-medium">
              <span>Home</span>
              <span>Flights</span>
              <span>Hotels</span>
              <span>Cars</span>
              <span>Packages</span>
              <span>Blog</span>
              <span>Contact</span>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <div className="relative bg-[#020D32] text-white py-16 px-6">
          <div className="container mx-auto">
            <h1 className="text-4xl font-light mb-4 text-[#C9A67F]">Compare and Book Hotels in Delhi</h1>
            <p className="text-sm text-gray-400 mb-10">Home &gt; Delhi (DEL)</p>
            
            {/* Hotel Search Bar */}
            <div className="bg-white text-black p-4 rounded-lg flex items-center gap-4 shadow-xl border border-gray-200">
              <input type="text" defaultValue="Delhi (DEL)" className="flex-1 p-3 border rounded border-gray-300" />
              <input type="date" defaultValue="2024-06-14" className="p-3 border rounded border-gray-300" />
              <input type="date" defaultValue="2024-06-17" className="p-3 border rounded border-gray-300" />
              <input type="text" defaultValue="2 Guests, 1 Room" className="w-48 p-3 border rounded border-gray-300" />
              <button className="bg-[#B39371] text-white px-8 py-3 rounded font-medium hover:bg-[#997E61]">Search Again</button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto p-6 grid grid-cols-[250px_1fr] gap-8 mt-10">
          
          {/* Filters Sidebar (simplified) */}
          <aside className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-8">
            <h2 className="text-lg font-bold text-[#B39371] mb-6">Filters</h2>
            <FilterGroup title="Price" items={['₹0 - ₹2000', '₹2000 - ₹5000', '₹5000+']} />
            <FilterGroup title="Star Rating" items={['5 Stars', '4 Stars', '3 Stars', '2 Stars']} />
            <FilterGroup title="Amenities" items={['Free WiFi', 'Breakfast', 'Pool', 'Parking']} />
          </aside>

          {/* Results Area */}
          <section>
            <h2 className="text-2xl font-light mb-8 text-[#B39371]">Compare and Book Hotels in Delhi</h2>
            
            {/* OTA Comparison Cards (identical to flights for consistancy) */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              <OTACard data={hotelsData.mmt} />
              <OTACard data={hotelsData.booking} />
              <OTACard data={hotelsData.cleartrip} />
            </div>

            {/* Detailed Hotel List */}
            <div className="space-y-6">
              {hotelsData.detailedHotels.map((hotel, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm flex gap-6 hover:shadow-lg transition-all">
                  
                  {/* Hotel Image Placeholder */}
                  <div className="w-48 h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 font-bold text-lg">Hotel Image</div>

                  {/* Hotel Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className='flex items-center gap-3 mb-1'>
                        <h3 className="text-xl font-bold">{hotel.name}</h3>
                        <span className="text-xs text-white bg-[#B39371] px-2 py-0.5 rounded-full font-bold">{hotel.rating}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{hotel.location}</p>
                      
                      {/* Amenity tags */}
                      <div className="flex flex-wrap gap-2">
                        {hotel.features.map(feature => (
                          <span key={feature} className="text-xs bg-gray-100 text-[#B39371] px-3 py-1 rounded-full font-medium">✓ {feature}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="w-48 text-right flex flex-col items-end justify-between border-l border-gray-100 pl-6">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">{hotel.ota}</p>
                        <p className="text-3xl font-light tracking-tight text-[#2C2C2C] mb-2">{hotel.price}</p>
                        <p className="text-xs text-gray-500">per night</p>
                    </div>
                    <button className="bg-[#B39371] text-white w-full py-3 rounded font-medium hover:bg-[#997E61]">View Deal</button>
                  </div>

                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

// Reusable Components (identical structure to Flights, just imported here for reference within the file)
const FilterGroup = ({ title, items }) => (
  <div className="border-t border-gray-100 pt-6">
    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-4">{title}</h3>
    <div className="space-y-3">
      {items.map(item => (
        <label key={item} className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#B39371] focus:ring-[#B39371]" />
          {item}
        </label>
      ))}
    </div>
  </div>
);

const OTACard = ({ data }) => (
  <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm flex flex-col justify-between hover:border-[#B39371] transition-all">
    <div className='flex items-center gap-3 mb-4 border-b border-gray-100 pb-4'>
        <div className='w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-[#B39371]'>{data.ota.charAt(0)}</div>
        <p className="font-bold text-gray-900">{data.ota}</p>
    </div>
    <div className='text-center space-y-3'>
        <p className="text-3xl font-light tracking-tight text-[#2C2C2C]">{data.price}</p>
        <p className="text-sm text-gray-500">{data.duration}</p>
    </div>
    <div className='mt-6 border-t border-gray-100 pt-4'>
        <p className="text-sm text-[#B39371] font-medium">{data.features}</p>
    </div>
  </div>
);

export default HotelResultsPage;
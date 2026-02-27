import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-gray-100 text-gray-800">

      {/* ================= HERO SECTION (refactored to match nav colors/spacing) ================= */}
      <section className="relative max-w-7xl mx-auto mt-12 rounded-3xl overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
          alt="hero"
          width={1400}
          height={700}
          className="w-full h-[520px] object-cover"
        />

        {/* soft light overlay to keep image visible but make text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-black/20"></div>

        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              Easy planning for your
              <span className="text-blue-600"> dream adventure</span>
              <span className="text-slate-700"> — made simple.</span>
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Seashi keeps customers happy by offering clear choices, flexible bookings, and curated experiences.
            </p>

            {/* Search Bar aligned with navigation colors and spacing */}
            <div className="mt-8 bg-white shadow-md rounded-full flex items-center gap-3 p-3 w-full max-w-3xl">
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="flex-1 px-4 py-3 rounded-full text-slate-700 placeholder-slate-400 focus:outline-none"
              />
              <input
                type="date"
                className="px-4 py-3 rounded-full text-slate-700 placeholder-slate-400 focus:outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DESTINATIONS ================= */}
      <section className="max-w-7xl mx-auto mt-20 px-6">
        <div className="grid md:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
            <Image
              src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=800&auto=format&fit=crop"
              alt="place"
              width={400}
              height={300}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">Kelingking Beach</h3>
              <p className="text-sm text-gray-500">Nusa Penida, Indonesia</p>
              <p className="mt-2 font-bold text-blue-600">$224 / Person</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
            <Image
              src="https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=800&auto=format&fit=crop"
              alt="place"
              width={400}
              height={300}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">Interlaken House</h3>
              <p className="text-sm text-gray-500">Bern, Switzerland</p>
              <p className="mt-2 font-bold text-blue-600">$224 / Person</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
            <Image
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop"
              alt="place"
              width={400}
              height={300}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">Spruce Mountain</h3>
              <p className="text-sm text-gray-500">West Virginia, US</p>
              <p className="mt-2 font-bold text-blue-600">$224 / Person</p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= WHY US SECTION ================= */}
      <section className="max-w-7xl mx-auto mt-28 px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
            How it works?
          </span>
          <h2 className="text-4xl font-bold mt-4">
            The journey is more important than the goal.
          </h2>

          <ul className="mt-8 space-y-6 text-gray-600">
            <li>
              <strong>01 / Enjoy some flexibility</strong>
              <p className="text-sm mt-2">
                Flexible booking options for stress-free planning.
              </p>
            </li>
            <li>
              <strong>02 / More than 7M active listings</strong>
            </li>
            <li>
              <strong>03 / 100+ filters for tailored stays</strong>
            </li>
          </ul>
        </div>

        <Image
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop"
          alt="why"
          width={600}
          height={500}
          className="rounded-3xl object-cover"
        />
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="relative max-w-7xl mx-auto mt-28 rounded-3xl overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=1600&auto=format&fit=crop"
          alt="cta"
          width={1400}
          height={500}
          className="w-full h-[350px] object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
          <h2 className="text-4xl font-bold">
            Prepared to Start Your Next Journey?
          </h2>
          <div className="mt-6 flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold text-sm transition">
              Booking Now
            </button>
            <button className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black text-white text-sm transition">
              Explore More
            </button>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="max-w-5xl mx-auto mt-28 px-6 text-center">
        <h2 className="text-3xl font-bold">Frequently Asked Question</h2>

        <div className="mt-10 text-left space-y-6">
          <div>
            <h3 className="font-semibold">What is Seashi and how does it work?</h3>
            <p className="text-gray-600 text-sm mt-2">
              We verify personal profiles and listings to make sharing easy and safe.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">How do I use search filters?</h3>
            <p className="text-gray-600 text-sm mt-2">
              Use filters to find stays that match your needs.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              What if I need to cancel due to a problem?
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Contact your host directly and resolve the issue.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="mt-24 bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold">Seashi</h3>
            <p className="mt-4 text-sm">
              Search-friendly apartments made easy for you.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold">Company</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>About</li>
              <li>Pricing</li>
              <li>Blog</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold">Product</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Marketplace</li>
              <li>Terms</li>
              <li>Privacy</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold">Help Center</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Community</li>
              <li>Knowledge Base</li>
              <li>Support</li>
            </ul>
          </div>
        </div>

        <div className="text-center text-sm mt-10 text-gray-500">
          © 2024 Seashi. All rights reserved.
        </div>
      </footer>

    </main>
  );
}
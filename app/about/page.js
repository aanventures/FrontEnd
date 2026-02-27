'use client';

export default function About() {
  return (
    <div className="w-full bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-32">
        <div className="text-center space-y-6">
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            About Our Property Platform
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Connecting people with their dream properties through innovative technology and dedicated service.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-100">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed">
              To revolutionize the real estate industry by making property search, buying, and selling seamless, transparent, and accessible to everyone.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-100">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Vision</h2>
            <p className="text-slate-600 leading-relaxed">
              To be the most trusted and innovative property platform, where buyers and sellers connect effortlessly in a secure and transparent environment.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '🏠',
              title: 'Verified Properties',
              desc: 'All properties are verified and authenticated for your peace of mind.'
            },
            {
              icon: '🔒',
              title: 'Secure Transactions',
              desc: 'Safe and encrypted transactions to protect your personal information.'
            },
            {
              icon: '👥',
              title: 'Expert Support',
              desc: 'Dedicated team available 24/7 to assist you with your property journey.'
            },
            {
              icon: '⚡',
              title: 'Fast Process',
              desc: 'Quick listing and search process to find properties efficiently.'
            },
            {
              icon: '💰',
              title: 'Best Prices',
              desc: 'Transparent pricing with no hidden charges or extra fees.'
            },
            {
              icon: '📱',
              title: 'Mobile Friendly',
              desc: 'Browse properties anytime, anywhere with our mobile platform.'
            }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-200 group"
            >
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 my-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10K+', label: 'Properties Listed' },
              { number: '50K+', label: 'Happy Customers' },
              { number: '100+', label: 'Expert Agents' },
              { number: '5+', label: 'Years Experience' }
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'John Smith', role: 'CEO & Founder', color: 'from-blue-500 to-cyan-500' },
            { name: 'Sarah Johnson', role: 'Head of Operations', color: 'from-purple-500 to-pink-500' },
            { name: 'Mike Davis', role: 'Lead Developer', color: 'from-green-500 to-emerald-500' }
          ].map((member, idx) => (
            <div
              key={idx}
              className="text-center bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.color} mx-auto mb-6 flex items-center justify-center`}>
                <span className="text-white text-4xl font-bold">{member.name.charAt(0)}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{member.name}</h3>
              <p className="text-slate-600 mb-4">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-20 text-center">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-12 shadow-xl">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Find Your Perfect Property?</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers who have found their dream homes with us.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
}
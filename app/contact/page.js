'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Address',
      content: '123 Property Lane, Real Estate City, RC 12345'
    },
    {
      icon: '📞',
      title: 'Phone',
      content: '+1 (555) 123-4567'
    },
    {
      icon: '📧',
      title: 'Email',
      content: 'info@property.com'
    },
    {
      icon: '⏰',
      title: 'Business Hours',
      content: 'Mon - Fri: 9:00 AM - 6:00 PM\nSat - Sun: 10:00 AM - 4:00 PM'
    }
  ];

  return (
    <div className="w-full bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-32">
        <div className="text-center space-y-6">
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Get In Touch With Us
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Have questions about our properties or services? We&apos;d love to hear from you. Reach out to our team anytime.
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100 text-center group"
            >
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {info.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{info.title}</h3>
              <p className="text-slate-600 text-sm whitespace-pre-line">{info.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Send Us a Message</h2>
            {submitted && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                ✓ Thank you for your message! We&apos;ll get back to you soon.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-slate-700 font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-6 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-slate-700 font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full px-6 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-slate-700 font-semibold mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-6 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-slate-700 font-semibold mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help?"
                  className="w-full px-6 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-slate-700 font-semibold mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message here..."
                  rows="5"
                  className="w-full px-6 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Map & Additional Info */}
          <div className="space-y-8">
            {/* Map Placeholder */}
            <div className="rounded-xl overflow-hidden shadow-lg border border-slate-100 h-96 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-3">🗺️</div>
                <p className="text-slate-600 font-semibold">Map Integration</p>
                <p className="text-slate-500 text-sm">Google Maps integration coming soon</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Need Something Else?</h3>
              <div className="space-y-4">
                <a href="/about" className="block p-4 bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors group">
                  <div className="font-semibold text-slate-900 group-hover:text-blue-600">Learn More About Us</div>
                  <p className="text-sm text-slate-600">Discover our company story and mission</p>
                </a>
                <a href="/blog" className="block p-4 bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors group">
                  <div className="font-semibold text-slate-900 group-hover:text-blue-600">Read Our Blog</div>
                  <p className="text-sm text-slate-600">Get valuable insights and tips</p>
                </a>
                <Link href="/" className="block p-4 bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors group">
                  <div className="font-semibold text-slate-900 group-hover:text-blue-600">Browse Properties</div>
                  <p className="text-sm text-slate-600">Explore our current listings</p>
                </Link>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {[
                  { icon: '👍', label: 'Facebook' },
                  { icon: '🐦', label: 'Twitter' },
                  { icon: '📷', label: 'Instagram' },
                  { icon: '💼', label: 'LinkedIn' }
                ].map((social, idx) => (
                  <button
                    key={idx}
                    className="w-12 h-12 rounded-lg bg-white shadow-md hover:shadow-lg transition-all text-2xl hover:scale-110 border border-slate-200"
                    title={social.label}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              q: 'What is your response time?',
              a: 'We typically respond to inquiries within 24 hours during business days.'
            },
            {
              q: 'How can I schedule a property viewing?',
              a: 'Contact us directly or fill out the form above, and our team will arrange a convenient time.'
            },
            {
              q: 'Do you offer virtual tours?',
              a: 'Yes! We offer both virtual and in-person tours for most of our properties.'
            },
            {
              q: 'What payment methods do you accept?',
              a: 'We accept all major credit cards, bank transfers, and other secure payment methods.'
            }
          ].map((faq, idx) => (
            <div key={idx} className="bg-white rounded-lg p-6 shadow-md border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-3 text-lg">{faq.q}</h3>
              <p className="text-slate-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
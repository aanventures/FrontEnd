'use client';

import { useState } from 'react';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: 'Top 10 Tips for First-Time Home Buyers',
      excerpt: 'Essential tips and strategies to help you make informed decisions when purchasing your first home.',
      category: 'buying',
      author: 'John Smith',
      date: 'Feb 20, 2026',
      readTime: '5 min read',
      image: '🏡',
      featured: true
    },
    {
      id: 2,
      title: 'The Ultimate Guide to Home Investment',
      excerpt: 'Learn how to invest in real estate and build long-term wealth through property investment.',
      category: 'investment',
      author: 'Sarah Johnson',
      date: 'Feb 18, 2026',
      readTime: '8 min read',
      image: '📈',
      featured: true
    },
    {
      id: 3,
      title: 'Market Trends: What to Expect in 2026',
      excerpt: 'Detailed analysis of current property market trends and future predictions for the coming year.',
      category: 'market',
      author: 'Mike Davis',
      date: 'Feb 16, 2026',
      readTime: '6 min read',
      image: '📊'
    },
    {
      id: 4,
      title: 'Home Renovation Ideas on Budget',
      excerpt: 'Creative and affordable renovation ideas to increase your property value without breaking the bank.',
      category: 'lifestyle',
      author: 'Emma Wilson',
      date: 'Feb 14, 2026',
      readTime: '7 min read',
      image: '🎨'
    },
    {
      id: 5,
      title: 'Selling Your Property: A Complete Guide',
      excerpt: 'Step-by-step guide on how to prepare and sell your property for maximum return.',
      category: 'selling',
      author: 'John Smith',
      date: 'Feb 12, 2026',
      readTime: '5 min read',
      image: '💼'
    },
    {
      id: 6,
      title: 'Smart Home Technology for Modern Living',
      excerpt: 'Explore the latest smart home technologies that can enhance your living experience and property value.',
      category: 'lifestyle',
      author: 'Sarah Johnson',
      date: 'Feb 10, 2026',
      readTime: '6 min read',
      image: '🏠'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'buying', label: 'Buying' },
    { id: 'selling', label: 'Selling' },
    { id: 'investment', label: 'Investment' },
    { id: 'market', label: 'Market' },
    { id: 'lifestyle', label: 'Lifestyle' }
  ];

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="w-full bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-32">
        <div className="text-center space-y-6">
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Property Insights & Tips
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover expert advice, market trends, and valuable insights to help you make the best real estate decisions.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <input
              type="text"
              placeholder="Search articles..."
              className="px-6 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-sm"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Featured Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer border border-slate-100"
              >
                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center overflow-hidden">
                  <span className="text-8xl group-hover:scale-110 transition-transform duration-300">
                    {post.image}
                  </span>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-xs font-bold">
                        {post.author.charAt(0)}
                      </span>
                      <span>{post.author}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
                    {post.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-600 hover:text-blue-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-12">
          {selectedCategory === 'all' ? 'All Articles' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Articles`}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer border border-slate-100 hover:border-blue-200 flex flex-col"
            >
              <div className="relative h-40 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center overflow-hidden">
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                  {post.image}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs font-semibold text-blue-600 uppercase mb-2">
                  {post.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-600 mb-4 flex-grow line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-100">
                  <span>{post.readTime}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 mt-20 mb-0">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Get the latest property insights and market updates delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email..."
              className="flex-1 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-white hover:bg-slate-100 text-blue-600 font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
export default function Navigation() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          {/* <a href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a> */}
          <a href="/about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About Us</a>
          <a href="/blog" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Blog</a>
          <a href="/contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact Us</a>
        </div>
      </div>
    </nav>
  );
}
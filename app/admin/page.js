export default function AdminDashboard() {
  const stats = [
    { label: "Total Properties", value: "1,284", grow: "+12%" },
    { label: "Active Blogs", value: "42", grow: "+3%" },
    { label: "Bookings", value: "892", grow: "+18%" },
    { label: "Revenue", value: "₹4.2M", grow: "+22%" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <div className="flex items-end justify-between mt-4">
              <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">
                {stat.grow}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 min-h-[400px] flex items-center justify-center text-slate-400 italic">
        Select a menu from the sidebar to manage content...
      </div>
    </div>
  );
}
export default function AboutTimeline({ items }) {
    return (
      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.year}
            className="border-l-4 border-emerald-600 pl-5 py-2 bg-white rounded-r-xl shadow-sm"
          >
            <p className="text-emerald-700 font-bold">{item.year}</p>
            <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-slate-600">{item.description}</p>
          </div>
        ))}
      </div>
    );
  }
  
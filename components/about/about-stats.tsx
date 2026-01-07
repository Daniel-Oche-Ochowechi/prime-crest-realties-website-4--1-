export default function AboutStats() {
  const stats = [
    { number: "15+", label: "Years of Excellence" },
    { number: "2,500+", label: "Properties Sold" },
    { number: "10,000+", label: "Happy Clients" },
    { number: "₦500B+", label: "Transaction Value" },
  ]

  return (
    <section className="bg-primary text-secondary py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold mb-16 text-center tracking-wider">By The Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-6xl font-bold mb-3 tracking-wider">{stat.number}</p>
              <p className="text-xl opacity-90 tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

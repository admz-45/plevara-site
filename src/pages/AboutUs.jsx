import { useNavigate } from "react-router-dom";
import founderPhoto from "../assets/daisy-founder.png";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen text-slate-100">
      {/* Content */}
      <div className="relative" style={{ zIndex: 2 }}>
        {/* Hero */}
        <section className="min-h-[40vh] flex items-center justify-center px-6 pt-24 pb-12">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <div className="inline-block px-4 py-2 bg-blue-600/10 border border-blue-500/30 rounded-full text-sm text-blue-300 font-medium tracking-wider uppercase backdrop-blur-sm">
              Who We Are
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Built for the Industries <br />
              <span className="text-blue-400">That often go Unnoticed</span>
            </h1>
          </div>
        </section>

        {/* Story + Founder */}
        <section className="py-20 px-6 bg-slate-900/50">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
            {/* Founder Photo */}
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-blue-500/20 blur-lg" />
                <img
                  src={founderPhoto}
                  alt="Daisy EA — Founder of Plevara"
                  className="relative w-72 md:w-80 rounded-2xl object-cover shadow-2xl border border-slate-700/50"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-slate-700/50">
                  <p className="text-white font-semibold text-sm">Daisy EA</p>
                  <p className="text-blue-400 text-xs">
                    Founder, Plevara Solutions
                  </p>
                </div>
              </div>
            </div>

            {/* Story Copy */}
            <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                The Plevara Story
              </h2>
              <p>
                Plevara started with a simple observation: the businesses doing
                the most essential work — the manufacturers, the contractors,
                the HVAC engineers, the logistics operators — were being
                completely overlooked by the marketing industry.
              </p>
              <p>
                Agencies built for tech startups and e-commerce brands weren't
                equipped to speak their language, understand their sales cycles,
                or solve their actual growth problems. So those businesses
                either made do with bad advice, or gave up on growth altogether.
              </p>
              <p>
                Plevara was built to close that gap. With a structured
                diagnostic approach that finds where growth is genuinely
                breaking down, then fixes it. That's the AVOER Growth Loop™: a
                framework built specifically for industries where trust,
                reputation, and operational capacity are the real constraints.
              </p>
              <p className="text-white font-medium">
                We work with small business owners in manufacturing,
                construction, HVAC, logistics, and industrial services. If your
                business is essential but invisible, we want to talk.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => navigate("/avoer-system")}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30"
                >
                  Take the Free Growth Audit
                </button>
                <a
                  href="https://cal.com/plevara-d8kr0w/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-200 font-semibold transition-all duration-300 text-center"
                >
                  Book a Strategy Call
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Values strip */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-14">
              What We Stand For
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Diagnosis Before Prescription",
                  desc: "We don't sell services. We find your actual growth leak first — then recommend what will move the needle.",
                },
                {
                  title: "Industry Fluency",
                  desc: "We speak the language of operations, not impressions. We understand long sales cycles, referral dependency, and seasonal cash flow.",
                },
                {
                  title: "Real Growth Stats",
                  desc: "No vanity metrics. No retainers for activity that doesn't convert. Every engagement is tied to a measurable outcome.",
                },
              ].map((value, i) => (
                <div
                  key={i}
                  className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl"
                >
                  <h3 className="text-xl font-bold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

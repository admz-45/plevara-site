import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-slate-100">
      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-medium tracking-widest uppercase text-slate-400 mb-10">
            Growth advisory for established businesses
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold leading-snug text-white mb-8">
            Do you know where your business is losing money?
          </h1>

          <div className="text-lg text-slate-300 leading-relaxed space-y-5 mb-10 max-w-2xl">
            <p>
              Most established business owners don't. The leaks hide in plain
              sight — in the hours your team spends on work that should run
              itself, the enquiries that go cold before anyone follows up, and
              the overhead that keeps climbing without a clear reason why.
            </p>
            <p>
              The result is wasted hours, bleeding revenue, and mounting
              overhead that quietly eats into your margins every month.
            </p>
            <p>
              We find the leaks affecting your business growth. Then we fix
              them.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/avoer-system")}
              className="px-6 py-3 bg-white text-slate-900 rounded-lg font-medium text-base hover:bg-slate-100 transition-colors duration-200"
            >
              Take the free growth audit
            </button>
            <a
              href="https://cal.com/plevara-d8kr0w/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-slate-600 text-slate-200 rounded-lg font-medium text-base hover:bg-slate-800 transition-colors duration-200"
            >
              Book a 30-minute diagnostic call
            </a>
          </div>
        </div>
      </section>

      <hr className="border-slate-800 mx-6" />

      {/* Section 2 */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-medium tracking-widest uppercase text-slate-400 mb-10">
            The real problem
          </p>

          <div className="text-lg text-slate-300 leading-relaxed space-y-5">
            <p>
              Many businesses feel the pressure and think spending on ads and
              getting more leads is the answer.
            </p>
            <p>
              But when your team is losing billable hours to admin and manual
              coordination,{" "}
              <span className="text-white font-medium">
                enquiries go cold and competitors take your business.
              </span>{" "}
              You end up building something that cannot exist without you. That
              is a growth stunt.
            </p>
            <p>
              We find where time and money are bleeding through, create simple
              fixes that address these problems directly, and check that
              everything is working — adjusting where needed. That way your
              business growth becomes clear and consistent.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-slate-800 mx-6" />

      {/* Section 3 */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-medium tracking-widest uppercase text-slate-400 mb-10">
            What happens when you work with us
          </p>

          <h2 className="text-2xl font-semibold text-white mb-4">
            Businesses sometimes do not think something is wrong.
          </h2>

          <p className="text-lg text-slate-300 leading-relaxed mb-10">
            But when you trust us to look under the hood, you get practical
            fixes fine-tuned specifically for your growth — fixes that ease the
            stress for you, your team, and your business. The first 30 days
            always tells this story.
          </p>

          <p className="text-base font-medium text-white mb-5">
            Find out what is under the hood for free.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/avoer-system")}
              className="px-6 py-3 bg-white text-slate-900 rounded-lg font-medium text-base hover:bg-slate-100 transition-colors duration-200"
            >
              Take the free growth audit
            </button>
          </div>

          <p className="text-sm text-slate-500 mt-6 mb-4">
            Or talk to us directly.
          </p>

          <a
            href="https://cal.com/plevara-d8kr0w/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 border border-slate-600 text-slate-200 rounded-lg font-medium text-base hover:bg-slate-800 transition-colors duration-200"
          >
            Book a 30-minute diagnostic call
          </a>
        </div>
      </section>
    </div>
  );
}

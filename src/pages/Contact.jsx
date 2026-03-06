import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "9635b6fc-08d5-4793-b3aa-3f5cd2054a42",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Contact Form Message: ${formData.name}`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 pt-24 pb-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-slate-300">
            Have questions? Want to discuss your growth challenges? Let's talk.
          </p>
        </div>

        <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-600"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-600"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                rows={6}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-600 resize-none"
                placeholder="Tell us about your business and growth challenges..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-all duration-300 disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-green-400 text-center">
                Message sent. We'll be in touch soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-center">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <a
            href="https://cal.com/plevara-d8kr0w/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-blue-600 hover:bg-blue-700 rounded-2xl text-center transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
          >
            <div className="text-2xl mb-2">📞</div>
            <div className="text-white font-bold text-lg mb-1">Book a Call</div>
            <div className="text-blue-200 text-sm">
              30 minutes clarity call.
            </div>
          </a>

          <a
            href="/avoer-system"
            className="block p-6 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-600 rounded-2xl text-center transition-all duration-300"
          >
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-white font-bold text-lg mb-1">
              Take the Audit
            </div>
            <div className="text-slate-400 text-sm">
              Find your primary growth leak in 5 minutes.
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

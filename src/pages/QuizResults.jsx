import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

export default function QuizResults() {
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = sessionStorage.getItem("quizResults");
    if (!data) {
      navigate("/avoer-system");
      return;
    }
    setResults(JSON.parse(data));
  }, [navigate]);

  if (!results) return null;

  const chartData = [
    {
      cylinder: "Acquire",
      score: parseFloat(results.scores.ACQUIRE),
      fullMark: 5,
    },
    {
      cylinder: "Visibility",
      score: parseFloat(results.scores.VISIBILITY),
      fullMark: 5,
    },
    {
      cylinder: "Operate",
      score: parseFloat(results.scores.OPERATE),
      fullMark: 5,
    },
    {
      cylinder: "Execute",
      score: parseFloat(results.scores.EXECUTE),
      fullMark: 5,
    },
    {
      cylinder: "Retain",
      score: parseFloat(results.scores.RETAIN),
      fullMark: 5,
    },
  ];

  const primaryLeak = Object.entries(results.scores).reduce(
    (min, [cylinder, score]) =>
      parseFloat(score) < parseFloat(min.score) ? { cylinder, score } : min,
    { cylinder: "ACQUIRE", score: 5 },
  );

  const getScoreLabel = (score) => {
    if (score >= 4) return { label: "✅ Strong", color: "text-green-400" };
    if (score >= 3) return { label: "⚠️ Needs Work", color: "text-yellow-400" };
    return { label: "🚨 Critical Leak", color: "text-red-400" };
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your AVOER Growth Audit Results
          </h1>
          <p className="text-xl text-slate-300">
            Hi {results.name}, here's what we found.
          </p>
        </div>

        {/* Radar Chart */}
        <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 mb-12">
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={chartData}>
              <PolarGrid stroke="#475569" />
              <PolarAngleAxis
                dataKey="cylinder"
                tick={{ fill: "#cbd5e1", fontSize: 14 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 5]}
                tick={{ fill: "#94a3b8" }}
              />
              <Radar
                name="Your Score"
                dataKey="score"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Scores Breakdown */}
        <div className="grid md:grid-cols-5 gap-4 mb-12">
          {Object.entries(results.scores).map(([cylinder, score]) => {
            const status = getScoreLabel(parseFloat(score));
            return (
              <div
                key={cylinder}
                className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl text-center"
              >
                <div className="text-sm text-slate-400 mb-2">{cylinder}</div>
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {score}/5
                </div>
                <div className={`text-sm font-semibold ${status.color}`}>
                  {status.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Primary Leak */}
        <div className="bg-red-950/20 border border-red-900/50 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            🚨 Your Primary Leak: {primaryLeak.cylinder}
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            At {primaryLeak.score}/5, this is your biggest growth bottleneck.
            Until you fix this leak, improvements in other areas won't compound.
            This is where you start.
          </p>
          <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6">
            <h3 className="font-bold text-white mb-3">What This Means:</h3>
            <p className="text-slate-300 leading-relaxed">
              {primaryLeak.cylinder === "ACQUIRE" &&
                "You struggle to consistently generate qualified leads. Growth is unpredictable because your pipeline is unreliable."}
              {primaryLeak.cylinder === "VISIBILITY" &&
                "Prospects can't find you. You're invisible to buyers actively searching for what you do."}
              {primaryLeak.cylinder === "OPERATE" &&
                "Your operations can't handle growth. Taking on more work breaks your systems and quality suffers."}
              {primaryLeak.cylinder === "EXECUTE" &&
                "You're not delivering consistently. Missed deadlines and quality issues are costing you trust and referrals."}
              {primaryLeak.cylinder === "RETAIN" &&
                "Clients don't stick around. You're winning business but losing it just as fast, killing your growth potential."}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-950/50 to-slate-900/50 border border-blue-900/50 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Fix Your Leak?
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Book a free 30-minute strategy call. We'll review your results,
            diagnose the root cause, and map out exactly what needs to happen to
            unblock your growth.
          </p>

          <a
            href="https://cal.com/plevara-d8kr0w/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-xl font-bold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30"
          >
            Book Your Free Strategy Call →
          </a>
          <p className="text-slate-400 mt-4 text-sm">
            No pitch. No pressure. Just actionable insights.
          </p>
        </div>
      </div>
    </div>
  );
}

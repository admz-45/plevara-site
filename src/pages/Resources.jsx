import { Link } from "react-router-dom";
import posts from "../content/blog/posts";

const cylinderColors = {
  Visibility: "text-purple-400 border-purple-400/30 bg-purple-400/10",
  Acquire: "text-blue-400 border-blue-400/30 bg-blue-400/10",
  Retain: "text-green-400 border-green-400/30 bg-green-400/10",
  Operate: "text-orange-400 border-orange-400/30 bg-orange-400/10",
  Execute: "text-red-400 border-red-400/30 bg-red-400/10",
  All: "text-slate-400 border-slate-400/30 bg-slate-400/10",
};

export default function Resources() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Resources & Insights
          </h1>
          <p className="text-xl text-slate-300">
            Growth insights for the industries that actually run the world.
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/resources/${post.slug}`}
              className="block bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 hover:border-blue-600/50 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full border ${cylinderColors[post.cylinder] || cylinderColors["All"]}`}
                >
                  {post.cylinder}
                </span>
                <span className="text-sm text-slate-400">
                  {new Date(post.date).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-slate-400 text-sm">{post.excerpt}</p>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-950/50 to-slate-900/50 border border-blue-900/50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Not Sure Where to Start?
          </h2>
          <p className="text-slate-300 mb-6">
            Take the 5-minute AVOER Growth Audit to identify your primary leak.
          </p>
          <Link
            to="/avoer-system"
            className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-all duration-300"
          >
            Take the Audit →
          </Link>
        </div>
      </div>
    </div>
  );
}

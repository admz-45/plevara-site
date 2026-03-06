import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import posts from "../content/blog/posts";

const cylinderColors = {
  Visibility: "text-purple-400 border-purple-400/30 bg-purple-400/10",
  Acquire: "text-blue-400 border-blue-400/30 bg-blue-400/10",
  Retain: "text-green-400 border-green-400/30 bg-green-400/10",
  Operate: "text-orange-400 border-orange-400/30 bg-orange-400/10",
  Execute: "text-red-400 border-red-400/30 bg-red-400/10",
  All: "text-slate-400 border-slate-400/30 bg-slate-400/10",
};

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!post) navigate("/resources");
  }, [post, navigate]);

  if (!post) return null;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 pt-24 pb-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/resources"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-10"
        >
          ← Back to Resources
        </Link>

        <div className="mb-8">
          <span
            className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border mb-4 ${cylinderColors[post.cylinder] || cylinderColors["All"]}`}
          >
            {post.cylinder}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-sm text-slate-400">
            {new Date(post.date).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="space-y-6">
          {post.content.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-slate-300 leading-relaxed text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-16 border-t border-slate-800 pt-12 text-center">
          <p className="text-lg text-slate-300 italic mb-6">
            You know your clients better than anyone. We know how to put that
            into words that Google understands. Let's talk.
          </p>

          <a
            href="https://cal.com/plevara-d8kr0w/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
          >
            Book a Free Strategy Call →
          </a>
        </div>
      </div>
    </div>
  );
}

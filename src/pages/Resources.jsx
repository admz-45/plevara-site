import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Resources() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // This will load markdown posts once Decap CMS creates them
    // For now, showing placeholder
    const placeholderPosts = [
      {
        slug: 'coming-soon',
        title: 'Blog Posts Coming Soon',
        date: '2026-02-01',
        description: 'We are building our content library focused on boring industries.'
      }
    ];
    setPosts(placeholderPosts);
  }, []);

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

        {posts.length > 0 ? (
          <div className="space-y-8">
            {posts.map((post, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 hover:border-blue-600/50 transition-all duration-300">
                <div className="text-sm text-slate-400 mb-2">
                  {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">{post.title}</h2>
                <p className="text-slate-300 mb-4">{post.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-12 text-center">
            <p className="text-slate-400 mb-8">
              Content library coming soon. In the meantime, find your biggest growth bottleneck.
            </p>
            <Link
              to="/avoer-system"
              className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-all duration-300"
            >
              Take the AVOER Audit →
            </Link>
          </div>
        )}

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
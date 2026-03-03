import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";

export default function Home() {
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // Create flowing lines
    const curves = [];
    const lineMaterials = [];

    for (let i = 0; i < 5; i++) {
      const points = [];
      for (let j = 0; j <= 50; j++) {
        const t = j / 50;
        const x = (t - 0.5) * 10;
        const y = Math.sin(t * Math.PI * 2 + i) * 2;
        const z = Math.cos(t * Math.PI * 2 + i) * 2;
        points.push(new THREE.Vector3(x, y, z));
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const geometry = new THREE.TubeGeometry(curve, 50, 0.02, 8, false);
      const material = new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.6,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      curves.push(mesh);
      lineMaterials.push(material);
    }

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    let time = 0;
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.005;

      curves.forEach((mesh, i) => {
        mesh.rotation.x = time * (0.2 + i * 0.1);
        mesh.rotation.y = time * (0.3 + i * 0.1);

        lineMaterials[i].opacity = 0.4 + Math.sin(time + i) * 0.2;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative min-h-screen text-slate-100">
      {/* Flowing Lines Background */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <canvas ref={canvasRef} className="opacity-20" />
      </div>

      {/* Content */}
      <div className="relative" style={{ zIndex: 2 }}>
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-block px-4 py-2 bg-blue-600/10 border border-blue-500/30 rounded-full text-sm text-blue-300 font-medium tracking-wider uppercase backdrop-blur-sm">
              For Manufacturing, Construction, HVAC & Industrial Services
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
              <span className="block text-white">Your Business Has</span>
              <span className="block text-blue-400">Growth Problems.</span>
              <span className="block text-white">We Find the Root Cause.</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Most agencies chase symptoms. We diagnose the leak. The AVOER
              Growth Audit shows you exactly where your growth is stuck and how
              to fix it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <button
                onClick={() => navigate("/avoer-system")}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-all duration-300 text-lg hover:shadow-xl hover:shadow-blue-500/30"
              >
                Take the Free Growth Audit
              </button>
              <a
                href="https://cal.com/plevara-d8kr0w/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-200 font-semibold transition-all duration-300 text-lg"
              >
                Book a Strategy Call
              </a>
            </div>
          </div>
        </section>

        {/* You're Not Alone Section */}
        <section className="py-20 md:py-32 px-6 bg-slate-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
              You're Not Alone
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Inconsistent Leads",
                  desc: "One month you're drowning in opportunities. The next? Crickets. You can't predict when the next client will come.",
                },
                {
                  title: "Invisible Online",
                  desc: "Prospects search for what you do and find your competitors but not you. Your expertise is wasted if no one knows you exist.",
                },
                {
                  title: "Scaling Breaks Things",
                  desc: "You land a big project and everything falls apart. Quality slips. Deadlines miss. Your team scrambles.",
                },
              ].map((pain, i) => (
                <div
                  key={i}
                  className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl"
                >
                  <h3 className="text-xl font-bold text-white mb-3">
                    {pain.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">{pain.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => navigate("/avoer-system")}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-all duration-300"
              >
                Find Your Growth Leak →
              </button>
            </div>
          </div>
        </section>

        {/* Simple AVOER Teaser */}
        <section className="py-20 md:py-32 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Growth Isn't Random. It's a System.
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              The AVOER Growth Loop™ identifies the 5 cylinders every business
              needs firing. When one leaks, growth stalls. We find the leak. You
              fix it. You grow.
            </p>
            <button
              onClick={() => navigate("/avoer-system")}
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-white font-semibold transition-all duration-300"
            >
              See How AVOER Works →
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function App() {
  const canvasRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || prefersReducedMotion) return;

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
      powerPreference: "low-power",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    camera.position.z = 5;

    // Create fluid mesh
    const geometry = new THREE.PlaneGeometry(8, 8, 16, 16);
    const vertices = geometry.attributes.position.array;

    const originalPositions = new Float32Array(vertices.length);
    for (let i = 0; i < vertices.length; i++) {
      originalPositions[i] = vertices[i];
    }

    const material = new THREE.MeshPhongMaterial({
      color: 0x3b82f6,
      emissive: 0x1e3a8a,
      specular: 0x60a5fa,
      shininess: 100,
      transparent: true,
      opacity: 0.7, //changed from 0.5
      wireframe: true,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 4;
    scene.add(mesh);

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x3b82f6, 2);
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x60a5fa, 1);
    pointLight2.position.set(-3, -3, -3);
    scene.add(pointLight2);

    let time = 0;
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      time += 0.003;

      // Animate wave - ALWAYS, not dependent on scroll
      const positions = geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = originalPositions[i];
        const y = originalPositions[i + 1];

        positions[i + 2] =
          Math.sin(x * 0.5 + time) * 0.3 + Math.cos(y * 0.5 + time * 1.2) * 0.3;
      }
      geometry.attributes.position.needsUpdate = true;

      // Continuous rotation - ALWAYS
      mesh.rotation.z += 0.001;

      // Parallax effect - responds to scroll but doesn't stop animation
      mesh.position.y = scrollY * 0.001;
      mesh.rotation.x = -Math.PI / 4 + scrollY * 0.0001;

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
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [scrollY, prefersReducedMotion]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    );

    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 overflow-x-hidden">
      <style>{`
        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .fade-up.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        .hero-text {
          animation: fadeInUp 1s ease-out forwards;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .card-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.15);
        }
        .glow-on-hover:hover {
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.3), 0 0 60px rgba(59, 130, 246, 0.1);
        }
      `}</style>

      {!prefersReducedMotion && (
        <div
          className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden"
          style={{ zIndex: 0 }}
        >
          <canvas ref={canvasRef} className="opacity-20 md:opacity-25" />
        </div>
      )}

      <div className="relative" style={{ zIndex: 2 }}>
        <nav className="fixed top-0 w-full px-4 md:px-6 py-4 md:py-5 backdrop-blur-xl bg-slate-950/90 border-b border-slate-800/50 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-xl md:text-2xl font-bold tracking-tight text-white">
              PLEVARA
            </div>
            <div className="flex items-center gap-4 md:gap-6">
              <button
                onClick={() => scrollToSection("services")}
                className="hidden md:block text-slate-300 hover:text-white transition-colors text-sm font-medium"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("framework")}
                className="hidden md:block text-slate-300 hover:text-white transition-colors text-sm font-medium"
              >
                How We Work
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-4 md:px-6 py-2 md:py-2.5 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition-all duration-300 text-sm md:text-base font-medium glow-on-hover"
              >
                Let's Talk
              </button>
            </div>
          </div>
        </nav>

        <section className="min-h-screen flex items-center justify-center px-6 pt-24 md:pt-20 pb-12">
          <div className="max-w-5xl mx-auto text-center space-y-6 md:space-y-8">
            <div className="flex flex-col items-center gap-3">
              <div
                className="inline-block px-4 py-2 bg-blue-600/10 border border-blue-500/30 rounded-full text-xs md:text-sm text-blue-300 font-medium tracking-wider uppercase backdrop-blur-sm hero-text"
                style={{ animationDelay: "0.2s", opacity: 0 }}
              >
                For the Industries That Built Everything
              </div>
              <div
                className="inline-block px-3 py-1.5 bg-slate-800/80 border border-slate-700/50 rounded-full text-xs text-slate-400 font-medium backdrop-blur-sm hero-text"
                style={{ animationDelay: "0.3s", opacity: 0 }}
              >
                Built for 2026 and beyond
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
              <span
                className="block text-white hero-text"
                style={{ animationDelay: "0.5s", opacity: 0 }}
              >
                The Quiet Ones
              </span>
              <span
                className="block text-blue-400 hero-text"
                style={{ animationDelay: "0.7s", opacity: 0 }}
              >
                Always Win
              </span>
            </h1>

            <p
              className="text-xl md:text-2xl lg:text-3xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-4 hero-text"
              style={{ animationDelay: "0.9s", opacity: 0 }}
            >
              While others chase trends, you solve real problems. Manufacturing.
              Construction. Industrial services. The builders who make the world
              work.
            </p>

            <p
              className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto hero-text"
              style={{ animationDelay: "1.1s", opacity: 0 }}
            >
              You don't need hype. You need systems that work.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 md:pt-8 px-4 hero-text"
              style={{ animationDelay: "1.3s", opacity: 0 }}
            >
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-all duration-300 text-base glow-on-hover"
              >
                Let's Talk
              </button>
              <button
                onClick={() => scrollToSection("framework")}
                className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-200 font-semibold transition-all duration-300 text-base"
              >
                How We Work
              </button>
            </div>
          </div>
        </section>

        <section id="approach" className="py-20 md:py-32 px-6 bg-slate-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="space-y-6 fade-up">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Built Different,
                  <br />
                  Built to Last
                </h2>
                <div className="space-y-4 text-lg md:text-xl text-slate-300 leading-relaxed">
                  <p>Most agencies build for tech startups chasing virality.</p>
                  <p>Your business doesn't work that way.</p>
                  <p>
                    Long sales cycles. Complex decisions. Industries where one
                    contract can define a decade.
                  </p>
                  <p className="text-blue-400 font-semibold">
                    You don't need to be loud. You need to be inevitable.
                  </p>
                  <p>
                    When buyers search, you're there. When they decide, you're
                    obvious.
                  </p>
                  <p className="font-medium">That's what we build.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 fade-up">
                {[
                  { title: "Real Revenue", desc: "Not vanity metrics" },
                  { title: "Long-term", desc: "Not quick fixes" },
                  { title: "Systems", desc: "Not tactics" },
                  { title: "Results", desc: "Not promises" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-6 bg-slate-800/80 border border-slate-700/50 rounded-xl card-hover"
                  >
                    <div className="text-xl md:text-2xl font-bold text-blue-400 mb-2">
                      {item.title}
                    </div>
                    <div className="text-slate-400 text-sm">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="framework" className="py-20 md:py-32 px-6">
          <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
            <div className="text-center space-y-4 max-w-3xl mx-auto fade-up">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                The A.V.O.E.R. Growth Loop™
              </h2>
              <p className="text-xl md:text-2xl text-slate-300">
                How serious businesses grow
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-4 md:gap-6">
              {[
                {
                  letter: "A",
                  title: "Acquire",
                  desc: "Get in front of decision-makers who need what you do",
                  icon: "🎯",
                },
                {
                  letter: "V",
                  title: "Visibility",
                  desc: "Be the name they see when researching",
                  icon: "👁️",
                },
                {
                  letter: "O",
                  title: "Operate",
                  desc: "Scale without chaos",
                  icon: "⚙️",
                },
                {
                  letter: "E",
                  title: "Execute",
                  desc: "Deliver excellence every time",
                  icon: "⚡",
                },
                {
                  letter: "R",
                  title: "Retain",
                  desc: "Turn clients into partners",
                  icon: "🔄",
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="p-6 md:p-8 bg-slate-800/50 border border-slate-700/50 rounded-xl card-hover fade-up group"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="text-3xl md:text-4xl mb-3 md:mb-4">
                    {step.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">
                    {step.letter}
                  </div>
                  <div className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3">
                    {step.title}
                  </div>
                  <div className="text-sm text-slate-300 leading-relaxed">
                    {step.desc}
                  </div>
                  <div className="mt-4 h-1 w-0 bg-gradient-to-r from-blue-400 to-blue-600 group-hover:w-full transition-all duration-500" />
                </div>
              ))}
            </div>

            <p className="text-slate-300 text-base md:text-lg text-center max-w-3xl mx-auto fade-up">
              Not a funnel. A loop. Each phase feeds the next.
            </p>
          </div>
        </section>

        <section id="services" className="py-20 md:py-32 px-6 bg-slate-900/50">
          <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
            <div className="text-center space-y-4 max-w-3xl mx-auto fade-up">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                What We Do
              </h2>
              <p className="text-xl md:text-2xl text-slate-300">
                Four disciplines. One goal.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {[
                {
                  title: "Business Growth Strategy",
                  desc: "Map where you are. Design where you're going. Build the path.",
                  points: [
                    "Market positioning",
                    "Competitive analysis",
                    "Growth planning",
                  ],
                },
                {
                  title: "Visibility & Authority",
                  desc: "Be found by the right people. Be trusted before the call.",
                  points: [
                    "Brand positioning",
                    "Content strategy",
                    "Authority building",
                  ],
                },
                {
                  title: "Operations & Execution",
                  desc: "Scale without breaking. Deliver at volume.",
                  points: [
                    "Process design",
                    "System implementation",
                    "Team enablement",
                  ],
                },
                {
                  title: "Client Acquisition & Retention",
                  desc: "Win the right clients. Keep them.",
                  points: [
                    "Lead generation",
                    "Sales enablement",
                    "Client success",
                  ],
                },
              ].map((service, i) => (
                <div
                  key={i}
                  className="p-6 md:p-8 bg-slate-800/50 border border-slate-700/50 rounded-xl card-hover fade-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                    {service.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed mb-4 md:mb-6 text-base md:text-lg">
                    {service.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.points.map((point, j) => (
                      <span
                        key={j}
                        className="px-3 py-1.5 bg-blue-600/10 border border-blue-500/30 rounded-full text-xs md:text-sm text-blue-300"
                      >
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-12 fade-up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              For the Quiet Powerhouses
            </h2>

            <div className="space-y-6 text-xl md:text-2xl text-slate-300 leading-relaxed">
              <p>
                HVAC. Construction. Manufacturing. Industrial supply.
                Professional services.
              </p>
              <p>
                The industries others skip. The businesses that actually run the
                world.
              </p>
              <p className="text-blue-400 font-semibold">
                If that's you, this is for you.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 md:py-32 px-6 bg-slate-900/50">
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8 fade-up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Ready to Build?
            </h2>

            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed px-4">
              No pitch. Just a real conversation.
            </p>

            <div className="pt-4 md:pt-8 space-y-4">
              <a
                href="mailto:daisy@plevara.com"
                className="inline-block px-8 md:px-10 py-4 md:py-5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-base md:text-lg font-semibold transition-all duration-300 glow-on-hover"
              >
                daisy@plevara.com
              </a>
              <p className="text-slate-400 text-sm">
                We respond within 24 hours
              </p>
            </div>
          </div>
        </section>

        <footer className="py-8 md:py-12 px-6 border-t border-slate-800">
          <div className="max-w-7xl mx-auto text-center space-y-3">
            <div className="text-xl md:text-2xl font-bold text-white">
              PLEVARA SOLUTIONS
            </div>
            <p className="text-slate-400 text-sm">
              Growth for businesses that don't need to be sexy to win.
            </p>
            <p className="text-slate-500 text-xs pt-2">
              © 2026 Plevara Solutions
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;

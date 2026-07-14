import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";

export default function Home() {
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

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
        opacity: 0.6
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
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <canvas ref={canvasRef} className="opacity-20" />
      </div>

      {/* Content */}
      <div className="relative" style={{ zIndex: 2 }}>
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
    </div>
  );
              }

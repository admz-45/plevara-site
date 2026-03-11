import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import AVOERSystem from "./pages/AVOERSystem";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import QuizResults from "./pages/QuizResults";
import BlogPost from "./pages/BlogPost";
import About from "./pages/AboutUs";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/avoer-system" element={<AVOERSystem />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/results" element={<QuizResults />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;

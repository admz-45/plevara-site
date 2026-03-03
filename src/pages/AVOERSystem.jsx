import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

export default function AVOERSystem() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const questions = [
    {
      id: "q1",
      cylinder: "ACQUIRE",
      question: "How do most of your new clients find you?",
      options: [
        {
          text: "We hunt them down - Cold calls, emails, constant outreach",
          score: 1,
          note: "100% outbound reliant, no inbound presence",
        },
        {
          text: "We work for every lead - Mostly outbound with occasional inbound",
          score: 2,
          note: "Heavy outbound dependency, minimal organic attraction",
        },
        {
          text: "Balanced mix - Half outbound efforts, half find us",
          score: 3,
          note: "Decent balance but requires constant effort",
        },
        {
          text: "They mostly come to us - Strong inbound, light outreach",
          score: 4,
          note: "Good inbound engine, sustainable flow",
        },
        {
          text: "We turn people away - More demand than capacity",
          score: 5,
          note: "Excess demand, strong market position",
        },
      ],
    },
    {
      id: "q2",
      cylinder: "ACQUIRE",
      question: "How predictable is your new business pipeline?",
      options: [
        {
          text: "Complete chaos - Feast or famine, no idea what is coming",
          score: 1,
          note: "Zero pipeline visibility, reactive mode",
        },
        {
          text: "Mostly guessing - Rough idea but constantly surprised",
          score: 2,
          note: "Weak forecasting, unpredictable revenue",
        },
        {
          text: "Generally stable - Can predict within a range",
          score: 3,
          note: "Moderate predictability, some surprises",
        },
        {
          text: "Quite reliable - Accurate 2-3 month forecast",
          score: 4,
          note: "Strong pipeline management, good visibility",
        },
        {
          text: "Locked in - Booked months ahead with confidence",
          score: 5,
          note: "Excellent pipeline, high confidence forecasting",
        },
      ],
    },
    {
      id: "q3",
      cylinder: "VISIBILITY",
      question: "When prospects search for your services, what happens?",
      options: [
        {
          text: "They find our competitors, not us",
          score: 1,
          note: "Zero search visibility, invisible online",
        },
        {
          text: "We are buried - Page 2+ on Google if at all",
          score: 2,
          note: "Poor search rankings, low discoverability",
        },
        {
          text: "Hit or miss - Some keywords we show up, most we do not",
          score: 3,
          note: "Inconsistent visibility, gaps in coverage",
        },
        {
          text: "Usually found - Top results for most relevant searches",
          score: 4,
          note: "Strong SEO, good organic presence",
        },
        {
          text: "We dominate - Own the first page for our key terms",
          score: 5,
          note: "Market leader positioning, excellent visibility",
        },
      ],
    },
    {
      id: "q4",
      cylinder: "VISIBILITY",
      question:
        "How often do qualified prospects contact you without you reaching out first?",
      options: [
        {
          text: "Never - Every lead requires our outreach",
          score: 1,
          note: "Zero inbound, 100% outbound dependency",
        },
        {
          text: "Rarely - Maybe 1-2 inbound leads per quarter",
          score: 2,
          note: "Minimal inbound activity, not sustainable",
        },
        {
          text: "Sometimes - A few quality inbound leads monthly",
          score: 3,
          note: "Growing inbound, still needs outbound support",
        },
        {
          text: "Regularly - Several quality inbound leads weekly",
          score: 4,
          note: "Strong inbound engine, healthy flow",
        },
        {
          text: "Constantly - Inbound inquiries daily, filtering required",
          score: 5,
          note: "Excess demand, market authority established",
        },
      ],
    },
    {
      id: "q5",
      cylinder: "OPERATE",
      question: "What does your day-to-day operation feel like?",
      options: [
        {
          text: "Constant firefighting - Every day is chaos and emergencies",
          score: 1,
          note: "No systems, reactive mode, unsustainable",
        },
        {
          text: "Mostly scrambling - Some structure but frequent crises",
          score: 2,
          note: "Weak systems, high stress operations",
        },
        {
          text: "Generally functional - Runs okay with occasional hiccups",
          score: 3,
          note: "Basic systems in place, room for improvement",
        },
        {
          text: "Smooth most days - Clear processes, rare emergencies",
          score: 4,
          note: "Strong systems, well-managed operations",
        },
        {
          text: "Runs itself - Team executes flawlessly without oversight",
          score: 5,
          note: "Excellent systems, highly autonomous team",
        },
      ],
    },
    {
      id: "q6",
      cylinder: "OPERATE",
      question: "What happens when you get busy or take on more clients?",
      options: [
        {
          text: "Everything breaks - Quality drops, deadlines slip, chaos",
          score: 1,
          note: "Cannot scale, capacity maxed out",
        },
        {
          text: "Barely manage - Stretch thin, quality suffers",
          score: 2,
          note: "Fragile systems, scaling causes problems",
        },
        {
          text: "We cope - Can handle some growth with effort",
          score: 3,
          note: "Limited scalability, requires adjustment",
        },
        {
          text: "We adapt well - Systems flex to accommodate growth",
          score: 4,
          note: "Good scalability, systems support growth",
        },
        {
          text: "No sweat - Built to scale, more work equals no problem",
          score: 5,
          note: "Excellent scalability, systems ready for growth",
        },
      ],
    },
    {
      id: "q7",
      cylinder: "EXECUTE",
      question:
        "How often do you deliver projects on the timeline you promised?",
      options: [
        {
          text: "Rarely - Almost always late, constant extensions",
          score: 1,
          note: "Poor delivery reliability, client frustration likely",
        },
        {
          text: "Sometimes - Hit maybe 50% of deadlines",
          score: 2,
          note: "Unreliable delivery, trust issues",
        },
        {
          text: "Usually - Miss some but hit most targets",
          score: 3,
          note: "Acceptable reliability, some predictability",
        },
        {
          text: "Almost always - Rare delays, clients can count on us",
          score: 4,
          note: "Strong delivery track record, high reliability",
        },
        {
          text: "Always - On time or early, no exceptions",
          score: 5,
          note: "Exceptional reliability, builds strong trust",
        },
      ],
    },
    {
      id: "q8",
      cylinder: "EXECUTE",
      question: "After you deliver, how much cleanup or fixing is required?",
      options: [
        {
          text: "Constant rework - Always fixing issues after delivery",
          score: 1,
          note: "Quality problems, high rework rate",
        },
        {
          text: "Frequent fixes - Often need to address problems",
          score: 2,
          note: "Quality inconsistency, client dissatisfaction",
        },
        {
          text: "Occasional tweaks - Minor adjustments sometimes",
          score: 3,
          note: "Generally good quality, some refinement needed",
        },
        {
          text: "Rarely needed - Clean delivery most of the time",
          score: 4,
          note: "High quality standard, minimal issues",
        },
        {
          text: "Never - Perfect execution, no post-delivery fixes",
          score: 5,
          note: "Exceptional quality, flawless delivery",
        },
      ],
    },
    {
      id: "q9",
      cylinder: "RETAIN",
      question: "What is your typical client relationship lifecycle?",
      options: [
        {
          text: "One and done - Clients rarely return after first project",
          score: 1,
          note: "No retention, transactional relationships",
        },
        {
          text: "Mostly transactional - Occasional repeat but not the norm",
          score: 2,
          note: "Weak retention, limited LTV",
        },
        {
          text: "Some stick around - About half come back",
          score: 3,
          note: "Moderate retention, room for improvement",
        },
        {
          text: "Most return - Strong repeat business rate",
          score: 4,
          note: "Good retention, loyal client base",
        },
        {
          text: "Clients for life - Multi-year relationships standard",
          score: 5,
          note: "Excellent retention, high client LTV",
        },
      ],
    },
    {
      id: "q10",
      cylinder: "RETAIN",
      question: "How often do clients refer new business to you?",
      options: [
        {
          text: "Never - We do not get referrals",
          score: 1,
          note: "Zero referral engine, satisfaction issues",
        },
        {
          text: "Rarely - Maybe 1-2 referrals per year",
          score: 2,
          note: "Weak referral activity, not viral",
        },
        {
          text: "Occasionally - A few referrals per quarter",
          score: 3,
          note: "Some referral activity, growing advocacy",
        },
        {
          text: "Regularly - Multiple referrals monthly",
          score: 4,
          note: "Strong referral engine, client advocates",
        },
        {
          text: "Constantly - Referrals are a primary lead source",
          score: 5,
          note: "Viral growth, exceptional client satisfaction",
        },
      ],
    },
  ];

  const handleAnswer = (option) => {
    const newAnswers = {
      ...answers,
      [questions[currentQuestion].id]: {
        cylinder: questions[currentQuestion].cylinder,
        question: questions[currentQuestion].question,
        answer: option.text,
        score: option.score,
        note: option.note,
      },
    };
    setAnswers(newAnswers);

    if (currentQuestion === questions.length - 1) {
      setShowForm(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate scores
    const scores = {
      ACQUIRE: 0,
      VISIBILITY: 0,
      OPERATE: 0,
      EXECUTE: 0,
      RETAIN: 0,
    };

    const counts = {
      ACQUIRE: 0,
      VISIBILITY: 0,
      OPERATE: 0,
      EXECUTE: 0,
      RETAIN: 0,
    };

    Object.values(answers).forEach((answer) => {
      scores[answer.cylinder] += answer.score;
      counts[answer.cylinder]++;
    });

    const avgScores = {};
    Object.keys(scores).forEach((cylinder) => {
      avgScores[cylinder] = (scores[cylinder] / counts[cylinder]).toFixed(1);
    });

    // Find primary leak
    const primaryLeak = Object.entries(avgScores).reduce(
      (min, [cylinder, score]) =>
        parseFloat(score) < parseFloat(min.score) ? { cylinder, score } : min,
      { cylinder: "ACQUIRE", score: 5 },
    );

    // Send email notification via EmailJS
    try {
      await emailjs.send(
        "service_7yiwaqc",
        "template_15qwpud",
        {
          from_name: name,
          from_email: email,
          score_acquire: avgScores.ACQUIRE,
          score_visibility: avgScores.VISIBILITY,
          score_operate: avgScores.OPERATE,
          score_execute: avgScores.EXECUTE,
          score_retain: avgScores.RETAIN,
          primary_leak: `${primaryLeak.cylinder} (${primaryLeak.score}/5)`,
        },
        "zMDlvVVWnriCIAFCm",
      );
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Email failed to send:", error);
    }

    // Store results in sessionStorage
    sessionStorage.setItem(
      "quizResults",
      JSON.stringify({
        name,
        email,
        scores: avgScores,
        answers,
      }),
    );

    // Navigate to results
    navigate("/results");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            The A.V.O.E.R. Growth Loop™
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Five interconnected cylinders. When one leaks, growth stalls. Find
            yours in 5 minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6 mb-16">
          {[
            {
              letter: "A",
              title: "Acquire",
              desc: "Getting clients consistently",
              icon: "🎯",
            },
            {
              letter: "V",
              title: "Visibility",
              desc: "Being found by buyers",
              icon: "👁️",
            },
            {
              letter: "O",
              title: "Operate",
              desc: "Running without chaos",
              icon: "⚙️",
            },
            {
              letter: "E",
              title: "Execute",
              desc: "Delivering on promises",
              icon: "⚡",
            },
            {
              letter: "R",
              title: "Retain",
              desc: "Keeping clients long-term",
              icon: "🔄",
            },
          ].map((cylinder, i) => (
            <div
              key={i}
              className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl text-center hover:border-blue-600/50 transition-all duration-300"
            >
              <div className="text-4xl mb-3">{cylinder.icon}</div>
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {cylinder.letter}
              </div>
              <div className="text-lg font-semibold text-white mb-2">
                {cylinder.title}
              </div>
              <div className="text-sm text-slate-400">{cylinder.desc}</div>
            </div>
          ))}
        </div>

        {!showQuiz && (
          <div className="text-center">
            <button
              onClick={() => setShowQuiz(true)}
              className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-xl font-bold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30"
            >
              Take the 5-Minute Growth Audit →
            </button>
            <p className="text-slate-400 mt-4">
              Find your primary leak. Get your personalized results.
            </p>
          </div>
        )}

        {showQuiz && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8">
              {!showForm ? (
                <>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-blue-400 font-semibold">
                        Question {currentQuestion + 1} of {questions.length}
                      </span>
                      <button
                        onClick={() => setShowQuiz(false)}
                        className="text-slate-400 hover:text-white text-2xl leading-none"
                      >
                        ×
                      </button>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 mb-6">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-8">
                    {questions[currentQuestion].question}
                  </h3>

                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(option)}
                        className="w-full p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-600 rounded-lg text-left text-white transition-all duration-300"
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-white">
                      Get Your Results
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowQuiz(false)}
                      className="text-slate-400 hover:text-white text-2xl leading-none"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-slate-300 mb-6">
                    Enter your details to see your AVOER scores and primary
                    growth leak.
                  </p>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-600"
                      placeholder="your@email.com"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-all duration-300"
                  >
                    See My Results →
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

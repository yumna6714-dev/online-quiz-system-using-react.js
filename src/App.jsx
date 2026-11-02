import { useState } from "react";
import "./App.css";

const questions = [
  {
    question: "Which language is used to structure web pages?",
    options: ["CSS", "HTML", "Python", "Java"],
    answer: "HTML",
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["CSS", "C++", "PHP", "Python"],
    answer: "CSS",
  },
  {
    question: "What does React use to build user interfaces?",
    options: ["Components", "Tables only", "Databases", "Folders"],
    answer: "Components",
  },
  {
    question: "Which symbol is used for comments in JavaScript (single line)?",
    options: ["##", "//", "<!--", "**"],
    answer: "//",
  },
  {
    question: "Which method displays a message in the browser console?",
    options: ["print()", "show()", "console.log()", "display()"],
    answer: "console.log()",
  },
];

function App() {
  const [page, setPage] = useState("home");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");

  function register(e) {
    e.preventDefault();

    if (users.some((user) => user.email === email)) {
      alert("This email is already registered.");
      return;
    }

    setUsers([...users, { name, email, password }]);
    alert("Registration successful! Please login.");
    setName("");
    setEmail("");
    setPassword("");
    setPage("login");
  }

  function login(e) {
    e.preventDefault();

    const user = users.find(
      (item) => item.email === email && item.password === password
    );

    if (user) {
      setName(user.name);
      setPage("home");
    } else {
      alert("Please register first or check your details.");
    }
  }

  function nextQuestion() {
    if (!selected) {
      alert("Please select an answer.");
      return;
    }

    const updatedScore =
      score +
      (selected === questions[currentQuestion].answer ? 1 : 0);

    setScore(updatedScore);
    setSelected("");

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScore(updatedScore);
      setPage("result");
    }
  }

  function startQuiz() {
    setCurrentQuestion(0);
    setScore(0);
    setSelected("");
    setPage("quiz");
  }

  function logout() {
    setEmail("");
    setPassword("");
    setName("");
    setPage("home");
  }

  return (
    <div className="app">
      <nav className="navbar">
        <h2>QuizMaster</h2>
        <div className="nav-links">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("login")}>Login</button>
          <button onClick={() => setPage("register")}>Register</button>
        </div>
      </nav>

      <main className="container">
        {page === "home" && (
          <section className="hero">
            <div className="hero-icon">📝</div>
            <h1>Online Quiz System</h1>
            <p>Test your knowledge and discover how much you know!</p>
            {name && <p>Welcome, {name}!</p>}
            <button className="primary-btn" onClick={startQuiz}>
              Start Quiz
            </button>
          </section>
        )}

        {page === "register" && (
          <section className="form-card">
            <h1>Create Account</h1>
            <p>Register to get started</p>
            <form onSubmit={register}>
              <label>Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
              />
              <button className="primary-btn" type="submit">
                Register
              </button>
            </form>
            <p>
              Already registered?{" "}
              <button className="text-btn" onClick={() => setPage("login")}>
                Login
              </button>
            </p>
          </section>
        )}

        {page === "login" && (
          <section className="form-card">
            <h1>Welcome Back!</h1>
            <p>Login to continue</p>
            <form onSubmit={login}>
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button className="primary-btn" type="submit">
                Login
              </button>
            </form>
          </section>
        )}

        {page === "quiz" && (
          <section className="quiz-card">
            <p className="progress">
              Question {currentQuestion + 1} of {questions.length}
            </p>
            <div className="progress-bar">
              <div
                style={{
                  width: `${
                    ((currentQuestion + 1) / questions.length) * 100
                  }%`,
                }}
              />
            </div>
            <h2>{questions[currentQuestion].question}</h2>
            <div className="options">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option}
                  className={`option ${
                    selected === option ? "selected" : ""
                  }`}
                  onClick={() => setSelected(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button className="primary-btn" onClick={nextQuestion}>
              {currentQuestion === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </button>
          </section>
        )}

        {page === "result" && (
          <section className="result-card">
            <div className="result-icon">🏆</div>
            <h1>Quiz Completed!</h1>
            <p>Your final score is</p>
            <div className="score">
              {score} / {questions.length}
            </div>
            <h3>
              Percentage: {Math.round((score / questions.length) * 100)}%
            </h3>
            <p>
              {score >= 4
                ? "Excellent work! Keep it up."
                : "Good effort! Practice and try again."}
            </p>
            <button className="primary-btn" onClick={startQuiz}>
              Try Again
            </button>
            <button className="secondary-btn" onClick={() => setPage("home")}>
              Home
            </button>
          </section>
        )}
      </main>

      <footer>© 2026 QuizMaster | Online Quiz System</footer>
    </div>
  );
}

export default App;

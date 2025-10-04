import { Link } from "react-router-dom";

export default function LearnMore() {
  return (
    <div className="flex flex-col bg-gray-50 text-gray-800 min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 text-center py-16 md:py-20 bg-white shadow-md rounded-xl mx-4 md:mx-12 mt-8">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-indigo-700">
          ✨ Learn More About TaskApp
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-3xl text-gray-600">
          TaskApp is more than just a to-do list. It’s your productivity
          companion — helping you stay organized, focused, and efficient whether
          working solo or in a team.
        </p>
      </section>

      {/* Learn More Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto space-y-12 text-lg leading-relaxed">
        {/* Point 1 */}
        <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Organize tasks"
            className="w-24 h-24 md:w-32 md:h-32"
          />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-indigo-700">
              Stay Organized
            </h2>
            <p className="text-gray-600">
              Keep all your tasks in one place. Create, edit, and categorize
              tasks effortlessly while prioritizing what matters most.
            </p>
          </div>
        </div>

        {/* Point 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
            alt="Time tracking"
            className="w-24 h-24 md:w-32 md:h-32"
          />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-purple-700">
              Track Your Time
            </h2>
            <p className="text-gray-600">
              Deadlines and reminders help you stay on track. Set due dates, get
              notifications, and measure time spent to improve productivity.
            </p>
          </div>
        </div>

        {/* Point 3 */}
        <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
            alt="Analytics"
            className="w-24 h-24 md:w-32 md:h-32"
          />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-pink-700">
              Visualize Progress
            </h2>
            <p className="text-gray-600">
              Built-in charts and analytics help you understand your progress,
              identify strengths, and work on challenges effectively.
            </p>
          </div>
        </div>

        {/* Point 4 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1256/1256650.png"
            alt="Collaboration"
            className="w-24 h-24 md:w-32 md:h-32"
          />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-indigo-700">
              Collaborate Easily
            </h2>
            <p className="text-gray-600">
              Share tasks, assign responsibilities, and monitor progress.
              Whether in small groups or large teams, collaboration becomes
              seamless.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 text-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-xl shadow-md mx-4 md:mx-12 mt-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-800">
          🚀 Ready to Boost Your Productivity?
        </h2>
        <p className="mb-8 max-w-2xl mx-auto text-lg text-gray-700">
          Join thousands using TaskApp to stay on top of work and achieve more
          every day.
        </p>
        <Link
          to="/register"
          className="bg-indigo-600 text-white px-10 py-4 rounded-full font-semibold shadow-md hover:bg-indigo-700 transition duration-300"
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="p-6 text-center bg-gray-100 mt-auto text-gray-600 border-t">
        © {new Date().getFullYear()} TaskApp. All rights reserved.
      </footer>
    </div>
  );
}

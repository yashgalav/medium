"use client"


import { Mail, Github, Linkedin, Code, Briefcase, Heart } from "lucide-react"


export default function OurStory() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Our Story</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto flex items-center justify-center">
              <Code className="w-16 h-16 text-gray-600" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Hi, I'm Yash Kumar</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                A passionate software developer with 4+ years of experience crafting digital solutions and bringing
                ideas to life through code.
              </p>
            </div>
          </div>

          {/* Story Content */}
          <div className="bg-white border rounded-lg border-gray-200 shadow-sm">
            <div className="p-8">
              <div className="prose prose-gray max-w-none">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                  <Briefcase className="w-6 h-6" />
                  My Journey
                </h3>

                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p className="text-lg">
                    Over the past four years, I've been on an incredible journey in software development, constantly
                    learning, growing, and pushing the boundaries of what's possible with technology.
                  </p>

                  <p>
                    My passion lies in creating meaningful applications that solve real-world problems. From frontend
                    interfaces that users love to interact with, to robust backend systems that power seamless
                    experiences, I enjoy every aspect of the development process.
                  </p>

                  <p>
                    Recently, I built a Medium clone as a showcase of my technical skills and attention to detail. This
                    project demonstrates my ability to recreate complex platforms while adding my own innovative
                    touches. It's more than just code – it's a reflection of my dedication to craftsmanship and user
                    experience.
                  </p>
                </div>

                <div className="mt-8 p-6 bg-gray-50 rounded-lg border-l-4 border-gray-400">
                  <p className="text-gray-700 italic flex items-start gap-3">
                    <Heart className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    "I believe that great software is built not just with technical expertise, but with empathy for the
                    users who will interact with it every day."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills & Technologies */}
          <div className="bg-white border rounded-lg border-gray-200 shadow-sm">
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">What I Work With</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "React",
                  "TypeScript",
                  "Node.js",
                  "Next.js",
                  "Java",
                  "JavaScript",
                  "PostgreSQL",
                  "MongoDB",
                  "AWS",
                  "Docker",
                  "Git",
                  "REST APIs",
                ].map((tech) => (
                  <div key={tech} className="bg-gray-50 px-4 py-2 rounded-lg text-center text-gray-700 font-medium">
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white border rounded-lg border-gray-200 shadow-sm">
            <div className="p-8 text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Let's Connect</h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                I'm always excited to discuss new opportunities, collaborate on interesting projects, or simply chat
                about technology. Feel free to reach out!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-2.5 rounded-lg font-medium flex items-center gap-2"
                  onClick={() => (window.location.href = "mailto:yashgalav12345@gmail.com")}
                >
                  <Mail className="w-5 h-5" />
                  Get In Touch
                </button>

                <div className="flex gap-4">
                  <button
                    className="outline outline-slate-300 p-3 rounded-lg hover:bg-gray-50 bg-transparent"
                    onClick={() => window.open("https://github.com/yashgalav", "_blank")}
                  >
                    <Github className="w-4 h-4" />
                  </button>
                  <button
                    
                    className="outline outline-slate-300 p-3 rounded-lg hover:bg-gray-50 bg-transparent"
                    onClick={() => window.open("https://www.linkedin.com/in/yash-kumar-78b8041b7/", "_blank")}
                  >
                    <Linkedin className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-6">Email: yashgalav12345@gmail.com</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-8">
            <p className="text-gray-500">
              Thank you for taking the time to learn about my journey.
              <br />
              Looking forward to connecting with you!
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

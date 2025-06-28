
import { ArrowUp, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"
import { Link } from "react-router-dom";

export default function MediumFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-black text-white w-full">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container max-w-7xl mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Stay in the know</h2>
            <p className="text-gray-400 mb-6">
              Get the latest stories, ideas, and insights delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-900 border-gray-700 rounded-lg px-2 py-1 text-white placeholder:text-gray-500 "
              />
              <button className="bg-green-600 hover:bg-green-700 rounded-lg py-1 text-white px-8">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Company */}
          <div >
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <div className="space-y-3">
              <Link to="#" className="block text-gray-400 hover:text-white transition-colors">
                About
              </Link>
              <Link to="#" className="block text-gray-400 hover:text-white transition-colors">
                Careers
              </Link>
              <Link to="#" className="block text-gray-400 hover:text-white transition-colors">
                Press
              </Link>
              <Link to="#" className="block text-gray-400 hover:text-white transition-colors">
                Blog
              </Link>
              <Link to="#" className="block text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div >
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <div className="space-y-3">
              <Link to="#" className="block text-gray-400 hover:text-white transition-colors">
                Help Center
              </Link>
              <Link to="#" className="block text-gray-400 hover:text-white transition-colors">
                Writers
              </Link>
              <Link to="#" className="block text-gray-400 hover:text-white transition-colors">
                Publishers
              </Link>
              <Link to="#" className="block text-gray-400 hover:text-white transition-colors">
                API
              </Link>
              <Link to="#" className="block text-gray-400 hover:text-white transition-colors">
                Documentation
              </Link>
            </div>
          </div>

          {/* Community */}
          <div >
            <h3 className="font-semibold text-lg mb-4">Community</h3>
            <div className="space-y-3">
              <Link to="#" className="block text-gray-400 hover:text-white transition-colors">
                Writers Program
              </Link>
              <Link to="#" className="block text-gray-400 hover:text-white transition-colors">
                Partner Program
              </Link>
              <Link to="#" className="block text-gray-400 hover:text-white transition-colors">
                Affiliates
              </Link>
              <Link to="#" className="block text-gray-400 hover:text-white transition-colors">
                Creator Fund
              </Link>
              <Link to="#" className="block text-gray-400 hover:text-white transition-colors">
                Events
              </Link>
            </div>
          </div>

          {/* Support */}
          <div >
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <div className="space-y-3">
              <Link to="#" className="block text-gray-400 hover:text-white transition-colors">
                Help Center
              </Link>
              <Link to="#" className="block text-gray-400 hover:text-white transition-colors">
                Safety
              </Link>
              <Link to="#" className="block text-gray-400 hover:text-white transition-colors">
                Community Guidelines
              </Link>
              <Link to="#" className="block text-gray-400 hover:text-white transition-colors">
                Report Content
              </Link>
              <Link to="#" className="block text-gray-400 hover:text-white transition-colors">
                Status
              </Link>
            </div>
          </div>

          {/* Important Actions */}
          <div className="col-span-2 lg:col-span-2">
            <h3 className="font-semibold text-lg mb-4">Get Started</h3>
            <div className="space-y-4">
              <Link to={"/write"}>
                <button className="w-full bg-green-600 hover:bg-green-700 py-1 rounded-lg text-white">Start Writing</button>
              </Link>
              <Link to={"/signup"}>
                <button className="w-full bg-transparent outline py-1 rounded-lg border-gray-600 text-white hover:bg-gray-800">
                  Sign Up
                </button>
              </Link>
              <button
                className="w-full bg-transparent outline flex justify-center items-center py-1 rounded-lg border-gray-600 text-white hover:bg-gray-800"
                onClick={scrollToTop}
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                Back to Top
              </button>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Media */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 text-sm">Follow us:</span>
              <div className="flex space-x-4">
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <Link to="#" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="#" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="#" className="hover:text-white transition-colors">
                Cookies
              </Link>
              <Link to="#" className="hover:text-white transition-colors">
                Copyright
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8 pt-6 border-t border-gray-800">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Medium. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

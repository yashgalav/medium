import { useEffect, useRef, useState } from "react"
import { Search, Edit3, Bell, User, Menu, X, Send, LogOut } from "lucide-react"
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { emailAtom, inputAtom, userNameAtom } from "../store/atoms";
import Profile from "./Profile";


interface NavData {
  hidden: true | false;
  uploadPost?: (formData: FormData) => Promise<void> | null;
  formData?: FormData | null;
}
export default function MediumNavbar({ hidden, uploadPost, formData }: NavData) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(false);
  const navigate = useNavigate();
  const email = useRecoilValue(emailAtom);
  const name = useRecoilValue(userNameAtom);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [,setInputValue] = useRecoilState(inputAtom);
  

  useEffect(() => {
    setIsHidden(hidden)
  }, [hidden])


// Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

  const logout = () => {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("userId")
    navigate("/")
  }




  return (
    <nav className="bg-white border-b border-gray-200 w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 ">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Logo */}
            <div className="flex items-center">
              <Link to={"/blogs"}><h1 className="text-2xl font-bold text-black">Medium</h1></Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 ">
              <Link to="/our-story" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Our story
              </Link>
              <Link to="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Membership
              </Link>
              {isHidden && <Link to="/write" className="text-gray-600  hover:text-gray-900 text-sm font-medium">
                Write
              </Link>}
              {!isHidden &&
                <button onClick={() => uploadPost!(formData!)} type="button" className="text-white  bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center   ">
                  Publish
                </button>
              }
            </div>
          </div>

          {/* Right side - Search, Actions, User */}
          <div className="flex items-center space-x-4 ">
            {/* Search */}
            {isHidden && <div className="flex items-center ">
              {isSearchOpen ? (
                <div className="flex items-center bg-gray-100 rounded-full px-1 md:px-3 py-2">
                  <Search className="h-4 w-4 text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent outline-none text-sm w-20 md:w-48"
                    autoFocus
                    onChange ={e => {setInputValue(e.target.value)}}
                    onBlur={() => setIsSearchOpen(false)}
                  />
                </div>
              ) : (
                <button
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                </button>
              )}
            </div>}

            {/* Mobile search */}
            {/* {isHidden && <button className="sm:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
              <Search className="h-5 w-5" />
            </button>} */}

            {/* Write button */}
            {isHidden && <Link to={"/write"} className="hidden sm:flex items-center space-x-2 text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-full">
              <Edit3 className="h-5 w-5" />
              <span className="text-sm font-medium hidden lg:block">Write</span>
            </Link>}

            {!isHidden &&
              <button onClick={() => uploadPost!(formData!)} className=" sm:flex items-center space-x-2 text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-full">
                <Send className="h-5 w-5" />
                <span className="text-sm font-medium hidden lg:block">Publish</span>
              </button>}



            {/* Notifications */}
            <button className="hidden sm:flex p-2  text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile */}
            

            <Profile/>

            {/* Logout  */}
            <div className="flex items-center md:space-x-2 md:hidden">
              <button onClick={logout}  className="p-1 rounded-full hover:bg-gray-100">
                <div className="h-8 w-8 rounded-full flex items-center justify-center">
                  <LogOut className="h-4 w-4 " />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div ref={dropdownRef} className="md:hidden  border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/our-story" className="text-gray-600 hover:text-gray-900 text-sm font-medium px-2 py-1">
                Our story
              </Link>
              <Link to="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium px-2 py-1">
                Membership
              </Link>
              {isHidden && <Link to="/write" className="text-gray-600 hover:text-gray-900 text-sm font-medium px-2 py-1">
                Write
              </Link>}

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-3 px-2">
                  <div className="h-10 w-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{name}</p>
                    <p className="text-xs text-gray-500">{email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

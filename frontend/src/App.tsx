import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Blogs from "./pages/Blogs"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Write from "./pages/Write"
import BlogRead from "./pages/BlogRead"
import ProtectedRoute from "./components/ProtectedRoute"
import OurStory from "./pages/OurStory"

function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog" element={<BlogRead/>} />
          <Route path="/our-story" element={<OurStory/>} />
          <Route path="/write" element={
            <ProtectedRoute >
              <Write/>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App










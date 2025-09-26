import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Lazy load pages
const Home = lazy(() => import('./pages/Home'))
const CarListings = lazy(() => import('./pages/CarListings'))
const CarListingsDemo = lazy(() => import('./pages/CarListingsDemo'))
const CarDetails = lazy(() => import('./pages/CarDetails'))
const Cart = lazy(() => import('./pages/Cart'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Profile = lazy(() => import('./pages/Profile'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {

   return (
     <div className="app-container">
       <Navbar />
       <main className="app-main">
         <Suspense fallback={
           <div className="loading-container">
             <div className="loading-spinner"></div>
           </div>
         }>
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/cars" element={<CarListings />} />
             <Route path="/car-listings-demo" element={<CarListingsDemo />} />
             <Route path="/cars/:id" element={<CarDetails />} />
             <Route path="/cart" element={<Cart />} />
             <Route path="/login" element={<Login />} />
             <Route path="/register" element={<Register />} />
             <Route path="/profile" element={<Profile />} />
             <Route path="/about" element={<About />} />
             <Route path="/contact" element={<Contact />} />
             <Route path="*" element={<NotFound />} />
           </Routes>
         </Suspense>
       </main>
       <Footer />
     </div>
   )
}

export default App

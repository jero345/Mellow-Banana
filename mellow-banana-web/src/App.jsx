import { MotionConfig } from 'motion/react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsappButton from './components/WhatsappButton'
import Intro from './motion/Intro'
import Cursor from './motion/Cursor'
import ScrollProgress from './motion/ScrollProgress'
import PageTransition from './motion/PageTransition'
import Home from './pages/Home'
import Work from './pages/Work'
import Project from './pages/Project'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    // `reducedMotion="user"` makes every motion component here respect the OS
    // setting without each one having to check.
    <MotionConfig reducedMotion="user">
      <Intro />
      <ScrollProgress />
      <Cursor />
      <Header />

      <PageTransition>
        <main id="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<Project />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </PageTransition>

      {/* Always reachable, so it sits outside the page transition. */}
      <WhatsappButton />
    </MotionConfig>
  )
}

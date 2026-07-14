import { useLenis } from './lib/useLenis'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { TechMarquee } from './components/TechMarquee'
import { Work } from './components/Work'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

function App() {
  useLenis()

  return (
    <div className="grain">
      <Nav />
      <main>
        <Hero />
        <TechMarquee />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App

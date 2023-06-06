import Navbar from './component/Navbar'
import Footer from './component/Footer'
import { Contact, Menu, Product, Hero } from './component/Content'
import './static/css/style.css'

function App() {

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Menu Section start */}
      <Menu />

      {/* Products Section start */}
      <Product />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </>
  )
}

export default App

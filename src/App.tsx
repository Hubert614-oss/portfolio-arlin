import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import MenuDrawerMobile from './components/MenuDrawerMobile'




function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuToggle = () => setIsMenuOpen((prev) => !prev)
  const handleMenuClose = () => setIsMenuOpen(false)

  const navItems = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Projets', href: '#projets' },
    { label: 'Technos', href: '#technos' },
    { label: 'Contact', href: '#contact' },
  ]


  return (
    <>
      <div className="h-screen">
        <Header
          navItems={navItems}
          isMenuOpen={isMenuOpen}
          onMenuToggle={handleMenuToggle}
        />

        <MenuDrawerMobile
          navItems={navItems}
          isOpen={isMenuOpen}
          onClose={handleMenuClose}
        />

        {/* <Footer /> */}
      </div>
    </>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import PrincipalPage from './components/PrincipalPage'
import MenuDrawerMobile from './components/MenuDrawerMobile'
import type { Page } from './stores/content.store'




function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuToggle = () => setIsMenuOpen((prev) => !prev)
  const handleMenuClose = () => setIsMenuOpen(false)

  const navItems = [
    { label: 'Accueil', href: 'accueil', route: 'accueil' as Page },
    { label: 'Projets', href: 'projets', route: 'projets' as Page },
    { label: 'Technos', href: 'technos', route: 'technos' as Page },
    { label: 'Contact', href: 'contact', route: 'contact' as Page },
  ]


  return (
    <>
      <div className="h-screen">
        <PrincipalPage
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

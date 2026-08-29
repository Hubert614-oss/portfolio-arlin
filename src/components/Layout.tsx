
import React, { useEffect, useState, useRef } from 'react'
import { motion } from "framer-motion";
import { SiDevbox } from "react-icons/si";

import MenuDrawerMobile from '../components/MenuDrawerMobile'

import { Link } from 'react-router-dom';


interface LayoutProps {
    children: React.ReactNode;
}


const Layout = ({ children }: LayoutProps) => {
    const [showNav, setShowNav] = useState(true)
    const lastScrollY = useRef(0)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const handleMenuToggle = () => setIsMenuOpen((prev) => !prev)
    const handleMenuClose = () => setIsMenuOpen(false)


    useEffect(() => {
        const scrollThreshold = 6

        const handleScroll = () => {
            const currentY = window.scrollY
            const isAtTop = currentY <= 10
            const isScrollingDown = currentY > lastScrollY.current + scrollThreshold
            const isScrollingUp = currentY < lastScrollY.current - scrollThreshold

            if (isAtTop) {
                setShowNav(true)
            } else if (isScrollingDown) {
                setShowNav(false)
            } else if (isScrollingUp) {
                setShowNav(true)
            }

            lastScrollY.current = currentY
        }

        lastScrollY.current = window.scrollY
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])


    const navItems = [
        { label: 'Accueil', href: 'accueil', route: '/accueil' },
        { label: 'Projets', href: 'projets', route: '/projets' },
        { label: 'Compétences', href: 'competences', route: '/competences' },
        { label: 'Expérience', href: 'experience', route: '/experience' },
        { label: 'Contact', href: 'contact', route: '/contact' },
    ]


    return (
        <>
            {/* Navigation Bar */}
            <div id="accueil" className="relative overflow-hidden bg-black min-h-screen">

                {/* Animated background particles */}
                <div
                    className={` fixed top-0 right-0 h-16 w-170 backdrop-blur-md bg-white/10 z-50
                        [clip-path:polygon(80px_0,100%_0,100%_100%,0_100%,0_100px)]
                        transition-all duration-300 ease-out
                        ${showNav
                            ? "translate-y-0 opacity-100"
                            : "-translate-y-full opacity-0 pointer-events-none"
                        }
                    `}
                ></div>

                <nav
                    // className={`fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-white/8 transition-all duration-300 ease-out ${showNav
                    className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-out ${showNav
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-full opacity-0 pointer-events-none"
                        }`}
                >

                    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-2xl md:text-3xl font-bold text-white tracking-wider"
                            >
                                <span className="inline-flex items-center gap-2 bg-linear-to-r from-cyan to-iris bg-clip-text text-white">
                                    <Link to="/" className="text-2xl md:text-3xl"><SiDevbox /></Link>
                                </span>
                            </motion.div>

                            <motion.ul
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="hidden md:flex gap-1 ml-auto"
                            >
                                {navItems.map((item) => (
                                    <motion.li
                                        key={item.label}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link to={item.href}
                                            className="relative px-4 py-2 text-slate-200 hover:text-white font-medium transition-all duration-300 group cursor-pointer"
                                        >
                                            {item.label}
                                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan group-hover:w-3/4 transition-all duration-300 rounded-full" />
                                        </Link>
                                    </motion.li>
                                ))}
                            </motion.ul>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="ml-auto md:ml-6"
                            >
                                <button
                                    onClick={handleMenuToggle}
                                    className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl transition-colors text-white"
                                    aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                                    aria-expanded={isMenuOpen}
                                >
                                    {isMenuOpen ? (
                                        ""
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                                        </svg>
                                    )}
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </nav>

                <main>
                    {children}
                </main>

            </div>

            <MenuDrawerMobile
                navItems={navItems}
                isOpen={isMenuOpen}
                onClose={handleMenuClose}
            />
        </>
    )
}

export default Layout
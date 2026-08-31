
import React, { useEffect, useState, useRef } from 'react'
import { motion } from "framer-motion";
import { SiDevbox } from "react-icons/si";

import MenuDrawerMobile from '../components/MenuDrawerMobile'

import { Link, useLocation } from 'react-router-dom';
import { ToggleTheme } from './ToggleTheme';


interface LayoutProps {
    children: React.ReactNode;
}


const Layout = ({ children }: LayoutProps) => {
    const [showNav, setShowNav] = useState(true)
    const lastScrollY = useRef(0)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()
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
        { label: 'Accueil', href: '/', route: '/' },
        { label: 'Projets', href: 'projets', route: '/projets' },
        { label: 'Compétences', href: 'competences', route: '/competences' },
        { label: 'Expérience', href: 'experience', route: '/experience' },
        { label: 'Contact', href: 'contact', route: '/contact' },
    ]


    return (
        <>
            {/* Navigation Bar */}
            <div id="accueil" className="relative overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 min-h-screen dark:bg-slate-950 dark:text-slate-50">

                {/* Animated background particles */}
                <div
                    className={` fixed top-0 right-0 h-16 w-180 backdrop-blur-md bg-slate-100 dark:bg-slate-800/70 z-50
                        [clip-path:polygon(80px_0,100%_0,100%_100%,0_100%,0_100px)]
                        transition-all duration-300 ease-out
                        ${showNav
                            ? "translate-y-0 opacity-100"
                            : "-translate-y-full opacity-0 pointer-events-none"
                        }
                    `}
                ></div>

                <nav
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
                                className="text-2xl md:text-3xl font-bold tracking-wider text-slate-900 dark:text-white"
                            >
                                <span className="inline-flex items-center gap-2 bg-linear-to-r from-cyan-500 to-indigo-500 bg-clip-text text-transparent dark:from-cyan-400 dark:to-indigo-400">
                                    <Link to="/" className="text-2xl md:text-3xl text-slate-700 dark:text-white"><SiDevbox /></Link>
                                </span>
                            </motion.div>

                            <motion.ul
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="hidden md:flex gap-1 ml-auto md:items-center"
                            >
                                <span>
                                    <ToggleTheme />
                                </span>

                                {navItems.map((item) => {
                                    const isActive = item.route === location.pathname || (item.route === '/' && (location.pathname === '/' || location.pathname === '/accueil'));

                                    return (
                                        <motion.li
                                            key={item.label}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="relative"
                                        >
                                            <Link to={item.route}
                                                className={`relative block px-4 py-2 font-medium transition-all duration-300 group cursor-pointer ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-900 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'}`}
                                            >
                                                {item.label}

                                                {isActive && (
                                                    <motion.span
                                                        layoutId="nav-indicator"
                                                        className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-cyan-500 shadow-[0_0_16px_rgba(34,211,238,0.8)] dark:bg-cyan-400"
                                                        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                                                    />
                                                )}

                                                {!isActive && (
                                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan-500 dark:bg-cyan-400 group-hover:w-3/4 transition-all duration-300 rounded-full" />
                                                )}
                                            </Link>
                                        </motion.li>
                                    );
                                })}
                            </motion.ul>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="ml-auto md:ml-6 flex items-center gap-2"
                            >
                                <span className="md:hidden block">
                                    <ToggleTheme />
                                </span>
                                <button
                                    onClick={handleMenuToggle}
                                    className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl transition-colors text-slate-900 dark:text-white"
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
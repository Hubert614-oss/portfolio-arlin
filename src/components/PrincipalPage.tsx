import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from "framer-motion";
import Header from './sections/header';
import { containerVariants, itemVariants, titleContainerVariants, titleLetterVariants, slideVariants, floatingAnimation } from '../utils/animation';

import { stats, images } from '../utils/data';
import Technologies from './sections/Technologies';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import { useContentStore, type Page } from '../stores/content.store';

type NavItem = { label: string; href: string; route: Page; }

type HeaderProps = {
    navItems: NavItem[]
    isMenuOpen: boolean
    onMenuToggle: () => void
}

const PrincipalPage = ({ navItems, isMenuOpen, onMenuToggle }: HeaderProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)
    const [showNav, setShowNav] = useState(true)
    const statsRef = useRef<HTMLDivElement | null>(null)
    const lastScrollY = useRef(0)
    const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" })


    // Auto-play slideshow
    useEffect(() => {
        setIsLoaded(true)
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

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



    // Animated counter component
    type AnimatedCounterProps = {
        value: number
        suffix: string
        label: string
        delay: number
    }

    const AnimatedCounter = ({ value, suffix, label, delay }: AnimatedCounterProps) => {
        const [count, setCount] = useState(0)
        const counterRef = useRef<HTMLDivElement | null>(null)
        const isInView = useInView(counterRef, { once: true })

        useEffect(() => {
            if (isInView) {
                const timer = setTimeout(() => {
                    let start = 0
                    const end = value
                    const duration = 2000
                    const increment = end / (duration / 16)

                    const counter = setInterval(() => {
                        start += increment
                        if (start >= end) {
                            setCount(end)
                            clearInterval(counter)
                        } else {
                            setCount(Math.floor(start))
                        }
                    }, 16)

                    return () => clearInterval(counter)
                }, delay * 200)

                return () => clearTimeout(timer)
            }
        }, [isInView, value, delay])

        return (
            <motion.div
                ref={counterRef}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: delay * 0.15 }}
                className="text-center"
            >
                <p className="text-4xl md:text-5xl font-bold bg-linear-to-r from-white to-cyan bg-clip-text text-transparent">
                    {count}{suffix}
                </p>
                <p className="text-sm md:text-base text-gray-300 mt-2 font-medium">{label}</p>
            </motion.div>
        )
    }


    const page = useContentStore((state) => state.page)
    const setPage = useContentStore((state) => state.setPage)

    return (

        <>
            {/* Navigation Bar */}
            <div id="accueil" className="relative overflow-hidden bg-white min-h-screen">

                
                {/* Header background slideshow */}
                <div className="absolute inset-0 z-0">
                    <AnimatePresence initial={false} mode="wait">
                        <motion.img
                            key={currentImageIndex}
                            src={images[currentImageIndex]}
                            alt="Header background"
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                </div>

                {/* Animated background particles */}
                <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-cyan/10 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0.3, 0.7, 0.3],
                                scale: [1, 1.5, 1],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                    {/* Gradient orbs */}
                    <motion.div
                        className="absolute -top-40 -right-40 w-96 h-96 bg-cyan/10 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute -bottom-40 -left-40 w-96 h-96 bg-rose/10 rounded-full blur-3xl"
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                <div className={`h-16 fixed top-0 right-0  backdrop-blur-md bg-white/8 w-130 transition-all duration-300 ease-out ${showNav
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-full opacity-0 pointer-events-none"
                    } `}></div>

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
                                <span className="inline-flex items-center gap-2 bg-linear-to-r from-cyan to-iris bg-clip-text text-transparent">
                                    <span className="text-2xl md:text-3xl">{'</>'}</span>
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
                                        <a
                                            // href={item.href}
                                            onClick={() => {
                                                setPage(item.route)
                                            }}
                                            className="relative px-4 py-2 text-slate-200 hover:text-white font-medium transition-all duration-300 group"
                                        >
                                            {item.label}
                                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan group-hover:w-3/4 transition-all duration-300 rounded-full" />
                                        </a>
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
                                    onClick={onMenuToggle}
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

                {/* <p className='text-2xl font-bold text-white absolute top-30'>{page}</p>
                <p className='text-2xl font-bold text-white absolute top-40'>{page}</p>

                <button onClick={() => setPage('technos')} className="border border-slate-400 px-3 py-2 text-white font-bold absolute top-50">Homme</button> */}


                {page === 'contact' && (<Contact />)}

                {page === 'technos' && (<Technologies />)}

                {page === 'projets' && (<Projects />)}

                {page === 'accueil' &&

                    (
                        <Header
                            isLoaded={isLoaded}
                            statsRef={statsRef}
                            isStatsInView={isStatsInView}
                            stats={stats}
                            floatingAnimation={floatingAnimation}
                            containerVariants={containerVariants}
                            itemVariants={itemVariants}
                            titleContainerVariants={titleContainerVariants}
                            titleLetterVariants={titleLetterVariants}
                            AnimatedCounter={AnimatedCounter}
                        />
                    )
                }


            </div>
        </>
    )
}

export default PrincipalPage
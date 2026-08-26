import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView, type Variants } from "framer-motion";
import arlinImg from "../assets/arlin.webp";

type NavItem = { label: string; href: string }

type HeaderProps = {
    navItems: NavItem[]
    isMenuOpen: boolean
    onMenuToggle: () => void
}

const Header = ({ navItems, isMenuOpen, onMenuToggle }: HeaderProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)
    const [showNav, setShowNav] = useState(true)
    const statsRef = useRef<HTMLDivElement | null>(null)
    const lastScrollY = useRef(0)
    const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" })

    const images = [
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
        'https://e7.pngegg.com/pngimages/578/658/png-clipart-web-development-web-developer-web-design-software-developer-web-design-furniture-search-engine-optimization.png',
    ]

    const stats = [
        { value: 25, suffix: '+', label: 'Projets réalisés' },
        { value: 10, suffix: '+', label: 'Clients satisfaits' },
        { value: 2, suffix: '+', label: 'Années d\'expérience' },
        { value: 100, suffix: '%', label: 'Satisfaction client' },
    ]

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


    // Animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            }
        }
    }

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
            }
        }
    }

    const titleContainerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.2,
            }
        }
    }

    const titleLetterVariants: Variants = {
        hidden: { opacity: 0, x: 40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 0.61, 0.36, 1] as [number, number, number, number]
            }
        }
    }

    const slideVariants: Variants = {
        enter: {
            opacity: 0,
            scale: 1.02,
        },
        center: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            }
        },
        exit: {
            opacity: 0,
            scale: 0.98,
            transition: {
                duration: 0.6,
                ease: "easeIn",
            }
        }
    }

    const floatingAnimation = {
        y: [-10, 10, -10],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: [0.42, 0, 0.58, 1] as [number, number, number, number]
        }
    }



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
                                    <span className="hidden sm:inline text-sm font-bold">Arlin</span>
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
                                            href={item.href}
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

                {/* Hero Header */}
                <header className="relative z-20 pt-24 pb-20 md:pt-20 md:pb-32">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                            {/* Partie Gauche - Logo Initial */}
                            <motion.div
                                initial={{ opacity: 0, x: -60 }}
                                animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.9, ease: "easeOut" }}
                                className="flex flex-col items-center order-2 lg:order-1"
                            >
                                <motion.div
                                    animate={floatingAnimation}
                                    className="relative w-full max-w-xs sm:max-w-sm md:max-w-md"
                                >
                                    <div className="relative w-full aspect-square rounded-full p-0 flex items-center justify-center bg-linear-to-br from-cyan/20 to-iris/20 border-2 border-cyan/30 overflow-hidden">
                                        <img src={arlinImg} alt="Arlin Hubert" className="w-full h-full object-cover" />
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* Partie Droite - Contenu Principal */}
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate={isLoaded ? "visible" : "hidden"}
                                className="text-white order-1 lg:order-2"
                            >
                                {/* Badge */}
                                <motion.div variants={itemVariants} className="mb-6">
                                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan/10 backdrop-blur-sm rounded-full border border-cyan/20 text-sm font-medium text-cyan">
                                        <span className="w-2 h-2 bg-cyan rounded-full animate-pulse" />
                                        Développeur Web Full Stack
                                    </span>
                                </motion.div>

                                {/* Title with gradient */}
                                <motion.h1
                                    variants={itemVariants}
                                    className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                                >
                                    <motion.span
                                        className="bg-linear-to-r from-white via-iris to-cyan bg-clip-text text-transparent inline-flex"
                                        variants={titleContainerVariants}
                                        initial="hidden"
                                        animate={isLoaded ? "visible" : "hidden"}
                                        aria-label="Arlin Hubert"
                                        role="text"
                                    >
                                        {Array.from('Arlin Hubert').map((char, index) => (
                                            <motion.span
                                                key={`${char}-${index}`}
                                                className="inline-block"
                                                variants={titleLetterVariants}
                                            >
                                                {char === ' ' ? '\u00A0' : char}
                                            </motion.span>
                                        ))}
                                    </motion.span>
                                </motion.h1>

                                {/* Animated subtitle */}
                                <motion.p
                                    variants={itemVariants}
                                    className="text-xl md:text-2xl font-semibold mb-2 sm:mb-8 text-gray-200 leading-relaxed"
                                >
                                    Créer des{' '}
                                    <motion.span
                                        className="text-cyan inline-block"
                                        animate={{ opacity: [1, 0.5, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        solutions web
                                    </motion.span>{' '}
                                    innovantes
                                </motion.p>

                                <motion.p
                                    variants={itemVariants}
                                    className="text-base md:text-lg text-gray-300 mb-4 sm:mb-10 max-w-lg leading-relaxed"
                                >
                                    Je conçois et développe des applications web modernes, performantes et
                                    intuitives. Passionné par le code et l'UX, je transforme vos idées en produits digitaux de qualité.
                                </motion.p>

                                {/* CTA Buttons */}
                                <motion.div
                                    variants={itemVariants}
                                    className="flex flex-row flex-wrap gap-4"
                                >
                                    <motion.a
                                        href="#projets"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="group relative px-5 py-3 text-sm sm:text-base sm:px-8 sm:py-4 bg-gray-900 text-white font-bold rounded-xl overflow-hidden transition-all duration-300 shadow-lg shadow-gray-900/20 text-center"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            Voir mes projets
                                            <motion.span
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            >
                                                →
                                            </motion.span>
                                        </span>
                                        <div className="absolute inset-0 bg-linear-to-r from-cyan/20 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </motion.a>

                                    <motion.a
                                        href="#contact"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="group px-5 py-3 text-sm sm:text-base sm:px-8 sm:py-4 bg-transparent border-2 border-white/20 text-white font-bold rounded-xl hover:bg-white/5 hover:border-white/30 transition-all duration-300 backdrop-blur-sm text-center"
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            Me contacter
                                            <motion.span
                                                className="inline-block"
                                                animate={{ rotate: [0, 15, -15, 0] }}
                                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                            >
                                                👋
                                            </motion.span>
                                        </span>
                                    </motion.a>
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Stats Section */}
                        <motion.div
                            ref={statsRef}
                            initial={{ opacity: 0, y: 60 }}
                            animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mt-20 md:mt-28"
                        >
                            <div className="relative bg-gray-50/10 rounded-3xl p-8 md:p-12 shadow-sm">
                                <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/3 h-px bg-linear-to-r from-transparent via-cyan to-transparent" />

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                                    {stats.map((stat, index) => (
                                        <AnimatedCounter
                                            key={stat.label}
                                            value={stat.value}
                                            suffix={stat.suffix}
                                            label={stat.label}
                                            delay={index}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Scroll indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                            className="flex justify-center mt-16"
                        >
                            <motion.a
                                href="#about"
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors"
                            >
                                <span className="text-xs tracking-widest uppercase">Découvrir</span>
                                <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2">
                                    <motion.div
                                        animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        className="w-1.5 h-1.5 bg-current rounded-full"
                                    />
                                </div>
                            </motion.a>
                        </motion.div>
                    </div>
                </header>
            </div>
        </>
    )
}

export default Header
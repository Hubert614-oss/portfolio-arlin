import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

import { containerVariants, itemVariants, titleContainerVariants, titleLetterVariants, floatingAnimation } from '../../utils/animation';

import { stats } from '../../utils/data';
import { Link } from "react-router-dom";

import cvFile from '../../assets/cv-arlin.pdf';
import cvPreview from '../../assets/cv.webp';
import { useThemeStore } from "../../stores/themeStore";
import AnimatedBackground from "../AnimatedBackground";



const Home = () => {
    const [isLoaded, setIsLoaded] = useState(false)

    const statsRef = useRef<HTMLDivElement | null>(null)
    const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" })


    const { theme } = useThemeStore();

    useEffect(() => {
        setIsLoaded(true)
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
                <p className="text-4xl md:text-5xl font-bold bg-linear-to-r from-slate-900 via-cyan-600 to-cyan-500 bg-clip-text text-transparent dark:from-white dark:via-cyan-300 dark:to-cyan-400">
                    {count}{suffix}
                </p>
                <p className="text-sm md:text-base text-slate-500 mt-2 font-medium dark:text-slate-300">{label}</p>
            </motion.div>
        )
    }

    return (
        <>
            <AnimatedBackground variant={theme} showGrid showOrbs showDots>
                <div className="relative z-20 pt-24 pb-20 md:pt-20 md:pb-32">
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
                                    className="relative w-full max-w-48 sm:max-w-sm md:max-w-md"
                                >
                                    <div className="relative w-full aspect-square rounded-full p-0 flex items-center justify-center bg-linear-to-br from-cyan-100 to-indigo-100 border-2 border-cyan-200 overflow-hidden dark:from-cyan/20 dark:to-iris/20 dark:border-cyan/30">
                                        <img src={`https://res.cloudinary.com/duzwmu0rx/image/upload/v1787764768/arlin_webp_uuelci.webp`} alt="Arlin Hubert" className="w-full h-full object-cover" />
                                    </div>

                                    {/* Badge */}
                                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-nowrap">
                                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 backdrop-blur-sm rounded-full border border-cyan-200 text-sm font-medium text-cyan-700 dark:bg-cyan-500/10 dark:border-cyan-400/30 dark:text-cyan-300">
                                            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse dark:bg-cyan-300" />
                                            Développeur Web Full Stack
                                        </span>
                                    </div>
                                </motion.div>

                            </motion.div>

                            {/* Partie Droite - Contenu Principal */}
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate={isLoaded ? "visible" : "hidden"}
                                className="text-slate-900 dark:text-white order-1 lg:order-2"
                            >

                                {/* Welcome greeting */}
                                <motion.p
                                    variants={itemVariants}
                                    className="mb-2 text-2xl md:text-2xl text-cyan-600 font-bold dark:text-cyan-400"
                                >
                                    Bonjour!👋
                                </motion.p>

                                <motion.p
                                    variants={itemVariants}
                                    className="text-lg md:text-xl text-cyan-600 font-medium dark:text-cyan-400"
                                >
                                    C'est
                                </motion.p>

                                {/* Title with gradient */}
                                <motion.h1
                                    variants={itemVariants}
                                    className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-slate-900 dark:text-white"
                                >
                                    <motion.span
                                        className="inline-flex"
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
                                    className="text-xl md:text-2xl font-semibold mb-2 sm:mb-8 text-slate-600 leading-relaxed dark:text-slate-200"
                                >
                                    Créer des{' '}
                                    <motion.span
                                        className="text-cyan-600 inline-block dark:text-cyan-400"
                                        animate={{ opacity: [1, 0.5, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        solutions web
                                    </motion.span>{' '}
                                    innovantes
                                </motion.p>

                                <motion.p
                                    variants={itemVariants}
                                    className="text-base md:text-lg text-slate-600 mb-4 sm:mb-10 max-w-lg leading-relaxed dark:text-slate-300"
                                >
                                    Je conçois et développe des applications web modernes, performantes et
                                    intuitives. Passionné par le code et l'UX, je transforme vos idées en produits digitaux de qualité.
                                </motion.p>

                                {/* CTA Buttons */}
                                <motion.div
                                    variants={itemVariants}
                                    className="flex flex-row flex-wrap gap-4"
                                >
                                    <Link to="/projets"
                                        className="group relative px-6 py-3.5 text-sm font-bold bg-slate-900 text-white rounded-xl overflow-hidden transition-all duration-300 shadow-lg shadow-slate-900/20 text-center sm:px-8 sm:py-4 sm:text-base dark:bg-slate-800 border border-slate-700/50 dark:border-slate-600/50 dark:text-white dark:hover:bg-slate-700/30 dark:hover:border-slate-500/50"
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
                                        <div className="absolute inset-0 bg-linear-to-r from-cyan-200/30 to-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:from-cyan/20 dark:to-gray-900" />
                                    </Link>

                                    <Link to="/contact"
                                        className="group px-6 py-3.5 text-sm font-bold bg-white border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 hover:text-slate-900 transition-all duration-300 backdrop-blur-sm text-center sm:px-8 sm:py-4 sm:text-base dark:bg-transparent dark:border-white/20 dark:text-white dark:hover:bg-white/5 dark:hover:border-white/30"
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            Me contacter
                                            <motion.span
                                                className="inline-block"
                                                animate={{ rotate: [0, 15, -15, 0] }}
                                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                            >
                                                🤝
                                            </motion.span>
                                        </span>
                                    </Link>

                                    <a
                                        href={cvFile}
                                        download="CV-Arlin-Hubert.pdf"
                                        className="group inline-flex items-center justify-center gap-3 rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2.5 text-xs font-bold text-cyan-700 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-100 hover:text-cyan-800 sm:text-sm sm:px-4 sm:py-3 dark:border-cyan-400/30 dark:bg-cyan-500/10 dark:text-cyan-300 dark:hover:border-cyan-300 dark:hover:bg-cyan-500/20 dark:hover:text-white"
                                    >
                                        <img
                                            src={cvPreview}
                                            alt="Aperçu du CV"
                                            className="h-8 w-8 rounded-full object-cover border border-cyan-400/60 shadow-lg shadow-cyan-500/20 sm:h-10 sm:w-10 dark:border-cyan-300/60"
                                        />
                                        <span>Mon CV</span>
                                        <motion.span
                                            animate={{ y: [0, 2, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                            className="text-sm"
                                        >
                                            ↓
                                        </motion.span>
                                    </a>
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
                            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900/60 dark:ring-white/10">
                                <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/3 h-px bg-linear-to-r from-transparent via-cyan-400 to-transparent dark:via-cyan" />

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
                    </div>
                </div>
            </AnimatedBackground>
        </>
    )
}

export default Home
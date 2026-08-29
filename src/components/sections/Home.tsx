import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

import { containerVariants, itemVariants, titleContainerVariants, titleLetterVariants, floatingAnimation } from '../../utils/animation';

import { stats } from '../../utils/data';
import { Link } from "react-router-dom";





const Home = () => {
    const [isLoaded, setIsLoaded] = useState(false)

    const statsRef = useRef<HTMLDivElement | null>(null)
    const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" })





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
                <p className="text-4xl md:text-5xl font-bold bg-linear-to-r from-white to-cyan bg-clip-text text-transparent">
                    {count}{suffix}
                </p>
                <p className="text-sm md:text-base text-gray-300 mt-2 font-medium">{label}</p>
            </motion.div>
        )
    }

    return (
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
                            <div className="relative w-full aspect-square rounded-full p-0 flex items-center justify-center bg-linear-to-br from-cyan/20 to-iris/20 border-2 border-cyan/30 overflow-hidden">
                                <img src={`https://res.cloudinary.com/duzwmu0rx/image/upload/v1787764768/arlin_webp_uuelci.webp`} alt="Arlin Hubert" className="w-full h-full object-cover" />
                            </div>

                            {/* Badge */}
                            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-nowrap text-white">
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan/10 backdrop-blur-sm rounded-full border border-cyan/20 text-sm font-medium text-cyan">
                                    <span className="w-2 h-2 bg-cyan rounded-full animate-pulse" />
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
                        className="text-white order-1 lg:order-2"
                    >

                        {/* Welcome greeting */}
                        <motion.p
                            variants={itemVariants}
                            className="mb-2 text-2xl md:text-2xl text-cyan font-bold"
                        >
                            Bonjour!👋
                        </motion.p>

                        <motion.p
                            variants={itemVariants}
                            className="text-lg md:text-xl text-cyan font-medium"
                        >
                            C'est
                        </motion.p>

                        {/* Title with gradient */}
                        <motion.h1
                            variants={itemVariants}
                            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
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
                            <Link to="/projets"
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
                            </Link>

                            <Link to="/contact"
                                className="group px-5 py-3 text-sm sm:text-base sm:px-8 sm:py-4 bg-transparent border-2 border-white/20 text-white font-bold rounded-xl hover:bg-white/5 hover:border-white/30 transition-all duration-300 backdrop-blur-sm text-center"
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
            </div>
        </div>
    )
}

export default Home
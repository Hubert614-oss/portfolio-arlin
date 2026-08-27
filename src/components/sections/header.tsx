
import { motion, type Variants } from "framer-motion";

type HeaderProps = {
    isLoaded: boolean
    statsRef: React.RefObject<HTMLDivElement | null>
    isStatsInView: boolean
    stats: Array<{ value: number; suffix: string; label: string }>
    floatingAnimation: any
    containerVariants: Variants
    itemVariants: Variants
    titleContainerVariants: Variants
    titleLetterVariants: Variants
    AnimatedCounter: React.ComponentType<any>
}

const Header = ({
    isLoaded,
    statsRef,
    isStatsInView,
    stats,
    floatingAnimation,
    containerVariants,
    itemVariants,
    titleContainerVariants,
    titleLetterVariants,
    AnimatedCounter
}: HeaderProps) => {
    return (
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
                                <img src={`https://res.cloudinary.com/duzwmu0rx/image/upload/v1787764768/arlin_webp_uuelci.webp`} alt="Arlin Hubert" className="w-full h-full object-cover" />
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
                        <motion.div variants={itemVariants} className="mb-6 hidden md:block">
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan/10 backdrop-blur-sm rounded-full border border-cyan/20 text-sm font-medium text-cyan">
                                <span className="w-2 h-2 bg-cyan rounded-full animate-pulse" />
                                Développeur Web Full Stack
                            </span>
                        </motion.div>

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
            </div>
        </header>
    )
}

export default Header
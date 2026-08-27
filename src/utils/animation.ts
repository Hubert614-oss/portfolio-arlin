import { type Variants } from "framer-motion";


export const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        }
    }
}

export const itemVariants: Variants = {
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


export const titleContainerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.2,
        }
    }
}

export const titleLetterVariants: Variants = {
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

export const slideVariants: Variants = {
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

export const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
        duration: 6,
        repeat: Infinity,
        ease: [0.42, 0, 0.58, 1] as [number, number, number, number]
    }
}


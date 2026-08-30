import {
    ArrowUpRight,
    ExternalLink,
    Layers,
} from "lucide-react";
import AnimatedBackground from "../AnimatedBackground";
import { useThemeStore } from "../../stores/themeStore";

type Project = {
    title: string;
    category: string;
    description: string;
    technologies: string[];
    image: string;
    github?: string;
    demo?: string;
};

const projects: Project[] = [
    {
        title: "Portfolio Web",
        category: "Frontend",
        description:
            "Portfolio moderne et responsive développé avec React et TypeScript afin de présenter mes compétences, mes expériences et mes projets.",
        technologies: ["React.js", "TypeScript", "Tailwind CSS"],
        image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
        github: "https://github.com",
        demo: "https://example.com",
    },

    {
        title: "API Banking",
        category: "Backend",
        description:
            "API REST destinée à gérer des opérations et services bancaires avec une architecture backend robuste et sécurisée.",
        technologies: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
        image:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop",
        github: "https://github.com",
    },

    {
        title: "Application Management",
        category: "Full Stack",
        description:
            "Application web de gestion permettant de centraliser les données, suivre les opérations et simplifier les processus métier.",
        technologies: ["Vue.js", "Node.js", "Express", "MySQL"],
        image:
            "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop",
        github: "https://github.com",
        demo: "https://example.com",
    },

    {
        title: "Microservices Platform",
        category: "Architecture",
        description:
            "Architecture distribuée basée sur des microservices permettant de séparer les responsabilités et de faciliter l'évolution du système.",
        technologies: ["Java", "Spring Boot", "Docker", "PostgreSQL"],
        image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop",
        github: "https://github.com",
    },

    {
        title: "REST API",
        category: "Backend",
        description:
            "Service REST développé avec Node.js permettant de gérer des ressources et de communiquer avec une base de données.",
        technologies: ["Node.js", "Express", "TypeScript", "MySQL"],
        image:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop",
        github: "https://github.com",
    },

    {
        title: "Dashboard Analytics",
        category: "Frontend",
        description:
            "Dashboard interactif permettant de visualiser des données et des indicateurs à travers une interface claire et responsive.",
        technologies: ["React.js", "TypeScript", "Tailwind CSS"],
        image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
        github: "https://github.com",
        demo: "https://example.com",
    },
];

const Projects = () => {


    const { theme } = useThemeStore();

    return (
        <AnimatedBackground variant={theme} showGrid showOrbs showDots>
            <section
                id="projets"
                className="relative overflow-hidden  px-6 py-24 text-slate-900 dark:text-white"
            >
                {/* <div className="fixed top-12 right-40 text-white z-70">
                    {theme === "dark" ? (
                        <span className="text-sm font-medium text-slate-300">
                            Mode sombre activé ---- {theme}
                        </span>
                    ) : (
                        <span className="text-sm font-medium text-slate-600">
                            Mode clair activé ---- {theme}
                        </span>
                    )}
                </div> */}
                {/* Background glow */}
                <div className="pointer-events-none absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl">

                    {/* Section Header */}
                    <div className="mx-auto mb-16 max-w-3xl text-center">

                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-400">
                            <Layers size={16} />
                            Mes réalisations
                        </div>

                        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-slate-900 dark:text-white">
                            Quelques-uns de mes{" "}
                            <span className="bg-linear-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-blue-500">
                                projets
                            </span>
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            Découvrez quelques projets sur lesquels j'ai travaillé,
                            de la conception de l'architecture jusqu'au développement
                            et au déploiement.
                        </p>
                    </div>

                    {/* Projects grid */}
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                        {projects.map((project) => (
                            <article
                                key={project.title}
                                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white/80 transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/30 hover:shadow-2xl hover:shadow-cyan-500/10 dark:border-slate-800 dark:bg-slate-900/60"
                            >

                                {/* Image */}
                                <div className="relative h-56 overflow-hidden">

                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Image overlay */}
                                    <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />

                                    {/* Category */}
                                    <div className="absolute left-4 top-4">
                                        <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-cyan-700 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/70 dark:text-cyan-400">
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Arrow */}
                                    <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 dark:border-white/10 dark:bg-slate-950/70 dark:text-white">
                                        <ArrowUpRight size={18} />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">

                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {project.title}
                                    </h3>

                                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                        {project.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {project.technologies.map((technology) => (
                                            <span
                                                key={technology}
                                                className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300"
                                            >
                                                {technology}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Links */}
                                    <div className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">

                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-800 dark:hover:text-white"
                                            >
                                                <Layers size={16} />
                                                GitHub
                                            </a>
                                        )}

                                        {project.demo && (
                                            <a
                                                href={project.demo}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                                            >
                                                <ExternalLink size={16} />
                                                Démo
                                            </a>
                                        )}

                                    </div>
                                </div>
                            </article>
                        ))}

                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-14 text-center">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-cyan-400/40 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                        >
                            Voir tous mes projets
                            <ArrowUpRight size={18} />
                        </a>
                    </div>

                </div>
            </section>
        </AnimatedBackground>
    );
};

export default Projects;
import { useEffect, useRef, useState } from "react";
import { Code2 } from "lucide-react";
import {
    SiReact, SiVuedotjs, SiNestjs, SiNextdotjs, SiTypescript,
    SiJavascript, SiPhp, SiPython, SiNodedotjs, SiExpress,
    SiHtml5, SiRedis, SiDocker, SiMysql, SiPostgresql,
    SiSocketdotio, SiSpringboot, SiGit, SiGitlab, SiGithub,
} from 'react-icons/si';

import { ZustandIcon } from "../ZustandIcon";
import { useThemeStore } from "../../stores/themeStore";
import AnimatedBackground from "../AnimatedBackground";

type TechnologyItem = {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    percent: number;
};

type TechnologyGroup = {
    title: string;
    items: TechnologyItem[];
};

const technologyGroups: TechnologyGroup[] = [
    {
        title: 'Langages de programmation',
        items: [
            { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', percent: 92 },
            { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', percent: 88 },
            { name: 'PHP', icon: SiPhp, color: '#777BB4', percent: 72 },
            { name: 'Python', icon: SiPython, color: '#3776AB', percent: 70 },
            { name: 'HTML5', icon: SiHtml5, color: '#E34F26', percent: 95 },
            { name: 'CSS3', icon: SiDocker, color: '#1572B6', percent: 90 },
            { name: 'Java', icon: SiSpringboot, color: '#6DB33F', percent: 76 },
        ],
    },
    {
        title: 'Frameworks & Frontend',
        items: [
            { name: 'React.js', icon: SiReact, color: '#61DAFB', percent: 94 },
            { name: 'Next.js', icon: SiNextdotjs, color: '#888888', percent: 82 },
            { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D', percent: 72 },
            { name: 'Nest.js', icon: SiNestjs, color: '#E0234E', percent: 80 },
            { name: 'Express', icon: SiExpress, color: '#A0A0A0', percent: 84 },
        ],
    },
    {
        title: 'Backend & APIs',
        items: [
            { name: 'Node.js', icon: SiNodedotjs, color: '#339933', percent: 88 },
            { name: 'Spring Boot', icon: SiSpringboot, color: '#6DB33F', percent: 74 },
            { name: 'Socket.io', icon: SiSocketdotio, color: '#888888', percent: 78 },
            { name: 'Zustand', icon: ZustandIcon, color: '#888888', percent: 86 },
        ],
    },
    {
        title: 'Bases de données',
        items: [
            { name: 'MySQL', icon: SiMysql, color: '#4479A1', percent: 82 },
            { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', percent: 84 },
            { name: 'Redis', icon: SiRedis, color: '#DC382D', percent: 78 },
        ],
    },
    {
        title: 'Outils & DevOps',
        items: [
            { name: 'Docker', icon: SiDocker, color: '#2496ED', percent: 80 },
            { name: 'Git', icon: SiGit, color: '#F05032', percent: 90 },
            { name: 'GitHub', icon: SiGithub, color: '#888888', percent: 91 },
            { name: 'GitLab', icon: SiGitlab, color: '#FC6D26', percent: 78 },
        ],
    },
];




const techItems = [
    { name: 'React.js', icon: SiReact, slogan: 'UI Interactive', hoverColor: 'group-hover:text-[#61DAFB]', glowColor: '#61DAFB' },
    { name: 'Nest.js', icon: SiNestjs, slogan: 'Scalable Node', hoverColor: 'group-hover:text-[#E0234E]', glowColor: '#E0234E' },
    { name: 'Next.js', icon: SiNextdotjs, slogan: 'React Framework', hoverColor: 'group-hover:text-black dark:group-hover:text-white', glowColor: '#ffffff' },
    { name: 'Node.js', icon: SiNodedotjs, slogan: 'Backend JS', hoverColor: 'group-hover:text-[#339933]', glowColor: '#339933' },
];

/* ------------------------------------------------------------------ */
/*  Sous-composants                                                    */
/* ------------------------------------------------------------------ */

function ProgressBar({ percent, color }: { percent: number; color: string }) {
    const [width, setWidth] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setWidth(percent);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [percent]);

    return (
        <div
            ref={ref}
            className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
        >
            <div
                className="h-full rounded-full transition-[width] duration-1000 ease-out"
                style={{
                    width: `${width}%`,
                    background: `linear-gradient(90deg, ${color}, ${color}99)`,
                }}
            />
        </div>
    );
}

function TechCard({ tech }: { tech: TechnologyItem }) {
    const Icon = tech.icon;
    return (
        <div className="group flex items-center gap-3 rounded-xl border border-transparent bg-slate-100/60 p-2.5 transition-all duration-300 hover:border-cyan-500/20 hover:bg-slate-200/60 dark:bg-white/3 dark:hover:border-cyan-400/20 dark:hover:bg-white/6">
            {/* Icône */}
            <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/80"
                style={{ color: tech.color }}
            >
                <Icon className="text-lg" />
            </div>

            {/* Infos */}
            <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
                        {tech.name}
                    </span>
                    <span className="shrink-0 text-xs font-bold tabular-nums text-cyan-600 dark:text-cyan-400">
                        {tech.percent}%
                    </span>
                </div>
                <ProgressBar percent={tech.percent} color={tech.color} />
            </div>
        </div>
    );
}

function GroupCard({ group, index }: { group: TechnologyGroup; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.05 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`rounded-2xl border p-5 shadow-sm backdrop-blur-sm transition-all duration-700
                bg-white/70 border-slate-200/60 dark:bg-slate-950/50 dark:border-white/10 dark:shadow-black/20
                ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
            `}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                {group.title}
            </h3>
            <div className="space-y-2.5">
                {group.items.map((tech) => (
                    <TechCard key={tech.name} tech={tech} />
                ))}
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Composant principal                                                */
/* ------------------------------------------------------------------ */

const Competences = () => {
    const { theme } = useThemeStore();
    const [activeTech, setActiveTech] = useState<string | null>(null);

    return (
        <AnimatedBackground variant={theme} showGrid showOrbs showDots>
            <section
                id="competences"
                className="relative overflow-hidden bg-transparent px-6 py-24 text-slate-900 dark:text-slate-50"
            >
                {/* Glow décoratif subtil */}
                <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[100px] dark:bg-cyan-500/10" />

                <div className="relative mx-auto max-w-7xl">
                    {/* Header */}
                    <div className="mx-auto mb-16 max-w-2xl text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-400">
                            <Code2 size={14} />
                            Compétences
                        </div>

                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                            Les technologies que{" "}
                            <span className="bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-blue-500">
                                j'utilise
                            </span>
                        </h2>

                        <p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
                            Un ensemble de technologies modernes que j'utilise pour concevoir
                            des applications web performantes, scalables et maintenables.
                        </p>
                    </div>
                    <fieldset
                        className="
                            relative mt-12 rounded-3xl
                            border border-slate-200
                            bg-slate-50/80
                            px-4 pb-6 pt-2
                            shadow-xl shadow-slate-200/50
                            backdrop-blur-sm

                            dark:border-white/10
                            dark:bg-white/[0.02]
                            dark:shadow-2xl dark:shadow-black/10

                            sm:px-6 sm:pb-8
                            lg:px-8
                        "
                    >
                        {/* Legend */}
                        <legend className="px-4">
                            <div className="flex items-center gap-3">

                                {/* Point */}
                                <span className="relative flex h-3 w-3">
                                    <span
                                        className="
                                            absolute inline-flex h-full w-full
                                            animate-ping rounded-full
                                            bg-cyan-500 opacity-40
                                            dark:bg-cyan-400
                                        "
                                    />

                                    <span
                                        className="
                                            relative inline-flex h-3 w-3
                                            rounded-full
                                            bg-cyan-600
                                            shadow-lg shadow-cyan-500/40

                                            dark:bg-cyan-400
                                            dark:shadow-cyan-400/50
                                        "
                                    />
                                </span>

                                {/* Title */}
                                <span
                                    className="
                                        text-xl font-bold tracking-tight
                                        text-slate-800
                                        sm:text-2xl

                                        dark:text-white
                                    "
                                >
                                    Technologies
                                </span>

                                {/* Line */}
                                <span
                                    className="
                                        hidden h-px w-12
                                        bg-linear-to-r
                                        from-cyan-500/70
                                        to-transparent

                                        sm:block

                                        dark:from-cyan-400/60
                                    "
                                />
                            </div>
                        </legend>

                        {/* Description */}
                        <div className="mb-8 mt-4 text-left">
                            <p
                                className="
                                    max-w-3xl
                                    text-base leading-relaxed
                                    text-slate-600
                                    sm:text-lg

                                    dark:text-slate-400
                                "
                            >
                                Les technologies que j’utilise actuellement dans mon poste
                                chez{" "}
                                <span
                                    className="
                                        font-semibold
                                        text-slate-800

                                        dark:text-slate-200
                                    "
                                >
                                    VICTUS SA
                                </span>
                                .
                            </p>
                        </div>

                        {/* Technologies */}
                        <div
                            className="
                                relative z-20
                                grid grid-cols-2 gap-3
                                sm:grid-cols-3 sm:gap-4
                                md:grid-cols-4
                                lg:grid-cols-8 lg:gap-5
                            "
                        >
                            {techItems.map((tech, index) => {
                                const Icon = tech.icon;
                                const isActive = activeTech === tech.name;

                                return (
                                    <div
                                        key={`static-${tech.name}-${index}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveTech(
                                                isActive ? null : tech.name
                                            );
                                        }}
                                        className={`
                                            group relative cursor-pointer
                                            overflow-hidden rounded-2xl
                                            border p-5

                                            transition-all duration-500 ease-out

                                            ${isActive
                                                ? `
                                                        -translate-y-1
                                                        scale-[1.03]

                                                        border-cyan-300
                                                        bg-white
                                                        shadow-xl
                                                        shadow-slate-300/40

                                                        dark:border-white/20
                                                        dark:bg-white/[0.07]
                                                        dark:shadow-xl
                                                    `
                                                : `
                                                        border-slate-200
                                                        bg-white
                                                        shadow-md
                                                        shadow-slate-200/50

                                                        hover:-translate-y-1
                                                        hover:scale-[1.03]
                                                        hover:border-slate-300
                                                        hover:shadow-xl

                                                        dark:border-white/[0.08]
                                                        dark:bg-white/[0.025]
                                                        dark:shadow-lg
                                                        dark:shadow-black/10
                                                        dark:hover:border-white/20
                                                        dark:hover:bg-white/[0.05]
                                                    `
                                            }
                                        `}
                                        style={
                                            {
                                                "--glow-color": tech.glowColor,
                                            } as React.CSSProperties
                                        }
                                    >

                                        {/* Hover gradient */}
                                        <div
                                            className={`
                                                absolute inset-0
                                                rounded-2xl

                                                bg-linear-to-br
                                                from-slate-100/80
                                                via-transparent
                                                to-transparent

                                                transition-opacity duration-500

                                                dark:from-white/[0.08]

                                                ${isActive
                                                    ? "opacity-100"
                                                    : "opacity-0 group-hover:opacity-100"
                                                }
                                            `}
                                        />

                                        {/* Glow */}
                                        <div
                                            className={`
                                                pointer-events-none
                                                absolute -right-8 -top-8
                                                h-20 w-20
                                                rounded-full
                                                blur-3xl
                                                transition-opacity duration-500

                                                ${isActive
                                                    ? "opacity-20"
                                                    : "opacity-0 group-hover:opacity-20"
                                                }
                                            `}
                                            style={{
                                                backgroundColor: tech.glowColor,
                                            }}
                                        />

                                        {/* Content */}
                                        <div
                                            className="
                                                relative
                                                flex flex-col
                                                items-center
                                                justify-center
                                                gap-3
                                            "
                                        >
                                            {/* Icon */}
                                            <div
                                                className={`
                                                    text-3xl
                                                    transition-all duration-500
                                                    sm:text-4xl

                                                    ${isActive
                                                        ? "scale-110"
                                                        : `
                                                                text-slate-500
                                                                group-hover:scale-110
                                                                dark:text-gray-500
                                                            `
                                                    }

                                                    ${tech.hoverColor}
                                                `}
                                                style={
                                                    isActive
                                                        ? { color: tech.glowColor }
                                                        : undefined
                                                }
                                            >
                                                <Icon className="transition-all duration-500" />
                                            </div>

                                            {/* Name + slogan */}
                                            <div
                                                className="
                                                    flex flex-col
                                                    items-center
                                                    text-center
                                                "
                                            >
                                                <span
                                                    className={`
                                                        text-xs font-bold
                                                        transition-colors duration-300
                                                        sm:text-sm

                                                        ${isActive
                                                            ? `
                                                                    text-slate-900
                                                                    dark:text-white
                                                                `
                                                            : `
                                                                    text-slate-700
                                                                    group-hover:text-slate-900

                                                                    dark:text-gray-300
                                                                    dark:group-hover:text-white
                                                                `
                                                        }
                                                    `}
                                                >
                                                    {tech.name}
                                                </span>

                                                <span
                                                    className={`
                                                        mt-1 text-[9px]
                                                        uppercase tracking-[0.12em]
                                                        transition-colors duration-300
                                                        sm:text-[10px]

                                                        ${isActive
                                                            ? `
                                                                    text-cyan-600
                                                                    dark:text-cyan-300
                                                                `
                                                            : `
                                                                    text-slate-500
                                                                    group-hover:text-cyan-600

                                                                    dark:text-gray-500
                                                                    dark:group-hover:text-cyan-300
                                                                `
                                                        }
                                                    `}
                                                >
                                                    {tech.slogan}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Bottom active indicator */}
                                        <div
                                            className={`
                                                absolute bottom-0 left-1/2
                                                h-0.5
                                                -translate-x-1/2
                                                rounded-full
                                                transition-all duration-500

                                                ${isActive
                                                    ? "w-10 opacity-100"
                                                    : `
                                                            w-0 opacity-0
                                                            group-hover:w-6
                                                            group-hover:opacity-70
                                                        `
                                                }
                                            `}
                                            style={{
                                                backgroundColor: tech.glowColor,
                                                boxShadow: `0 0 12px ${tech.glowColor}`,
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </fieldset>

                    <div className="border-b-2 border-cyan-400/30 dark:border-cyan-300/40 mt-15 mb-15"></div>

                    {/* Grille */}
                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {technologyGroups.map((group, i) => (
                            <GroupCard key={group.title} group={group} index={i} />
                        ))}
                    </div>
                </div>
            </section>
        </AnimatedBackground>
    );
};

export default Competences;
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
        <div className="group flex items-center gap-3 rounded-xl border border-transparent bg-slate-100/60 p-2.5 transition-all duration-300 hover:border-cyan-500/20 hover:bg-slate-200/60 dark:bg-white/[0.03] dark:hover:border-cyan-400/20 dark:hover:bg-white/[0.06]">
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
                            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-blue-500">
                                j'utilise
                            </span>
                        </h2>

                        <p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
                            Un ensemble de technologies modernes que j'utilise pour concevoir
                            des applications web performantes, scalables et maintenables.
                        </p>
                    </div>

                    {/* Grille */}
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
import {
    Code2,
} from "lucide-react";

import {
    SiReact,
    SiVuedotjs,
    SiNestjs,
    SiNextdotjs,
    SiTypescript,
    SiJavascript,
    SiPhp,
    SiPython,
    SiNodedotjs,
    SiExpress,
    SiHtml5,
    SiCss,
    SiRedis,
    SiDocker,
    SiMysql,
    SiPostgresql,
    SiSocketdotio,
    SiSpringboot,
    SiGit,
    SiGitlab,
    SiGithub,
} from 'react-icons/si';

import { ZustandIcon } from "../ZustandIcon";

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
            { name: 'CSS3', icon: SiCss, color: '#1572B6', percent: 90 },
            { name: 'Java', icon: SiSpringboot, color: '#6DB33F', percent: 76 },
        ],
    },
    {
        title: 'Frameworks & Frontend',
        items: [
            { name: 'React.js', icon: SiReact, color: '#61DAFB', percent: 94 },
            { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF', percent: 82 },
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
            { name: 'Socket.io', icon: SiSocketdotio, color: '#FFFFFF', percent: 78 },
            { name: 'Zustand', icon: ZustandIcon, color: '#FFFFFF', percent: 86 },
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
            { name: 'GitHub', icon: SiGithub, color: '#FFFFFF', percent: 91 },
            { name: 'GitLab', icon: SiGitlab, color: '#FC6D26', percent: 78 },
        ],
    },
];

const Competences = () => {
    return (
        <section
            id="competences"
            className="relative overflow-hidden px-6 py-24 text-white"
        >
            <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">
                <div className="mx-auto mb-16 max-w-3xl text-center md:text-left">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-400">
                        <Code2 size={16} />
                        Competences
                    </div>

                    <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        Les technologies que{" "}
                        <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            j'utilise
                        </span>
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-slate-400">
                        Un ensemble de technologies modernes que j'utilise pour concevoir
                        des applications web performantes, scalables et maintenables.
                    </p>
                </div>

                <div className="mt-16 grid gap-6 lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 relative z-20">
                    {technologyGroups.map((group) => (
                        <div
                            key={group.title}
                            className="rounded-3xl border border-white/10 bg-slate-950/40 p-5 shadow-xl shadow-black/20 backdrop-blur-sm"
                        >
                            <h3 className="mb-5 text-lg font-semibold text-cyan-300">
                                {group.title}
                            </h3>

                            <div className="space-y-4">
                                {group.items.map((tech) => {
                                    const Icon = tech.icon;

                                    return (
                                        <div
                                            key={tech.name}
                                            className="rounded-2xl border border-white/10 bg-white/3 p-3 transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/5"
                                        >
                                            <div className="mb-2 flex items-center justify-between gap-3">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-900/80"
                                                        style={{ color: tech.color }}
                                                    >
                                                        <Icon className="text-xl" />
                                                    </div>

                                                    <span className="text-sm font-medium text-slate-100">
                                                        {tech.name}
                                                    </span>
                                                </div>

                                                <span className="text-xs font-semibold text-cyan-300">
                                                    {tech.percent}%
                                                </span>
                                            </div>

                                            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                                                <div
                                                    className="h-full rounded-full transition-all duration-500"
                                                    style={{
                                                        width: `${tech.percent}%`,
                                                        background: `linear-gradient(90deg, ${tech.color}, rgba(255,255,255,0.9))`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Competences;
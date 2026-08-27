import {
    ArrowUpRight,
    Code2,
    Database,
    Globe,
    Layers,
    Server,
    Sparkles,
} from "lucide-react";
import { useState } from "react";

import {
    SiReact, SiVuedotjs, SiFlutter, SiLaravel, SiNestjs, SiNextdotjs,
    SiNodedotjs, SiExpress, SiHtml5, SiCss, SiRedis, SiDocker,
    SiMysql, SiPostgresql, SiSocketdotio, SiGithubactions
} from 'react-icons/si';

type Technology = {
    name: string;
    category: string;
    description: string;
    icon: React.ReactNode;
    color: string;
};

const technologies: Technology[] = [
    {
        name: "Next.js",
        category: "Frontend / Full Stack",
        description:
            "Framework React pour créer des applications web modernes, performantes et optimisées pour le SEO.",
        icon: <Globe size={30} />,
        color: "from-white/20 to-gray-500/10",
    },
    {
        name: "NestJS",
        category: "Backend",
        description:
            "Framework Node.js robuste et scalable pour construire des APIs et des applications backend structurées.",
        icon: <Layers size={30} />,
        color: "from-red-500/20 to-red-900/10",
    },
    {
        name: "Node.js / Express",
        category: "Backend",
        description:
            "Développement d'APIs REST et de services backend avec l'écosystème JavaScript / TypeScript.",
        icon: <Server size={30} />,
        color: "from-green-500/20 to-green-900/10",
    },
    {
        name: "React.js",
        category: "Frontend",
        description:
            "Création d'interfaces utilisateur modernes, dynamiques et réutilisables avec React et TypeScript.",
        icon: <Code2 size={30} />,
        color: "from-cyan-500/20 to-blue-900/10",
    },
    {
        name: "Vue.js",
        category: "Frontend",
        description:
            "Framework progressif pour développer des interfaces web rapides, flexibles et maintenables.",
        icon: <Sparkles size={30} />,
        color: "from-emerald-500/20 to-green-900/10",
    },
    {
        name: "Java / Spring Boot",
        category: "Backend / Enterprise",
        description:
            "Développement d'applications backend robustes, APIs REST et architectures orientées services.",
        icon: <Database size={30} />,
        color: "from-orange-500/20 to-red-900/10",
    },
];

const Technologies = () => {

    const [activeTech, setActiveTech] = useState<string | null>(null);


    const techItems = [
        { name: 'React.js', icon: SiReact, slogan: 'UI Interactive', hoverColor: 'group-hover:text-[#61DAFB]', glowColor: '#61DAFB' },
        { name: 'Vue.js', icon: SiVuedotjs, slogan: 'Progressive FW', hoverColor: 'group-hover:text-[#4FC08D]', glowColor: '#4FC08D' },
        { name: 'Flutter', icon: SiFlutter, slogan: 'Mobile Cross-platform', hoverColor: 'group-hover:text-[#02569B]', glowColor: '#02569B' },
        { name: 'Laravel', icon: SiLaravel, slogan: 'PHP Artisan', hoverColor: 'group-hover:text-[#FF2D20]', glowColor: '#FF2D20' },
        { name: 'Nest.js', icon: SiNestjs, slogan: 'Scalable Node', hoverColor: 'group-hover:text-[#E0234E]', glowColor: '#E0234E' },
        { name: 'Next.js', icon: SiNextdotjs, slogan: 'React Framework', hoverColor: 'group-hover:text-white', glowColor: '#ffffff' },
        { name: 'Node.js', icon: SiNodedotjs, slogan: 'Backend JS', hoverColor: 'group-hover:text-[#339933]', glowColor: '#339933' },
        { name: 'Express', icon: SiExpress, slogan: 'Fast Web FW', hoverColor: 'group-hover:text-gray-400', glowColor: '#808080' },
        { name: 'HTML5', icon: SiHtml5, slogan: 'Structure Web', hoverColor: 'group-hover:text-[#E34F26]', glowColor: '#E34F26' },
        { name: 'CSS3', icon: SiCss, slogan: 'Design Web', hoverColor: 'group-hover:text-[#1572B6]', glowColor: '#1572B6' },
        { name: 'Redis', icon: SiRedis, slogan: 'In-Memory Cache', hoverColor: 'group-hover:text-[#DC382D]', glowColor: '#DC382D' },
        { name: 'Docker', icon: SiDocker, slogan: 'Containerization', hoverColor: 'group-hover:text-[#2496ED]', glowColor: '#2496ED' },
        { name: 'MySQL', icon: SiMysql, slogan: 'Relational DB', hoverColor: 'group-hover:text-[#4479A1]', glowColor: '#4479A1' },
        { name: 'PostgreSQL', icon: SiPostgresql, slogan: 'Advanced DB', hoverColor: 'group-hover:text-[#4169E1]', glowColor: '#4169E1' },
        { name: 'Socket.io', icon: SiSocketdotio, slogan: 'Real-time Web', hoverColor: 'group-hover:text-white', glowColor: '#ffffff' },
        { name: 'DevOps', icon: SiGithubactions, slogan: 'CI/CD & Cloud', hoverColor: 'group-hover:text-[#2088FF]', glowColor: '#2088FF' },
    ];


    return (
        <section
            id="technos"
            className="relative overflow-hidden  px-6 py-24 text-white"
        >
            {/* Background glow */}
            <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">

                {/* Section Header */}
                <div className="mx-auto mb-16 max-w-3xl text-center">

                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-400">
                        <Code2 size={16} />
                        Technologies
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

                {/* Technologies Grid */}

                <div className="mt-16 sm:mt-24 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-6 relative z-20">
                    {techItems.map((tech, index) => {
                        const Icon = tech.icon;
                        const isActive = activeTech === tech.name;
                        return (
                            <div
                                key={`static-${tech.name}-${index}`}
                                onClick={(e) => { e.stopPropagation(); setActiveTech(isActive ? null : tech.name); }}
                                className={`group relative flex flex-col items-center justify-center gap-4 rounded-2xl border bg-white/3 backdrop-blur-sm p-6 shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-(--glow-color)/10 hover:border-white/20 hover:-translate-y-1 hover:scale-105 cursor-pointer ${isActive ? 'border-white/20 shadow-xl shadow-(--glow-color)/10 -translate-y-1 scale-105' : 'border-white/8 shadow-black/20'}`}
                                style={{ '--glow-color': tech.glowColor } as React.CSSProperties}
                            >
                                {/* Effet de brillance au fond */}
                                <div className={`absolute inset-0 rounded-2xl bg-linear-to-br from-white/5 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                                {/* Icône Technologie */}
                                <div className={`relative text-4xl transition-all duration-500 group-hover:scale-110 ${isActive ? 'scale-110' : 'text-gray-500'} ${tech.hoverColor}`} style={isActive ? { color: tech.glowColor } : {}}>
                                    <Icon className={`transition-all duration-500 ${isActive ? 'drop-shadow-[0_0_8px_var(--glow-color)]' : 'group-hover:drop-shadow-[0_0_8px_var(--glow-color)]'}`} />
                                </div>

                                {/* Noms */}
                                <div className="relative flex flex-col items-center">
                                    <span className={`text-sm font-bold transition-colors duration-300 text-center ${isActive ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}>
                                        {tech.name}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default Technologies;
import React, { useEffect, useRef, useState } from 'react';
import {
    BriefcaseBusiness,
    CalendarRange,
    CheckCircle2,
    MapPin,
    Sparkles,
} from 'lucide-react';

// ============================================================
// UTILITAIRE
// ============================================================
function cn(...classes: (string | false | undefined | null)[]) {
    return classes.filter(Boolean).join(' ');
}

// ============================================================
// TYPES
// ============================================================
type ExperienceItem = {
    period: string;
    title: string;
    company: string;
    location: string;
    description: string;
    missions: string[];
    stack: string[];
    current?: boolean;
};

// ============================================================
// DONNÉES
// ============================================================
const experiences: ExperienceItem[] = [
    {
        period: 'Octobre 2025 – Aujourd’hui',
        title: 'Développeur Full Stack JavaScript',
        company: 'VICTUS',
        location: 'Antananarivo, Madagascar',
        current: true,
        description:
            'Développement d’une plateforme de gestion de contenus multimédias avec une architecture moderne orientée performance, temps réel et API REST.',
        missions: [
            'Développement d’une plateforme de gestion de contenus multimédias avec React.js et Node.js.',
            'Conception d’interfaces d’administration et développement d’API REST sécurisées.',
            'Gestion de workflows médias asynchrones et intégration du temps réel.',
            'Stockage cloud et maintenance de la base MySQL.',
            'Mise en place et évolution des fonctionnalités métiers.',
        ],
        stack: [
            'React.js',
            'Node.js',
            'Express',
            'MySQL',
            'Sequelize',
            'BullMQ',
            'Redis',
            'Socket.IO',
            'AWS S3',
            'Cloudflare R2',
            'FFmpeg',
            'Swagger',
            'OpenAPI',
        ],
    },
    {
        period: 'Avril 2025 – Août 2025',
        title: 'Développeur Frontend Freelance',
        company: 'Freelance',
        location: 'Remote',
        description:
            'Développement d’interfaces web modernes et performantes pour plusieurs projets, avec une attention particulière portée à l’expérience utilisateur.',
        missions: [
            'Prise en charge du développement frontend de plusieurs projets avec Next.js.',
            'Intégration d’interfaces utilisateur modernes, performantes et orientées expérience utilisateur.',
            'Collaboration avec les équipes afin d’assurer la qualité technique et la cohérence visuelle.',
            'Développement de composants réutilisables et maintenables.',
        ],
        stack: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS'],
    },
    {
        period: 'Août 2024 – Novembre 2024',
        title: 'Stagiaire en Développement Web',
        company: 'MadagScript',
        location: 'Antananarivo, Madagascar',
        description:
            'Participation au développement d’une application web dédiée à la gestion scolaire et à la mise en place de ses fonctionnalités frontend et backend.',
        missions: [
            'Réalisation d’une application web dédiée à la gestion scolaire.',
            'Développement de l’interface utilisateur avec Next.js.',
            'Mise en place de la logique backend avec NestJS.',
            'Gestion des données avec PostgreSQL.',
            'Participation à la conception et à l’évolution des fonctionnalités.',
        ],
        stack: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript'],
    },
    {
        period: 'Août 2023 – Novembre 2023',
        title: 'Stagiaire Développeur Web',
        company: 'Saint-Gobain | Île Maurice',
        location: 'Île Maurice',
        description:
            'Contribution à la conception et au développement d’une application web de gestion des stocks ainsi qu’à l’implémentation de fonctionnalités métiers.',
        missions: [
            'Contribution à la conception et à la réalisation d’une application web de gestion des stocks.',
            'Développement de fonctionnalités métiers avec Java EE.',
            'Conception et administration de la base de données MySQL.',
            'Participation à la validation technique et à l’optimisation de l’application.',
        ],
        stack: ['Java EE', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    },
    {
        period: 'Septembre 2022 – Novembre 2022',
        title: 'Stagiaire Développeur Full Stack',
        company: 'Programme DEFIS | Fort-Dauphin',
        location: 'Fort-Dauphin, Madagascar',
        description:
            'Participation à la refonte d’une application web interne et contribution au développement ainsi qu’aux tests des fonctionnalités.',
        missions: [
            'Participation à la refonte d’une application web interne en Java EE.',
            'Amélioration de l’ergonomie et des performances de l’application.',
            'Contribution au développement des fonctionnalités.',
            'Participation aux tests et à la validation des fonctionnalités.',
        ],
        stack: ['Java EE', 'JavaScript', 'HTML', 'CSS', 'MySQL'],
    },
    {
        period: 'Août 2021 – Novembre 2021',
        title: 'Stagiaire Développeur PHP / Base de Données',
        company: 'CARA | Bazaribe, Fort-Dauphin',
        location: 'Fort-Dauphin, Madagascar',
        description:
            'Participation à la création et à la mise en place d’une base de données dédiée à la gestion de données économiques.',
        missions: [
            'Création et mise en place d’une base de données de données économiques.',
            'Développement avec PHP et MySQL.',
            'Participation à l’organisation et à la gestion des données.',
            'Contribution à la conception et à la maintenance de l’application.',
        ],
        stack: ['PHP', 'MySQL', 'HTML', 'CSS'],
    },
];

// ============================================================
// HOOK : Animation au scroll
// ============================================================
function useScrollReveal<T extends HTMLElement>(threshold = 0.15) {
    const ref = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(el);
                }
            },
            { threshold, rootMargin: '0px 0px -50px 0px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isVisible };
}

// ============================================================
// SOUS-COMPOSANT : Carte d'expérience
// ============================================================
type ExperienceCardProps = {
    item: ExperienceItem;
    index: number;
    isLeft: boolean;
};

const ExperienceCard = React.memo(function ExperienceCard({
    item,
    index,
    isLeft,
}: ExperienceCardProps) {
    const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

    return (
        <div
            ref={ref}
            className={cn(
                'relative md:flex md:items-start md:justify-between',
                'transition-all duration-700 ease-out',
                isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: `${index * 100}ms` }}
            role="listitem"
            aria-label={`${item.title} chez ${item.company}`}
        >
            {/* Dot */}
            <div className="absolute left-3.25 top-8 z-10 md:left-1/2 md:-translate-x-1/2">
                <div
                    className={cn(
                        'flex h-4 w-4 items-center justify-center rounded-full border-4 border-slate-950 transition-all duration-300',
                        item.current
                            ? 'bg-cyan-400 shadow-lg shadow-cyan-400/40 scale-110'
                            : 'bg-slate-500'
                    )}
                    aria-hidden="true"
                >
                    {item.current && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-30" />
                    )}
                </div>
            </div>

            {/* Card */}
            <div
                className={cn(
                    'ml-12 w-[calc(100%-3rem)] md:ml-0 md:w-[44%]',
                    isLeft ? 'md:mr-auto' : 'md:ml-auto'
                )}
            >
                <article
                    className={cn(
                        'group relative overflow-hidden rounded-3xl border p-6 backdrop-blur-md transition-all duration-500',
                        item.current
                            ? 'border-cyan-400/30 bg-cyan-950/20 shadow-xl shadow-cyan-500/5'
                            : 'border-white/10 bg-slate-900/60',
                        'hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-2xl hover:shadow-cyan-500/10'
                    )}
                >
                    {/* Glow effect */}
                    <div
                        className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-400/5 blur-3xl transition-all duration-500 group-hover:bg-cyan-400/10"
                        aria-hidden="true"
                    />

                    <div className="relative">
                        {/* Current badge */}
                        {item.current && (
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-xs font-semibold text-green-400">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                                Poste actuel
                            </div>
                        )}

                        {/* Period */}
                        <div className="mb-4 flex flex-wrap items-center gap-3">
                            <time
                                dateTime={item.period}
                                className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-300"
                            >
                                <CalendarRange size={14} aria-hidden="true" />
                                {item.period}
                            </time>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold leading-tight text-white sm:text-2xl">
                            {item.title}
                        </h3>

                        {/* Company */}
                        <p className="mt-2 text-base font-semibold text-cyan-300">
                            {item.company}
                        </p>

                        {/* Location */}
                        <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                            <MapPin size={14} aria-hidden="true" />
                            <span>{item.location}</span>
                        </div>

                        {/* Description */}
                        <p className="mt-5 text-sm leading-7 text-slate-300">
                            {item.description}
                        </p>

                        {/* Missions */}
                        {item.missions.length > 0 && (
                            <div className="mt-6">
                                <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
                                    <Sparkles
                                        size={15}
                                        className="text-cyan-400"
                                        aria-hidden="true"
                                    />
                                    Missions principales
                                </p>
                                <ul className="space-y-2.5">
                                    {item.missions.map((mission, mIdx) => (
                                        <li
                                            key={`${item.company}-mission-${mIdx}`}
                                            className="flex gap-2.5 text-sm leading-6 text-slate-400"
                                        >
                                            <CheckCircle2
                                                size={15}
                                                className="mt-1 shrink-0 text-cyan-500"
                                                aria-hidden="true"
                                            />
                                            <span>{mission}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Stack */}
                        {item.stack.length > 0 && (
                            <div className="mt-6 border-t border-slate-800 pt-5">
                                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Technologies
                                </p>
                                <ul className="flex flex-wrap gap-2" role="list">
                                    {item.stack.map((tech, tIdx) => (
                                        <li
                                            key={`${item.company}-tech-${tIdx}`}
                                            className="rounded-full border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-300 transition-colors duration-300 group-hover:border-slate-600 group-hover:text-cyan-300"
                                        >
                                            {tech}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </article>
            </div>
        </div>
    );
});

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================
const Experience = () => {
    const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();

    return (
        <section
            id="experience"
            className="relative overflow-hidden px-6 py-24 text-white"
            aria-labelledby="experience-heading"
        >
            {/* Background glows */}
            <div
                className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-blue-600/5 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative mx-auto max-w-6xl">
                {/* Header */}
                <div
                    ref={headerRef}
                    className={cn(
                        'mx-auto mb-20 max-w-3xl text-center md:text-left transition-all duration-700 ease-out',
                        headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    )}
                >
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-400">
                        <BriefcaseBusiness size={16} aria-hidden="true" />
                        <span>Expérience</span>
                    </div>

                    <h2
                        id="experience-heading"
                        className="text-4xl font-bold tracking-tight sm:text-5xl"
                    >
                        Mon parcours{' '}
                        <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            professionnel
                        </span>
                    </h2>

                    <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
                        Un parcours construit autour du développement web, du
                        développement Full Stack et de la conception de solutions
                        logicielles modernes.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative" role="list" aria-label="Parcours professionnel">
                    {/* Desktop line */}
                    <div
                        className="absolute left-5 top-0 hidden h-full w-px bg-linear-to-b from-cyan-400 via-slate-700 to-transparent md:left-1/2 md:block"
                        aria-hidden="true"
                    />
                    {/* Mobile line */}
                    <div
                        className="absolute left-5 top-0 h-full w-px bg-linear-to-b from-cyan-400 via-slate-700 to-transparent md:hidden"
                        aria-hidden="true"
                    />

                    <div className="space-y-12">
                        {experiences.map((item, index) => (
                            <ExperienceCard
                                key={`${item.company}-${item.period}`}
                                item={item}
                                index={index}
                                isLeft={index % 2 === 0}
                            />
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-16 text-center">
                    <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-5 py-2.5 text-sm text-slate-400 backdrop-blur">
                        <Sparkles
                            size={15}
                            className="text-cyan-400"
                            aria-hidden="true"
                        />
                        Toujours en apprentissage et à la recherche de nouveaux
                        défis
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
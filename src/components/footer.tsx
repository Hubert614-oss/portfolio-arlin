
const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className="relative bg-bg text-ink">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-iris to-transparent" />
            <div className="absolute inset-0 bg-linear-to-b from-white via-lavender/30 to-rose/40" aria-hidden="true" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    <div>
                        <div className="text-2xl font-bold bg-linear-to-r from-iris to-cyan bg-clip-text text-transparent">
                            VICTUS
                        </div>
                        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                            Agence digitale pour marques ambitieuses. Design, developpement, marketing et video au service de votre croissance.
                        </p>
                        <div className="mt-6 flex gap-3">
                            <a href="#portfolio" className="text-sm font-semibold text-iris hover:text-cyan transition">Voir nos projets</a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">Services</h3>
                        <ul className="mt-4 space-y-2 text-sm text-gray-600">
                            <li><a href="#services" className="hover:text-iris transition">Sites web</a></li>
                            <li><a href="#services" className="hover:text-iris transition">Applications web</a></li>
                            <li><a href="#services" className="hover:text-iris transition">API / Backend</a></li>
                            <li><a href="#services" className="hover:text-iris transition">Marketing digital</a></li>
                            <li><a href="#services" className="hover:text-iris transition">Production video</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">Entreprise</h3>
                        <ul className="mt-4 space-y-2 text-sm text-gray-600">
                            <li><a href="#about" className="hover:text-iris transition">A propos</a></li>
                            <li><a href="#team" className="hover:text-iris transition">Equipe</a></li>
                            <li><a href="#processus" className="hover:text-iris transition">Processus</a></li>
                            <li><a href="#clients" className="hover:text-iris transition">Clients</a></li>
                            <li><a href="#contact" className="hover:text-iris transition">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">Contact</h3>
                        <ul className="mt-4 space-y-2 text-sm text-gray-600">
                            <li>Antananarivo, Madagascar</li>
                            <li><a href="mailto:hello@victus.agency" className="hover:text-iris transition">hello@victus.agency</a></li>
                            <li><a href="tel:+261000000000" className="hover:text-iris transition">+261 34 44 747 95</a></li>
                        </ul>
                        <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
                            <a href="#" className="text-gray-500 hover:text-iris transition">LinkedIn</a>
                            <a href="#" className="text-gray-500 hover:text-iris transition">Behance</a>
                            <a href="#" className="text-gray-500 hover:text-iris transition">GitHub</a>
                            <a href="#" className="text-gray-500 hover:text-iris transition">Dribbble</a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200/70 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                    <p>© {year} VICTUS. Tous droits reserves.</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-iris transition">Confidentialite</a>
                        <a href="#" className="hover:text-iris transition">Mentions legales</a>
                        <a href="#" className="hover:text-iris transition">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
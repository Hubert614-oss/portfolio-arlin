import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
	IoClose,
	IoHomeOutline,
	IoBriefcaseOutline,
	IoConstructOutline,
	IoMailOutline,
	IoTimeOutline,
} from 'react-icons/io5'
import { Link } from 'react-router-dom'

interface MenuDrawerMobileProps {
	navItems: { label: string; href: string; route: string }[]
	isOpen: boolean
	onClose: () => void
}

const iconMap: Record<string, ReactNode> = {
	Accueil: <IoHomeOutline size={22} />,
	Projets: <IoBriefcaseOutline size={22} />,
	Compétences: <IoConstructOutline size={22} />,
	Expérience: <IoTimeOutline size={22} />,
	Contact: <IoMailOutline size={22} />,
}

const MenuDrawerMobile = ({ navItems, isOpen, onClose }: MenuDrawerMobileProps) => {
	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : ''
		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen) onClose()
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [isOpen, onClose])

	return (
		<>
			<AnimatePresence>
				{isOpen && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.08, ease: 'easeOut' }}
							onClick={onClose}
							className="fixed inset-0 bg-black/40 backdrop-blur-sm z-60 md:hidden"
							aria-hidden="true"
						/>

						<motion.div
							initial={{ x: '-100%' }}
							animate={{ x: 0 }}
							exit={{ x: '-100%' }}
							transition={{ duration: 0.08, ease: 'easeOut' }}
							className="fixed inset-y-0 left-0 h-dvh min-h-screen w-75 max-w-[85vw] bg-gray-950 z-70 md:hidden shadow-2xl flex flex-col pb-14"
							role="dialog"
							aria-modal="true"
							aria-label="Menu de navigation"
						>
							<div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
								<motion.span
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.06 }}
									className="text-xl font-bold text-white"
								>
									Arlin Hubert
								</motion.span>

								<button
									onClick={onClose}
									className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
									aria-label="Fermer le menu"
								>
									<IoClose size={20} />
								</button>
							</div>

							<nav className="flex-1 overflow-y-auto px-4 py-6">
								<ul className="flex flex-col gap-1">
									{navItems.map((item) => (
										<li key={item.label}>
											<Link
												to={item.route}
												onClick={onClose}
												className="group flex items-center gap-4 px-4 py-3.5 rounded-xl text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200"
											>
												<span className="text-cyan/70 group-hover:text-cyan transition-colors">
													{iconMap[item.label] || <IoHomeOutline size={22} />}
												</span>
												<span className="text-base font-medium tracking-wide">
													{item.label}
												</span>
												<span className="ml-auto text-gray-400">→</span>
											</Link>
										</li>
									))}
								</ul>

								<div className="mt-6 mx-4 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />

								<div className="mt-6 px-4">
									<p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
										Contact
									</p>
									<a
										href="mailto:hubertarlin1@gmail.com"
										className="text-sm text-gray-300 hover:text-cyan transition-colors"
									>
										hubertarlin1@gmail.com
									</a>
								</div>
							</nav>

							<div className="p-4 border-t border-white/10 bg-white/5">
								<a
									href="#contact"
									onClick={onClose}
									className="flex items-center justify-center gap-2 w-full py-3.5 px-6 text-gray-500 border border-gray-800 font-semibold rounded-xl shadow-lg shadow-black/20 hover:shadow-xl transition-all duration-300"
								>
									<IoMailOutline size={18} />
									Me contacter
								</a>
								<p className="text-center text-xs text-gray-400 mt-3">
									Reponse sous 24h
								</p>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	)
}

export default MenuDrawerMobile

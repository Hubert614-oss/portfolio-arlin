import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
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

	const overlayVariants: Variants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
		exit: { opacity: 0 },
	}

	const drawerVariants: Variants = {
		hidden: { x: '-100%' },
		visible: {
			x: 0,
			transition: {
				type: 'spring' as const,
				stiffness: 500,
				damping: 40,
				staggerChildren: 0.05,
				delayChildren: 0.05,
			},
		},
		exit: {
			x: '-100%',
			transition: {
				type: 'spring' as const,
				stiffness: 500,
				damping: 40,
			},
		},
	}

	const itemVariants: Variants = {
		hidden: { opacity: 0, x: -30 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { type: 'spring' as const, stiffness: 500, damping: 35 },
		},
	}


	return (
		<>
			<AnimatePresence>
				{isOpen && (
					<>
						<motion.div
							variants={overlayVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							transition={{ duration: 0.3 }}
							onClick={onClose}
							className="fixed inset-0 z-60 bg-slate-900/30 backdrop-blur-sm dark:bg-black/40 md:hidden"
							aria-hidden="true"
						/>

						<motion.div
							variants={drawerVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							className="fixed inset-y-0 left-0 z-70 flex h-dvh min-h-screen w-75 max-w-[85vw] flex-col bg-white pb-14 shadow-2xl shadow-slate-300/40 dark:bg-gray-950 dark:shadow-2xl dark:shadow-black/30 md:hidden"
							role="dialog"
							aria-modal="true"
							aria-label="Menu de navigation"
						>
							<div className="flex items-center justify-between border-b border-slate-200 px-6 pb-4 pt-6 dark:border-white/10">
								<motion.span
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.2 }}
									className="text-xl font-bold text-slate-900 dark:text-white"
								>
									Arlin Hubert
								</motion.span>
								<motion.button
									whileHover={{ scale: 1.1, rotate: 90 }}
									whileTap={{ scale: 0.9 }}
									onClick={onClose}
									className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-700 transition-colors hover:bg-slate-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
									aria-label="Fermer le menu"
								>
									<IoClose size={20} />
								</motion.button>
							</div>

							<nav className="flex-1 overflow-y-auto px-4 py-6">
								<ul className="flex flex-col gap-1">
									{navItems.map((item) => (
										<motion.li key={item.label} variants={itemVariants}>
											<Link
												to={item.route}
												onClick={() => {
													onClose();
												}}
												className="group flex items-center gap-4 rounded-xl px-4 py-3.5 text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 dark:text-gray-200 dark:hover:bg-white/10 dark:hover:text-white"
											>
												<span className="text-cyan-600 transition-colors group-hover:text-cyan-500 dark:text-cyan-400 dark:group-hover:text-cyan-300">
													{iconMap[item.label] || <IoHomeOutline size={22} />}
												</span>
												<span className="text-base font-medium tracking-wide">
													{item.label}
												</span>
												<motion.span
													className="ml-auto text-slate-400 opacity-0 group-hover:opacity-100 dark:text-gray-400"
													initial={false}
													animate={{ x: isOpen === true ? 0 : -10 }}
												>
													→
												</motion.span>
											</Link>
										</motion.li>
									))}
								</ul>

								<motion.div
									variants={itemVariants}
									className="mx-4 mt-6 h-px bg-linear-to-r from-transparent via-slate-300 to-transparent dark:via-white/15"
								/>

								<motion.div variants={itemVariants} className="mt-6 px-4">
									<p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-400">
										Contact
									</p>
									<a
										href="mailto:hubertarlin1@gmail.com"
										className="text-sm text-slate-700 transition-colors hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan"
									>
										hubertarlin1@gmail.com
									</a>
								</motion.div>
							</nav>

							<motion.div
								variants={itemVariants}
								className="border-t border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5"
							>
								<motion.a
									href="#contact"
									onClick={onClose}
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:shadow-xl dark:border-gray-800 dark:bg-transparent dark:text-gray-500 dark:shadow-black/20"
								>
									<IoMailOutline size={18} />
									Me contacter
								</motion.a>
								<p className="mt-3 text-center text-xs text-slate-500 dark:text-gray-400">
									Reponse sous 24h
								</p>
							</motion.div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	)
}

export default MenuDrawerMobile

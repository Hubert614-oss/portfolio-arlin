import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import {
	IoClose,
	IoHomeOutline,
	IoPeopleOutline,
	IoBriefcaseOutline,
	IoConstructOutline,
	IoLayersOutline,
	IoGitNetworkOutline,
	IoMailOutline,
	IoInformationCircleOutline,
} from 'react-icons/io5'
import { useContentStore, type Page } from '../stores/content.store'

interface MenuDrawerMobileProps {
	navItems: { label: string; href: string; route: Page }[]
	isOpen: boolean
	onClose: () => void
}

const iconMap: Record<string, ReactNode> = {
	About: <IoInformationCircleOutline size={22} />,
	Clients: <IoPeopleOutline size={22} />,
	Portfolio: <IoBriefcaseOutline size={22} />,
	Services: <IoConstructOutline size={22} />,
	Processus: <IoGitNetworkOutline size={22} />,
	Team: <IoLayersOutline size={22} />,
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
				stiffness: 300,
				damping: 30,
				staggerChildren: 0.08,
				delayChildren: 0.15,
			},
		},
		exit: {
			x: '-100%',
			transition: {
				type: 'spring' as const,
				stiffness: 300,
				damping: 30,
			},
		},
	}

	const itemVariants: Variants = {
		hidden: { opacity: 0, x: -30 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
		},
	}


	const setPage = useContentStore((state) => state.setPage)


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
							className="fixed inset-0 bg-black/40 backdrop-blur-sm z-60 md:hidden"
							aria-hidden="true"
						/>

						<motion.div
							variants={drawerVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							className="fixed inset-y-0 left-0 h-dvh min-h-screen w-75 max-w-[85vw] bg-gray-950 z-70 md:hidden shadow-2xl flex flex-col pb-14"
							role="dialog"
							aria-modal="true"
							aria-label="Menu de navigation"
						>
							<div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
								<motion.span
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.2 }}
									className="text-xl font-bold text-white"
								>
									VICTUS
								</motion.span>
								<motion.button
									whileHover={{ scale: 1.1, rotate: 90 }}
									whileTap={{ scale: 0.9 }}
									onClick={onClose}
									className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
									aria-label="Fermer le menu"
								>
									<IoClose size={20} />
								</motion.button>
							</div>

							<nav className="flex-1 overflow-y-auto px-4 py-6">
								<ul className="flex flex-col gap-1">
									{navItems.map((item) => (
										<motion.li key={item.label} variants={itemVariants}>
											<a
												// href={item.href}
												onClick={() => {
													onClose();
													setPage(item.route);
												}}
												className="group flex items-center gap-4 px-4 py-3.5 rounded-xl text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200"
											>
												<span className="text-cyan/70 group-hover:text-cyan transition-colors">
													{iconMap[item.label] || <IoHomeOutline size={22} />}
												</span>
												<span className="text-base font-medium tracking-wide">
													{item.label}
												</span>
												<motion.span
													className="ml-auto opacity-0 group-hover:opacity-100 text-gray-400"
													initial={false}
													animate={{ x: isOpen === true ? 0 : -10 }}
												>
													→
												</motion.span>
											</a>
										</motion.li>
									))}
								</ul>

								<motion.div
									variants={itemVariants}
									className="mt-6 mx-4 h-px bg-linear-to-r from-transparent via-white/15 to-transparent"
								/>

								<motion.div variants={itemVariants} className="mt-6 px-4">
									<p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
										Contact
									</p>
									<a
										href="mailto:hello@victus.com"
										className="text-sm text-gray-300 hover:text-cyan transition-colors"
									>
										hello@victus.com
									</a>
								</motion.div>
							</nav>

							<motion.div
								variants={itemVariants}
								className="p-4 border-t border-white/10 bg-white/5"
							>
								<motion.a
									href="#contact"
									onClick={onClose}
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className="flex items-center justify-center gap-2 w-full py-3.5 px-6 text-gray-500 border border-gray-800 font-semibold rounded-xl shadow-lg shadow-black/20 hover:shadow-xl transition-all duration-300"
								>
									<IoMailOutline size={18} />
									Nous contacter
								</motion.a>
								<p className="text-center text-xs text-gray-400 mt-3">
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

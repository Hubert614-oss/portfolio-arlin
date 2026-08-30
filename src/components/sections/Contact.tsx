import {
    ArrowUpRight,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Send,
} from "lucide-react";

import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from "../../utils/constants";

import emailjs from "@emailjs/browser";

import { ImGithub, ImWhatsapp } from "react-icons/im";
import { GrLinkedin } from "react-icons/gr";
import { useEffect, useState, type FormEvent } from "react";
import { useThemeStore } from "../../stores/themeStore";
import AnimatedBackground from "../AnimatedBackground";

const COMMON_EMAIL_TYPO_DOMAINS: Record<string, string> = {
    "gmai.com": "gmail.com",
    "gmial.com": "gmail.com",
    "gmal.com": "gmail.com",
    "outlok.com": "outlook.com",
    "hotnail.com": "hotmail.com",
    "yaho.com": "yahoo.com",
    "live.come": "live.com",
};

const Contact = () => {

    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [toast, setToast] = useState<{ type: "success" | "warning" | "error" | "finished"; message: string } | null>(null);

    const { theme } = useThemeStore();

    useEffect(() => {
        if (!toast) return;

        const timer = window.setTimeout(() => setToast(null), 3200);
        return () => window.clearTimeout(timer);
    }, [toast]);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = String(formData.get("name") ?? "").trim();
        const email = String(formData.get("email") ?? "").trim();
        const subject = String(formData.get("subject") ?? "").trim();
        const message = String(formData.get("message") ?? "").trim();

        if (!name || !email || !subject || !message) {
            setToast({ type: "warning", message: "Veuillez remplir tous les champs du formulaire." });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setToast({ type: "error", message: "Adresse e-mail invalide." });
            return;
        }

        const domain = email.split("@")[1]?.toLowerCase();
        const suggestedDomain = domain ? COMMON_EMAIL_TYPO_DOMAINS[domain] : undefined;

        if (suggestedDomain) {
            setToast({
                type: "warning",
                message: `Adresse e-mail suspecte. Avez-vous voulu ${suggestedDomain} ?`,
            });
            return;
        }

        setSending(true);
        setSuccess(false);

        try {
            await emailjs.sendForm(
                `${EMAILJS_SERVICE_ID}`,
                `${EMAILJS_TEMPLATE_ID}`,
                e.currentTarget,
                {
                    publicKey: `${EMAILJS_PUBLIC_KEY}`,
                }
            );

            setSuccess(true);
            setToast({ type: "success", message: "Message envoyé avec succès !" });

            setTimeout(() => {
                setSuccess(false);
            }, 3000);

            e.currentTarget.reset();
        } catch (error) {
            console.error(error);
        } finally {
            setSending(false);
        }
    };

    return (
        <>
            {toast !== null && (
                <div className="fixed right-5 bottom-24 z-100">
                    <div
                        className={`flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur-md ${toast.type === "success"
                            ? "border-emerald-600/30 bg-emerald-50 text-emerald-900 shadow-emerald-500/20 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-100"
                            : toast.type === "error"
                                ? "border-red-600/30 bg-red-50 text-red-900 shadow-red-500/20 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-100"
                                : "border-amber-600/30 bg-amber-50 text-amber-900 shadow-amber-500/20 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100"
                            }`}
                    >
                        <span
                            className={`inline-block h-2.5 w-2.5 rounded-full ${toast.type === "success" ? "bg-emerald-600 dark:bg-emerald-400" : toast.type === "error" ? "bg-red-600 dark:bg-red-400" : "bg-amber-600 dark:bg-amber-400"
                                }`}
                        />
                        <span className="text-sm font-medium">{toast.message}</span>
                    </div>
                </div>
            )}

            <AnimatedBackground variant={theme} showGrid showOrbs showDots>
                <section
                    id="contact"
                    className="relative overflow-hidden bg-transparent px-6 py-24 text-slate-900 scrollbar-hide dark:bg-transparent dark:text-white"
                >
                    {/* Background effects */}
                    <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

                    <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

                    <div className="relative mx-auto max-w-7xl">

                        {/* Header */}
                        <div className="mx-auto mb-16 max-w-3xl text-center">

                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-400">
                                <MessageCircle size={16} />
                                Contact
                            </div>

                            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-slate-900 dark:text-white">
                                Travaillons{" "}
                                <span className="bg-linear-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-blue-500">
                                    ensemble
                                </span>
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                                Vous avez un projet, une idée ou une opportunité ?
                                N'hésitez pas à me contacter. Je serai ravi d'échanger
                                avec vous.
                            </p>
                        </div>

                        {/* Content */}
                        <div className="grid gap-10 lg:grid-cols-5">

                            {/* Contact information */}
                            <div className="lg:col-span-2">

                                <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">

                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        Parlons de votre projet
                                    </h3>

                                    <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                                        Que vous souhaitiez créer une application web,
                                        développer une API ou discuter d'une architecture
                                        logicielle, je suis disponible pour échanger.
                                    </p>

                                    {/* Contact details */}
                                    <div className="mt-8 space-y-6">

                                        {/* Email */}
                                        <a
                                            href="mailto:hubertarlin1@gmail.com"
                                            className="group flex items-center gap-4"
                                        >
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-cyan-600 transition group-hover:border-cyan-400/40 group-hover:bg-cyan-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-cyan-400">
                                                <Mail size={20} />
                                            </div>

                                            <div>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                                    Email
                                                </p>

                                                <p className="font-medium text-slate-700 transition group-hover:text-cyan-600 dark:text-slate-200 dark:group-hover:text-cyan-400">
                                                    hubertarlin1@gmail.com
                                                </p>
                                            </div>
                                        </a>

                                        {/* Phone */}
                                        <a
                                            className="group flex items-center gap-4"
                                        >
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-cyan-600 transition group-hover:border-cyan-400/40 group-hover:bg-cyan-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-cyan-400">
                                                <Phone size={20} />
                                            </div>

                                            <div>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                                    Téléphone
                                                </p>

                                                <p className="font-medium text-slate-700 transition group-hover:text-cyan-600 dark:text-slate-200 dark:group-hover:text-cyan-400">
                                                    +261 34 44 747 95
                                                </p>
                                            </div>
                                        </a>

                                        {/* Location */}
                                        <a
                                            href="https://maps.app.goo.gl/cNse6p6WqJduJyh26"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center gap-4"
                                        >
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-cyan-600 transition group-hover:border-cyan-400/40 group-hover:bg-cyan-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-cyan-400">
                                                <MapPin size={20} />
                                            </div>

                                            <div className="">
                                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                                    Localisation
                                                </p>

                                                <p className="font-medium text-slate-700 transition group-hover:text-cyan-600 flex flex-col dark:text-slate-200 dark:group-hover:text-cyan-400">
                                                    <span>Antananarivo, Madagascar</span>
                                                    <span className="ml-2 text-xs text-cyan-600 dark:text-cyan-400">
                                                        Voir sur Maps →
                                                    </span>
                                                </p>
                                            </div>
                                        </a>

                                    </div>

                                    {/* Social */}
                                    <div className="mt-10 border-t border-slate-800 pt-8">

                                        <p className="mb-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                                            Retrouvez-moi également sur
                                        </p>

                                        <div className="flex gap-3">

                                            <a
                                                href="https://github.com/Hubert614-oss"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-600 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:text-white"
                                                aria-label="GitHub"
                                            >
                                                <ImGithub size={20} />
                                            </a>

                                            <a
                                                href="https://www.linkedin.com/in/hubert-arlin-tohandrainy-903714351/"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-600 transition hover:border-blue-500/40 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:text-blue-400"
                                                aria-label="LinkedIn"
                                            >
                                                <GrLinkedin size={20} />
                                            </a>

                                            <a
                                                href="https://wa.me/261344474795"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-600 transition hover:border-green-500/40 hover:bg-green-500/10 hover:text-green-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:text-green-400"
                                                aria-label="WhatsApp"
                                            >
                                                <ImWhatsapp size={20} />
                                            </a>

                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Contact form */}
                            <div className="lg:col-span-3">

                                <form
                                    onSubmit={handleSubmit}
                                    className="rounded-3xl border border-slate-200 bg-white/80 p-8 backdrop-blur md:p-10 dark:border-slate-800 dark:bg-slate-900/60"
                                >

                                    <div className="grid gap-6 sm:grid-cols-2">

                                        {/* Name */}
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                                            >
                                                Nom
                                            </label>

                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="Votre nom"
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-500 transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10 dark:border-slate-700 dark:bg-slate-950/70 dark:text-white dark:placeholder:text-slate-600"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                                            >
                                                Email
                                            </label>

                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="vous@example.com"
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-500 transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10 dark:border-slate-700 dark:bg-slate-950/70 dark:text-white dark:placeholder:text-slate-600"
                                            />
                                        </div>

                                    </div>

                                    {/* Subject */}
                                    <div className="mt-6">
                                        <label
                                            htmlFor="subject"
                                            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                                        >
                                            Sujet
                                        </label>

                                        <input
                                            id="subject"
                                            name="subject"
                                            type="text"
                                            placeholder="Comment puis-je vous aider ?"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-500 transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10 dark:border-slate-700 dark:bg-slate-950/70 dark:text-white dark:placeholder:text-slate-600"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div className="mt-6">
                                        <label
                                            htmlFor="message"
                                            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                                        >
                                            Message
                                        </label>

                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={7}
                                            placeholder="Décrivez votre projet..."
                                            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-500 transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10 dark:border-slate-700 dark:bg-slate-950/70 dark:text-white dark:placeholder:text-slate-600"
                                        />
                                    </div>

                                    {/* Submit */}
                                    <button
                                        disabled={sending}
                                        type="submit"
                                        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-3.5 font-semibold text-white transition-all duration-300 hover:from-cyan-400 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-500/20 sm:w-auto"
                                    >
                                        {sending ? "Envoi en cours..." : "Envoyer le message"}

                                        <Send
                                            size={18}
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                        />
                                    </button>

                                    {success && (
                                        <p className="mt-4 text-sm text-emerald-400">
                                            Message envoyé avec succès.
                                        </p>
                                    )}

                                </form>
                            </div>

                        </div>

                        {/* Bottom CTA */}
                        <div className="mt-16 text-center">

                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Disponible pour de nouvelles opportunités et collaborations.
                            </p>

                            <a
                                href="#accueil"
                                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-cyan-600 transition hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300"
                            >
                                Retour en haut
                                <ArrowUpRight size={15} />
                            </a>

                        </div>

                    </div>
                </section>
            </AnimatedBackground>
        </>
    );
};

export default Contact;
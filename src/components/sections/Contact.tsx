import {
    ArrowUpRight,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Send,
} from "lucide-react";

import emailjs from "@emailjs/browser";

import { ImGithub, ImWhatsapp } from "react-icons/im";
import { GrLinkedin } from "react-icons/gr";
import { useState, type FormEvent } from "react";



const Contact = () => {

    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSending(true);
        setSuccess(false);

        try {
            await emailjs.sendForm(
                "SERVICE_ID",
                "TEMPLATE_ID",
                e.currentTarget,
                {
                    publicKey: "PUBLIC_KEY",
                }
            );

            setSuccess(true);
            e.currentTarget.reset();
        } catch (error) {
            console.error(error);
        } finally {
            setSending(false);
        }
    };

    return (
        <section
            id="contact"
            className="relative overflow-hidden bg-slate-950/40 px-6 py-24 text-white scrollbar-hide"
        >
            {/* Background effects */}
            <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">

                {/* Header */}
                <div className="mx-auto mb-16 max-w-3xl text-center">

                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-400">
                        <MessageCircle size={16} />
                        Contact
                    </div>

                    <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        Travaillons{" "}
                        <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            ensemble
                        </span>
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-slate-400">
                        Vous avez un projet, une idée ou une opportunité ?
                        N'hésitez pas à me contacter. Je serai ravi d'échanger
                        avec vous.
                    </p>
                </div>

                {/* Content */}
                <div className="grid gap-10 lg:grid-cols-5">

                    {/* Contact information */}
                    <div className="lg:col-span-2">

                        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur">

                            <h3 className="text-2xl font-bold">
                                Parlons de votre projet
                            </h3>

                            <p className="mt-4 leading-7 text-slate-400">
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
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-cyan-400 transition group-hover:border-cyan-400/40 group-hover:bg-cyan-400/10">
                                        <Mail size={20} />
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Email
                                        </p>

                                        <p className="font-medium text-slate-200 transition group-hover:text-cyan-400">
                                            hubertarlin1@gmail.com
                                        </p>
                                    </div>
                                </a>

                                {/* Phone */}
                                <a
                                    className="group flex items-center gap-4"
                                >
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-cyan-400 transition group-hover:border-cyan-400/40 group-hover:bg-cyan-400/10">
                                        <Phone size={20} />
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Téléphone
                                        </p>

                                        <p className="font-medium text-slate-200 transition group-hover:text-cyan-400">
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
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-cyan-400 transition group-hover:border-cyan-400/40 group-hover:bg-cyan-400/10">
                                        <MapPin size={20} />
                                    </div>

                                    <div className="">
                                        <p className="text-sm text-slate-500">
                                            Localisation
                                        </p>

                                        <p className="font-medium text-slate-200 transition group-hover:text-cyan-400 flex flex-col">
                                            <span>Antananarivo, Madagascar</span>
                                            <span className="ml-2 text-xs text-cyan-400">
                                                Voir sur Maps →
                                            </span>
                                        </p>
                                    </div>
                                </a>

                            </div>

                            {/* Social */}
                            <div className="mt-10 border-t border-slate-800 pt-8">

                                <p className="mb-4 text-sm font-medium text-slate-400">
                                    Retrouvez-moi également sur
                                </p>

                                <div className="flex gap-3">

                                    <a
                                        href="https://github.com/Hubert614-oss"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-400 transition hover:border-slate-500 hover:text-white"
                                        aria-label="GitHub"
                                    >
                                        <ImGithub size={20} />
                                    </a>

                                    <a
                                        href="https://www.linkedin.com/in/hubert-arlin-tohandrainy-903714351/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-400 transition hover:border-blue-500/40 hover:text-blue-400"
                                        aria-label="LinkedIn"
                                    >
                                        <GrLinkedin size={20} />
                                    </a>

                                    <a
                                        href="https://wa.me/261344474795"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-400 transition hover:border-green-500/40 hover:bg-green-500/10 hover:text-green-400"
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
                            className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur md:p-10"
                        >

                            <div className="grid gap-6 sm:grid-cols-2">

                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-2 block text-sm font-medium text-slate-300"
                                    >
                                        Nom
                                    </label>

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Votre nom"
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-600 transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-medium text-slate-300"
                                    >
                                        Email
                                    </label>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="vous@example.com"
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-600 transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                                    />
                                </div>

                            </div>

                            {/* Subject */}
                            <div className="mt-6">
                                <label
                                    htmlFor="subject"
                                    className="mb-2 block text-sm font-medium text-slate-300"
                                >
                                    Sujet
                                </label>

                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    placeholder="Comment puis-je vous aider ?"
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-600 transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                                />
                            </div>

                            {/* Message */}
                            <div className="mt-6">
                                <label
                                    htmlFor="message"
                                    className="mb-2 block text-sm font-medium text-slate-300"
                                >
                                    Message
                                </label>

                                <textarea
                                    id="message"
                                    name="message"
                                    rows={7}
                                    placeholder="Décrivez votre projet..."
                                    className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-600 transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
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

                        </form>
                    </div>

                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">

                    <p className="text-sm text-slate-500">
                        Disponible pour de nouvelles opportunités et collaborations.
                    </p>

                    <a
                        href="#accueil"
                        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
                    >
                        Retour en haut
                        <ArrowUpRight size={15} />
                    </a>

                </div>

            </div>
        </section>
    );
};

export default Contact;
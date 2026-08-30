import { useThemeStore, type Theme } from "../stores/themeStore";
import { Moon, Sun, Monitor } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const themes: Theme[] = ["light", "dark", "system"];

const themeIcons: Record<Theme, React.ReactNode> = {
    light: <Sun className="w-5 h-5" />,
    dark: <Moon className="w-5 h-5" />,
    system: <Monitor className="w-5 h-5" />,
};

const themeLabels: Record<Theme, string> = {
    light: "Light",
    dark: "Dark",
    system: "System",
};

export function ToggleTheme() {
    const { theme, setTheme } = useThemeStore();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-1 py-1 rounded-full text-gray-900 dark:text-gray-100  transition-colors"
                aria-label="Select theme"
                aria-expanded={isOpen}
            >
                {themeIcons[theme]}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                    {themes.map((t) => (
                        <button
                            key={t}
                            onClick={() => {
                                setTheme(t);
                                setIsOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium transition-colors ${theme === t
                                ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`}
                        >
                            {themeIcons[t]}
                            <span>{themeLabels[t]}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

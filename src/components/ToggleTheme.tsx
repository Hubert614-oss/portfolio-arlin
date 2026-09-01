import { useThemeStore, type Theme } from "../stores/themeStore";
import { Moon, Sun, Monitor } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const themes: Theme[] = ["light", "dark", "system"];

const themeIcons: Record<Theme, React.ReactNode> = {
    light: <Sun className="w-5 h-5" />,
    dark: <Moon className="w-5 h-5" />,
    system: <Monitor className="w-5 h-5" />,
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
                <div className="absolute flex right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                    {themes.map((t) => (
                        <button
                            key={t}
                            onClick={() => {
                                setTheme(t);
                                setIsOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium rounded-full transition-colors `}
                        >
                            <span className={`flex items-center justify-center w-5 h-5 ${theme === t ? "text-blue-500 animate-pulse" : "text-gray-500"}`}>
                                {themeIcons[t]}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

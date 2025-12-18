"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Linkedin, FileText, Moon, Sun } from 'lucide-react';
import GlassContainer from './GlassContainer';
import styles from './TopBar.module.css';
import { useEffect, useState } from 'react';

export default function TopBar() {
    const pathname = usePathname();
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check system preference on mount
        const matchDark = window.matchMedia('(prefers-color-scheme: dark)');

        const applyTheme = (dark: boolean) => {
            setIsDarkMode(dark);
            if (dark) {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
        };

        // Initial check
        applyTheme(matchDark.matches);

        // Listener for changes
        const handler = (e: MediaQueryListEvent) => applyTheme(e.matches);
        matchDark.addEventListener('change', handler);
        return () => matchDark.removeEventListener('change', handler);
    }, []);

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        if (newMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    };

    return (
        <GlassContainer className={styles.topBar}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <Link href="/" className={styles.brandLink}>SOL1 Archive</Link>
                </div>

                <nav className={styles.nav}>
                    <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}>Home</Link>
                    <Link href="/posts" className={`${styles.navLink} ${pathname.startsWith('/posts') ? styles.active : ''}`}>Posts</Link>
                </nav>

                <div className={styles.right}>
                    <a href="https://github.com/SOL1archive" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="GitHub">
                        <Github size={20} />
                    </a>
                    <a href="https://linkedin.com/in/subinbag" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="LinkedIn">
                        <Linkedin size={20} />
                    </a>
                    <a href="/cv/Subin_Park_CV.pdf" target="_blank" rel="noopener noreferrer" className={styles.textLink} aria-label="View CV">
                        CV
                    </a>
                    <button className={styles.iconLink} onClick={toggleTheme} aria-label="Toggle Dark Mode">
                        {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </div>
            </div>
        </GlassContainer>
    );
}

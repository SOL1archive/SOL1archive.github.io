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
        setIsDarkMode(matchDark.matches);

        // Listener for changes
        const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
        matchDark.addEventListener('change', handler);
        return () => matchDark.removeEventListener('change', handler);
    }, []);

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

                <div className={styles.actions}>
                    <a href="https://github.com/SOL1archive" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="GitHub">
                        <Github size={20} />
                    </a>
                    <a href="https://linkedin.com/in/subinbag" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="LinkedIn">
                        <Linkedin size={20} />
                    </a>
                    <a href="/cv/resume.pdf" download className={styles.iconLink} aria-label="Download CV">
                        <FileText size={20} />
                    </a>
                    <button className={styles.iconLink} aria-label="Toggle Dark Mode">
                        {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </div>
            </div>
        </GlassContainer>
    );
}

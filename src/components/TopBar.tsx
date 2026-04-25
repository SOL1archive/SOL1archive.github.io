"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Linkedin, Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const navItems = [
    { href: '/', label: 'Home' },
    { href: '/posts', label: 'Posts' },
    { href: '/about', label: 'About' },
];

export default function TopBar() {
    const pathname = usePathname();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const stored = window.localStorage.getItem('sol1-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const dark = stored ? stored === 'dark' : prefersDark;
        setIsDarkMode(dark);
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    }, []);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    const toggleTheme = () => {
        const next = !isDarkMode;
        setIsDarkMode(next);
        document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
        window.localStorage.setItem('sol1-theme', next ? 'dark' : 'light');
        window.dispatchEvent(new Event('themechange'));
    };

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        if (href === '/posts') return pathname === '/posts' || pathname.startsWith('/Public/');
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    return (
        <header className={`topbar ${isScrolled || isMenuOpen ? 'is-scrolled' : ''}`}>
            <div className="container topbar-inner">
                <Link href="/" className="brand" aria-label="Subin Park home">
                    <span className="brand-glyph" aria-hidden>◐</span>
                    <span className="brand-name">Subin Park</span>
                </Link>

                <nav className="nav" aria-label="Primary navigation">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`nav-link ${isActive(item.href) ? 'is-active' : ''}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="actions">
                    <a href="https://github.com/SOL1archive" target="_blank" rel="noopener noreferrer" className="icon-btn hide-sm" aria-label="GitHub">
                        <Github size={18} strokeWidth={1.8} />
                    </a>
                    <a href="https://www.linkedin.com/in/subin-park-605560278" target="_blank" rel="noopener noreferrer" className="icon-btn hide-sm" aria-label="LinkedIn">
                        <Linkedin size={18} strokeWidth={1.8} />
                    </a>
                    <a href="/cv/Subin_Park_CV.pdf" target="_blank" rel="noopener noreferrer" className="cv-link" aria-label="View CV">
                        CV
                    </a>
                    <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
                        {isDarkMode ? <Moon size={18} strokeWidth={1.8} /> : <Sun size={18} strokeWidth={1.8} />}
                    </button>
                    <button className="icon-btn menu-btn" onClick={() => setIsMenuOpen((open) => !open)} aria-label="Toggle menu" aria-expanded={isMenuOpen}>
                        {isMenuOpen ? <X size={18} strokeWidth={1.8} /> : <Menu size={18} strokeWidth={1.8} />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <nav className="mobile-menu" aria-label="Mobile navigation">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`mobile-link ${isActive(item.href) ? 'is-active' : ''}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="mobile-sep" />
                    <a href="https://github.com/SOL1archive" target="_blank" rel="noopener noreferrer" className="mobile-link">
                        GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/subin-park-605560278" target="_blank" rel="noopener noreferrer" className="mobile-link">
                        LinkedIn
                    </a>
                </nav>
            )}
        </header>
    );
}

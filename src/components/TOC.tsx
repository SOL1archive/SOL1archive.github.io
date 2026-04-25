"use client";

import { useEffect, useState } from 'react';

export default function TOC({ headings }: { headings: { level: number; text: string; id: string }[] }) {
    const [activeId, setActiveId] = useState<string>(headings?.[0]?.id || '');

    useEffect(() => {
        if (!headings || headings.length === 0) return;

        const elements = headings
            .map((heading) => document.getElementById(heading.id))
            .filter((element): element is HTMLElement => Boolean(element));

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]?.target.id) setActiveId(visible[0].target.id);
            },
            { rootMargin: '-120px 0px -70% 0px' }
        );

        elements.forEach((element) => observer.observe(element));
        return () => observer.disconnect();
    }, [headings]);

    if (!headings || headings.length === 0) return null;

    return (
        <nav className="toc" aria-label="Table of contents">
            <div className="toc-head">On this page</div>
            {headings.map((heading) => (
                <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`${heading.level === 3 ? 'level-3' : ''} ${activeId === heading.id ? 'is-active' : ''}`}
                >
                    {heading.text}
                </a>
            ))}
        </nav>
    );
}

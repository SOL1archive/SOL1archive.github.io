"use client";

import { useEffect } from 'react';

export default function CodeCopy() {
    useEffect(() => {
        const onClick = async (event: MouseEvent) => {
            const button = (event.target as HTMLElement).closest<HTMLButtonElement>('.copy-btn');
            if (!button) return;

            const block = button.closest('.code-block');
            const code = block?.querySelector('code')?.textContent || '';
            if (!code) return;

            await navigator.clipboard.writeText(code);
            const original = button.textContent || 'Copy';
            button.classList.add('is-copied');
            button.textContent = 'Copied';
            window.setTimeout(() => {
                button.classList.remove('is-copied');
                button.textContent = original;
            }, 1400);
        };

        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    return null;
}

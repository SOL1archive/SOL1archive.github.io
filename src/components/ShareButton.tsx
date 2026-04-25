"use client";

import { Share2 } from 'lucide-react';

export default function ShareButton({ title }: { title: string }) {
    const share = async () => {
        const url = window.location.href;
        if (navigator.share) {
            await navigator.share({ title, url });
            return;
        }
        await navigator.clipboard.writeText(url);
    };

    return (
        <button className="share-btn" type="button" onClick={share}>
            <Share2 size={14} /> Share
        </button>
    );
}

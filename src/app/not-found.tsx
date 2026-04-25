import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFoundPage() {
    return (
        <div className="page nf-page">
            <div>
                <div className="nf-glyph">404</div>
                <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: 12 }}>
                    <span className="dot" style={{ background: 'var(--accent)' }} />
                    Page not found
                </div>
                <h2 className="nf-title">This URL went missing.</h2>
                <p className="nf-sub">
                    The page you were looking for does not exist. It may have moved, or never existed.
                </p>
                <div style={{ display: 'inline-flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Link className="btn" href="/">
                        <ArrowRight size={14} /> Go home
                    </Link>
                    <Link className="btn ghost" href="/posts">Browse posts</Link>
                </div>
            </div>
        </div>
    );
}

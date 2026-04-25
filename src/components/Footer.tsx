import Link from 'next/link';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container footer-inner">
                <div className="footer-col">
                    <div className="footer-brand">Subin Park</div>
                    <p className="footer-about">
                        Research notes, paper reviews, and essays at the intersection of machine learning, math, and mind.
                    </p>
                </div>
                <div className="footer-col">
                    <div className="footer-h">Browse</div>
                    <Link href="/">Home</Link>
                    <Link href="/posts">Posts</Link>
                    <Link href="/about">About</Link>
                </div>
                <div className="footer-col">
                    <div className="footer-h">Elsewhere</div>
                    <a href="https://github.com/SOL1archive" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://www.linkedin.com/in/subin-park-605560278" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="mailto:enlightkorean@gmail.com">Email</a>
                </div>
                <div className="footer-col">
                    <div className="footer-h">Colophon</div>
                    <p className="footer-meta">
                        Built with Next.js static export, Markdown, KaTeX, and GitHub Pages.
                    </p>
                </div>
            </div>
            <div className="container footer-bar">
                <span>© {year} Subin Park</span>
                <span>Seoul → anywhere</span>
            </div>
        </footer>
    );
}

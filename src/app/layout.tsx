import type { Metadata } from 'next';
import TopBar from '@/components/TopBar';
import Analytics from '@/components/Analytics';
import './globals.css';
import 'katex/dist/katex.min.css'; // Ensure CSS matches the rendered math
import 'highlight.js/styles/github-dark.css'; // Syntax highlighting

export const metadata: Metadata = {
    title: 'SOL1 Archive',
    description: 'Personal Research Blog',
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <main className="min-h-screen bg-background text-foreground flex flex-col">
                    <Analytics />
                    <TopBar />
                    <div className="flex-1 w-full max-w-[1200px] mx-auto p-8">
                        {children}
                    </div>
                </main>
            </body>
        </html>
    );
}

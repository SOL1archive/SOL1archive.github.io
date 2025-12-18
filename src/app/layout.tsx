import type { Metadata } from 'next';
import TopBar from '@/components/TopBar';
import Analytics from '@/components/Analytics';
import './globals.css';

// TODO: Replace with actual GA ID from legacy config
const GA_ID = '';

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
            <head>
                {/* Katex CSS for proper math rendering */}
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css"
                    integrity="sha384-wcIxkf4k558AjM3Cd3qQPzXo6pq9+uXlmeuchpdUyf7VpJ/V4t/3E7WzR9l9Yo2k"
                    crossOrigin="anonymous"
                />
            </head>
            <body>
                <main className="min-h-screen bg-background text-foreground flex flex-col">
                    <Analytics gaId={GA_ID} />
                    <TopBar />
                    <div className="flex-1 w-full max-w-[1200px] mx-auto p-8">
                        {children}
                    </div>
                </main>
            </body>
        </html>
    );
}

"use client";

import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PostData } from '@/lib/markdown';
import { CATEGORIES, categoryColor } from '@/lib/post-utils';
import PostCard from './PostCard';

export default function PostsFilter({ posts }: { posts: PostData[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const selected = searchParams.get('cat') || 'All';

    const filtered = useMemo(() => {
        if (selected === 'All') return posts;
        return posts.filter((post) => post.category === selected);
    }, [posts, selected]);

    const setCategory = (category: string) => {
        const query = category === 'All' ? pathname : `${pathname}?cat=${encodeURIComponent(category)}`;
        router.replace(query, { scroll: false });
    };

    return (
        <>
            <div className="filter-bar">
                <div className="container filter-inner">
                    <span className="filter-label">Topic</span>
                    <div className="chips">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                className={`chip ${selected === category ? 'is-active' : ''}`}
                                onClick={() => setCategory(category)}
                                style={{ '--c': categoryColor(category) } as CSSProperties}
                            >
                                <span className="cdot" />
                                {category}
                            </button>
                        ))}
                    </div>
                    <span className="filter-count">
                        {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}
                    </span>
                </div>
            </div>

            <div className="container">
                {filtered.length > 0 ? (
                    <div className="posts-grid">
                        {filtered.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <h3>Nothing here yet</h3>
                        <p>No posts in this topic. Try another filter, or head back to the full archive.</p>
                        <button className="btn ghost" onClick={() => setCategory('All')}>Show all posts</button>
                    </div>
                )}
            </div>
        </>
    );
}

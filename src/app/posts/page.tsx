import { Suspense } from 'react';
import { getSortedPostsData } from '@/lib/markdown';
import PostsFilter from '@/components/PostsFilter';

export default function Posts() {
    const posts = getSortedPostsData();

    return (
        <div className="page posts-page">
            <div className="container">
                <div className="posts-hero">
                    <div className="eyebrow" style={{ marginBottom: 20 }}>
                        <span className="dot" style={{ background: 'var(--accent)' }} />
                        Writing
                    </div>
                    <h1>All posts</h1>
                    <p>Notes, paper reviews, lecture material, and essays. Filter by topic below.</p>
                </div>
            </div>
            <Suspense fallback={null}>
                <PostsFilter posts={posts} />
            </Suspense>
        </div>
    );
}

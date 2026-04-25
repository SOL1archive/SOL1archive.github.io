import Link from 'next/link';
import { PostData } from '@/lib/markdown';
import { categoryClass, formatPostDate } from '@/lib/post-utils';

export default function PostCard({ post }: { post: PostData }) {
    return (
        <Link href={`/${post.id}`} className="card">
            <div className="card-eyebrow">
                <span className={`eyebrow ${categoryClass(post.category)}`}>
                    <span className="dot" />
                    {post.category}
                </span>
                <span className="sep">·</span>
                <span className="date">{formatPostDate(post.date)}</span>
            </div>
            <h3 className="card-title">{post.title}</h3>
            <p className="card-excerpt">{post.excerpt}</p>
            <div className="card-meta">
                <span>{post.readingTime} min read</span>
                {post.tags?.slice(0, 2).map((tag: string) => (
                    <span key={tag} className="card-tag">#{tag}</span>
                ))}
            </div>
        </Link>
    );
}

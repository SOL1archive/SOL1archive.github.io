import Link from 'next/link';
import { PostData } from '@/lib/markdown';
import { categoryClass, formatPostDate } from '@/lib/post-utils';

export default function PostRow({ post, index }: { post: PostData; index: number }) {
    return (
        <Link href={`/${post.id}`} className="post-row">
            <div className="pr-num">{String(index + 1).padStart(2, '0')}</div>
            <div className="pr-body">
                <div className="pr-eyebrow">
                    <span className={`eyebrow ${categoryClass(post.category)}`}>
                        <span className="dot" />
                        {post.category}
                    </span>
                    <span className="sep">·</span>
                    <span className="date">{formatPostDate(post.date)}</span>
                    <span className="sep">·</span>
                    <span className="rt">{post.readingTime} min</span>
                </div>
                <h3 className="pr-title">{post.title}</h3>
                <p className="pr-excerpt">{post.excerpt}</p>
            </div>
            <div className="pr-arrow" aria-hidden>→</div>
        </Link>
    );
}

import Link from 'next/link';
import { PostData } from '@/lib/markdown';
import { categoryClass, formatPostDate } from '@/lib/post-utils';

export default function FeaturedHero({
    main,
    secondary,
}: {
    main: PostData;
    secondary: PostData[];
}) {
    return (
        <div className="featured-hero">
            <Link href={`/${main.id}`} className="fh-main">
                <div className="fh-kicker">
                    <span className={`eyebrow ${categoryClass(main.category)}`}>
                        <span className="dot" />
                        {main.category}
                    </span>
                    <span className="sep">·</span>
                    <span className="date">{formatPostDate(main.date)}</span>
                    <span className="sep">·</span>
                    <span className="rt">{main.readingTime} min read</span>
                </div>
                <h2 className="fh-title">{main.title}</h2>
                <p className="fh-deck">{main.excerpt}</p>
                <div className="fh-continue">Read essay →</div>
            </Link>

            <aside className="fh-side">
                <div className="fh-side-h">Also featured</div>
                <div className="fh-side-list">
                    {secondary.map((post) => (
                        <Link key={post.id} href={`/${post.id}`} className="fh-side-item">
                            <div className="fh-side-eyebrow">
                                <span className={`eyebrow ${categoryClass(post.category)}`}>
                                    <span className="dot" />
                                    {post.category}
                                </span>
                                <span className="sep">·</span>
                                <span className="date">{formatPostDate(post.date)}</span>
                            </div>
                            <div className="fh-side-title">{post.title}</div>
                        </Link>
                    ))}
                </div>
            </aside>
        </div>
    );
}

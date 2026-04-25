import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getAllPostSlugs, getPostData, getSortedPostsData } from '@/lib/markdown';
import TOC from '@/components/TOC';
import PostCard from '@/components/PostCard';
import CodeCopy from '@/components/CodeCopy';
import ShareButton from '@/components/ShareButton';
import { categoryClass, formatPostDate } from '@/lib/post-utils';

interface Props {
    params: {
        slug: string[];
    };
}

export async function generateStaticParams() {
    return getAllPostSlugs();
}

export default async function Post({ params }: Props) {
    const postData = await getPostData(params.slug);
    const related = getSortedPostsData()
        .filter((post) => post.id !== postData.id)
        .filter((post) => post.category === postData.category || post.tags.some((tag) => postData.tags.includes(tag)))
        .slice(0, 2);

    const fallbackRelated = related.length >= 2
        ? related
        : [
            ...related,
            ...getSortedPostsData().filter((post) => post.id !== postData.id && !related.some((item) => item.id === post.id)),
        ].slice(0, 2);

    return (
        <div className="page post-page">
            <CodeCopy />
            <div className="post-container">
                <div className="post-top">
                    <article className="post-main">
                        <header className="post-header">
                            <Link href="/posts" className="post-back">
                                <ArrowLeft size={14} /> All posts
                            </Link>
                            <div className="post-eyebrow">
                                <span className={`eyebrow ${categoryClass(postData.category)}`}>
                                    <span className="dot" />
                                    {postData.category}
                                </span>
                                <span className="sep">·</span>
                                <span className="date">{formatPostDate(postData.date)}</span>
                            </div>
                            <h1 className="post-title">{postData.title}</h1>
                            <div className="post-byline">
                                <div className="avatar">SP</div>
                                <div className="byline-text">
                                    <div className="name">Subin Park</div>
                                    <div className="time">{postData.readingTime} min read</div>
                                </div>
                                <div className="byline-spacer" />
                                <ShareButton title={postData.title} />
                            </div>
                        </header>

                        <div
                            className="prose"
                            lang={postData.lang === 'ko' ? 'ko' : undefined}
                            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                        />

                        {fallbackRelated.length > 0 && (
                            <section className="related">
                                <div className="section-head">
                                    <h2 className="section-title">More writing</h2>
                                    <Link className="section-link" href="/posts">Browse all →</Link>
                                </div>
                                <div className="related-grid">
                                    {fallbackRelated.map((post) => (
                                        <PostCard key={post.id} post={post} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </article>

                    <aside className="toc-wrap">
                        <TOC headings={postData.headings} />
                    </aside>
                </div>
            </div>
        </div>
    );
}

import { getAllPostSlugs, getPostData } from '@/lib/markdown';
import GlassContainer from '@/components/GlassContainer';
import TOC from '@/components/TOC';
import styles from './page.module.css';

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

    return (
        <div className={styles.layout}>
            <GlassContainer className={styles.postContainer}>
                <article className={styles.article}>
                    {/* Header */}
                    <header className={styles.header}>
                        <h1 className={styles.title}>{postData.title}</h1>
                        <div className={styles.meta}>
                            <time className={styles.date}>{postData.date}</time>
                            {postData.category && <span className={styles.category}>{postData.category}</span>}
                        </div>
                    </header>

                    {/* Content */}
                    <div
                        className={styles.content}
                        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                    />
                </article>
            </GlassContainer>

            <aside className={styles.sidebar}>
                <TOC headings={postData.headings} />
            </aside>
        </div>
    );
}

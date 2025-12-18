import Link from 'next/link';
import { getSortedPostsData, getProfileData } from '@/lib/markdown';
import GlassContainer from '@/components/GlassContainer';
import Intro from '@/components/Intro';
import styles from './home.module.css';
import pageStyles from './[...slug]/page.module.css'; // Reuse markdown styles

export default async function Home() {
    const allPostsData = getSortedPostsData();
    const profileData = await getProfileData();

    return (
        <div className={styles.container}>
            <Intro />

            {profileData && (
                <section style={{ maxWidth: '800px', margin: '0 auto 4rem' }}>
                    <GlassContainer>
                        <div style={{ padding: '2rem' }}>
                            <div
                                className={pageStyles.markdown}
                                dangerouslySetInnerHTML={{ __html: profileData.contentHtml }}
                            />
                        </div>
                    </GlassContainer>
                </section>
            )}

            <div className={styles.list}>
                {allPostsData.map(({ id, date, title, category }) => (
                    <Link href={`/${id}`} key={id} className={styles.cardLink}>
                        <GlassContainer className={styles.card}>
                            <div className={styles.cardContent}>
                                <div className={styles.cardHeader}>
                                    <time className={styles.date}>{date}</time>
                                    {category && <span className={styles.category}>{category}</span>}
                                </div>
                                <h3 className={styles.cardTitle}>{title}</h3>
                            </div>
                        </GlassContainer>
                    </Link>
                ))}
            </div>
        </div>
    );
}

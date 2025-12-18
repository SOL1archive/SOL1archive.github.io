import Link from 'next/link';
import { getSortedPostsData } from '@/lib/markdown';
import GlassContainer from '@/components/GlassContainer';
import Intro from '@/components/Intro';
import styles from './home.module.css';

export default function Home() {
    const allPostsData = getSortedPostsData();

    return (
        <div className={styles.container}>
            <Intro />

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

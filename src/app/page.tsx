import Link from 'next/link';
import { getSortedPostsData } from '@/lib/markdown';
import GlassContainer from '@/components/GlassContainer';
import styles from './home.module.css';

export default function Home() {
    const allPostsData = getSortedPostsData();

    return (
        <div className={styles.container}>
            <header className={styles.hero}>
                <h1 className={styles.title}>Research Notes</h1>
                <p className={styles.subtitle}>Archive of thoughts, mathematics, and code.</p>
            </header>

            <div className={styles.grid}>
                {allPostsData.map(({ id, date, title, category }) => (
                    <Link href={`/${id}`} key={id} className={styles.cardLink}>
                        <GlassContainer className={styles.card}>
                            <div className={styles.cardContent}>
                                <span className={styles.date}>{date}</span>
                                <h3 className={styles.cardTitle}>{title}</h3>
                                {category && <span className={styles.category}>{category}</span>}
                            </div>
                        </GlassContainer>
                    </Link>
                ))}
            </div>
        </div>
    );
}

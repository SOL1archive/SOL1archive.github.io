import GlassContainer from './GlassContainer';
import styles from './TOC.module.css';

export default function TOC({ headings }: { headings: { level: number; text: string; id: string }[] }) {
    if (!headings || headings.length === 0) return null;

    return (
        <nav className={styles.toc}>
            <h4 className={styles.title}>On This Page</h4>
            <ul className={styles.list}>
                {headings.map((heading, index) => (
                    <li
                        key={index}
                        className={`${styles.item} ${styles[`level-${heading.level}`]}`}
                    >
                        <a href={`#${heading.id}`}>{heading.text}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

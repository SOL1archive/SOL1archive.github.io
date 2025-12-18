import { Github, Linkedin, FileText, Mail } from 'lucide-react';
import GlassContainer from './GlassContainer';
import styles from './Intro.module.css';

export default function Intro() {
    return (
        <section className={styles.container}>
            <h1 className={styles.name}>SOL1 Archive</h1>
            <p className={styles.bio}>
                Researcher in Machine Learning & Logic. <br />
                Archive of thoughts, mathematics, and code.
            </p>

            <div className={styles.links}>
                <a href="https://github.com/SOL1archive" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="GitHub">
                    <Github size={24} />
                </a>
                <a href="https://www.linkedin.com/in/subin-park-605560278" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="LinkedIn">
                    <Linkedin size={24} />
                </a>
                <a href="/cv/Subin_Park_CV.pdf" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="CV">
                    <FileText size={24} />
                </a>
                <a href="mailto:subinpark@yonsei.ac.kr" className={styles.iconLink} aria-label="Email">
                    <Mail size={24} />
                </a>
            </div>
        </section>
    );
}

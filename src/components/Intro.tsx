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
                <a href="https://github.com/SOL1archive" target="_blank" rel="noopener noreferrer" className={styles.link}>
                    <Github size={20} />
                    <span>GitHub</span>
                </a>
                <a href="https://linkedin.com/in/subinbag" target="_blank" rel="noopener noreferrer" className={styles.link}>
                    <Linkedin size={20} />
                    <span>LinkedIn</span>
                </a>
                <a href="/cv/Subin_Park_CV.pdf" target="_blank" rel="noopener noreferrer" className={styles.link}>
                    <FileText size={20} />
                    <span>CV</span>
                </a>
                <a href="mailto:your.email@example.com" className={styles.link}>
                    <Mail size={20} />
                    <span>Email</span>
                </a>
            </div>
        </section>
    );
}

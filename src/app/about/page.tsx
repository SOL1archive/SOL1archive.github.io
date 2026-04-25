import { FileText, Github, Linkedin, Mail } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="page about-page">
            <div className="container">
                <section className="about-hero">
                    <div className="eyebrow">
                        <span className="dot" style={{ background: 'var(--accent)' }} />
                        About
                    </div>
                    <h1>Subin Park.</h1>
                    <p className="lead">
                        Undergraduate at Yonsei University, double majoring in Computer Science and Mathematics,
                        with research interests in NLP, reinforcement learning, and foundation models.
                    </p>
                </section>

                <section className="about-grid">
                    <h2>Now</h2>
                    <div className="about-body">
                        <p>
                            I am pursuing a <strong>B.S. at Yonsei University</strong>, double majoring in
                            <strong> Computer Science and Mathematics</strong>. My coursework spans software engineering,
                            computer systems, deep neural networks, mathematics for deep learning, probability and statistics,
                            text mining, and cognitive neuroscience.
                        </p>
                        <p>
                            I am an <strong>Undergraduate Researcher at the Decision Making Intelligence & Learning Lab</strong>,
                            advised by Prof. Jongmin Lee. I am leading research on Offline Direct Multi-Preference LLM
                            Alignment via RLHF and participating in research on RL foundation models for world modeling.
                        </p>
                        <p>
                            You can reach me anytime at <a className="text-link" href="mailto:enlightkorean@gmail.com">enlightkorean@gmail.com</a>.
                        </p>
                    </div>
                </section>

                <section className="about-grid">
                    <h2>Interests</h2>
                    <div className="interests">
                        <div className="interest-card">
                            <h3>AI & Machine Learning</h3>
                            <p>NLP, reinforcement learning, and foundation models, viewed through computer science, mathematics, and cognitive neuroscience.</p>
                        </div>
                        <div className="interest-card">
                            <h3>Natural Language Processing</h3>
                            <p>LLM alignment, transformer-alternative architectures such as Mamba and Titans, and LLM reasoning.</p>
                        </div>
                        <div className="interest-card">
                            <h3>Reinforcement Learning</h3>
                            <p>Offline RL, sequential decision-making problems, data-efficient RL, and RLHF for preference alignment.</p>
                        </div>
                        <div className="interest-card">
                            <h3>Research Foundations</h3>
                            <p>Mathematics, linguistics, and cognitive neuroscience as tools for studying intelligence.</p>
                        </div>
                    </div>
                </section>

                <section className="about-grid">
                    <h2>Timeline</h2>
                    <div className="timeline">
                        <div className="tl-item">
                            <div className="tl-date">Apr 2025 - now</div>
                            <div className="tl-body">
                                <div className="role">Undergraduate Researcher</div>
                                <div className="org">Decision Making Intelligence & Learning Lab, Yonsei University</div>
                                <div className="desc">Research on Offline Direct Multi-Preference LLM Alignment via RLHF and RL foundation models for world modeling.</div>
                            </div>
                        </div>
                        <div className="tl-item">
                            <div className="tl-date">Mar 2022 - now</div>
                            <div className="tl-body">
                                <div className="role">B.S. Computer Science & Mathematics</div>
                                <div className="org">Yonsei University, Seoul</div>
                                <div className="desc">Double major with coursework in computer systems, deep learning, probability and statistics, text mining, and cognitive neuroscience.</div>
                            </div>
                        </div>
                        <div className="tl-item">
                            <div className="tl-date">Jul 2023 - Jan 2025</div>
                            <div className="tl-body">
                                <div className="role">Military Intelligence Specialist, Sergeant</div>
                                <div className="org">Republic of Korea Army</div>
                                <div className="desc">Gathered and analyzed tactical intelligence, led a squad, and completed CBRN threat analysis and mission planning training.</div>
                            </div>
                        </div>
                        <div className="tl-item">
                            <div className="tl-date">Apr 2023 - Jun 2023</div>
                            <div className="tl-body">
                                <div className="role">Polyglot Project Member</div>
                                <div className="org">EleutherAI</div>
                                <div className="desc">Contributed to Korean Chain-of-Thought dataset construction and multilingual LLM preprocessing and evaluation.</div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="about-grid">
                    <h2>Goals</h2>
                    <div className="about-body">
                        <p><strong>Research.</strong> Study the fundamental question of whether machines can think by grounding intelligence in mathematics, linguistics, and cognitive neuroscience.</p>
                        <p><strong>Alignment and reasoning.</strong> Build better language-model alignment methods, reasoning systems, and foundation models for sequential decision making.</p>
                        <p><strong>Implementation.</strong> Keep research tied to working systems through PyTorch, HuggingFace, reinforcement learning, and careful evaluation.</p>
                    </div>
                </section>

                <section className="about-grid">
                    <h2>Contact</h2>
                    <div className="contact-card">
                        <a href="mailto:enlightkorean@gmail.com"><Mail size={18} /> enlightkorean@gmail.com</a>
                        <a href="https://github.com/SOL1archive" target="_blank" rel="noopener noreferrer"><Github size={18} /> github.com/SOL1archive</a>
                        <a href="https://www.linkedin.com/in/subin-park-605560278" target="_blank" rel="noopener noreferrer"><Linkedin size={18} /> LinkedIn</a>
                        <a href="/cv/Subin_Park_CV.pdf" target="_blank" rel="noopener noreferrer"><FileText size={18} /> Download CV</a>
                    </div>
                </section>
            </div>
        </div>
    );
}

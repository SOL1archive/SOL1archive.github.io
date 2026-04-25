import Link from 'next/link';
import { ArrowRight, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { getSortedPostsData } from '@/lib/markdown';
import FeaturedHero from '@/components/FeaturedHero';
import PostRow from '@/components/PostRow';

export default function Home() {
    const posts = getSortedPostsData();
    const featuredMain = posts.find((post) => post.featured) || posts[0];
    const secondary = posts.filter((post) => post.id !== featuredMain?.id).slice(0, 3);
    const recent = posts
        .filter((post) => post.id !== featuredMain?.id && !secondary.some((item) => item.id === post.id))
        .slice(0, 6);

    return (
        <div className="page home">
            <div className="container">
                <section className="intro">
                    <h1 className="intro-name">Subin Park</h1>
                    <p className="intro-bio">
                        Student at Yonsei University and majoring computer science and mathematics, working on NLP and reinforcement learning.
                    </p>
                    <div className="intro-links">
                        <Link className="intro-link intro-link-primary" href="/about">About</Link>
                        <a className="intro-link" href="/cv/Subin_Park_CV.pdf" target="_blank" rel="noopener noreferrer">
                            <FileText size={14} /> CV
                        </a>
                        <a className="intro-link" href="https://github.com/SOL1archive" target="_blank" rel="noopener noreferrer">
                            <Github size={14} /> GitHub
                        </a>
                        <a className="intro-link" href="https://www.linkedin.com/in/subin-park-605560278" target="_blank" rel="noopener noreferrer">
                            <Linkedin size={14} /> LinkedIn
                        </a>
                        <a className="intro-link" href="mailto:enlightkorean@gmail.com">
                            <Mail size={14} /> Email
                        </a>
                    </div>
                </section>

                {featuredMain && (
                    <section>
                        <div className="section-head">
                            <h2 className="section-title">Featured</h2>
                            <Link className="section-link" href="/posts">
                                All posts <ArrowRight size={14} />
                            </Link>
                        </div>
                        <FeaturedHero main={featuredMain} secondary={secondary} />
                    </section>
                )}

                <section>
                    <div className="section-head">
                        <h2 className="section-title">Recent</h2>
                        <Link className="section-link" href="/posts">
                            Browse by topic <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="posts-rows">
                        {recent.map((post, index) => (
                            <PostRow key={post.id} post={post} index={index} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

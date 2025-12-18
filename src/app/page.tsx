import Link from 'next/link';
import { getProfileData } from '@/lib/markdown';
import GlassContainer from '@/components/GlassContainer';
import Intro from '@/components/Intro';
import styles from './home.module.css';
import pageStyles from './[...slug]/page.module.css'; // Reuse markdown styles

export default async function Home() {
    const profileData = await getProfileData();

    return (
        <div className={styles.container}>
            <Intro />

            {profileData && (
                <section style={{ maxWidth: '800px', margin: '0 auto 4rem' }}>
                    <GlassContainer>
                        <div style={{ padding: '3rem' }}>
                            <div
                                className={pageStyles.content}
                                dangerouslySetInnerHTML={{ __html: profileData.contentHtml }}
                            />
                        </div>
                    </GlassContainer>
                </section>
            )}
        </div>
    );
}

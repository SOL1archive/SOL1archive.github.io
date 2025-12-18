import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';

const notesDirectory = path.join(process.cwd(), '_notes');

export interface PostData {
    id: string;
    slug: string[];
    title: string;
    date: string;
    category: string;
    contentHtml: string;
    headings: { level: number; text: string; id: string }[];
    [key: string]: any;
}

// Helper to recursively get all files
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        if (fs.statSync(dirPath + '/' + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
        } else {
            if (file.endsWith('.md')) {
                arrayOfFiles.push(path.join(dirPath, '/', file));
            }
        }
    });

    return arrayOfFiles;
}

export function getAllPostSlugs() {
    const filePaths = getAllFiles(notesDirectory);
    return filePaths.map((filePath) => {
        const relativePath = path.relative(notesDirectory, filePath);
        // Remove extension and split into array for creating paths
        const slug = relativePath.replace(/\.md$/, '').split(path.sep);
        return {
            slug: slug,
        };
    });
}

export function getSortedPostsData() {
    const filePaths = getAllFiles(notesDirectory);
    const allPostsData = filePaths.map((filePath) => {
        const relativePath = path.relative(notesDirectory, filePath);
        const slug = relativePath.replace(/\.md$/, '').split(path.sep);
        const id = slug.join('/');

        const fileContents = fs.readFileSync(filePath, 'utf8');
        const matterResult = matter(fileContents);

        return {
            id,
            slug,
            ...(matterResult.data as { date: string; title: string; category?: string }),
        };
    });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export async function getPostData(slugArray: string[]) {
    // Decode slug parts to handle special characters (spaces, &, comma etc.)
    const decodedSlug = slugArray.map(part => decodeURIComponent(part));
    const relativePath = decodedSlug.join(path.sep) + '.md';
    const fullPath = path.join(notesDirectory, relativePath);

    if (!fs.existsSync(fullPath)) {
        console.error(`Post not found at path: ${fullPath}`);
        throw new Error('Post not found');
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(remarkGfm)
        .use(remarkMath)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeKatex, {
            strict: 'ignore',
            throwOnError: false,
            errorColor: '#cc0000'
        })
        .use(rehypeHighlight)
        .use(rehypeSlug)
        .use(rehypeStringify)
        .process(matterResult.content);

    const contentHtml = processedContent.toString();

    // Extract TOC
    const headings: { level: number; text: string; id: string }[] = [];
    const lines = matterResult.content.split('\n');
    let inCodeBlock = false;

    lines.forEach(line => {
        if (line.trim().startsWith('```')) {
            inCodeBlock = !inCodeBlock;
        }
        if (!inCodeBlock) {
            const match = line.match(/^(#{1,6})\s+(.+)$/);
            if (match) {
                const level = match[1].length;
                // Check for custom ID syntax like {:#my-id}
                // User example: {:#뉴런의 모델링}\n## 뉴런의 모델링
                // Or sometimes inline? The user example shows the ID *before* the header line?
                // " {:#뉴런의 모델링} \n ## 뉴런의 모델링 "
                // Kramdown allows defining ID for the *next* block or the *previous* block.
                // If I use rehype-slug, it autogenerates. If I want to support manual IDs, I need to parse the `{:#id}` syntax.
                // For now, let's rely on the text content to generate the slug, as rehype-slug does by default.
                // We can revisit custom IDs if needed.
                const text = match[2].replace(/\{#.*?\}/, '').trim(); // Remove ID if inline

                // Simple slugify matching rehype-slug default roughly
                const id = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-').replace(/(^-|-$)+/g, '');
                headings.push({ level, text, id });
            }
        }
    });

    return {
        slug: slugArray,
        contentHtml,
        headings,
        ...matterResult.data,
    } as PostData;
}


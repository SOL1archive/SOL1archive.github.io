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
import { parse, isValid } from 'date-fns';
import { visit } from 'unist-util-visit';

const notesDirectory = path.join(process.cwd(), '_notes');

export interface PostData {
    id: string;
    slug: string[];
    title: string;
    date: string;
    category: string;
    excerpt: string;
    tags: string[];
    readingTime: number;
    contentHtml: string;
    headings: { level: number; text: string; id: string }[];
    [key: string]: any;
}

type RawPostMeta = {
    date: string;
    title: string;
    category?: string;
    excerpt?: string;
    tags?: string[] | string;
    feed?: string;
    featured?: boolean;
    lang?: string;
};

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

function stripMarkdown(content: string) {
    return content
        .replace(/^\s*TOC\s*:toc\s*:?\s*/gim, ' ')
        .replace(/^\s*\*\s*TOC\s*$/gim, ' ')
        .replace(/\{:toc\}/g, ' ')
        .replace(/\{:.*?\}/g, ' ')
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/\$\$[\s\S]*?\$\$/g, ' ')
        .replace(/\$[^$]+\$/g, ' ')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
        .replace(/\[[^\]]+\]\([^)]*\)/g, '$1')
        .replace(/[#>*_`~\-\[\]{}()]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function cleanLegacyMarkdown(content: string) {
    return content
        .replace(/^\s*TOC\s*:toc\s*:?\s*/gim, '')
        .replace(/\{:.*?\}/g, '')
        .replace(/^\s*\*\s*TOC\s*$/gim, '');
}

function inferCategory(id: string, title: string, category?: string) {
    if (category) return category;

    const haystack = `${id} ${title}`.toLowerCase();
    if (haystack.includes('fintext') || haystack.includes('report')) return 'Reports';
    if (haystack.includes('can-machines-think') || haystack.includes('기계는 생각')) return 'Essays';
    if (haystack.includes('math_logic') || haystack.includes('countable') || haystack.includes('수리논리') || haystack.includes('가산')) return 'Math';
    if (haystack.includes('dpo') || haystack.includes('autoencoder')) return 'Research';
    return 'Notes';
}

function inferTags(id: string, title: string, tags?: string[] | string) {
    if (Array.isArray(tags)) return tags;
    if (typeof tags === 'string') return tags.split(',').map((tag) => tag.trim()).filter(Boolean);

    const haystack = `${id} ${title}`.toLowerCase();
    const inferred: string[] = [];
    if (haystack.includes('dpo')) inferred.push('RLHF', 'Alignment');
    if (haystack.includes('nlp') || haystack.includes('자연어')) inferred.push('NLP');
    if (haystack.includes('math') || haystack.includes('수리') || haystack.includes('가산')) inferred.push('Math');
    if (haystack.includes('logic') || haystack.includes('논리')) inferred.push('Logic');
    if (haystack.includes('pytorch')) inferred.push('PyTorch');
    if (haystack.includes('fintext')) inferred.push('Finance', 'NLP');
    if (haystack.includes('autoencoder')) inferred.push('Autoencoder');
    if (haystack.includes('regression') || haystack.includes('회귀')) inferred.push('ML');

    return Array.from(new Set(inferred)).slice(0, 3);
}

function normalizePostMeta(id: string, slug: string[], data: RawPostMeta, content = ''): PostData {
    const plain = stripMarkdown(content);
    const excerpt = data.excerpt || (plain.length > 142 ? `${plain.slice(0, 142).trim()}...` : plain);
    const words = plain.split(/\s+/).filter(Boolean).length;

    return {
        ...data,
        id,
        slug,
        title: data.title || slug[slug.length - 1],
        date: data.date,
        category: inferCategory(id, data.title || '', data.category),
        excerpt,
        tags: inferTags(id, data.title || '', data.tags),
        readingTime: Math.max(1, Math.ceil(words / 220)),
        contentHtml: '',
        headings: [],
    };
}

function rehypeCodeChrome() {
    return (tree: any) => {
        visit(tree, 'element', (node: any, index: number | undefined, parent: any) => {
            if (!parent || index === undefined || node.tagName !== 'pre') return;

            const code = node.children?.find((child: any) => child.tagName === 'code');
            const className = code?.properties?.className || [];
            const langClass = Array.isArray(className) ? className.find((name: string) => name.startsWith('language-')) : undefined;
            const lang = langClass ? langClass.replace('language-', '') : 'text';

            parent.children[index] = {
                type: 'element',
                tagName: 'div',
                properties: { className: ['code-block'] },
                children: [
                    {
                        type: 'element',
                        tagName: 'div',
                        properties: { className: ['code-head'] },
                        children: [
                            {
                                type: 'element',
                                tagName: 'div',
                                properties: { className: ['left'] },
                                children: [
                                    {
                                        type: 'element',
                                        tagName: 'span',
                                        properties: { className: ['dots'], ariaHidden: 'true' },
                                        children: [
                                            { type: 'element', tagName: 'span', properties: { className: ['dot'] }, children: [] },
                                            { type: 'element', tagName: 'span', properties: { className: ['dot'] }, children: [] },
                                            { type: 'element', tagName: 'span', properties: { className: ['dot'] }, children: [] },
                                        ],
                                    },
                                    {
                                        type: 'element',
                                        tagName: 'span',
                                        properties: { className: ['lang'] },
                                        children: [{ type: 'text', value: lang }],
                                    },
                                ],
                            },
                            {
                                type: 'element',
                                tagName: 'button',
                                properties: { className: ['copy-btn'], type: 'button' },
                                children: [{ type: 'text', value: 'Copy' }],
                            },
                        ],
                    },
                    {
                        type: 'element',
                        tagName: 'div',
                        properties: { className: ['code-body'] },
                        children: [node],
                    },
                ],
            };
        });
    };
}

function extractHeadings(contentHtml: string) {
    const headings: { level: number; text: string; id: string }[] = [];
    const headingRegex = /<h([23]) id="([^"]+)">([\s\S]*?)<\/h\1>/g;
    let match;

    while ((match = headingRegex.exec(contentHtml)) !== null) {
        const text = match[3].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        if (text) headings.push({ level: Number(match[1]), id: match[2], text });
    }

    return headings;
}

export function getSortedPostsData() {
    const filePaths = getAllFiles(notesDirectory);
    const allPostsData = filePaths.map((filePath) => {
        const relativePath = path.relative(notesDirectory, filePath);
        const slug = relativePath.replace(/\.md$/, '').split(path.sep);
        const id = slug.join('/');

        const fileContents = fs.readFileSync(filePath, 'utf8');
        const matterResult = matter(fileContents);
        const data = matterResult.data as RawPostMeta;

        return normalizePostMeta(id, slug, data, cleanLegacyMarkdown(matterResult.content));
    });

    // Filter out posts with feed: 'hide'
    const visiblePosts = allPostsData.filter(post => post.feed !== 'hide');

    // Sort posts by date
    return visiblePosts.sort((a, b) => {
        const dateA = parse(a.date, 'dd-MM-yyyy', new Date());
        const dateB = parse(b.date, 'dd-MM-yyyy', new Date());
        // If invalid, fallback to string comp or 0? 
        // Let's handle generic Date parsing if format fails
        const validA = isValid(dateA) ? dateA : new Date(a.date);
        const validB = isValid(dateB) ? dateB : new Date(b.date);

        if (validA < validB) {
            return 1;
        } else {
            return -1;
        }
    });
}

export async function getProfileData() {
    // Look for profile.md in _notes/Public/profile.md
    const fullPath = path.join(notesDirectory, 'Public', 'profile.md');

    if (!fs.existsSync(fullPath)) {
        console.warn('Profile not found at ' + fullPath);
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    // Clean Kramdown
    const cleanedContent = cleanLegacyMarkdown(fileContents);

    const matterResult = matter(cleanedContent);

    const processedContent = await remark()
        .use(remarkGfm)
        .use(remarkMath)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeKatex, { strict: 'ignore', trust: true, throwOnError: false })
        .use(rehypeHighlight)
        .use(rehypeSlug)
        .use(rehypeCodeChrome as any)
        .use(rehypeStringify)
        .process(matterResult.content);

    return {
        contentHtml: processedContent.toString(),
        ...matterResult.data
    };
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

    // Clean Kramdown syntax (e.g., {:toc}, {:#id}, * TOC)
    // 1. Remove {:...} lines (style/attr extensions)
    // 2. Remove * TOC block
    const cleanedContent = cleanLegacyMarkdown(fileContents);

    const matterResult = matter(cleanedContent);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(remarkGfm)
        .use(remarkMath)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeKatex, {
            strict: 'ignore',
            trust: true, // Allow specialized environments
            throwOnError: false,
            errorColor: '#cc0000'
        })
        .use(rehypeHighlight)
        .use(rehypeSlug)
        .use(rehypeCodeChrome as any)
        .use(rehypeStringify)
        .process(matterResult.content);

    const contentHtml = processedContent.toString();
    const id = slugArray.join('/');
    const post = normalizePostMeta(id, slugArray, matterResult.data as RawPostMeta, matterResult.content);

    return {
        ...post,
        contentHtml,
        headings: extractHeadings(contentHtml),
    } as PostData;
}

import { parse, isValid, format } from 'date-fns';

export const CATEGORIES = ['All', 'Research', 'Math', 'Notes', 'Essays', 'Reports'] as const;

export function categoryClass(category?: string) {
    const value = (category || 'Notes').toLowerCase();
    if (value === 'research') return 'cat-research';
    if (value === 'math') return 'cat-math';
    if (value === 'essays') return 'cat-essays';
    if (value === 'reports') return 'cat-reports';
    return 'cat-notes';
}

export function categoryColor(category: string) {
    if (category === 'Research') return 'var(--cat-research)';
    if (category === 'Math') return 'var(--cat-math)';
    if (category === 'Essays') return 'var(--cat-essays)';
    if (category === 'Reports') return 'var(--cat-reports)';
    if (category === 'Notes') return 'var(--cat-notes)';
    return 'var(--ink)';
}

export function parsePostDate(date: string) {
    const parsedLegacy = parse(date, 'dd-MM-yyyy', new Date());
    if (isValid(parsedLegacy)) return parsedLegacy;

    const parsedIso = new Date(date);
    return isValid(parsedIso) ? parsedIso : new Date(0);
}

export function formatPostDate(date: string) {
    const parsed = parsePostDate(date);
    if (parsed.getTime() === 0) return date;
    return format(parsed, 'MMM d, yyyy');
}

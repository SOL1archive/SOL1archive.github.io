import { HTMLAttributes, ReactNode } from 'react';
import styles from './GlassContainer.module.css';

interface GlassContainerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    blur?: number;
    opacity?: number;
}

export default function GlassContainer({
    children,
    className = '',
    style,
    ...props
}: GlassContainerProps) {
    return (
        <div
            className={`${styles.glass} ${className}`}
            style={style}
            {...props}
        >
            {children}
        </div>
    );
}

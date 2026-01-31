import { UserBadge } from '@/types';
import clsx from 'clsx';

interface BadgeProps {
    type: UserBadge | 'trust' | 'new' | 'featured';
    label?: string;
    icon?: string;
    className?: string;
}

const badgeConfig = {
    Member: {
        className: 'badge-member',
        icon: '🌱',
        defaultLabel: 'Member',
    },
    Contributor: {
        className: 'badge-contributor',
        icon: '⚡',
        defaultLabel: 'Contributor',
    },
    Maker: {
        className: 'badge-maker',
        icon: '🏆',
        defaultLabel: 'Maker',
    },
    Observer: {
        className: 'badge-observer',
        icon: '👁️',
        defaultLabel: 'Observer',
    },
    trust: {
        className: 'badge-trust',
        icon: '✓',
        defaultLabel: 'Verified',
    },
    new: {
        className: 'badge bg-accent/10 text-accent',
        icon: '✨',
        defaultLabel: 'New',
    },
    featured: {
        className: 'badge bg-secondary/10 text-secondary',
        icon: '⭐',
        defaultLabel: 'Featured',
    },
};

export default function Badge({ type, label, icon, className }: BadgeProps) {
    const config = badgeConfig[type as keyof typeof badgeConfig];

    if (!config) return null;

    return (
        <span className={clsx(config.className, className)}>
            <span>{icon || config.icon}</span>
            <span>{label || config.defaultLabel}</span>
        </span>
    );
}

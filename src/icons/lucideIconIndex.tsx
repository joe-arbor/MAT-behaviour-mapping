/**
 * Curated Lucide icon set for the design system showcase.
 * Icons are imported individually for tree-shaking. Add more from https://lucide.dev/icons/
 */
import type { LucideIcon } from 'lucide-react';
import {
  Accessibility,
  Activity,
  AlarmClock,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  AtSign,
  Award,
  Baby,
  Bell,
  Bookmark,
  Calendar,
  Check,
  ChevronDown,
  CircleAlert,
  Copy,
  Download,
  Eye,
  EyeOff,
  File,
  FileText,
  Heart,
  Home,
  Image,
  Info,
  Link,
  Lock,
  Mail,
  MessageCircle,
  Minus,
  Pencil,
  Plus,
  Search,
  Settings,
  Star,
  Trash2,
  TriangleAlert,
  Upload,
  User,
  Users,
  X,
  XCircle,
} from 'lucide-react';

export const LUCIDE_ICON_SIZES = [12, 16, 24, 36] as const;
export type LucideIconSize = (typeof LUCIDE_ICON_SIZES)[number];

const iconMap: Record<string, LucideIcon> = {
  Accessibility,
  Activity,
  AlarmClock,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  AtSign,
  Award,
  Baby,
  Bell,
  Bookmark,
  Calendar,
  Check,
  ChevronDown,
  CircleAlert,
  Copy,
  Download,
  Eye,
  EyeOff,
  File,
  FileText,
  Heart,
  Home,
  Image,
  Info,
  Link,
  Lock,
  Mail,
  MessageCircle,
  Minus,
  Pencil,
  Plus,
  Search,
  Settings,
  Star,
  Trash2,
  TriangleAlert,
  Upload,
  User,
  Users,
  X,
  XCircle,
};

export const lucideIconNames = Object.keys(iconMap).sort();

export function getLucideIcon(name: string): LucideIcon | undefined {
  return iconMap[name];
}

/** PascalCase icon name to kebab-case for search (e.g. MessageCircle -> message-circle) */
export function iconNameToKebab(name: string): string {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
}

/** All icon names with kebab-case for search indexing */
export const lucideIconSearchTerms = new Map(
  lucideIconNames.map((name) => [name.toLowerCase(), iconNameToKebab(name)])
);

export { iconMap as lucideIcons };

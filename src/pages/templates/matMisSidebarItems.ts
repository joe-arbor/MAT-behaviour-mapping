import {
  Home,
  Star,
  Bell,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import type { SidebarItemConfig } from '../../components/sidebar';

/**
 * MAT MIS primary sidebar (icon rail). Home links to the current MAT template; other actions are placeholders.
 */
export const matMisSidebarItems: SidebarItemConfig[] = [
  { id: 'home', label: 'Home', icon: Home, description: 'Go to MAT MIS home', href: '/templates/mat-mis' },
  { id: 'favourites', label: 'Favourites', icon: Star, description: 'Quick access to saved pages' },
  { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Check your personal alerts' },
  { id: 'help', label: 'Help & Learn with Arbor', icon: HelpCircle, description: 'Arbor HQ, Help Centre, and training resource' },
  { id: 'sign-out', label: 'Sign Out', icon: LogOut, description: 'Sign out of your account' },
];

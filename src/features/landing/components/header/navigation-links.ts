import { CheckCircle, ChevronDown, ShoppingCart, Siren } from 'lucide-react';

export const NAVIGATION_LINKS = [
   {
      to: '/',
      label: 'SOS',
      icon: Siren,
      className: 'text-orange-600',
   },
   {
      to: '/',
      label: 'Healthcare Services',
      icon: ChevronDown,
      className: '',
   },
   {
      to: '/',
      label: 'Offers',
      icon: CheckCircle,
      className: 'text-orange-600',
   },
   {
      to: '/',
      label: 'Cart',
      icon: ShoppingCart,
      className: '',
   },
] as const;

import { useState } from 'react';

import {
   Activity,
   AlertTriangle,
   Bed,
   Building,
   Calendar,
   ChevronDown,
   ChevronRight,
   Clipboard,
   CreditCard,
   FileText,
   Home,
   Phone,
   Pill,
   Settings,
   Stethoscope,
   UserCog,
   Users,
   Video,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
   Collapsible,
   CollapsibleContent,
   CollapsibleTrigger,
} from '@/shared/components/ui/collapsible';
import { useAuthStore } from '@/shared/lib/store';
import { cn } from '@/shared/lib/utils';

interface SidebarProps {
   isOpen: boolean;
   onClose: () => void;
}

interface NavItem {
   title: string;
   href: string;
   icon: React.ComponentType<{ className?: string }>;
   badge?: string;
   children?: NavItem[];
   roles: string[];
}

const navigationItems: NavItem[] = [
   {
      title: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      roles: ['patient', 'doctor', 'admin', 'pharmacy', 'accountant'],
   },
   {
      title: 'Appointments',
      href: '/appointments',
      icon: Calendar,
      roles: ['patient', 'doctor', 'admin'],
      children: [
         {
            title: 'My Appointments',
            href: '/appointments',
            icon: Calendar,
            roles: ['patient', 'doctor'],
         },
         {
            title: 'Schedule',
            href: '/appointments/schedule',
            icon: Calendar,
            roles: ['doctor', 'admin'],
         },
         {
            title: 'Calendar View',
            href: '/appointments/calendar',
            icon: Calendar,
            roles: ['doctor', 'admin'],
         },
      ],
   },
   {
      title: 'Patients',
      href: '/patients',
      icon: Users,
      roles: ['doctor', 'admin'],
      children: [
         {
            title: 'Patient List',
            href: '/patients',
            icon: Users,
            roles: ['doctor', 'admin'],
         },
         {
            title: 'Medical Records',
            href: '/patients/records',
            icon: FileText,
            roles: ['doctor', 'admin'],
         },
         {
            title: 'Patient Search',
            href: '/patients/search',
            icon: Users,
            roles: ['doctor', 'admin'],
         },
      ],
   },
   {
      title: 'Telemedicine',
      href: '/telemedicine',
      icon: Video,
      roles: ['patient', 'doctor'],
      children: [
         {
            title: 'Video Calls',
            href: '/telemedicine',
            icon: Video,
            roles: ['patient', 'doctor'],
         },
         {
            title: 'Consultations',
            href: '/telemedicine/consultations',
            icon: Stethoscope,
            roles: ['doctor'],
         },
      ],
   },
   {
      title: 'Prescriptions',
      href: '/prescriptions',
      icon: Pill,
      roles: ['patient', 'doctor', 'pharmacy'],
      children: [
         {
            title: 'My Prescriptions',
            href: '/prescriptions',
            icon: Pill,
            roles: ['patient'],
         },
         {
            title: 'Prescriptions',
            href: '/prescriptions',
            icon: Pill,
            roles: ['doctor'],
         },
         {
            title: 'E-Prescribe',
            href: '/prescriptions/create',
            icon: Pill,
            roles: ['doctor'],
         },
         {
            title: 'Pharmacy Queue',
            href: '/prescriptions/queue',
            icon: Pill,
            roles: ['pharmacy'],
         },
         {
            title: 'Inventory',
            href: '/prescriptions/inventory',
            icon: Pill,
            roles: ['pharmacy'],
         },
      ],
   },
   {
      title: 'Emergency',
      href: '/emergency',
      icon: AlertTriangle,
      roles: ['patient', 'doctor', 'admin'],
      badge: '!',
      children: [
         {
            title: 'SOS Alert',
            href: '/emergency',
            icon: Phone,
            roles: ['patient'],
         },
         {
            title: 'Emergency Center',
            href: '/emergency/center',
            icon: AlertTriangle,
            roles: ['doctor', 'admin'],
         },
         {
            title: 'Ambulance Tracking',
            href: '/emergency/ambulance',
            icon: Activity,
            roles: ['admin'],
         },
      ],
   },
   {
      title: 'Billing & Finance',
      href: '/billing',
      icon: CreditCard,
      roles: ['patient', 'accountant', 'admin'],
      children: [
         {
            title: 'My Bills',
            href: '/billing',
            icon: CreditCard,
            roles: ['patient'],
         },
         {
            title: 'Payments',
            href: '/billing/payments',
            icon: CreditCard,
            roles: ['patient', 'accountant'],
         },
         {
            title: 'Insurance Claims',
            href: '/billing/insurance',
            icon: FileText,
            roles: ['accountant', 'admin'],
         },
         {
            title: 'Financial Reports',
            href: '/billing/reports',
            icon: FileText,
            roles: ['accountant', 'admin'],
         },
      ],
   },
   {
      title: 'Hospital Management',
      href: '/hospital',
      icon: Building,
      roles: ['admin'],
      children: [
         {
            title: 'Departments',
            href: '/hospital/departments',
            icon: Building,
            roles: ['admin'],
         },
         {
            title: 'Bed Management',
            href: '/hospital/beds',
            icon: Bed,
            roles: ['admin'],
         },
         {
            title: 'Staff Management',
            href: '/hospital/staff',
            icon: UserCog,
            roles: ['admin'],
         },
         {
            title: 'Facilities',
            href: '/hospital/facilities',
            icon: Building,
            roles: ['admin'],
         },
      ],
   },
   {
      title: 'Reports & Analytics',
      href: '/reports',
      icon: Clipboard,
      roles: ['doctor', 'admin', 'accountant'],
      children: [
         {
            title: 'Clinical Reports',
            href: '/reports/clinical',
            icon: FileText,
            roles: ['doctor', 'admin'],
         },
         {
            title: 'Financial Reports',
            href: '/reports/financial',
            icon: CreditCard,
            roles: ['accountant', 'admin'],
         },
         {
            title: 'Operational Reports',
            href: '/reports/operational',
            icon: Activity,
            roles: ['admin'],
         },
      ],
   },
   {
      title: 'Settings',
      href: '/settings',
      icon: Settings,
      roles: ['patient', 'doctor', 'admin', 'pharmacy', 'accountant'],
   },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
   const { pathname } = useLocation();
   const { user } = useAuthStore();
   const [expandedItems, setExpandedItems] = useState<string[]>([]);

   const userRole = user?.role || 'patient';
   const filteredNavItems = navigationItems.filter((item) =>
      item.roles.includes(userRole)
   );

   const toggleExpanded = (title: string) => {
      setExpandedItems((prev) =>
         prev.includes(title)
            ? prev.filter((item) => item !== title)
            : [...prev, title]
      );
   };

   const isItemActive = (href: string) => {
      if (href === '/dashboard') return pathname === '/dashboard';
      return pathname.startsWith(href);
   };

   const NavItemComponent = ({
      item,
      level = 0,
   }: {
      item: NavItem;
      level?: number;
   }) => {
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandedItems.includes(item.title);
      const isActive = isItemActive(item.href);

      // Filter children based on user role
      const filteredChildren =
         item.children?.filter((child) => child.roles.includes(userRole)) || [];

      if (hasChildren && filteredChildren.length > 0) {
         return (
            <Collapsible
               open={isExpanded}
               onOpenChange={() => toggleExpanded(item.title)}
            >
               <CollapsibleTrigger asChild>
                  <Button
                     variant='ghost'
                     className={cn(
                        'h-auto w-full justify-between p-3 font-normal hover:bg-blue-50 hover:text-blue-700',
                        level > 0 && 'ml-4 w-auto',
                        isActive &&
                           'border-r-2 border-blue-600 bg-blue-50 text-blue-700'
                     )}
                  >
                     <div className='flex items-center space-x-3'>
                        <item.icon className='h-5 w-5' />
                        <span className='text-sm font-medium'>
                           {item.title}
                        </span>
                        {item.badge && (
                           <Badge variant='destructive' className='text-xs'>
                              {item.badge}
                           </Badge>
                        )}
                     </div>
                     {isExpanded ? (
                        <ChevronDown className='h-4 w-4' />
                     ) : (
                        <ChevronRight className='h-4 w-4' />
                     )}
                  </Button>
               </CollapsibleTrigger>
               <CollapsibleContent className='space-y-1'>
                  {filteredChildren.map((child) => (
                     <NavItemComponent
                        key={child.href}
                        item={child}
                        level={level + 1}
                     />
                  ))}
               </CollapsibleContent>
            </Collapsible>
         );
      }

      return (
         <Link to={item.href} onClick={onClose}>
            <Button
               variant='ghost'
               className={cn(
                  'h-auto w-full justify-start p-3 font-normal hover:bg-blue-50 hover:text-blue-700',
                  level > 0 && 'ml-4 w-auto text-sm',
                  isActive &&
                     'border-r-2 border-blue-600 bg-blue-50 text-blue-700'
               )}
            >
               <div className='flex items-center space-x-3'>
                  <item.icon className='h-5 w-5' />
                  <span className={cn('font-medium', level > 0 && 'text-sm')}>
                     {item.title}
                  </span>
                  {item.badge && (
                     <Badge variant='destructive' className='text-xs'>
                        {item.badge}
                     </Badge>
                  )}
               </div>
            </Button>
         </Link>
      );
   };

   return (
      <>
         {/* Mobile overlay */}
         {isOpen && (
            <div
               className='fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden'
               onClick={onClose}
            />
         )}

         {/* Sidebar */}
         <aside
            className={cn(
               'fixed left-0 top-0 z-50 h-screen w-64 transform border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:translate-x-0',
               isOpen ? 'translate-x-0' : '-translate-x-full'
            )}
         >
            <div className='flex h-full flex-col'>
               {/* Header */}
               <div className='border-b border-gray-200 p-4'>
                  <div className='flex items-center space-x-3'>
                     <div className='bg-gradient-medical flex h-10 w-10 items-center justify-center rounded-lg'>
                        <div className='flex h-6 w-6 items-center justify-center rounded-sm bg-white'>
                           <div className='h-4 w-4 rounded-full bg-primary'></div>
                        </div>
                     </div>
                     <div>
                        <h2 className='font-inter text-lg font-semibold text-gray-900'>
                           MediCare
                        </h2>
                        <p className='text-xs text-gray-500'>Hospital System</p>
                     </div>
                  </div>
               </div>

               {/* User info */}
               <div className='border-b border-blue-100 bg-blue-50 p-4'>
                  <div className='flex items-center space-x-3'>
                     <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white'>
                        {user?.profile.firstName?.[0]}
                        {user?.profile.lastName?.[0]}
                     </div>
                     <div className='min-w-0 flex-1'>
                        <p className='truncate text-sm font-medium text-gray-900'>
                           {user?.profile.firstName} {user?.profile.lastName}
                        </p>
                        <Badge
                           variant='secondary'
                           className='bg-blue-100 text-xs text-blue-800'
                        >
                           {user?.role?.toUpperCase()}
                        </Badge>
                     </div>
                  </div>
               </div>

               {/* Navigation */}
               <nav className='custom-scrollbar flex-1 space-y-1 overflow-y-auto p-4'>
                  {filteredNavItems.map((item) => (
                     <NavItemComponent key={item.href} item={item} />
                  ))}
               </nav>

               {/* Footer */}
               <div className='border-t border-gray-200 p-4'>
                  <div className='text-center text-xs text-gray-500'>
                     <p>© 2024 MediCare System</p>
                     <p>Version 1.0.0</p>
                  </div>
               </div>
            </div>
         </aside>
      </>
   );
}

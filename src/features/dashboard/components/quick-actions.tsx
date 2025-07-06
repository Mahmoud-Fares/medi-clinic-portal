import {
   AlertTriangle,
   Building,
   Calendar,
   ClipboardList,
   CreditCard,
   FileText,
   Phone,
   Pill,
   Stethoscope,
   Users,
   Video,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
import { useAuthStore } from '@/shared/lib/store';

interface QuickAction {
   title: string;
   description: string;
   icon: React.ComponentType<{ className?: string }>;
   href: string;
   color: string;
   roles: string[];
   priority?: 'high' | 'medium' | 'low';
}

const quickActions: QuickAction[] = [
   {
      title: 'Book Appointment',
      description: 'Schedule a new appointment with your doctor',
      icon: Calendar,
      href: '/appointments',
      color: 'bg-blue-500 hover:bg-blue-600',
      roles: ['patient'],
      priority: 'high',
   },
   {
      title: 'Start Video Call',
      description: 'Begin a telemedicine consultation',
      icon: Video,
      href: '/telemedicine',
      color: 'bg-green-500 hover:bg-green-600',
      roles: ['patient', 'doctor'],
      priority: 'high',
   },
   {
      title: 'Emergency SOS',
      description: 'Trigger emergency alert for immediate help',
      icon: Phone,
      href: '/emergency',
      color: 'bg-red-500 hover:bg-red-600',
      roles: ['patient'],
      priority: 'high',
   },
   {
      title: 'Create Prescription',
      description: 'Write and send electronic prescriptions',
      icon: Pill,
      href: '/prescriptions',
      color: 'bg-purple-500 hover:bg-purple-600',
      roles: ['doctor'],
      priority: 'high',
   },
   {
      title: 'Patient Records',
      description: 'Access and update medical records',
      icon: FileText,
      href: '/patients/records',
      color: 'bg-teal-500 hover:bg-teal-600',
      roles: ['doctor', 'admin'],
      priority: 'medium',
   },
   {
      title: 'View Schedule',
      description: 'Check your appointment schedule',
      icon: Calendar,
      href: '/appointments/calendar',
      color: 'bg-blue-500 hover:bg-blue-600',
      roles: ['doctor'],
      priority: 'medium',
   },
   {
      title: 'Process Payments',
      description: 'Handle billing and payment processing',
      icon: CreditCard,
      href: '/billing/payments',
      color: 'bg-emerald-500 hover:bg-emerald-600',
      roles: ['accountant'],
      priority: 'high',
   },
   {
      title: 'Pharmacy Queue',
      description: 'View and process prescription orders',
      icon: Pill,
      href: '/prescriptions',
      color: 'bg-orange-500 hover:bg-orange-600',
      roles: ['pharmacy'],
      priority: 'high',
   },
   {
      title: 'Manage Staff',
      description: 'Hospital staff and department management',
      icon: Users,
      href: '/hospital/staff',
      color: 'bg-indigo-500 hover:bg-indigo-600',
      roles: ['admin'],
      priority: 'medium',
   },
   {
      title: 'Emergency Center',
      description: 'Monitor active emergency situations',
      icon: AlertTriangle,
      href: '/emergency/center',
      color: 'bg-red-500 hover:bg-red-600',
      roles: ['admin', 'doctor'],
      priority: 'high',
   },
   {
      title: 'Bed Management',
      description: 'View and manage hospital bed availability',
      icon: Building,
      href: '/hospital/beds',
      color: 'bg-gray-500 hover:bg-gray-600',
      roles: ['admin'],
      priority: 'medium',
   },
   {
      title: 'Generate Reports',
      description: 'Create clinical and financial reports',
      icon: ClipboardList,
      href: '/billing/reports',
      color: 'bg-slate-500 hover:bg-slate-600',
      roles: ['admin', 'accountant', 'doctor'],
      priority: 'low',
   },
];

export function QuickActions() {
   const { user } = useAuthStore();
   const navigate = useNavigate();

   const userRole = user?.role || 'patient';
   const filteredActions = quickActions
      .filter((action) => action.roles.includes(userRole))
      .sort((a, b) => {
         const priorityOrder = { high: 3, medium: 2, low: 1 };
         return (
            priorityOrder[b.priority || 'low'] -
            priorityOrder[a.priority || 'low']
         );
      });

   const roleTitle = {
      patient: 'Patient Actions',
      doctor: 'Clinical Actions',
      admin: 'Administrative Actions',
      pharmacy: 'Pharmacy Actions',
      accountant: 'Financial Actions',
   };

   const handleActionClick = (href: string) => {
      console.log('🔗 QuickActions: Navigating to:', href);
      navigate(href, { viewTransition: true });
   };

   return (
      <Card>
         <CardHeader>
            <CardTitle className='flex items-center space-x-2'>
               <Stethoscope className='h-5 w-5 text-blue-600' />
               <span>
                  {roleTitle[userRole as keyof typeof roleTitle] ||
                     'Quick Actions'}
               </span>
            </CardTitle>
            <CardDescription>
               Frequently used actions for your role
            </CardDescription>
         </CardHeader>
         <CardContent>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
               {filteredActions.slice(0, 6).map((action, index) => {
                  const Icon = action.icon;
                  return (
                     <Button
                        key={index}
                        variant='outline'
                        className='group flex h-auto flex-col items-center space-y-2 p-4 transition-all duration-200 hover:shadow-md'
                        onClick={() => handleActionClick(action.href)}
                     >
                        <div
                           className={`rounded-lg p-3 text-white ${action.color} transition-transform duration-200 group-hover:scale-110`}
                        >
                           <Icon className='h-6 w-6' />
                        </div>
                        <div className='text-center'>
                           <div className='text-sm font-medium text-gray-900 transition-colors group-hover:text-blue-600'>
                              {action.title}
                           </div>
                           <div className='mt-1 text-xs text-gray-500'>
                              {action.description.length > 40
                                 ? `${action.description.substring(0, 40)}...`
                                 : action.description}
                           </div>
                        </div>
                     </Button>
                  );
               })}
            </div>
         </CardContent>
      </Card>
   );
}

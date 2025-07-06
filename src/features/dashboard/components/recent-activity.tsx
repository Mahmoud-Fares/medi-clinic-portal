import { formatDistanceToNow } from 'date-fns';
import {
   AlertTriangle,
   Calendar,
   Clock,
   CreditCard,
   FileText,
   Pill,
} from 'lucide-react';

import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from '@/shared/components/ui/avatar';
import { Badge } from '@/shared/components/ui/badge';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
import { useAuthStore } from '@/shared/lib/store';

interface Activity {
   id: string;
   type: 'appointment' | 'prescription' | 'billing' | 'emergency' | 'system';
   title: string;
   description: string;
   timestamp: Date;
   status: 'completed' | 'pending' | 'cancelled' | 'active';
   user?: {
      name: string;
      avatar?: string;
      role: string;
   };
   roles: string[];
}

const generateRecentActivities = (): Activity[] => [
   {
      id: '1',
      type: 'appointment',
      title: 'Appointment Completed',
      description: 'Consultation with Dr. Sarah Wilson',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      status: 'completed',
      user: {
         name: 'Dr. Sarah Wilson',
         avatar:
            'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
         role: 'Cardiologist',
      },
      roles: ['patient', 'doctor'],
   },
   {
      id: '2',
      type: 'prescription',
      title: 'Prescription Filled',
      description: 'Amoxicillin 500mg - Ready for pickup',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      status: 'completed',
      roles: ['patient', 'pharmacy'],
   },
   {
      id: '3',
      type: 'appointment',
      title: 'New Appointment',
      description: 'Video consultation scheduled for tomorrow',
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      status: 'pending',
      roles: ['patient', 'doctor'],
   },
   {
      id: '4',
      type: 'billing',
      title: 'Payment Processed',
      description: 'Invoice #INV-2024-001 - $250.00',
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      status: 'completed',
      roles: ['patient', 'accountant'],
   },
   {
      id: '5',
      type: 'emergency',
      title: 'Emergency Alert Resolved',
      description: 'Patient transport completed successfully',
      timestamp: new Date(Date.now() - 18000000), // 5 hours ago
      status: 'completed',
      user: {
         name: 'Emergency Team',
         role: 'Paramedics',
      },
      roles: ['admin', 'doctor'],
   },
   {
      id: '6',
      type: 'system',
      title: 'Lab Results Available',
      description: 'Blood work results uploaded to your records',
      timestamp: new Date(Date.now() - 21600000), // 6 hours ago
      status: 'active',
      roles: ['patient', 'doctor'],
   },
   {
      id: '7',
      type: 'prescription',
      title: 'Prescription Created',
      description: 'New prescription for Lisinopril 10mg',
      timestamp: new Date(Date.now() - 25200000), // 7 hours ago
      status: 'pending',
      user: {
         name: 'Dr. Michael Chen',
         avatar:
            'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
         role: 'Internal Medicine',
      },
      roles: ['patient', 'doctor', 'pharmacy'],
   },
];

export function RecentActivity() {
   const { user } = useAuthStore();

   const userRole = user?.role || 'patient';
   const activities = generateRecentActivities()
      .filter((activity) => activity.roles.includes(userRole))
      .slice(0, 8);

   const getActivityIcon = (type: string) => {
      const icons = {
         appointment: Calendar,
         prescription: Pill,
         billing: CreditCard,
         emergency: AlertTriangle,
         system: FileText,
      };
      const Icon = icons[type as keyof typeof icons] || FileText;
      return <Icon className='h-4 w-4' />;
   };

   const getActivityColor = (type: string) => {
      const colors = {
         appointment: 'text-blue-600 bg-blue-50',
         prescription: 'text-purple-600 bg-purple-50',
         billing: 'text-green-600 bg-green-50',
         emergency: 'text-red-600 bg-red-50',
         system: 'text-gray-600 bg-gray-50',
      };
      return colors[type as keyof typeof colors] || 'text-gray-600 bg-gray-50';
   };

   const getStatusBadge = (status: string) => {
      const variants = {
         completed: 'default',
         pending: 'secondary',
         cancelled: 'destructive',
         active: 'outline',
      };

      const colors = {
         completed: 'bg-green-100 text-green-800 hover:bg-green-100',
         pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
         cancelled: 'bg-red-100 text-red-800 hover:bg-red-100',
         active: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
      };

      return (
         <Badge
            variant={variants[status as keyof typeof variants] as any}
            className={`${colors[status as keyof typeof colors]} text-xs`}
         >
            {status.charAt(0).toUpperCase() + status.slice(1)}
         </Badge>
      );
   };

   return (
      <Card>
         <CardHeader>
            <CardTitle className='flex items-center space-x-2'>
               <Clock className='h-5 w-5 text-blue-600' />
               <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>
               Your latest activities and updates
            </CardDescription>
         </CardHeader>
         <CardContent>
            <div className='space-y-4'>
               {activities.map((activity) => (
                  <div
                     key={activity.id}
                     className='flex items-start space-x-4 rounded-lg p-3 transition-colors duration-200 hover:bg-gray-50'
                  >
                     <div
                        className={`rounded-lg p-2 ${getActivityColor(activity.type)}`}
                     >
                        {getActivityIcon(activity.type)}
                     </div>

                     <div className='min-w-0 flex-1'>
                        <div className='flex items-center justify-between'>
                           <h4 className='truncate text-sm font-medium text-gray-900'>
                              {activity.title}
                           </h4>
                           {getStatusBadge(activity.status)}
                        </div>

                        <p className='mt-1 text-sm text-gray-600'>
                           {activity.description}
                        </p>

                        <div className='mt-2 flex items-center justify-between'>
                           <div className='flex items-center space-x-2'>
                              {activity.user && (
                                 <>
                                    <Avatar className='h-6 w-6'>
                                       <AvatarImage
                                          src={activity.user.avatar}
                                          alt={activity.user.name}
                                       />
                                       <AvatarFallback className='text-xs'>
                                          {activity.user.name
                                             .split(' ')
                                             .map((n) => n[0])
                                             .join('')}
                                       </AvatarFallback>
                                    </Avatar>
                                    <span className='text-xs text-gray-500'>
                                       {activity.user.name} •{' '}
                                       {activity.user.role}
                                    </span>
                                 </>
                              )}
                           </div>
                           <span className='text-xs text-gray-500'>
                              {formatDistanceToNow(activity.timestamp, {
                                 addSuffix: true,
                              })}
                           </span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </CardContent>
      </Card>
   );
}

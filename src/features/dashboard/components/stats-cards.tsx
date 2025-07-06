import {
   Activity,
   AlertTriangle,
   Calendar,
   CheckCircle,
   Clock,
   DollarSign,
   Pill,
   TrendingDown,
   TrendingUp,
   Users,
} from 'lucide-react';

import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
import { useAuthStore } from '@/shared/lib/store';

interface StatCard {
   title: string;
   value: string;
   change: string;
   trend: 'up' | 'down' | 'neutral';
   icon: React.ComponentType<{ className?: string }>;
   color: string;
   roles: string[];
}

const statsData: StatCard[] = [
   {
      title: 'Total Appointments',
      value: '247',
      change: '+12.5%',
      trend: 'up',
      icon: Calendar,
      color: 'text-blue-600',
      roles: ['patient', 'doctor', 'admin'],
   },
   {
      title: 'Active Patients',
      value: '1,429',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'text-green-600',
      roles: ['doctor', 'admin'],
   },
   {
      title: 'Prescriptions',
      value: '89',
      change: '+3.1%',
      trend: 'up',
      icon: Pill,
      color: 'text-purple-600',
      roles: ['patient', 'doctor', 'pharmacy'],
   },
   {
      title: 'Revenue',
      value: '$54,290',
      change: '+15.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-emerald-600',
      roles: ['accountant', 'admin'],
   },
   {
      title: 'Emergency Alerts',
      value: '3',
      change: '-25.0%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-red-600',
      roles: ['admin', 'doctor'],
   },
   {
      title: 'Completion Rate',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-teal-600',
      roles: ['doctor', 'admin'],
   },
   {
      title: 'Avg. Wait Time',
      value: '12 min',
      change: '-8.5%',
      trend: 'down',
      icon: Clock,
      color: 'text-orange-600',
      roles: ['admin', 'doctor'],
   },
   {
      title: 'System Health',
      value: '99.8%',
      change: '0.0%',
      trend: 'neutral',
      icon: Activity,
      color: 'text-blue-600',
      roles: ['admin'],
   },
];

export function StatsCards() {
   const { user } = useAuthStore();

   const userRole = user?.role || 'patient';
   const filteredStats = statsData.filter((stat) =>
      stat.roles.includes(userRole)
   );

   const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
      switch (trend) {
         case 'up':
            return <TrendingUp className='h-4 w-4 text-green-600' />;
         case 'down':
            return <TrendingDown className='h-4 w-4 text-red-600' />;
         default:
            return <Activity className='h-4 w-4 text-gray-600' />;
      }
   };

   const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
      switch (trend) {
         case 'up':
            return 'text-green-600';
         case 'down':
            return 'text-red-600';
         default:
            return 'text-gray-600';
      }
   };

   return (
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
         {filteredStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
               <Card
                  key={index}
                  className='transition-shadow duration-200 hover:shadow-md'
               >
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                     <CardTitle className='text-sm font-medium text-gray-600'>
                        {stat.title}
                     </CardTitle>
                     <div className={`rounded-lg bg-gray-50 p-2 ${stat.color}`}>
                        <Icon className='h-4 w-4' />
                     </div>
                  </CardHeader>
                  <CardContent>
                     <div className='flex items-end justify-between'>
                        <div>
                           <div className='text-2xl font-bold text-gray-900'>
                              {stat.value}
                           </div>
                           <div className='mt-1 flex items-center space-x-1'>
                              {getTrendIcon(stat.trend)}
                              <span
                                 className={`text-sm font-medium ${getTrendColor(stat.trend)}`}
                              >
                                 {stat.change}
                              </span>
                              <span className='text-sm text-gray-500'>
                                 vs last month
                              </span>
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            );
         })}
      </div>
   );
}

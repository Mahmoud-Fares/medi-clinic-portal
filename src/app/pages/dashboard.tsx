import { useEffect, useState } from 'react';

import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Badge } from '@/shared/components/ui/badge';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
import {
   generateMockNotifications,
   useAppStore,
   useAuthStore,
} from '@/shared/lib/store';

import { QuickActions } from '@/features/dashboard/components/quick-actions';
import { RecentActivity } from '@/features/dashboard/components/recent-activity';
import { StatsCards } from '@/features/dashboard/components/stats-cards';

import { Header } from '@/app/layouts/components/header';
import { Sidebar } from '@/app/layouts/components/sidebar';

export default function DashboardPage() {
   const { user, isAuthenticated } = useAuthStore();
   const { notifications, addNotification } = useAppStore();
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      if (!isAuthenticated || !user) {
         console.log(
            '🔒 Dashboard: User not authenticated, redirecting to login'
         );
         navigate('/', { replace: true, viewTransition: true });
         return;
      }

      console.log('📊 Dashboard: Loading dashboard for:', user.role);

      // Initialize mock notifications if empty
      if (notifications.length === 0) {
         const mockNotifications = generateMockNotifications();
         mockNotifications.forEach((notification) => {
            addNotification(notification);
         });
      }
   }, [isAuthenticated, user, navigate, notifications.length, addNotification]);

   if (!isAuthenticated || !user) {
      return null; // Redirect is handled in useEffect
   }

   const getDashboardTitle = () => {
      const titles = {
         patient: 'Patient Portal',
         doctor: 'Clinical Dashboard',
         admin: 'Administrative Dashboard',
         pharmacy: 'Pharmacy Management',
         accountant: 'Financial Dashboard',
      };
      return titles[user.role as keyof typeof titles] || 'Dashboard';
   };

   const getWelcomeMessage = () => {
      const hour = new Date().getHours();
      const greeting =
         hour < 12
            ? 'Good morning'
            : hour < 18
              ? 'Good afternoon'
              : 'Good evening';
      return `${greeting}, ${user.profile.firstName}!`;
   };

   // Mock upcoming appointments for demo
   const upcomingAppointments = [
      {
         id: '1',
         title: 'Annual Checkup',
         doctor: 'Dr. Sarah Wilson',
         time: 'Today, 2:00 PM',
         type: 'in-person',
         location: 'Room 205, Cardiology Dept.',
      },
      {
         id: '2',
         title: 'Follow-up Consultation',
         doctor: 'Dr. Michael Chen',
         time: 'Tomorrow, 10:30 AM',
         type: 'video',
         location: 'Video Call',
      },
   ];

   return (
      <div className='flex min-h-screen bg-gray-50'>
         <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

         <div className=''>
            <Header onMenuClick={() => setSidebarOpen(true)} />

            <main className='space-y-6 p-6'>
               {/* Welcome Section */}
               <div className='rounded-lg bg-gradient-medical p-6 text-white'>
                  <div className='flex items-center justify-between'>
                     <div>
                        <h1 className='mb-2 font-inter text-2xl font-bold'>
                           {getWelcomeMessage()}
                        </h1>
                        <p className='mb-4 text-blue-100'>
                           Welcome to your {getDashboardTitle()}. Here's what's
                           happening today.
                        </p>
                        <div className='flex items-center space-x-4 text-sm text-blue-100'>
                           <div className='flex items-center space-x-1'>
                              <Clock className='h-4 w-4' />
                              <span>
                                 {new Date().toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                 })}
                              </span>
                           </div>
                           <div className='flex items-center space-x-1'>
                              <MapPin className='h-4 w-4' />
                              <span>General Hospital</span>
                           </div>
                        </div>
                     </div>
                     <div className='hidden md:block'>
                        <div className='flex h-24 w-24 items-center justify-center rounded-full bg-white bg-opacity-20'>
                           <User className='h-12 w-12 text-white' />
                        </div>
                     </div>
                  </div>
               </div>

               {/* Stats Cards */}
               <StatsCards />

               {/* Main Content Grid */}
               <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
                  {/* Left Column - Quick Actions */}
                  <div className='space-y-6 lg:col-span-2'>
                     <QuickActions />

                     {/* Upcoming Appointments (for patients and doctors) */}
                     {(user.role === 'patient' || user.role === 'doctor') && (
                        <Card>
                           <CardHeader>
                              <CardTitle className='flex items-center space-x-2'>
                                 <Calendar className='h-5 w-5 text-blue-600' />
                                 <span>Upcoming Appointments</span>
                              </CardTitle>
                              <CardDescription>
                                 Your scheduled appointments for the next few
                                 days
                              </CardDescription>
                           </CardHeader>
                           <CardContent>
                              <div className='space-y-4'>
                                 {upcomingAppointments.map((appointment) => (
                                    <div
                                       key={appointment.id}
                                       className='appointment-card'
                                    >
                                       <div className='flex items-start justify-between'>
                                          <div className='flex-1'>
                                             <h4 className='font-medium text-gray-900'>
                                                {appointment.title}
                                             </h4>
                                             <p className='mt-1 text-sm text-gray-600'>
                                                {user.role === 'patient'
                                                   ? `with ${appointment.doctor}`
                                                   : 'Patient: John Doe'}
                                             </p>
                                             <div className='mt-2 flex items-center space-x-4 text-sm text-gray-500'>
                                                <div className='flex items-center space-x-1'>
                                                   <Clock className='h-4 w-4' />
                                                   <span>
                                                      {appointment.time}
                                                   </span>
                                                </div>
                                                <div className='flex items-center space-x-1'>
                                                   <MapPin className='h-4 w-4' />
                                                   <span>
                                                      {appointment.location}
                                                   </span>
                                                </div>
                                             </div>
                                          </div>
                                          <Badge
                                             variant={
                                                appointment.type === 'video'
                                                   ? 'default'
                                                   : 'secondary'
                                             }
                                             className='ml-2'
                                          >
                                             {appointment.type === 'video'
                                                ? 'Video Call'
                                                : 'In-Person'}
                                          </Badge>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </CardContent>
                        </Card>
                     )}
                  </div>

                  {/* Right Column - Recent Activity */}
                  <div className='space-y-6'>
                     <RecentActivity />
                  </div>
               </div>
            </main>
         </div>
      </div>
   );
}

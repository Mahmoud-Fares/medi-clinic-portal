import { useEffect, useState } from 'react';

import {
   ArrowLeft,
   Calendar,
   ChevronLeft,
   ChevronRight,
   Edit,
   Eye,
   MapPin,
   Phone,
   Plus,
   Video,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
import { useAuthStore } from '@/shared/lib/store';

import { Header } from '@/app/layouts/components/header';
import { Sidebar } from '@/app/layouts/components/sidebar';

interface CalendarAppointment {
   id: string;
   patientId: string;
   patientName: string;
   patientAvatar?: string;
   type: 'in-person' | 'video' | 'phone';
   status:
      | 'scheduled'
      | 'confirmed'
      | 'in-progress'
      | 'completed'
      | 'cancelled'
      | 'no-show';
   startTime: Date;
   endTime: Date;
   duration: number;
   reason: string;
   notes?: string;
   roomNumber?: string;
   isUrgent: boolean;
}

export default function AppointmentCalendarPage() {
   const { user, isAuthenticated } = useAuthStore();
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [currentDate, setCurrentDate] = useState(new Date());
   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
   const navigate = useNavigate();

   useEffect(() => {
      if (!isAuthenticated || !user) {
         navigate('/');
         return;
      }
      if (user.role !== 'doctor' && user.role !== 'admin') {
         navigate('/dashboard');
         return;
      }
   }, [isAuthenticated, user, navigate]);

   if (
      !isAuthenticated ||
      !user ||
      (user.role !== 'doctor' && user.role !== 'admin')
   ) {
      return null;
   }

   // Mock appointments data
   const mockAppointments: CalendarAppointment[] = [
      {
         id: 'apt_1',
         patientId: 'patient_1',
         patientName: 'John Doe',
         patientAvatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
         type: 'in-person',
         status: 'scheduled',
         startTime: new Date(2024, 11, 15, 9, 0),
         endTime: new Date(2024, 11, 15, 9, 30),
         duration: 30,
         reason: 'Annual checkup',
         roomNumber: 'Room 205',
         isUrgent: false,
      },
      {
         id: 'apt_2',
         patientId: 'patient_2',
         patientName: 'Emily Johnson',
         patientAvatar:
            'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
         type: 'video',
         status: 'confirmed',
         startTime: new Date(2024, 11, 16, 10, 30),
         endTime: new Date(2024, 11, 16, 11, 15),
         duration: 45,
         reason: 'Follow-up consultation',
         isUrgent: false,
      },
      {
         id: 'apt_3',
         patientId: 'patient_3',
         patientName: 'Robert Smith',
         type: 'in-person',
         status: 'in-progress',
         startTime: new Date(2024, 11, 17, 14, 0),
         endTime: new Date(2024, 11, 17, 14, 30),
         duration: 30,
         reason: 'Urgent consultation',
         roomNumber: 'Room 301',
         isUrgent: true,
      },
      {
         id: 'apt_4',
         patientId: 'patient_4',
         patientName: 'Maria Garcia',
         type: 'phone',
         status: 'scheduled',
         startTime: new Date(2024, 11, 18, 15, 30),
         endTime: new Date(2024, 11, 18, 16, 0),
         duration: 30,
         reason: 'Prescription review',
         isUrgent: false,
      },
   ];

   const getStatusColor = (status: string) => {
      switch (status) {
         case 'scheduled':
            return 'bg-blue-100 text-blue-800';
         case 'confirmed':
            return 'bg-green-100 text-green-800';
         case 'in-progress':
            return 'bg-yellow-100 text-yellow-800';
         case 'completed':
            return 'bg-gray-100 text-gray-800';
         case 'cancelled':
            return 'bg-red-100 text-red-800';
         case 'no-show':
            return 'bg-orange-100 text-orange-800';
         default:
            return 'bg-gray-100 text-gray-800';
      }
   };

   const getTypeIcon = (type: string) => {
      switch (type) {
         case 'video':
            return <Video className='h-3 w-3 text-green-600' />;
         case 'phone':
            return <Phone className='h-3 w-3 text-blue-600' />;
         default:
            return <MapPin className='h-3 w-3 text-purple-600' />;
      }
   };

   const navigateMonth = (direction: 'prev' | 'next') => {
      const newDate = new Date(currentDate);
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
      setCurrentDate(newDate);
   };

   const getDaysInMonth = () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();

      const days = [];

      // Add empty cells for days before the first day of the month
      for (let i = 0; i < startingDayOfWeek; i++) {
         days.push(null);
      }

      // Add days of the month
      for (let day = 1; day <= daysInMonth; day++) {
         days.push(new Date(year, month, day));
      }

      return days;
   };

   const getAppointmentsForDate = (date: Date | null) => {
      if (!date) return [];
      return mockAppointments.filter(
         (apt) => apt.startTime.toDateString() === date.toDateString()
      );
   };

   const handleViewAppointment = (appointmentId: string) => {
      console.log('Viewing appointment:', appointmentId);
      navigate(`/appointments/${appointmentId}`);
   };

   const handleEditAppointment = (appointmentId: string) => {
      console.log('Editing appointment:', appointmentId);
      navigate(`/appointments/${appointmentId}/edit`);
   };

   const handleNewAppointment = () => {
      navigate('/appointments/new');
   };

   const days = getDaysInMonth();
   const selectedDateAppointments = getAppointmentsForDate(selectedDate);

   return (
      <div className='flex min-h-screen bg-gray-50'>
         <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

         <div className='w-full'>
            <Header onMenuClick={() => setSidebarOpen(true)} />

            <main className='space-y-6 p-6'>
               {/* Page Header */}
               <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                     <Link to='/appointments/schedule'>
                        <Button variant='outline' size='sm'>
                           <ArrowLeft className='mr-2 h-4 w-4' />
                           Back to Schedule
                        </Button>
                     </Link>
                     <div>
                        <h1 className='font-inter text-2xl font-bold text-gray-900'>
                           Calendar View
                        </h1>
                        <p className='mt-1 text-gray-600'>
                           Monthly overview of appointments and availability
                        </p>
                     </div>
                  </div>
                  <Button onClick={handleNewAppointment}>
                     <Plus className='mr-2 h-4 w-4' />
                     New Appointment
                  </Button>
               </div>

               <div className='grid grid-cols-1 gap-6 lg:grid-cols-4'>
                  {/* Calendar */}
                  <div className='lg:col-span-3'>
                     <Card>
                        <CardHeader>
                           <div className='flex items-center justify-between'>
                              <CardTitle className='text-xl'>
                                 {currentDate.toLocaleDateString('en-US', {
                                    month: 'long',
                                    year: 'numeric',
                                 })}
                              </CardTitle>
                              <div className='flex items-center space-x-2'>
                                 <Button
                                    variant='outline'
                                    size='sm'
                                    onClick={() => navigateMonth('prev')}
                                 >
                                    <ChevronLeft className='h-4 w-4' />
                                 </Button>
                                 <Button
                                    variant='outline'
                                    size='sm'
                                    onClick={() => setCurrentDate(new Date())}
                                 >
                                    Today
                                 </Button>
                                 <Button
                                    variant='outline'
                                    size='sm'
                                    onClick={() => navigateMonth('next')}
                                 >
                                    <ChevronRight className='h-4 w-4' />
                                 </Button>
                              </div>
                           </div>
                        </CardHeader>
                        <CardContent>
                           {/* Calendar Grid */}
                           <div className='mb-4 grid grid-cols-7 gap-1'>
                              {[
                                 'Sun',
                                 'Mon',
                                 'Tue',
                                 'Wed',
                                 'Thu',
                                 'Fri',
                                 'Sat',
                              ].map((day) => (
                                 <div
                                    key={day}
                                    className='p-2 text-center text-sm font-medium text-gray-500'
                                 >
                                    {day}
                                 </div>
                              ))}
                           </div>

                           <div className='grid grid-cols-7 gap-1'>
                              {days.map((day, index) => {
                                 const dayAppointments = day
                                    ? getAppointmentsForDate(day)
                                    : [];
                                 const isToday =
                                    day &&
                                    day.toDateString() ===
                                       new Date().toDateString();
                                 const isSelected =
                                    day &&
                                    selectedDate &&
                                    day.toDateString() ===
                                       selectedDate.toDateString();

                                 return (
                                    <div
                                       key={index}
                                       className={`min-h-24 cursor-pointer border border-gray-200 p-1 transition-colors hover:bg-blue-50 ${
                                          isToday
                                             ? 'border-blue-300 bg-blue-100'
                                             : ''
                                       } ${isSelected ? 'border-blue-400 bg-blue-200' : ''}`}
                                       onClick={() =>
                                          day && setSelectedDate(day)
                                       }
                                    >
                                       {day && (
                                          <>
                                             <div
                                                className={`mb-1 text-sm font-medium ${isToday ? 'text-blue-700' : 'text-gray-900'}`}
                                             >
                                                {day.getDate()}
                                             </div>
                                             <div className='space-y-1'>
                                                {dayAppointments
                                                   .slice(0, 2)
                                                   .map((apt) => (
                                                      <div
                                                         key={apt.id}
                                                         className={`truncate rounded p-1 text-xs ${getStatusColor(apt.status)}`}
                                                         title={`${apt.patientName} - ${apt.reason}`}
                                                      >
                                                         {apt.startTime.toLocaleTimeString(
                                                            'en-US',
                                                            {
                                                               hour: '2-digit',
                                                               minute:
                                                                  '2-digit',
                                                            }
                                                         )}{' '}
                                                         {apt.patientName}
                                                      </div>
                                                   ))}
                                                {dayAppointments.length > 2 && (
                                                   <div className='text-center text-xs text-gray-500'>
                                                      +
                                                      {dayAppointments.length -
                                                         2}{' '}
                                                      more
                                                   </div>
                                                )}
                                             </div>
                                          </>
                                       )}
                                    </div>
                                 );
                              })}
                           </div>
                        </CardContent>
                     </Card>
                  </div>

                  {/* Sidebar */}
                  <div className='space-y-6'>
                     {/* Selected Date Info */}
                     <Card>
                        <CardHeader>
                           <CardTitle className='text-lg'>
                              {selectedDate
                                 ? selectedDate.toLocaleDateString('en-US', {
                                      weekday: 'long',
                                      month: 'long',
                                      day: 'numeric',
                                   })
                                 : 'Select a Date'}
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           {selectedDate ? (
                              <div className='space-y-3'>
                                 <div className='rounded-lg bg-blue-50 p-3 text-center'>
                                    <p className='text-2xl font-bold text-blue-600'>
                                       {selectedDateAppointments.length}
                                    </p>
                                    <p className='text-sm text-gray-600'>
                                       Appointments
                                    </p>
                                 </div>

                                 {selectedDateAppointments.length > 0 ? (
                                    <div className='space-y-2'>
                                       {selectedDateAppointments.map((apt) => (
                                          <div
                                             key={apt.id}
                                             className='rounded-lg border p-3 hover:bg-gray-50'
                                          >
                                             <div className='mb-2 flex items-center justify-between'>
                                                <div className='flex items-center space-x-2'>
                                                   <Avatar className='h-6 w-6'>
                                                      <AvatarImage
                                                         src={apt.patientAvatar}
                                                         alt={apt.patientName}
                                                      />
                                                      <AvatarFallback className='text-xs'>
                                                         {apt.patientName
                                                            .split(' ')
                                                            .map((n) => n[0])
                                                            .join('')}
                                                      </AvatarFallback>
                                                   </Avatar>
                                                   <span className='text-sm font-medium'>
                                                      {apt.patientName}
                                                   </span>
                                                </div>
                                                {getTypeIcon(apt.type)}
                                             </div>

                                             <p className='mb-1 text-xs text-gray-600'>
                                                {apt.reason}
                                             </p>
                                             <p className='text-xs text-gray-500'>
                                                {apt.startTime.toLocaleTimeString(
                                                   'en-US',
                                                   {
                                                      hour: '2-digit',
                                                      minute: '2-digit',
                                                   }
                                                )}{' '}
                                                -
                                                {apt.endTime.toLocaleTimeString(
                                                   'en-US',
                                                   {
                                                      hour: '2-digit',
                                                      minute: '2-digit',
                                                   }
                                                )}
                                             </p>

                                             <div className='mt-2 flex space-x-1'>
                                                <Button
                                                   variant='ghost'
                                                   size='sm'
                                                   className='h-6 px-2'
                                                   onClick={() =>
                                                      handleViewAppointment(
                                                         apt.id
                                                      )
                                                   }
                                                >
                                                   <Eye className='h-3 w-3' />
                                                </Button>
                                                <Button
                                                   variant='ghost'
                                                   size='sm'
                                                   className='h-6 px-2'
                                                   onClick={() =>
                                                      handleEditAppointment(
                                                         apt.id
                                                      )
                                                   }
                                                >
                                                   <Edit className='h-3 w-3' />
                                                </Button>
                                             </div>
                                          </div>
                                       ))}
                                    </div>
                                 ) : (
                                    <div className='py-4 text-center'>
                                       <Calendar className='mx-auto mb-2 h-8 w-8 text-gray-400' />
                                       <p className='text-sm text-gray-500'>
                                          No appointments scheduled
                                       </p>
                                       <Button
                                          size='sm'
                                          className='mt-2'
                                          onClick={handleNewAppointment}
                                       >
                                          <Plus className='mr-1 h-3 w-3' />
                                          Add Appointment
                                       </Button>
                                    </div>
                                 )}
                              </div>
                           ) : (
                              <div className='py-8 text-center'>
                                 <Calendar className='mx-auto mb-3 h-12 w-12 text-gray-400' />
                                 <p className='text-sm text-gray-500'>
                                    Click on a date to view appointments
                                 </p>
                              </div>
                           )}
                        </CardContent>
                     </Card>

                     {/* Quick Stats */}
                     <Card>
                        <CardHeader>
                           <CardTitle className='text-lg'>This Month</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className='space-y-3'>
                              <div className='flex justify-between'>
                                 <span className='text-sm text-gray-600'>
                                    Total Appointments
                                 </span>
                                 <span className='font-medium'>
                                    {mockAppointments.length}
                                 </span>
                              </div>
                              <div className='flex justify-between'>
                                 <span className='text-sm text-gray-600'>
                                    Completed
                                 </span>
                                 <span className='font-medium text-green-600'>
                                    {
                                       mockAppointments.filter(
                                          (a) => a.status === 'completed'
                                       ).length
                                    }
                                 </span>
                              </div>
                              <div className='flex justify-between'>
                                 <span className='text-sm text-gray-600'>
                                    Scheduled
                                 </span>
                                 <span className='font-medium text-blue-600'>
                                    {
                                       mockAppointments.filter(
                                          (a) => a.status === 'scheduled'
                                       ).length
                                    }
                                 </span>
                              </div>
                              <div className='flex justify-between'>
                                 <span className='text-sm text-gray-600'>
                                    Urgent
                                 </span>
                                 <span className='font-medium text-red-600'>
                                    {
                                       mockAppointments.filter(
                                          (a) => a.isUrgent
                                       ).length
                                    }
                                 </span>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  </div>
               </div>
            </main>
         </div>
      </div>
   );
}

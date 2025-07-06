import { useEffect, useState } from 'react';

import {
   AlertTriangle,
   ArrowLeft,
   Calendar,
   CheckCircle,
   Edit,
   FileText,
   MapPin,
   Phone,
   User,
   Video,
   X,
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from '@/shared/components/ui/avatar';
import { Badge } from '@/shared/components/ui/badge';
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

interface AppointmentDetail {
   id: string;
   patientId: string;
   patientName: string;
   patientEmail: string;
   patientPhone: string;
   patientAvatar?: string;
   doctorName: string;
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
   createdAt: Date;
   updatedAt: Date;
}

export default function AppointmentDetailPage() {
   const { id } = useParams();

   const { user, isAuthenticated } = useAuthStore();
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [appointment, setAppointment] = useState<AppointmentDetail | null>(
      null
   );
   const navigate = useNavigate();

   useEffect(() => {
      if (!isAuthenticated || !user) {
         navigate('/');
         return;
      }

      // Load appointment data
      const loadAppointment = async () => {
         setIsLoading(true);

         // Simulate API call delay
         await new Promise((resolve) => setTimeout(resolve, 1000));

         // Mock appointment data based on appointmentId
         const mockAppointment: AppointmentDetail = {
            id: id!,
            patientId: 'patient_1',
            patientName: 'John Doe',
            patientEmail: 'john.doe@email.com',
            patientPhone: '+1-555-0123',
            patientAvatar:
               'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            doctorName: 'Dr. Sarah Wilson',
            type: 'in-person',
            status: 'scheduled',
            startTime: new Date(Date.now() + 86400000), // Tomorrow
            endTime: new Date(Date.now() + 86400000 + 1800000), // Tomorrow + 30 minutes
            duration: 30,
            reason: 'Annual checkup and health assessment',
            notes: 'Patient has been experiencing mild fatigue. Requesting comprehensive blood work.',
            roomNumber: 'Room 205',
            isUrgent: false,
            createdAt: new Date(Date.now() - 172800000), // 2 days ago
            updatedAt: new Date(Date.now() - 86400000), // 1 day ago
         };

         setAppointment(mockAppointment);
         setIsLoading(false);
      };

      loadAppointment();
   }, [isAuthenticated, user, navigate, id]);

   if (!isAuthenticated || !user) {
      return null;
   }

   const getStatusColor = (status: string) => {
      switch (status) {
         case 'scheduled':
            return 'bg-blue-100 text-blue-800 border-blue-200';
         case 'confirmed':
            return 'bg-green-100 text-green-800 border-green-200';
         case 'in-progress':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
         case 'completed':
            return 'bg-gray-100 text-gray-800 border-gray-200';
         case 'cancelled':
            return 'bg-red-100 text-red-800 border-red-200';
         case 'no-show':
            return 'bg-orange-100 text-orange-800 border-orange-200';
         default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
      }
   };

   const getTypeIcon = (type: string) => {
      switch (type) {
         case 'video':
            return <Video className='h-5 w-5 text-green-600' />;
         case 'phone':
            return <Phone className='h-5 w-5 text-blue-600' />;
         default:
            return <MapPin className='h-5 w-5 text-purple-600' />;
      }
   };

   const handleEditAppointment = () => {
      navigate(`/appointments/${id}/edit`);
   };

   const handleCancelAppointment = () => {
      if (confirm('Are you sure you want to cancel this appointment?')) {
         console.log('Cancelling appointment:', id);
         alert('Appointment cancelled successfully');
         navigate('/appointments/schedule');
      }
   };

   const handleStartAppointment = () => {
      console.log('Starting appointment:', id);
      if (appointment?.type === 'video') {
         navigate(`/telemedicine/room/${id}`);
      } else {
         alert('Appointment started');
      }
   };

   if (isLoading) {
      return (
         <div className='min-h-screen bg-gray-50'>
            <Sidebar
               isOpen={sidebarOpen}
               onClose={() => setSidebarOpen(false)}
            />

            <div className='w-full'>
               <Header onMenuClick={() => setSidebarOpen(true)} />

               <main className='p-6'>
                  <div className='flex min-h-96 items-center justify-center'>
                     <div className='text-center'>
                        <div className='mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600'></div>
                        <p className='text-gray-600'>
                           Loading appointment details...
                        </p>
                     </div>
                  </div>
               </main>
            </div>
         </div>
      );
   }

   if (!appointment) {
      return (
         <div className='min-h-screen bg-gray-50'>
            <Sidebar
               isOpen={sidebarOpen}
               onClose={() => setSidebarOpen(false)}
            />

            <div className='w-full'>
               <Header onMenuClick={() => setSidebarOpen(true)} />

               <main className='p-6'>
                  <div className='flex min-h-96 items-center justify-center'>
                     <div className='text-center'>
                        <Calendar className='mx-auto mb-4 h-16 w-16 text-gray-400' />
                        <h2 className='mb-2 text-xl font-semibold text-gray-900'>
                           Appointment Not Found
                        </h2>
                        <p className='mb-4 text-gray-600'>
                           The requested appointment could not be found.
                        </p>
                        <Link to='/appointments/schedule'>
                           <Button variant='outline'>
                              <ArrowLeft className='mr-2 h-4 w-4' />
                              Back to Schedule
                           </Button>
                        </Link>
                     </div>
                  </div>
               </main>
            </div>
         </div>
      );
   }

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
                           Appointment Details
                        </h1>
                        <p className='mt-1 text-gray-600'>
                           View and manage appointment information
                        </p>
                     </div>
                  </div>
                  <div className='flex items-center space-x-3'>
                     {appointment.status === 'scheduled' && (
                        <Button
                           onClick={handleStartAppointment}
                           className='bg-green-600 hover:bg-green-700'
                        >
                           {appointment.type === 'video' ? (
                              <>
                                 <Video className='mr-2 h-4 w-4' />
                                 Start Video Call
                              </>
                           ) : (
                              <>
                                 <CheckCircle className='mr-2 h-4 w-4' />
                                 Start Appointment
                              </>
                           )}
                        </Button>
                     )}
                     <Button variant='outline' onClick={handleEditAppointment}>
                        <Edit className='mr-2 h-4 w-4' />
                        Edit
                     </Button>
                  </div>
               </div>

               <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
                  {/* Main Content */}
                  <div className='space-y-6 lg:col-span-2'>
                     {/* Appointment Overview */}
                     <Card>
                        <CardHeader>
                           <div className='flex items-center justify-between'>
                              <CardTitle className='flex items-center space-x-2'>
                                 {getTypeIcon(appointment.type)}
                                 <span>Appointment Overview</span>
                              </CardTitle>
                              <div className='flex items-center space-x-2'>
                                 <Badge
                                    className={getStatusColor(
                                       appointment.status
                                    )}
                                 >
                                    {appointment.status
                                       .charAt(0)
                                       .toUpperCase() +
                                       appointment.status.slice(1)}
                                 </Badge>
                                 {appointment.isUrgent && (
                                    <Badge variant='destructive'>
                                       <AlertTriangle className='mr-1 h-3 w-3' />
                                       URGENT
                                    </Badge>
                                 )}
                              </div>
                           </div>
                        </CardHeader>
                        <CardContent className='space-y-6'>
                           <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                              <div className='space-y-4'>
                                 <div>
                                    <p className='text-sm text-gray-500'>
                                       Date & Time
                                    </p>
                                    <p className='font-medium text-gray-900'>
                                       {appointment.startTime.toLocaleDateString(
                                          'en-US',
                                          {
                                             weekday: 'long',
                                             year: 'numeric',
                                             month: 'long',
                                             day: 'numeric',
                                          }
                                       )}
                                    </p>
                                    <p className='text-sm text-gray-600'>
                                       {appointment.startTime.toLocaleTimeString(
                                          'en-US',
                                          { hour: '2-digit', minute: '2-digit' }
                                       )}{' '}
                                       -
                                       {appointment.endTime.toLocaleTimeString(
                                          'en-US',
                                          { hour: '2-digit', minute: '2-digit' }
                                       )}
                                    </p>
                                 </div>

                                 <div>
                                    <p className='text-sm text-gray-500'>
                                       Duration
                                    </p>
                                    <p className='font-medium text-gray-900'>
                                       {appointment.duration} minutes
                                    </p>
                                 </div>

                                 <div>
                                    <p className='text-sm text-gray-500'>
                                       Type
                                    </p>
                                    <div className='flex items-center space-x-2'>
                                       {getTypeIcon(appointment.type)}
                                       <span className='font-medium capitalize text-gray-900'>
                                          {appointment.type.replace('-', ' ')}
                                       </span>
                                    </div>
                                 </div>
                              </div>

                              <div className='space-y-4'>
                                 <div>
                                    <p className='text-sm text-gray-500'>
                                       Doctor
                                    </p>
                                    <p className='font-medium text-gray-900'>
                                       {appointment.doctorName}
                                    </p>
                                 </div>

                                 {appointment.roomNumber && (
                                    <div>
                                       <p className='text-sm text-gray-500'>
                                          Location
                                       </p>
                                       <p className='font-medium text-gray-900'>
                                          {appointment.roomNumber}
                                       </p>
                                    </div>
                                 )}

                                 <div>
                                    <p className='text-sm text-gray-500'>
                                       Created
                                    </p>
                                    <p className='font-medium text-gray-900'>
                                       {appointment.createdAt.toLocaleDateString()}
                                    </p>
                                 </div>
                              </div>
                           </div>

                           <div>
                              <p className='mb-2 text-sm text-gray-500'>
                                 Reason for Visit
                              </p>
                              <p className='font-medium text-gray-900'>
                                 {appointment.reason}
                              </p>
                           </div>

                           {appointment.notes && (
                              <div>
                                 <p className='mb-2 text-sm text-gray-500'>
                                    Additional Notes
                                 </p>
                                 <div className='rounded-lg border border-blue-200 bg-blue-50 p-3'>
                                    <p className='text-blue-900'>
                                       {appointment.notes}
                                    </p>
                                 </div>
                              </div>
                           )}
                        </CardContent>
                     </Card>

                     {/* Patient Information */}
                     <Card>
                        <CardHeader>
                           <CardTitle className='flex items-center space-x-2'>
                              <User className='h-5 w-5 text-green-600' />
                              <span>Patient Information</span>
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className='flex items-start space-x-4'>
                              <Avatar className='h-16 w-16'>
                                 <AvatarImage
                                    src={appointment.patientAvatar}
                                    alt={appointment.patientName}
                                 />
                                 <AvatarFallback className='text-lg'>
                                    {appointment.patientName
                                       .split(' ')
                                       .map((n) => n[0])
                                       .join('')}
                                 </AvatarFallback>
                              </Avatar>

                              <div className='flex-1'>
                                 <h3 className='mb-2 text-lg font-semibold text-gray-900'>
                                    {appointment.patientName}
                                 </h3>

                                 <div className='grid grid-cols-1 gap-4 text-sm md:grid-cols-2'>
                                    <div>
                                       <p className='text-gray-500'>Email</p>
                                       <p className='font-medium text-gray-900'>
                                          {appointment.patientEmail}
                                       </p>
                                    </div>
                                    <div>
                                       <p className='text-gray-500'>Phone</p>
                                       <p className='font-medium text-gray-900'>
                                          {appointment.patientPhone}
                                       </p>
                                    </div>
                                 </div>

                                 <div className='mt-4'>
                                    <Link
                                       to={`/patients/${appointment.patientId}`}
                                    >
                                       <Button variant='outline' size='sm'>
                                          <FileText className='mr-2 h-4 w-4' />
                                          View Patient Records
                                       </Button>
                                    </Link>
                                 </div>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  </div>

                  {/* Sidebar */}
                  <div className='space-y-6'>
                     {/* Quick Actions */}
                     <Card>
                        <CardHeader>
                           <CardTitle className='text-lg'>
                              Quick Actions
                           </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                           {appointment.status === 'scheduled' && (
                              <>
                                 <Button
                                    className='w-full justify-start'
                                    onClick={handleStartAppointment}
                                 >
                                    <CheckCircle className='mr-2 h-4 w-4' />
                                    Start Appointment
                                 </Button>
                                 <Button
                                    variant='outline'
                                    className='w-full justify-start'
                                    onClick={handleEditAppointment}
                                 >
                                    <Edit className='mr-2 h-4 w-4' />
                                    Edit Appointment
                                 </Button>
                              </>
                           )}

                           <Button
                              variant='outline'
                              className='w-full justify-start'
                           >
                              <Calendar className='mr-2 h-4 w-4' />
                              Reschedule
                           </Button>

                           <Button
                              variant='outline'
                              className='w-full justify-start'
                           >
                              <FileText className='mr-2 h-4 w-4' />
                              Add Notes
                           </Button>

                           {appointment.status !== 'cancelled' &&
                              appointment.status !== 'completed' && (
                                 <Button
                                    variant='outline'
                                    className='w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700'
                                    onClick={handleCancelAppointment}
                                 >
                                    <X className='mr-2 h-4 w-4' />
                                    Cancel Appointment
                                 </Button>
                              )}
                        </CardContent>
                     </Card>

                     {/* Appointment History */}
                     <Card>
                        <CardHeader>
                           <CardTitle className='text-lg'>
                              Recent Activity
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className='space-y-3'>
                              <div className='flex items-start space-x-3'>
                                 <div className='mt-2 h-2 w-2 rounded-full bg-blue-600'></div>
                                 <div>
                                    <p className='text-sm font-medium text-gray-900'>
                                       Appointment scheduled
                                    </p>
                                    <p className='text-xs text-gray-500'>
                                       {appointment.createdAt.toLocaleDateString()}
                                    </p>
                                 </div>
                              </div>

                              <div className='flex items-start space-x-3'>
                                 <div className='mt-2 h-2 w-2 rounded-full bg-green-600'></div>
                                 <div>
                                    <p className='text-sm font-medium text-gray-900'>
                                       Patient confirmed
                                    </p>
                                    <p className='text-xs text-gray-500'>
                                       {appointment.updatedAt.toLocaleDateString()}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </CardContent>
                     </Card>

                     {/* Contact Information */}
                     <Card>
                        <CardHeader>
                           <CardTitle className='text-lg'>
                              Contact Patient
                           </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                           <Button
                              variant='outline'
                              className='w-full justify-start'
                           >
                              <Phone className='mr-2 h-4 w-4' />
                              Call Patient
                           </Button>

                           <Button
                              variant='outline'
                              className='w-full justify-start'
                           >
                              <FileText className='mr-2 h-4 w-4' />
                              Send Message
                           </Button>
                        </CardContent>
                     </Card>
                  </div>
               </div>
            </main>
         </div>
      </div>
   );
}

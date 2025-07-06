import { useEffect, useState } from 'react';

import {
   AlertCircle,
   Calendar,
   CheckCircle,
   Clock,
   Edit,
   Eye,
   Filter,
   MapPin,
   Phone,
   Plus,
   Search,
   User,
   Video,
   X,
   XCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from '@/shared/components/ui/tabs';
import { useAuthStore } from '@/shared/lib/store';
import { Appointment, AppointmentStatus } from '@/shared/types';

import { Header } from '@/app/layouts/components/header';
import { Sidebar } from '@/app/layouts/components/sidebar';

export default function AppointmentsPage() {
   const { user, isAuthenticated } = useAuthStore();
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedStatus, setSelectedStatus] = useState<
      AppointmentStatus | 'all'
   >('all');
   const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
   const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
   const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
   const [selectedAppointment, setSelectedAppointment] =
      useState<Appointment | null>(null);
   const [bookingForm, setBookingForm] = useState({
      type: 'in-person' as 'in-person' | 'video' | 'phone',
      reason: '',
      preferredDate: '',
      preferredTime: '',
      notes: '',
   });
   const [rescheduleForm, setRescheduleForm] = useState({
      newDate: '',
      newTime: '',
      reason: '',
   });
   const navigate = useNavigate();

   useEffect(() => {
      if (!isAuthenticated || !user) {
         navigate('/');
         return;
      }
   }, [isAuthenticated, user, navigate]);

   if (!isAuthenticated || !user) {
      return null;
   }

   // Mock appointments data
   const mockAppointments: Appointment[] = [
      {
         id: 'apt_1',
         patientId: 'patient_1',
         doctorId: 'doctor_1',
         hospitalId: 'hospital_1',
         type: 'in-person',
         status: 'scheduled',
         scheduledTime: new Date(Date.now() + 86400000), // Tomorrow
         duration: 30,
         reason: 'Annual checkup',
         chiefComplaint: 'Routine physical examination',
         roomNumber: 'Room 205',
         followUpRequired: false,
         createdAt: new Date(),
         updatedAt: new Date(),
      },
      {
         id: 'apt_2',
         patientId: 'patient_1',
         doctorId: 'doctor_2',
         hospitalId: 'hospital_1',
         type: 'video',
         status: 'scheduled',
         scheduledTime: new Date(Date.now() + 172800000), // Day after tomorrow
         duration: 45,
         reason: 'Follow-up consultation',
         chiefComplaint: 'Blood pressure monitoring',
         followUpRequired: true,
         createdAt: new Date(),
         updatedAt: new Date(),
      },
      {
         id: 'apt_3',
         patientId: 'patient_1',
         doctorId: 'doctor_1',
         hospitalId: 'hospital_1',
         type: 'in-person',
         status: 'completed',
         scheduledTime: new Date(Date.now() - 86400000), // Yesterday
         duration: 30,
         reason: 'Consultation',
         chiefComplaint: 'Headache and fatigue',
         roomNumber: 'Room 102',
         followUpRequired: false,
         createdAt: new Date(),
         updatedAt: new Date(),
      },
   ];

   const getStatusIcon = (status: AppointmentStatus) => {
      switch (status) {
         case 'completed':
            return <CheckCircle className='h-4 w-4 text-green-600' />;
         case 'cancelled':
            return <XCircle className='h-4 w-4 text-red-600' />;
         case 'in-progress':
            return <AlertCircle className='h-4 w-4 text-blue-600' />;
         default:
            return <Clock className='h-4 w-4 text-yellow-600' />;
      }
   };

   const getStatusColor = (status: AppointmentStatus) => {
      switch (status) {
         case 'completed':
            return 'bg-green-100 text-green-800 hover:bg-green-100';
         case 'cancelled':
            return 'bg-red-100 text-red-800 hover:bg-red-100';
         case 'in-progress':
            return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
         case 'no-show':
            return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
         default:
            return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      }
   };

   const getTypeIcon = (type: string) => {
      switch (type) {
         case 'video':
            return <Video className='h-4 w-4 text-blue-600' />;
         case 'phone':
            return <Phone className='h-4 w-4 text-green-600' />;
         default:
            return <User className='h-4 w-4 text-gray-600' />;
      }
   };

   const handleBookAppointment = () => {
      setIsBookingDialogOpen(true);
   };

   const handleBookingSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Booking appointment:', bookingForm);

      // Here you would typically send the data to your API
      // For now, we'll just show a success message and close the dialog
      alert(
         'Appointment request submitted successfully! You will receive a confirmation shortly.'
      );

      // Reset form and close dialog
      setBookingForm({
         type: 'in-person',
         reason: '',
         preferredDate: '',
         preferredTime: '',
         notes: '',
      });
      setIsBookingDialogOpen(false);
   };

   const handleJoinVideoCall = (appointmentId: string) => {
      console.log('Joining video call for appointment:', appointmentId);
      // Navigate to telemedicine page
      navigate('/telemedicine');
   };

   const handleReschedule = (appointment: Appointment) => {
      console.log('Rescheduling appointment:', appointment.id);
      setSelectedAppointment(appointment);
      setRescheduleForm({
         newDate: '',
         newTime: '',
         reason: '',
      });
      setIsRescheduleDialogOpen(true);
   };

   const handleRescheduleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log(
         'Rescheduling appointment:',
         selectedAppointment?.id,
         rescheduleForm
      );

      // Here you would typically send the data to your API
      alert(
         'Appointment rescheduled successfully! You will receive a confirmation shortly.'
      );

      // Reset form and close dialog
      setRescheduleForm({
         newDate: '',
         newTime: '',
         reason: '',
      });
      setIsRescheduleDialogOpen(false);
      setSelectedAppointment(null);
   };

   const handleViewDetails = (appointment: Appointment) => {
      console.log('Viewing appointment details:', appointment.id);
      setSelectedAppointment(appointment);
      setIsDetailsDialogOpen(true);
   };

   const filteredAppointments = mockAppointments.filter((appointment) => {
      const matchesSearch =
         appointment.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
         appointment.chiefComplaint
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase());
      const matchesStatus =
         selectedStatus === 'all' || appointment.status === selectedStatus;
      return matchesSearch && matchesStatus;
   });

   const upcomingAppointments = filteredAppointments.filter(
      (apt) => apt.status === 'scheduled' && apt.scheduledTime > new Date()
   );

   const pastAppointments = filteredAppointments.filter(
      (apt) => apt.status === 'completed' || apt.scheduledTime < new Date()
   );

   const AppointmentCard = ({ appointment }: { appointment: Appointment }) => (
      <Card className='transition-shadow duration-200 hover:shadow-md'>
         <CardContent className='p-6'>
            <div className='flex items-start justify-between'>
               <div className='flex-1'>
                  <div className='mb-2 flex items-center space-x-2'>
                     {getTypeIcon(appointment.type)}
                     <h3 className='font-semibold text-gray-900'>
                        {appointment.reason}
                     </h3>
                     <Badge className={getStatusColor(appointment.status)}>
                        {getStatusIcon(appointment.status)}
                        <span className='ml-1'>
                           {appointment.status.charAt(0).toUpperCase() +
                              appointment.status.slice(1)}
                        </span>
                     </Badge>
                  </div>

                  <p className='mb-3 text-sm text-gray-600'>
                     {appointment.chiefComplaint}
                  </p>

                  <div className='grid grid-cols-1 gap-3 text-sm text-gray-500 sm:grid-cols-2'>
                     <div className='flex items-center space-x-2'>
                        <Calendar className='h-4 w-4' />
                        <span>
                           {appointment.scheduledTime.toLocaleDateString()}
                        </span>
                     </div>
                     <div className='flex items-center space-x-2'>
                        <Clock className='h-4 w-4' />
                        <span>
                           {appointment.scheduledTime.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                           })}
                        </span>
                     </div>
                     {appointment.roomNumber && (
                        <div className='flex items-center space-x-2'>
                           <MapPin className='h-4 w-4' />
                           <span>{appointment.roomNumber}</span>
                        </div>
                     )}
                     <div className='flex items-center space-x-2'>
                        <Clock className='h-4 w-4' />
                        <span>{appointment.duration} minutes</span>
                     </div>
                  </div>
               </div>

               <div className='ml-4 flex flex-col space-y-2'>
                  {appointment.status === 'scheduled' &&
                     appointment.type === 'video' && (
                        <Button
                           size='sm'
                           className='bg-green-600 hover:bg-green-700'
                           onClick={() => handleJoinVideoCall(appointment.id)}
                        >
                           <Video className='mr-1 h-4 w-4' />
                           Join Call
                        </Button>
                     )}
                  {appointment.status === 'scheduled' && (
                     <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleReschedule(appointment)}
                     >
                        <Edit className='mr-1 h-4 w-4' />
                        Reschedule
                     </Button>
                  )}
                  <Button
                     variant='outline'
                     size='sm'
                     onClick={() => handleViewDetails(appointment)}
                  >
                     <Eye className='mr-1 h-4 w-4' />
                     View Details
                  </Button>
               </div>
            </div>
         </CardContent>
      </Card>
   );

   return (
      <div className='flex min-h-screen bg-gray-50'>
         <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

         <div className='w-full'>
            <Header onMenuClick={() => setSidebarOpen(true)} />

            <main className='space-y-6 p-6'>
               {/* Page Header */}
               <div className='flex items-center justify-between'>
                  <div>
                     <h1 className='font-inter text-2xl font-bold text-gray-900'>
                        {user.role === 'patient'
                           ? 'My Appointments'
                           : 'Patient Appointments'}
                     </h1>
                     <p className='mt-1 text-gray-600'>
                        {user.role === 'patient'
                           ? 'Manage your scheduled appointments and consultations'
                           : 'View and manage patient appointments'}
                     </p>
                  </div>

                  {/* Book Appointment Dialog */}
                  <Dialog
                     open={isBookingDialogOpen}
                     onOpenChange={setIsBookingDialogOpen}
                  >
                     <DialogTrigger asChild>
                        <Button
                           className='flex items-center space-x-2'
                           onClick={handleBookAppointment}
                        >
                           <Plus className='h-4 w-4' />
                           <span>Book Appointment</span>
                        </Button>
                     </DialogTrigger>
                     <DialogContent className='max-w-md'>
                        <DialogHeader>
                           <DialogTitle>Book New Appointment</DialogTitle>
                           <DialogDescription>
                              Schedule a new appointment with your healthcare
                              provider
                           </DialogDescription>
                        </DialogHeader>

                        <form
                           onSubmit={handleBookingSubmit}
                           className='space-y-4'
                        >
                           <div className='space-y-2'>
                              <Label htmlFor='type'>Appointment Type</Label>
                              <select
                                 id='type'
                                 value={bookingForm.type}
                                 onChange={(e) =>
                                    setBookingForm((prev) => ({
                                       ...prev,
                                       type: e.target.value as any,
                                    }))
                                 }
                                 className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                                 required
                              >
                                 <option value='in-person'>
                                    In-Person Visit
                                 </option>
                                 <option value='video'>
                                    Video Consultation
                                 </option>
                                 <option value='phone'>
                                    Phone Consultation
                                 </option>
                              </select>
                           </div>

                           <div className='space-y-2'>
                              <Label htmlFor='reason'>Reason for Visit</Label>
                              <Input
                                 id='reason'
                                 value={bookingForm.reason}
                                 onChange={(e) =>
                                    setBookingForm((prev) => ({
                                       ...prev,
                                       reason: e.target.value,
                                    }))
                                 }
                                 placeholder='e.g., Annual checkup, Follow-up, Consultation'
                                 required
                              />
                           </div>

                           <div className='grid grid-cols-2 gap-4'>
                              <div className='space-y-2'>
                                 <Label htmlFor='preferredDate'>
                                    Preferred Date
                                 </Label>
                                 <Input
                                    id='preferredDate'
                                    type='date'
                                    value={bookingForm.preferredDate}
                                    onChange={(e) =>
                                       setBookingForm((prev) => ({
                                          ...prev,
                                          preferredDate: e.target.value,
                                       }))
                                    }
                                    min={new Date().toISOString().split('T')[0]}
                                    required
                                 />
                              </div>
                              <div className='space-y-2'>
                                 <Label htmlFor='preferredTime'>
                                    Preferred Time
                                 </Label>
                                 <Input
                                    id='preferredTime'
                                    type='time'
                                    value={bookingForm.preferredTime}
                                    onChange={(e) =>
                                       setBookingForm((prev) => ({
                                          ...prev,
                                          preferredTime: e.target.value,
                                       }))
                                    }
                                    required
                                 />
                              </div>
                           </div>

                           <div className='space-y-2'>
                              <Label htmlFor='notes'>
                                 Additional Notes (Optional)
                              </Label>
                              <textarea
                                 id='notes'
                                 value={bookingForm.notes}
                                 onChange={(e) =>
                                    setBookingForm((prev) => ({
                                       ...prev,
                                       notes: e.target.value,
                                    }))
                                 }
                                 placeholder='Any additional information or special requests...'
                                 className='w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                                 rows={3}
                              />
                           </div>

                           <div className='flex space-x-3 pt-4'>
                              <Button type='submit' className='flex-1'>
                                 Book Appointment
                              </Button>
                              <Button
                                 type='button'
                                 variant='outline'
                                 onClick={() => setIsBookingDialogOpen(false)}
                              >
                                 Cancel
                              </Button>
                           </div>
                        </form>
                     </DialogContent>
                  </Dialog>
               </div>

               {/* Search and Filters */}
               <Card>
                  <CardContent className='p-6'>
                     <div className='flex flex-col gap-4 sm:flex-row'>
                        <div className='relative flex-1'>
                           <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
                           <Input
                              placeholder='Search appointments...'
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className='pl-10'
                           />
                        </div>
                        <div className='flex items-center space-x-2'>
                           <Filter className='h-4 w-4 text-gray-400' />
                           <select
                              value={selectedStatus}
                              onChange={(e) =>
                                 setSelectedStatus(
                                    e.target.value as AppointmentStatus | 'all'
                                 )
                              }
                              className='rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                           >
                              <option value='all'>All Status</option>
                              <option value='scheduled'>Scheduled</option>
                              <option value='completed'>Completed</option>
                              <option value='cancelled'>Cancelled</option>
                              <option value='in-progress'>In Progress</option>
                           </select>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Appointments Tabs */}
               <Tabs defaultValue='upcoming' className='space-y-6'>
                  <TabsList className='grid w-full max-w-md grid-cols-2'>
                     <TabsTrigger value='upcoming'>
                        Upcoming ({upcomingAppointments.length})
                     </TabsTrigger>
                     <TabsTrigger value='past'>
                        Past ({pastAppointments.length})
                     </TabsTrigger>
                  </TabsList>

                  <TabsContent value='upcoming' className='space-y-4'>
                     {upcomingAppointments.length > 0 ? (
                        upcomingAppointments.map((appointment) => (
                           <AppointmentCard
                              key={appointment.id}
                              appointment={appointment}
                           />
                        ))
                     ) : (
                        <Card>
                           <CardContent className='p-12 text-center'>
                              <Calendar className='mx-auto mb-4 h-12 w-12 text-gray-400' />
                              <h3 className='mb-2 text-lg font-medium text-gray-900'>
                                 No upcoming appointments
                              </h3>
                              <p className='mb-4 text-gray-600'>
                                 You don't have any scheduled appointments at
                                 the moment.
                              </p>
                              <Button onClick={handleBookAppointment}>
                                 <Plus className='mr-2 h-4 w-4' />
                                 Book New Appointment
                              </Button>
                           </CardContent>
                        </Card>
                     )}
                  </TabsContent>

                  <TabsContent value='past' className='space-y-4'>
                     {pastAppointments.length > 0 ? (
                        pastAppointments.map((appointment) => (
                           <AppointmentCard
                              key={appointment.id}
                              appointment={appointment}
                           />
                        ))
                     ) : (
                        <Card>
                           <CardContent className='p-12 text-center'>
                              <Clock className='mx-auto mb-4 h-12 w-12 text-gray-400' />
                              <h3 className='mb-2 text-lg font-medium text-gray-900'>
                                 No past appointments
                              </h3>
                              <p className='text-gray-600'>
                                 Your appointment history will appear here.
                              </p>
                           </CardContent>
                        </Card>
                     )}
                  </TabsContent>
               </Tabs>

               {/* Appointment Details Dialog */}
               <Dialog
                  open={isDetailsDialogOpen}
                  onOpenChange={setIsDetailsDialogOpen}
               >
                  <DialogContent className='max-w-2xl'>
                     <DialogHeader>
                        <DialogTitle className='flex items-center justify-between'>
                           <span>Appointment Details</span>
                           <Button
                              variant='ghost'
                              size='sm'
                              onClick={() => setIsDetailsDialogOpen(false)}
                           >
                              <X className='h-4 w-4' />
                           </Button>
                        </DialogTitle>
                     </DialogHeader>

                     {selectedAppointment && (
                        <div className='space-y-6'>
                           <div className='grid grid-cols-2 gap-4'>
                              <div>
                                 <h3 className='mb-2 font-semibold'>
                                    Appointment Information
                                 </h3>
                                 <div className='space-y-2 text-sm'>
                                    <div className='flex justify-between'>
                                       <span className='text-gray-600'>
                                          Type:
                                       </span>
                                       <div className='flex items-center space-x-1'>
                                          {getTypeIcon(
                                             selectedAppointment.type
                                          )}
                                          <span className='capitalize'>
                                             {selectedAppointment.type}
                                          </span>
                                       </div>
                                    </div>
                                    <div className='flex justify-between'>
                                       <span className='text-gray-600'>
                                          Status:
                                       </span>
                                       <Badge
                                          className={getStatusColor(
                                             selectedAppointment.status
                                          )}
                                       >
                                          {selectedAppointment.status}
                                       </Badge>
                                    </div>
                                    <div className='flex justify-between'>
                                       <span className='text-gray-600'>
                                          Date:
                                       </span>
                                       <span>
                                          {selectedAppointment.scheduledTime.toLocaleDateString()}
                                       </span>
                                    </div>
                                    <div className='flex justify-between'>
                                       <span className='text-gray-600'>
                                          Time:
                                       </span>
                                       <span>
                                          {selectedAppointment.scheduledTime.toLocaleTimeString(
                                             [],
                                             {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                             }
                                          )}
                                       </span>
                                    </div>
                                    <div className='flex justify-between'>
                                       <span className='text-gray-600'>
                                          Duration:
                                       </span>
                                       <span>
                                          {selectedAppointment.duration} minutes
                                       </span>
                                    </div>
                                    {selectedAppointment.roomNumber && (
                                       <div className='flex justify-between'>
                                          <span className='text-gray-600'>
                                             Location:
                                          </span>
                                          <span>
                                             {selectedAppointment.roomNumber}
                                          </span>
                                       </div>
                                    )}
                                 </div>
                              </div>

                              <div>
                                 <h3 className='mb-2 font-semibold'>
                                    Medical Information
                                 </h3>
                                 <div className='space-y-2 text-sm'>
                                    <div>
                                       <span className='text-gray-600'>
                                          Reason:
                                       </span>
                                       <p className='font-medium'>
                                          {selectedAppointment.reason}
                                       </p>
                                    </div>
                                    {selectedAppointment.chiefComplaint && (
                                       <div>
                                          <span className='text-gray-600'>
                                             Chief Complaint:
                                          </span>
                                          <p className='font-medium'>
                                             {
                                                selectedAppointment.chiefComplaint
                                             }
                                          </p>
                                       </div>
                                    )}
                                    <div className='flex justify-between'>
                                       <span className='text-gray-600'>
                                          Follow-up Required:
                                       </span>
                                       <span>
                                          {selectedAppointment.followUpRequired
                                             ? 'Yes'
                                             : 'No'}
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           {selectedAppointment.notes && (
                              <div>
                                 <h3 className='mb-2 font-semibold'>Notes</h3>
                                 <p className='rounded-lg bg-gray-50 p-3 text-sm text-gray-700'>
                                    {selectedAppointment.notes}
                                 </p>
                              </div>
                           )}

                           <div className='flex space-x-3 border-t pt-4'>
                              {selectedAppointment.status === 'scheduled' &&
                                 selectedAppointment.type === 'video' && (
                                    <Button
                                       className='bg-green-600 hover:bg-green-700'
                                       onClick={() => {
                                          handleJoinVideoCall(
                                             selectedAppointment.id
                                          );
                                          setIsDetailsDialogOpen(false);
                                       }}
                                    >
                                       <Video className='mr-2 h-4 w-4' />
                                       Join Video Call
                                    </Button>
                                 )}
                              {selectedAppointment.status === 'scheduled' && (
                                 <Button
                                    variant='outline'
                                    onClick={() => {
                                       setIsDetailsDialogOpen(false);
                                       handleReschedule(selectedAppointment);
                                    }}
                                 >
                                    <Edit className='mr-2 h-4 w-4' />
                                    Reschedule
                                 </Button>
                              )}
                              <Button
                                 variant='outline'
                                 onClick={() => setIsDetailsDialogOpen(false)}
                              >
                                 Close
                              </Button>
                           </div>
                        </div>
                     )}
                  </DialogContent>
               </Dialog>

               {/* Reschedule Dialog */}
               <Dialog
                  open={isRescheduleDialogOpen}
                  onOpenChange={setIsRescheduleDialogOpen}
               >
                  <DialogContent className='max-w-md'>
                     <DialogHeader>
                        <DialogTitle>Reschedule Appointment</DialogTitle>
                        <DialogDescription>
                           Choose a new date and time for your appointment
                        </DialogDescription>
                     </DialogHeader>

                     <form
                        onSubmit={handleRescheduleSubmit}
                        className='space-y-4'
                     >
                        <div className='grid grid-cols-2 gap-4'>
                           <div className='space-y-2'>
                              <Label htmlFor='newDate'>New Date</Label>
                              <Input
                                 id='newDate'
                                 type='date'
                                 value={rescheduleForm.newDate}
                                 onChange={(e) =>
                                    setRescheduleForm((prev) => ({
                                       ...prev,
                                       newDate: e.target.value,
                                    }))
                                 }
                                 min={new Date().toISOString().split('T')[0]}
                                 required
                              />
                           </div>
                           <div className='space-y-2'>
                              <Label htmlFor='newTime'>New Time</Label>
                              <Input
                                 id='newTime'
                                 type='time'
                                 value={rescheduleForm.newTime}
                                 onChange={(e) =>
                                    setRescheduleForm((prev) => ({
                                       ...prev,
                                       newTime: e.target.value,
                                    }))
                                 }
                                 required
                              />
                           </div>
                        </div>

                        <div className='space-y-2'>
                           <Label htmlFor='rescheduleReason'>
                              Reason for Rescheduling (Optional)
                           </Label>
                           <textarea
                              id='rescheduleReason'
                              value={rescheduleForm.reason}
                              onChange={(e) =>
                                 setRescheduleForm((prev) => ({
                                    ...prev,
                                    reason: e.target.value,
                                 }))
                              }
                              placeholder='Please let us know why you need to reschedule...'
                              className='w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                              rows={3}
                           />
                        </div>

                        <div className='flex space-x-3 pt-4'>
                           <Button type='submit' className='flex-1'>
                              Reschedule Appointment
                           </Button>
                           <Button
                              type='button'
                              variant='outline'
                              onClick={() => {
                                 setIsRescheduleDialogOpen(false);
                                 setSelectedAppointment(null);
                              }}
                           >
                              Cancel
                           </Button>
                        </div>
                     </form>
                  </DialogContent>
               </Dialog>
            </main>
         </div>
      </div>
   );
}

import { useEffect, useState } from 'react';

import {
   ArrowLeft,
   Calendar,
   Clock,
   MapPin,
   Phone,
   Save,
   Search,
   User,
   Video,
   X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useAuthStore } from '@/shared/lib/store';

import { Header } from '@/app/layouts/components/header';
import { Sidebar } from '@/app/layouts/components/sidebar';

interface AppointmentForm {
   patientId: string;
   patientName: string;
   type: 'in-person' | 'video' | 'phone';
   date: string;
   time: string;
   duration: number;
   reason: string;
   notes: string;
   roomNumber: string;
   isUrgent: boolean;
}

interface Patient {
   id: string;
   name: string;
   email: string;
   phone: string;
   avatar?: string;
}

export default function NewAppointmentPage() {
   const { user, isAuthenticated } = useAuthStore();
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const [searchResults, setSearchResults] = useState<Patient[]>([]);
   const [isSearching, setIsSearching] = useState(false);
   const navigate = useNavigate();

   const [formData, setFormData] = useState<AppointmentForm>({
      patientId: '',
      patientName: '',
      type: 'in-person',
      date: '',
      time: '',
      duration: 30,
      reason: '',
      notes: '',
      roomNumber: '',
      isUrgent: false,
   });

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

   // Mock patients data
   const mockPatients: Patient[] = [
      {
         id: 'patient_1',
         name: 'John Doe',
         email: 'john.doe@email.com',
         phone: '+1-555-0123',
         avatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      },
      {
         id: 'patient_2',
         name: 'Emily Johnson',
         email: 'emily.johnson@email.com',
         phone: '+1-555-0124',
         avatar:
            'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      },
      {
         id: 'patient_3',
         name: 'Robert Smith',
         email: 'robert.smith@email.com',
         phone: '+1-555-0125',
         avatar:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      },
      {
         id: 'patient_4',
         name: 'Maria Garcia',
         email: 'maria.garcia@email.com',
         phone: '+1-555-0126',
         avatar:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      },
   ];

   const handlePatientSearch = async () => {
      if (!searchQuery.trim()) return;

      setIsSearching(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const results = mockPatients.filter(
         (patient) =>
            patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.email.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchResults(results);
      setIsSearching(false);
   };

   const handleSelectPatient = (patient: Patient) => {
      setFormData((prev) => ({
         ...prev,
         patientId: patient.id,
         patientName: patient.name,
      }));
      setSearchResults([]);
      setSearchQuery('');
   };

   const handleInputChange = (
      field: keyof AppointmentForm,
      value: string | number | boolean
   ) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!formData.patientId) {
         alert('Please select a patient');
         return;
      }

      setIsLoading(true);

      try {
         // Simulate API call
         await new Promise((resolve) => setTimeout(resolve, 1500));

         console.log('Creating appointment:', formData);
         alert('Appointment scheduled successfully!');
         navigate('/appointments/schedule');
      } catch (error) {
         console.error('Error creating appointment:', error);
         alert('Error scheduling appointment. Please try again.');
      } finally {
         setIsLoading(false);
      }
   };

   const handleCancel = () => {
      navigate(-1);
   };

   const getTypeIcon = (type: string) => {
      switch (type) {
         case 'video':
            return <Video className='h-4 w-4 text-green-600' />;
         case 'phone':
            return <Phone className='h-4 w-4 text-blue-600' />;
         default:
            return <MapPin className='h-4 w-4 text-purple-600' />;
      }
   };

   return (
      <div className='flex min-h-screen bg-gray-50'>
         <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

         <div className='w-full'>
            <Header onMenuClick={() => setSidebarOpen(true)} />

            <main className='space-y-6 p-6'>
               {/* Page Header */}
               <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                     <Button variant='outline' size='sm' onClick={handleCancel}>
                        <ArrowLeft className='mr-2 h-4 w-4' />
                        Back
                     </Button>
                     <div>
                        <h1 className='font-inter text-2xl font-bold text-gray-900'>
                           Schedule New Appointment
                        </h1>
                        <p className='mt-1 text-gray-600'>
                           Create a new appointment for a patient
                        </p>
                     </div>
                  </div>
               </div>

               <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
                  {/* Main Form */}
                  <div className='lg:col-span-2'>
                     <form onSubmit={handleSubmit} className='space-y-6'>
                        {/* Patient Selection */}
                        <Card>
                           <CardHeader>
                              <CardTitle className='flex items-center space-x-2'>
                                 <User className='h-5 w-5 text-blue-600' />
                                 <span>Patient Selection</span>
                              </CardTitle>
                           </CardHeader>
                           <CardContent className='space-y-4'>
                              {!formData.patientId ? (
                                 <div className='space-y-4'>
                                    <div className='flex space-x-2'>
                                       <Input
                                          placeholder='Search patient by name or email...'
                                          value={searchQuery}
                                          onChange={(e) =>
                                             setSearchQuery(e.target.value)
                                          }
                                          onKeyPress={(e) =>
                                             e.key === 'Enter' &&
                                             handlePatientSearch()
                                          }
                                       />
                                       <Button
                                          type='button'
                                          onClick={handlePatientSearch}
                                          disabled={isSearching}
                                       >
                                          <Search className='h-4 w-4' />
                                       </Button>
                                    </div>

                                    {searchResults.length > 0 && (
                                       <div className='max-h-60 divide-y overflow-y-auto rounded-lg border'>
                                          {searchResults.map((patient) => (
                                             <div
                                                key={patient.id}
                                                className='cursor-pointer p-3 hover:bg-gray-50'
                                                onClick={() =>
                                                   handleSelectPatient(patient)
                                                }
                                             >
                                                <div className='flex items-start justify-between'>
                                                   <div>
                                                      <p className='font-medium'>
                                                         {patient.name}
                                                      </p>
                                                      <p className='text-sm text-gray-600'>
                                                         {patient.email}
                                                      </p>
                                                      <p className='text-sm text-gray-600'>
                                                         {patient.phone}
                                                      </p>
                                                   </div>
                                                   <Button
                                                      size='sm'
                                                      variant='outline'
                                                   >
                                                      Select
                                                   </Button>
                                                </div>
                                             </div>
                                          ))}
                                       </div>
                                    )}
                                 </div>
                              ) : (
                                 <div className='flex items-center justify-between rounded-lg bg-blue-50 p-4'>
                                    <div>
                                       <p className='font-medium text-blue-900'>
                                          {formData.patientName}
                                       </p>
                                       <p className='text-sm text-blue-700'>
                                          Selected Patient
                                       </p>
                                    </div>
                                    <Button
                                       type='button'
                                       variant='ghost'
                                       size='sm'
                                       onClick={() => {
                                          setFormData((prev) => ({
                                             ...prev,
                                             patientId: '',
                                             patientName: '',
                                          }));
                                       }}
                                    >
                                       <X className='h-4 w-4' />
                                    </Button>
                                 </div>
                              )}
                           </CardContent>
                        </Card>

                        {/* Appointment Details */}
                        <Card>
                           <CardHeader>
                              <CardTitle className='flex items-center space-x-2'>
                                 <Calendar className='h-5 w-5 text-purple-600' />
                                 <span>Appointment Details</span>
                              </CardTitle>
                           </CardHeader>
                           <CardContent className='space-y-4'>
                              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                                 <div className='space-y-2'>
                                    <Label htmlFor='type'>
                                       Appointment Type *
                                    </Label>
                                    <select
                                       id='type'
                                       value={formData.type}
                                       onChange={(e) =>
                                          handleInputChange(
                                             'type',
                                             e.target.value
                                          )
                                       }
                                       className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                                       required
                                    >
                                       <option value='in-person'>
                                          In-Person
                                       </option>
                                       <option value='video'>Video Call</option>
                                       <option value='phone'>Phone Call</option>
                                    </select>
                                 </div>

                                 <div className='space-y-2'>
                                    <Label htmlFor='duration'>
                                       Duration (minutes) *
                                    </Label>
                                    <select
                                       id='duration'
                                       value={formData.duration}
                                       onChange={(e) =>
                                          handleInputChange(
                                             'duration',
                                             parseInt(e.target.value)
                                          )
                                       }
                                       className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                                       required
                                    >
                                       <option value={15}>15 minutes</option>
                                       <option value={30}>30 minutes</option>
                                       <option value={45}>45 minutes</option>
                                       <option value={60}>1 hour</option>
                                       <option value={90}>1.5 hours</option>
                                    </select>
                                 </div>

                                 <div className='space-y-2'>
                                    <Label htmlFor='date'>Date *</Label>
                                    <Input
                                       id='date'
                                       type='date'
                                       value={formData.date}
                                       onChange={(e) =>
                                          handleInputChange(
                                             'date',
                                             e.target.value
                                          )
                                       }
                                       min={
                                          new Date().toISOString().split('T')[0]
                                       }
                                       required
                                    />
                                 </div>

                                 <div className='space-y-2'>
                                    <Label htmlFor='time'>Time *</Label>
                                    <Input
                                       id='time'
                                       type='time'
                                       value={formData.time}
                                       onChange={(e) =>
                                          handleInputChange(
                                             'time',
                                             e.target.value
                                          )
                                       }
                                       required
                                    />
                                 </div>

                                 {formData.type === 'in-person' && (
                                    <div className='space-y-2'>
                                       <Label htmlFor='roomNumber'>
                                          Room Number
                                       </Label>
                                       <Input
                                          id='roomNumber'
                                          value={formData.roomNumber}
                                          onChange={(e) =>
                                             handleInputChange(
                                                'roomNumber',
                                                e.target.value
                                             )
                                          }
                                          placeholder='e.g., Room 205'
                                       />
                                    </div>
                                 )}

                                 <div className='space-y-2'>
                                    <Label className='flex items-center space-x-2'>
                                       <input
                                          type='checkbox'
                                          checked={formData.isUrgent}
                                          onChange={(e) =>
                                             handleInputChange(
                                                'isUrgent',
                                                e.target.checked
                                             )
                                          }
                                          className='rounded border-gray-300'
                                       />
                                       <span>Mark as Urgent</span>
                                    </Label>
                                 </div>
                              </div>

                              <div className='space-y-2'>
                                 <Label htmlFor='reason'>
                                    Reason for Visit *
                                 </Label>
                                 <Input
                                    id='reason'
                                    value={formData.reason}
                                    onChange={(e) =>
                                       handleInputChange(
                                          'reason',
                                          e.target.value
                                       )
                                    }
                                    placeholder='e.g., Annual checkup, Follow-up consultation'
                                    required
                                 />
                              </div>

                              <div className='space-y-2'>
                                 <Label htmlFor='notes'>Additional Notes</Label>
                                 <textarea
                                    id='notes'
                                    value={formData.notes}
                                    onChange={(e) =>
                                       handleInputChange(
                                          'notes',
                                          e.target.value
                                       )
                                    }
                                    placeholder='Any additional information or special requirements...'
                                    className='w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    rows={3}
                                 />
                              </div>
                           </CardContent>
                        </Card>

                        {/* Form Actions */}
                        <div className='flex justify-end space-x-3'>
                           <Button
                              type='button'
                              variant='outline'
                              onClick={handleCancel}
                              disabled={isLoading}
                           >
                              <X className='mr-2 h-4 w-4' />
                              Cancel
                           </Button>
                           <Button
                              type='submit'
                              disabled={isLoading || !formData.patientId}
                              className='bg-blue-600 hover:bg-blue-700'
                           >
                              {isLoading ? (
                                 <>
                                    <div className='mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white'></div>
                                    Scheduling...
                                 </>
                              ) : (
                                 <>
                                    <Save className='mr-2 h-4 w-4' />
                                    Schedule Appointment
                                 </>
                              )}
                           </Button>
                        </div>
                     </form>
                  </div>

                  {/* Sidebar */}
                  <div className='space-y-6'>
                     {/* Appointment Type Info */}
                     <Card>
                        <CardHeader>
                           <CardTitle className='text-lg'>
                              Appointment Types
                           </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                           <div className='flex items-center space-x-3 rounded-lg border p-3'>
                              <MapPin className='h-5 w-5 text-purple-600' />
                              <div>
                                 <p className='font-medium'>In-Person</p>
                                 <p className='text-sm text-gray-600'>
                                    Face-to-face consultation at the clinic
                                 </p>
                              </div>
                           </div>

                           <div className='flex items-center space-x-3 rounded-lg border p-3'>
                              <Video className='h-5 w-5 text-green-600' />
                              <div>
                                 <p className='font-medium'>Video Call</p>
                                 <p className='text-sm text-gray-600'>
                                    Remote consultation via video
                                 </p>
                              </div>
                           </div>

                           <div className='flex items-center space-x-3 rounded-lg border p-3'>
                              <Phone className='h-5 w-5 text-blue-600' />
                              <div>
                                 <p className='font-medium'>Phone Call</p>
                                 <p className='text-sm text-gray-600'>
                                    Voice-only consultation
                                 </p>
                              </div>
                           </div>
                        </CardContent>
                     </Card>

                     {/* Quick Tips */}
                     <Card>
                        <CardHeader>
                           <CardTitle className='text-lg'>
                              Scheduling Tips
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className='space-y-3 text-sm'>
                              <div className='flex items-start space-x-2'>
                                 <Clock className='mt-0.5 h-4 w-4 text-blue-600' />
                                 <p>
                                    Allow buffer time between appointments for
                                    preparation
                                 </p>
                              </div>
                              <div className='flex items-start space-x-2'>
                                 <User className='mt-0.5 h-4 w-4 text-green-600' />
                                 <p>
                                    Verify patient contact information before
                                    scheduling
                                 </p>
                              </div>
                              <div className='flex items-start space-x-2'>
                                 <Calendar className='mt-0.5 h-4 w-4 text-purple-600' />
                                 <p>
                                    Consider patient's preferred appointment
                                    times
                                 </p>
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

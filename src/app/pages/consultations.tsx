import { useEffect, useState } from 'react';

import {
   Calendar,
   FileText,
   Filter,
   Phone,
   Search,
   StickyNote,
   User,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

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
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { useAuthStore } from '@/shared/lib/store';

import { Header } from '@/app/layouts/components/header';
import { Sidebar } from '@/app/layouts/components/sidebar';

interface Consultation {
   id: string;
   patientName: string;
   avatar?: string;
   gender: 'male' | 'female' | 'other';
   dateOfBirth: string;
   phone: string;
   datetime: string;
   status: 'Upcoming' | 'Completed';
   bookingNote: string;
   patientId: string;
}

const dummyConsultations: Consultation[] = [
   {
      id: 'c1',
      patientName: 'Ahmed Youssef',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      gender: 'male',
      dateOfBirth: '1985-03-15',
      phone: '+201001234567',
      datetime: '2025-07-01 10:00 AM',
      status: 'Upcoming',
      bookingNote: 'Frequent headaches and blurred vision.',
      patientId: 'patient_001',
   },
   {
      id: 'c2',
      patientName: 'Salma Fathy',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      gender: 'female',
      dateOfBirth: '1992-07-22',
      phone: '+201002345678',
      datetime: '2025-06-28 2:00 PM',
      status: 'Completed',
      bookingNote: 'Follow-up on previous blood test.',
      patientId: 'patient_002',
   },
   {
      id: 'c3',
      patientName: 'Mohamed Ali',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      gender: 'male',
      dateOfBirth: '1991-05-10',
      phone: '+201003456789',
      datetime: '2025-07-02 1:00 PM',
      status: 'Upcoming',
      bookingNote: 'Lower back pain for 3 weeks.',
      patientId: 'patient_003',
   },
];

const calculateAge = (dob: string): number => {
   const birthDate = new Date(dob);
   const today = new Date();
   let age = today.getFullYear() - birthDate.getFullYear();
   const m = today.getMonth() - birthDate.getMonth();
   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
   }
   return age;
};

export default function ConsultationsPage() {
   const { user, isAuthenticated } = useAuthStore();
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const [statusFilter, setStatusFilter] = useState<
      'all' | 'Upcoming' | 'Completed'
   >('all');
   const navigate = useNavigate();

   useEffect(() => {
      if (!isAuthenticated || !user) {
         navigate('/', { replace: true, viewTransition: true });
         return;
      }
      if (user.role !== 'doctor') {
         navigate('/dashboard', { replace: true, viewTransition: true });
         return;
      }
   }, [isAuthenticated, user, navigate]);

   if (!isAuthenticated || !user || user.role !== 'doctor') {
      return null;
   }

   const filteredConsultations = dummyConsultations.filter((c) => {
      const matchesSearch = c.patientName
         .toLowerCase()
         .includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
      return matchesSearch && matchesStatus;
   });

   return (
      <div className='flex min-h-screen bg-gray-50'>
         <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
         <div className='w-full'>
            <Header onMenuClick={() => setSidebarOpen(true)} />
            <main className='space-y-6 p-6'>
               {/* Header */}
               <div>
                  <h1 className='text-2xl font-bold text-gray-900'>
                     Consultations
                  </h1>
                  <p className='mt-1 text-gray-600'>
                     Manage your telemedicine appointments
                  </p>
               </div>

               {/* Search & Filters */}
               <Card>
                  <CardContent className='p-6'>
                     <div className='flex flex-col gap-4 sm:flex-row'>
                        <div className='relative flex-1'>
                           <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
                           <Input
                              placeholder='Search patients by name...'
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className='pl-10'
                           />
                        </div>
                        <div className='flex items-center space-x-2'>
                           <Filter className='h-4 w-4 text-gray-400' />
                           <select
                              value={statusFilter}
                              onChange={(e) =>
                                 setStatusFilter(e.target.value as any)
                              }
                              className='rounded-md border border-gray-300 px-3 py-2 text-sm'
                           >
                              <option value='all'>All Status</option>
                              <option value='Upcoming'>Upcoming</option>
                              <option value='Completed'>Completed</option>
                           </select>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Consultations */}
               <div className='space-y-4'>
                  {filteredConsultations.length > 0 ? (
                     filteredConsultations.map((c) => (
                        <Card key={c.id}>
                           <CardHeader className='flex flex-row items-start gap-4'>
                              <Avatar className='h-16 w-16'>
                                 <AvatarImage
                                    src={c.avatar}
                                    alt={c.patientName}
                                 />
                                 <AvatarFallback>
                                    {c.patientName[0]}
                                 </AvatarFallback>
                              </Avatar>

                              <div className='flex-1 space-y-1'>
                                 <div className='flex items-center gap-2'>
                                    <CardTitle>{c.patientName}</CardTitle>
                                    <Badge
                                       variant={
                                          c.status === 'Upcoming'
                                             ? 'default'
                                             : 'secondary'
                                       }
                                    >
                                       {c.status}
                                    </Badge>
                                 </div>
                                 <CardDescription className='text-sm text-gray-600'>
                                    {c.gender}, {calculateAge(c.dateOfBirth)}{' '}
                                    years old
                                 </CardDescription>
                              </div>
                           </CardHeader>

                           <CardContent className='pt-0'>
                              <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
                                 {/* Left Info Grid */}
                                 <div className='flex-col space-y-3 text-sm text-gray-700'>
                                    <div className='flex items-center space-x-2'>
                                       <Calendar className='h-4 w-4' />
                                       <span>{c.datetime}</span>
                                    </div>
                                    <div className='flex items-center space-x-2'>
                                       <Phone className='h-4 w-4' />
                                       <span>{c.phone}</span>
                                    </div>
                                    <div className='flex items-center space-x-2 md:col-span-2'>
                                       <StickyNote className='h-4 w-4' />
                                       <span>{c.bookingNote}</span>
                                    </div>
                                 </div>

                                 {/* Right Actions (Buttons) */}
                                 <div className='flex w-full flex-col space-y-2 sm:w-64'>
                                    <Link
                                       to={`/patients/${c.patientId}/records`}
                                       className='block w-full'
                                    >
                                       <Button
                                          size='sm'
                                          variant='outline'
                                          className='w-full'
                                       >
                                          <FileText className='mr-1 h-4 w-4' />
                                          View Records
                                       </Button>
                                    </Link>
                                    <Button
                                       size='sm'
                                       className='w-full'
                                       onClick={() =>
                                          alert('Join Meeting (coming soon)')
                                       }
                                       disabled={c.status !== 'Upcoming'}
                                    >
                                       Join Meeting
                                    </Button>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                     ))
                  ) : (
                     <Card>
                        <CardContent className='p-12 text-center'>
                           <User className='mx-auto mb-4 h-12 w-12 text-gray-400' />
                           <h3 className='mb-2 text-lg font-medium text-gray-900'>
                              No consultations found
                           </h3>
                           <p className='text-gray-600'>
                              Try adjusting your search or filter settings.
                           </p>
                        </CardContent>
                     </Card>
                  )}
               </div>
            </main>
         </div>
      </div>
   );
}

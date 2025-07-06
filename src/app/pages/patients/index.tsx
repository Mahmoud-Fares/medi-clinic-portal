import { useEffect, useState } from 'react';

import {
   AlertTriangle,
   Calendar,
   Edit,
   Eye,
   FileText,
   Filter,
   Mail,
   MapPin,
   Phone,
   Plus,
   Search,
   User,
   Users,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from '@/shared/components/ui/avatar';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { useAuthStore } from '@/shared/lib/store';

import { Header } from '@/app/layouts/components/header';
import { Sidebar } from '@/app/layouts/components/sidebar';

interface Patient {
   id: string;
   firstName: string;
   lastName: string;
   email: string;
   phone: string;
   dateOfBirth: Date;
   gender: 'male' | 'female' | 'other';
   address: string;
   medicalRecordNumber: string;
   lastVisit: Date;
   status: 'active' | 'inactive' | 'critical';
   primaryDoctor: string;
   insurance: string;
   emergencyContact: string;
   avatar?: string;
}

export default function PatientsPage() {
   const { user, isAuthenticated } = useAuthStore();
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedStatus, setSelectedStatus] = useState<string>('all');
   const navigate = useNavigate();

   useEffect(() => {
      if (!isAuthenticated || !user) {
         navigate('/', { replace: true, viewTransition: true });
         return;
      }
      if (user.role !== 'admin' && user.role !== 'doctor') {
         navigate('/dashboard', { replace: true, viewTransition: true });
         return;
      }
   }, [isAuthenticated, user, navigate]);

   if (
      !isAuthenticated ||
      !user ||
      (user.role !== 'admin' && user.role !== 'doctor')
   ) {
      return null;
   }

   // Mock patients data
   const mockPatients: Patient[] = [
      {
         id: 'patient_1',
         firstName: 'John',
         lastName: 'Doe',
         email: 'john.doe@email.com',
         phone: '+1-555-0123',
         dateOfBirth: new Date('1985-03-15'),
         gender: 'male',
         address: '123 Main St, City, State 12345',
         medicalRecordNumber: 'MRN001234',
         lastVisit: new Date(Date.now() - 604800000), // 1 week ago
         status: 'active',
         primaryDoctor: 'Dr. Sarah Wilson',
         insurance: 'Blue Cross Blue Shield',
         emergencyContact: 'Jane Doe - Spouse',
         avatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      },
      {
         id: 'patient_2',
         firstName: 'Emily',
         lastName: 'Johnson',
         email: 'emily.johnson@email.com',
         phone: '+1-555-0124',
         dateOfBirth: new Date('1992-07-22'),
         gender: 'female',
         address: '456 Oak Ave, City, State 12345',
         medicalRecordNumber: 'MRN001235',
         lastVisit: new Date(Date.now() - 259200000), // 3 days ago
         status: 'active',
         primaryDoctor: 'Dr. Michael Chen',
         insurance: 'Aetna',
         emergencyContact: 'Robert Johnson - Father',
         avatar:
            'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      },
      {
         id: 'patient_3',
         firstName: 'Robert',
         lastName: 'Smith',
         email: 'robert.smith@email.com',
         phone: '+1-555-0125',
         dateOfBirth: new Date('1978-11-08'),
         gender: 'male',
         address: '789 Pine St, City, State 12345',
         medicalRecordNumber: 'MRN001236',
         lastVisit: new Date(Date.now() - 86400000), // 1 day ago
         status: 'critical',
         primaryDoctor: 'Dr. Sarah Wilson',
         insurance: 'Medicare',
         emergencyContact: 'Mary Smith - Wife',
         avatar:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      },
      {
         id: 'patient_4',
         firstName: 'Maria',
         lastName: 'Garcia',
         email: 'maria.garcia@email.com',
         phone: '+1-555-0126',
         dateOfBirth: new Date('1990-05-12'),
         gender: 'female',
         address: '321 Elm St, City, State 12345',
         medicalRecordNumber: 'MRN001237',
         lastVisit: new Date(Date.now() - 1209600000), // 2 weeks ago
         status: 'active',
         primaryDoctor: 'Dr. Michael Chen',
         insurance: 'Cigna',
         emergencyContact: 'Carlos Garcia - Husband',
         avatar:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      },
      {
         id: 'patient_5',
         firstName: 'David',
         lastName: 'Brown',
         email: 'david.brown@email.com',
         phone: '+1-555-0127',
         dateOfBirth: new Date('1965-09-30'),
         gender: 'male',
         address: '654 Maple Dr, City, State 12345',
         medicalRecordNumber: 'MRN001238',
         lastVisit: new Date(Date.now() - 2592000000), // 1 month ago
         status: 'inactive',
         primaryDoctor: 'Dr. Sarah Wilson',
         insurance: 'United Healthcare',
         emergencyContact: 'Linda Brown - Wife',
      },
   ];

   const getStatusColor = (status: string) => {
      switch (status) {
         case 'active':
            return 'bg-green-100 text-green-800 hover:bg-green-100';
         case 'critical':
            return 'bg-red-100 text-red-800 hover:bg-red-100';
         case 'inactive':
            return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
         default:
            return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      }
   };

   const getStatusIcon = (status: string) => {
      switch (status) {
         case 'critical':
            return <AlertTriangle className='h-3 w-3' />;
         default:
            return <User className='h-3 w-3' />;
      }
   };

   const calculateAge = (dateOfBirth: Date) => {
      const today = new Date();
      const age = today.getFullYear() - dateOfBirth.getFullYear();
      const monthDiff = today.getMonth() - dateOfBirth.getMonth();
      if (
         monthDiff < 0 ||
         (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())
      ) {
         return age - 1;
      }
      return age;
   };

   const filteredPatients = mockPatients.filter((patient) => {
      const matchesSearch =
         patient.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
         patient.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
         patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
         patient.medicalRecordNumber
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
      const matchesStatus =
         selectedStatus === 'all' || patient.status === selectedStatus;
      return matchesSearch && matchesStatus;
   });

   const PatientCard = ({ patient }: { patient: Patient }) => (
      <Card className='transition-shadow duration-200 hover:shadow-md'>
         <CardContent className='p-6'>
            <div className='flex items-start space-x-4'>
               <Avatar className='h-16 w-16'>
                  <AvatarImage
                     src={patient.avatar}
                     alt={`${patient.firstName} ${patient.lastName}`}
                  />
                  <AvatarFallback className='text-lg'>
                     {patient.firstName[0]}
                     {patient.lastName[0]}
                  </AvatarFallback>
               </Avatar>

               <div className='min-w-0 flex-1'>
                  <div className='mb-2 flex items-center justify-between'>
                     <div>
                        <h3 className='text-lg font-semibold text-gray-900'>
                           {patient.firstName} {patient.lastName}
                        </h3>
                        <p className='text-sm text-gray-600'>
                           MRN: {patient.medicalRecordNumber}
                        </p>
                     </div>
                     <Badge className={getStatusColor(patient.status)}>
                        {getStatusIcon(patient.status)}
                        <span className='ml-1'>
                           {patient.status.charAt(0).toUpperCase() +
                              patient.status.slice(1)}
                        </span>
                     </Badge>
                  </div>

                  <div className='mb-4 grid grid-cols-1 gap-3 text-sm text-gray-600 md:grid-cols-2'>
                     <div className='flex items-center space-x-2'>
                        <User className='h-4 w-4' />
                        <span>
                           {calculateAge(patient.dateOfBirth)} years old,{' '}
                           {patient.gender}
                        </span>
                     </div>
                     <div className='flex items-center space-x-2'>
                        <Phone className='h-4 w-4' />
                        <span>{patient.phone}</span>
                     </div>
                     <div className='flex items-center space-x-2'>
                        <Mail className='h-4 w-4' />
                        <span>{patient.email}</span>
                     </div>
                     <div className='flex items-center space-x-2'>
                        <Calendar className='h-4 w-4' />
                        <span>
                           Last visit: {patient.lastVisit.toLocaleDateString()}
                        </span>
                     </div>
                     <div className='flex items-center space-x-2'>
                        <FileText className='h-4 w-4' />
                        <span>Dr: {patient.primaryDoctor}</span>
                     </div>
                     <div className='flex items-center space-x-2'>
                        <MapPin className='h-4 w-4' />
                        <span>{patient.insurance}</span>
                     </div>
                  </div>

                  <div className='flex space-x-2'>
                     <Link to={`/patients/${patient.id}`}>
                        <Button size='sm' variant='outline'>
                           <Eye className='mr-1 h-4 w-4' />
                           View Details
                        </Button>
                     </Link>
                     <Link to={`/patients/${patient.id}/edit`}>
                        <Button size='sm' variant='outline'>
                           <Edit className='mr-1 h-4 w-4' />
                           Edit
                        </Button>
                     </Link>
                     <Link to={`/patients/records?patient=${patient.id}`}>
                        <Button size='sm' variant='outline'>
                           <FileText className='mr-1 h-4 w-4' />
                           Records
                        </Button>
                     </Link>
                  </div>
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
                        Patient Management
                     </h1>
                     <p className='mt-1 text-gray-600'>
                        View and manage all patients in the system
                     </p>
                  </div>
                  <div className='flex items-center space-x-3'>
                     <Link to='/patients/search'>
                        <Button variant='outline'>
                           <Search className='mr-2 h-4 w-4' />
                           Advanced Search
                        </Button>
                     </Link>
                     <Link to='/patients/new'>
                        <Button>
                           <Plus className='mr-2 h-4 w-4' />
                           Add Patient
                        </Button>
                     </Link>
                  </div>
               </div>

               {/* Stats Cards */}
               <div className='grid grid-cols-1 gap-6 md:grid-cols-4'>
                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>
                                 Total Patients
                              </p>
                              <p className='text-2xl font-bold text-gray-900'>
                                 {mockPatients.length}
                              </p>
                           </div>
                           <div className='rounded-lg bg-blue-100 p-3'>
                              <Users className='h-6 w-6 text-blue-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>
                                 Active Patients
                              </p>
                              <p className='text-2xl font-bold text-green-600'>
                                 {
                                    mockPatients.filter(
                                       (p) => p.status === 'active'
                                    ).length
                                 }
                              </p>
                           </div>
                           <div className='rounded-lg bg-green-100 p-3'>
                              <User className='h-6 w-6 text-green-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>
                                 Critical Patients
                              </p>
                              <p className='text-2xl font-bold text-red-600'>
                                 {
                                    mockPatients.filter(
                                       (p) => p.status === 'critical'
                                    ).length
                                 }
                              </p>
                           </div>
                           <div className='rounded-lg bg-red-100 p-3'>
                              <AlertTriangle className='h-6 w-6 text-red-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>
                                 New This Month
                              </p>
                              <p className='text-2xl font-bold text-purple-600'>
                                 12
                              </p>
                           </div>
                           <div className='rounded-lg bg-purple-100 p-3'>
                              <Plus className='h-6 w-6 text-purple-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </div>

               {/* Search and Filters */}
               <Card>
                  <CardContent className='p-6'>
                     <div className='flex flex-col gap-4 sm:flex-row'>
                        <div className='relative flex-1'>
                           <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
                           <Input
                              placeholder='Search patients by name, email, or MRN...'
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
                                 setSelectedStatus(e.target.value)
                              }
                              className='rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                           >
                              <option value='all'>All Status</option>
                              <option value='active'>Active</option>
                              <option value='critical'>Critical</option>
                              <option value='inactive'>Inactive</option>
                           </select>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Patients List */}
               <div className='space-y-4'>
                  {filteredPatients.length > 0 ? (
                     filteredPatients.map((patient) => (
                        <PatientCard key={patient.id} patient={patient} />
                     ))
                  ) : (
                     <Card>
                        <CardContent className='p-12 text-center'>
                           <Users className='mx-auto mb-4 h-12 w-12 text-gray-400' />
                           <h3 className='mb-2 text-lg font-medium text-gray-900'>
                              No patients found
                           </h3>
                           <p className='mb-4 text-gray-600'>
                              No patients match your current search criteria.
                           </p>
                           <Button>
                              <Plus className='mr-2 h-4 w-4' />
                              Add New Patient
                           </Button>
                        </CardContent>
                     </Card>
                  )}
               </div>
            </main>
         </div>
      </div>
   );
}

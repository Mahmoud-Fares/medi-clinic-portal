import { useEffect, useState } from 'react';

import {
   Activity,
   Bed,
   CheckCircle,
   Clock,
   Edit,
   Eye,
   Filter,
   MapPin,
   Plus,
   Search,
   User,
   Wrench,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { useAuthStore } from '@/shared/lib/store';

import { Header } from '@/app/layouts/components/header';
import { Sidebar } from '@/app/layouts/components/sidebar';

interface HospitalBed {
   id: string;
   roomNumber: string;
   bedNumber: string;
   type: 'general' | 'icu' | 'emergency' | 'surgery' | 'pediatric';
   status: 'available' | 'occupied' | 'maintenance' | 'cleaning';
   department: string;
   floor: string;
   patientId?: string;
   patientName?: string;
   admissionDate?: Date;
   lastCleaned?: Date;
   nextMaintenance?: Date;
   equipment: string[];
}

export default function HospitalBedsPage() {
   const { user, isAuthenticated } = useAuthStore();
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedStatus, setSelectedStatus] = useState<string>('all');
   const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
   const navigate = useNavigate();

   useEffect(() => {
      if (!isAuthenticated || !user) {
         navigate('/', { replace: true, viewTransition: true });
         return;
      }
      if (user.role !== 'admin') {
         navigate('/dashboard', { replace: true, viewTransition: true });
         return;
      }
   }, [isAuthenticated, user, navigate]);

   if (!isAuthenticated || !user || user.role !== 'admin') {
      return null;
   }

   // Mock beds data
   const mockBeds: HospitalBed[] = [
      {
         id: 'bed_1',
         roomNumber: '101',
         bedNumber: 'A',
         type: 'general',
         status: 'occupied',
         department: 'Internal Medicine',
         floor: '1st Floor',
         patientId: 'patient_1',
         patientName: 'John Doe',
         admissionDate: new Date(Date.now() - 172800000), // 2 days ago
         lastCleaned: new Date(Date.now() - 86400000), // 1 day ago
         equipment: ['Monitor', 'IV Stand', 'Oxygen'],
      },
      {
         id: 'bed_2',
         roomNumber: '101',
         bedNumber: 'B',
         type: 'general',
         status: 'available',
         department: 'Internal Medicine',
         floor: '1st Floor',
         lastCleaned: new Date(Date.now() - 3600000), // 1 hour ago
         equipment: ['Monitor', 'IV Stand'],
      },
      {
         id: 'bed_3',
         roomNumber: '201',
         bedNumber: 'A',
         type: 'icu',
         status: 'occupied',
         department: 'ICU',
         floor: '2nd Floor',
         patientId: 'patient_2',
         patientName: 'Emily Johnson',
         admissionDate: new Date(Date.now() - 432000000), // 5 days ago
         lastCleaned: new Date(Date.now() - 43200000), // 12 hours ago
         equipment: ['Ventilator', 'Monitor', 'IV Stand', 'Defibrillator'],
      },
      {
         id: 'bed_4',
         roomNumber: '301',
         bedNumber: 'A',
         type: 'surgery',
         status: 'maintenance',
         department: 'Surgery',
         floor: '3rd Floor',
         nextMaintenance: new Date(Date.now() + 86400000), // Tomorrow
         equipment: ['Surgical Table', 'Anesthesia Machine', 'Monitor'],
      },
      {
         id: 'bed_5',
         roomNumber: '401',
         bedNumber: 'A',
         type: 'pediatric',
         status: 'cleaning',
         department: 'Pediatrics',
         floor: '4th Floor',
         lastCleaned: new Date(Date.now() - 1800000), // 30 minutes ago
         equipment: ['Pediatric Monitor', 'IV Stand', 'Toys'],
      },
      {
         id: 'bed_6',
         roomNumber: '501',
         bedNumber: 'A',
         type: 'emergency',
         status: 'available',
         department: 'Emergency',
         floor: 'Ground Floor',
         lastCleaned: new Date(Date.now() - 7200000), // 2 hours ago
         equipment: ['Monitor', 'Defibrillator', 'IV Stand', 'Oxygen'],
      },
   ];

   const getStatusColor = (status: string) => {
      switch (status) {
         case 'available':
            return 'bg-green-100 text-green-800 hover:bg-green-100';
         case 'occupied':
            return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
         case 'maintenance':
            return 'bg-orange-100 text-orange-800 hover:bg-orange-100';
         case 'cleaning':
            return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
         default:
            return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
      }
   };

   const getStatusIcon = (status: string) => {
      switch (status) {
         case 'available':
            return <CheckCircle className='h-4 w-4 text-green-600' />;
         case 'occupied':
            return <User className='h-4 w-4 text-blue-600' />;
         case 'maintenance':
            return <Wrench className='h-4 w-4 text-orange-600' />;
         case 'cleaning':
            return <Activity className='h-4 w-4 text-yellow-600' />;
         default:
            return <Bed className='h-4 w-4 text-gray-600' />;
      }
   };

   const getTypeColor = (type: string) => {
      switch (type) {
         case 'icu':
            return 'bg-red-100 text-red-800';
         case 'emergency':
            return 'bg-purple-100 text-purple-800';
         case 'surgery':
            return 'bg-indigo-100 text-indigo-800';
         case 'pediatric':
            return 'bg-pink-100 text-pink-800';
         default:
            return 'bg-gray-100 text-gray-800';
      }
   };

   const filteredBeds = mockBeds.filter((bed) => {
      const matchesSearch =
         bed.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
         bed.bedNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
         bed.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
         bed.patientName?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
         selectedStatus === 'all' || bed.status === selectedStatus;
      const matchesDepartment =
         selectedDepartment === 'all' || bed.department === selectedDepartment;
      return matchesSearch && matchesStatus && matchesDepartment;
   });

   const BedCard = ({ bed }: { bed: HospitalBed }) => (
      <Card className='transition-shadow duration-200 hover:shadow-md'>
         <CardContent className='p-6'>
            <div className='flex items-start justify-between'>
               <div className='flex-1'>
                  <div className='mb-2 flex items-center space-x-2'>
                     <Bed className='h-5 w-5 text-blue-600' />
                     <h3 className='font-semibold text-gray-900'>
                        Room {bed.roomNumber} - Bed {bed.bedNumber}
                     </h3>
                     <Badge className={getTypeColor(bed.type)}>
                        {bed.type.toUpperCase()}
                     </Badge>
                     <Badge className={getStatusColor(bed.status)}>
                        {getStatusIcon(bed.status)}
                        <span className='ml-1'>
                           {bed.status.charAt(0).toUpperCase() +
                              bed.status.slice(1)}
                        </span>
                     </Badge>
                  </div>

                  <div className='mb-4 space-y-2 text-sm text-gray-600'>
                     <div className='flex items-center space-x-2'>
                        <MapPin className='h-4 w-4' />
                        <span>
                           {bed.department} • {bed.floor}
                        </span>
                     </div>

                     {bed.patientName && (
                        <div className='flex items-center space-x-2'>
                           <User className='h-4 w-4' />
                           <span>Patient: {bed.patientName}</span>
                        </div>
                     )}

                     {bed.admissionDate && (
                        <div className='flex items-center space-x-2'>
                           <Clock className='h-4 w-4' />
                           <span>
                              Admitted: {bed.admissionDate.toLocaleDateString()}
                           </span>
                        </div>
                     )}

                     {bed.lastCleaned && (
                        <div className='flex items-center space-x-2'>
                           <Activity className='h-4 w-4' />
                           <span>
                              Last cleaned: {bed.lastCleaned.toLocaleString()}
                           </span>
                        </div>
                     )}

                     {bed.nextMaintenance && (
                        <div className='flex items-center space-x-2'>
                           <Wrench className='h-4 w-4' />
                           <span>
                              Next maintenance:{' '}
                              {bed.nextMaintenance.toLocaleDateString()}
                           </span>
                        </div>
                     )}
                  </div>

                  <div className='mb-4'>
                     <p className='mb-1 text-sm font-medium text-gray-700'>
                        Equipment:
                     </p>
                     <div className='flex flex-wrap gap-1'>
                        {bed.equipment.map((item, index) => (
                           <Badge
                              key={index}
                              variant='outline'
                              className='text-xs'
                           >
                              {item}
                           </Badge>
                        ))}
                     </div>
                  </div>
               </div>

               <div className='ml-4 flex flex-col space-y-2'>
                  <Button variant='outline' size='sm'>
                     <Eye className='mr-1 h-4 w-4' />
                     View Details
                  </Button>
                  <Button variant='outline' size='sm'>
                     <Edit className='mr-1 h-4 w-4' />
                     Edit
                  </Button>
                  {bed.status === 'available' && (
                     <Button
                        size='sm'
                        className='bg-blue-600 hover:bg-blue-700'
                     >
                        Assign Patient
                     </Button>
                  )}
                  {bed.status === 'occupied' && (
                     <Button size='sm' variant='outline'>
                        Discharge
                     </Button>
                  )}
               </div>
            </div>
         </CardContent>
      </Card>
   );

   const totalBeds = mockBeds.length;
   const availableBeds = mockBeds.filter(
      (bed) => bed.status === 'available'
   ).length;
   const occupiedBeds = mockBeds.filter(
      (bed) => bed.status === 'occupied'
   ).length;
   const maintenanceBeds = mockBeds.filter(
      (bed) => bed.status === 'maintenance' || bed.status === 'cleaning'
   ).length;

   const uniqueDepartments = Array.from(
      new Set(mockBeds.map((bed) => bed.department))
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
                        Bed Management
                     </h1>
                     <p className='mt-1 text-gray-600'>
                        Monitor and manage hospital bed availability and
                        assignments
                     </p>
                  </div>
                  <div className='flex items-center space-x-3'>
                     <Button variant='outline'>
                        <Activity className='mr-2 h-4 w-4' />
                        Bed Status Report
                     </Button>
                     <Button>
                        <Plus className='mr-2 h-4 w-4' />
                        Add Bed
                     </Button>
                  </div>
               </div>

               {/* Stats Cards */}
               <div className='grid grid-cols-1 gap-6 md:grid-cols-4'>
                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>
                                 Total Beds
                              </p>
                              <p className='text-2xl font-bold text-gray-900'>
                                 {totalBeds}
                              </p>
                           </div>
                           <div className='rounded-lg bg-blue-100 p-3'>
                              <Bed className='h-6 w-6 text-blue-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>Available</p>
                              <p className='text-2xl font-bold text-green-600'>
                                 {availableBeds}
                              </p>
                           </div>
                           <div className='rounded-lg bg-green-100 p-3'>
                              <CheckCircle className='h-6 w-6 text-green-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>Occupied</p>
                              <p className='text-2xl font-bold text-blue-600'>
                                 {occupiedBeds}
                              </p>
                           </div>
                           <div className='rounded-lg bg-blue-100 p-3'>
                              <User className='h-6 w-6 text-blue-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>
                                 Maintenance
                              </p>
                              <p className='text-2xl font-bold text-orange-600'>
                                 {maintenanceBeds}
                              </p>
                           </div>
                           <div className='rounded-lg bg-orange-100 p-3'>
                              <Wrench className='h-6 w-6 text-orange-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </div>

               {/* Search and Filters */}
               <Card>
                  <CardContent className='p-6'>
                     <div className='flex flex-col gap-4 lg:flex-row'>
                        <div className='relative flex-1'>
                           <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
                           <Input
                              placeholder='Search by room number, bed number, department, or patient...'
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
                              <option value='available'>Available</option>
                              <option value='occupied'>Occupied</option>
                              <option value='maintenance'>Maintenance</option>
                              <option value='cleaning'>Cleaning</option>
                           </select>
                           <select
                              value={selectedDepartment}
                              onChange={(e) =>
                                 setSelectedDepartment(e.target.value)
                              }
                              className='rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                           >
                              <option value='all'>All Departments</option>
                              {uniqueDepartments.map((department) => (
                                 <option key={department} value={department}>
                                    {department}
                                 </option>
                              ))}
                           </select>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Beds List */}
               <div className='grid grid-cols-1 gap-4'>
                  {filteredBeds.length > 0 ? (
                     filteredBeds.map((bed) => (
                        <BedCard key={bed.id} bed={bed} />
                     ))
                  ) : (
                     <Card>
                        <CardContent className='p-12 text-center'>
                           <Bed className='mx-auto mb-4 h-12 w-12 text-gray-400' />
                           <h3 className='mb-2 text-lg font-medium text-gray-900'>
                              No beds found
                           </h3>
                           <p className='mb-4 text-gray-600'>
                              No beds match your current search criteria.
                           </p>
                           <Button>
                              <Plus className='mr-2 h-4 w-4' />
                              Add New Bed
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

import { useEffect, useState } from 'react';

import {
   Activity,
   Bed,
   Building,
   Clock,
   Edit,
   Eye,
   Filter,
   MapPin,
   Phone,
   Plus,
   Search,
   Stethoscope,
   UserCog,
   Users,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { useAuthStore } from '@/shared/lib/store';

import { Header } from '@/app/layouts/components/header';
import { Sidebar } from '@/app/layouts/components/sidebar';

interface Department {
   id: string;
   name: string;
   description: string;
   headOfDepartment: string;
   staffCount: number;
   bedCount: number;
   location: string;
   phone: string;
   email: string;
   status: 'active' | 'maintenance' | 'closed';
   operatingHours: string;
   specialties: string[];
   equipment: string[];
}

export default function HospitalDepartmentsPage() {
   const { user, isAuthenticated } = useAuthStore();
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedStatus, setSelectedStatus] = useState<string>('all');
   const navigate = useNavigate();

   useEffect(() => {
      if (!isAuthenticated || !user) {
         navigate('/');
         return;
      }
      if (user.role !== 'admin') {
         navigate('/dashboard');
         return;
      }
   }, [isAuthenticated, user, navigate]);

   if (!isAuthenticated || !user || user.role !== 'admin') {
      return null;
   }

   // Mock departments data
   const mockDepartments: Department[] = [
      {
         id: 'dept_1',
         name: 'Emergency Department',
         description: 'Emergency medical care and trauma services',
         headOfDepartment: 'Dr. Sarah Wilson',
         staffCount: 45,
         bedCount: 20,
         location: 'Ground Floor, Wing A',
         phone: '+1-555-0100',
         email: 'emergency@hospital.com',
         status: 'active',
         operatingHours: '24/7',
         specialties: ['Emergency Medicine', 'Trauma Care', 'Critical Care'],
         equipment: [
            'Defibrillators',
            'Ventilators',
            'X-Ray Machines',
            'CT Scanner',
         ],
      },
      {
         id: 'dept_2',
         name: 'Cardiology',
         description: 'Heart and cardiovascular system care',
         headOfDepartment: 'Dr. Michael Chen',
         staffCount: 32,
         bedCount: 15,
         location: '3rd Floor, Wing B',
         phone: '+1-555-0101',
         email: 'cardiology@hospital.com',
         status: 'active',
         operatingHours: '6:00 AM - 10:00 PM',
         specialties: [
            'Interventional Cardiology',
            'Electrophysiology',
            'Heart Surgery',
         ],
         equipment: [
            'Cardiac Catheterization Lab',
            'Echocardiogram',
            'Holter Monitors',
         ],
      },
      {
         id: 'dept_3',
         name: 'Surgery',
         description: 'Surgical procedures and post-operative care',
         headOfDepartment: 'Dr. Jennifer Martinez',
         staffCount: 28,
         bedCount: 12,
         location: '4th Floor, Wing C',
         phone: '+1-555-0102',
         email: 'surgery@hospital.com',
         status: 'active',
         operatingHours: '24/7',
         specialties: ['General Surgery', 'Orthopedic Surgery', 'Neurosurgery'],
         equipment: [
            'Operating Rooms',
            'Anesthesia Machines',
            'Surgical Robots',
         ],
      },
      {
         id: 'dept_4',
         name: 'Radiology',
         description: 'Medical imaging and diagnostic services',
         headOfDepartment: 'Dr. Robert Taylor',
         staffCount: 18,
         bedCount: 0,
         location: 'Basement Level, Wing A',
         phone: '+1-555-0103',
         email: 'radiology@hospital.com',
         status: 'active',
         operatingHours: '6:00 AM - 11:00 PM',
         specialties: [
            'Diagnostic Imaging',
            'Interventional Radiology',
            'Nuclear Medicine',
         ],
         equipment: [
            'MRI Machines',
            'CT Scanners',
            'X-Ray Equipment',
            'Ultrasound',
         ],
      },
      {
         id: 'dept_5',
         name: 'Pediatrics',
         description: 'Medical care for infants, children, and adolescents',
         headOfDepartment: 'Dr. Lisa Brown',
         staffCount: 25,
         bedCount: 18,
         location: '2nd Floor, Wing B',
         phone: '+1-555-0104',
         email: 'pediatrics@hospital.com',
         status: 'active',
         operatingHours: '24/7',
         specialties: ['Neonatology', 'Pediatric Surgery', 'Child Psychology'],
         equipment: [
            'Incubators',
            'Pediatric Ventilators',
            'Play Therapy Equipment',
         ],
      },
      {
         id: 'dept_6',
         name: 'Laboratory',
         description: 'Clinical laboratory and pathology services',
         headOfDepartment: 'Dr. David Lee',
         staffCount: 15,
         bedCount: 0,
         location: 'Basement Level, Wing B',
         phone: '+1-555-0105',
         email: 'lab@hospital.com',
         status: 'maintenance',
         operatingHours: '24/7',
         specialties: [
            'Clinical Chemistry',
            'Hematology',
            'Microbiology',
            'Pathology',
         ],
         equipment: [
            'Automated Analyzers',
            'Microscopes',
            'Centrifuges',
            'Incubators',
         ],
      },
      {
         id: 'dept_7',
         name: 'Oncology',
         description: 'Cancer treatment and care services',
         headOfDepartment: 'Dr. Amanda Rodriguez',
         staffCount: 22,
         bedCount: 14,
         location: '5th Floor, Wing A',
         phone: '+1-555-0106',
         email: 'oncology@hospital.com',
         status: 'active',
         operatingHours: '7:00 AM - 9:00 PM',
         specialties: [
            'Medical Oncology',
            'Radiation Oncology',
            'Surgical Oncology',
         ],
         equipment: [
            'Linear Accelerators',
            'Chemotherapy Infusion Pumps',
            'PET Scanner',
         ],
      },
      {
         id: 'dept_8',
         name: 'Obstetrics & Gynecology',
         description: "Women's health and maternity services",
         headOfDepartment: 'Dr. Maria Gonzalez',
         staffCount: 20,
         bedCount: 16,
         location: '3rd Floor, Wing C',
         phone: '+1-555-0107',
         email: 'obgyn@hospital.com',
         status: 'active',
         operatingHours: '24/7',
         specialties: ['Obstetrics', 'Gynecology', 'Maternal-Fetal Medicine'],
         equipment: ['Delivery Rooms', 'Fetal Monitors', 'Ultrasound Machines'],
      },
   ];

   const getStatusColor = (status: string) => {
      switch (status) {
         case 'active':
            return 'bg-green-100 text-green-800 hover:bg-green-100';
         case 'maintenance':
            return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
         case 'closed':
            return 'bg-red-100 text-red-800 hover:bg-red-100';
         default:
            return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
      }
   };

   const filteredDepartments = mockDepartments.filter((department) => {
      const matchesSearch =
         department.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         department.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
         department.headOfDepartment
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
      const matchesStatus =
         selectedStatus === 'all' || department.status === selectedStatus;
      return matchesSearch && matchesStatus;
   });

   const DepartmentCard = ({ department }: { department: Department }) => (
      <Card className='transition-shadow duration-200 hover:shadow-md'>
         <CardContent className='p-6'>
            <div className='mb-4 flex items-start justify-between'>
               <div className='flex items-center space-x-3'>
                  <div className='rounded-lg bg-blue-100 p-2'>
                     <Building className='h-6 w-6 text-blue-600' />
                  </div>
                  <div>
                     <h3 className='text-lg font-semibold text-gray-900'>
                        {department.name}
                     </h3>
                     <p className='text-sm text-gray-600'>
                        {department.description}
                     </p>
                  </div>
               </div>
               <Badge className={getStatusColor(department.status)}>
                  {department.status.charAt(0).toUpperCase() +
                     department.status.slice(1)}
               </Badge>
            </div>

            <div className='mb-4 grid grid-cols-1 gap-3 text-sm text-gray-600 md:grid-cols-2'>
               <div className='flex items-center space-x-2'>
                  <UserCog className='h-4 w-4' />
                  <span>Head: {department.headOfDepartment}</span>
               </div>
               <div className='flex items-center space-x-2'>
                  <Users className='h-4 w-4' />
                  <span>{department.staffCount} staff members</span>
               </div>
               <div className='flex items-center space-x-2'>
                  <Bed className='h-4 w-4' />
                  <span>{department.bedCount} beds</span>
               </div>
               <div className='flex items-center space-x-2'>
                  <Clock className='h-4 w-4' />
                  <span>{department.operatingHours}</span>
               </div>
               <div className='flex items-center space-x-2'>
                  <MapPin className='h-4 w-4' />
                  <span>{department.location}</span>
               </div>
               <div className='flex items-center space-x-2'>
                  <Phone className='h-4 w-4' />
                  <span>{department.phone}</span>
               </div>
            </div>

            <div className='mb-4'>
               <h4 className='mb-2 text-sm font-medium text-gray-900'>
                  Specialties
               </h4>
               <div className='flex flex-wrap gap-1'>
                  {department.specialties
                     .slice(0, 3)
                     .map((specialty, index) => (
                        <Badge
                           key={index}
                           variant='secondary'
                           className='text-xs'
                        >
                           {specialty}
                        </Badge>
                     ))}
                  {department.specialties.length > 3 && (
                     <Badge variant='outline' className='text-xs'>
                        +{department.specialties.length - 3} more
                     </Badge>
                  )}
               </div>
            </div>

            <div className='flex space-x-2'>
               <Link to={`/hospital/departments/${department.id}`}>
                  <Button size='sm' variant='outline'>
                     <Eye className='mr-1 h-4 w-4' />
                     View Details
                  </Button>
               </Link>
               <Link to={`/hospital/departments/${department.id}/edit`}>
                  <Button size='sm' variant='outline'>
                     <Edit className='mr-1 h-4 w-4' />
                     Edit
                  </Button>
               </Link>
               <Link to={`/hospital/staff?department=${department.id}`}>
                  <Button size='sm' variant='outline'>
                     <Users className='mr-1 h-4 w-4' />
                     Staff
                  </Button>
               </Link>
            </div>
         </CardContent>
      </Card>
   );

   const totalStaff = mockDepartments.reduce(
      (sum, dept) => sum + dept.staffCount,
      0
   );
   const totalBeds = mockDepartments.reduce(
      (sum, dept) => sum + dept.bedCount,
      0
   );
   const activeDepartments = mockDepartments.filter(
      (dept) => dept.status === 'active'
   ).length;

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
                        Hospital Departments
                     </h1>
                     <p className='mt-1 text-gray-600'>
                        Manage hospital departments and their operations
                     </p>
                  </div>
                  <div className='flex items-center space-x-3'>
                     <Link to='/hospital'>
                        <Button variant='outline'>
                           <Building className='mr-2 h-4 w-4' />
                           Back to Hospital
                        </Button>
                     </Link>
                     <Link to='/hospital/departments/new'>
                        <Button>
                           <Plus className='mr-2 h-4 w-4' />
                           Add Department
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
                                 Total Departments
                              </p>
                              <p className='text-2xl font-bold text-gray-900'>
                                 {mockDepartments.length}
                              </p>
                           </div>
                           <div className='rounded-lg bg-blue-100 p-3'>
                              <Building className='h-6 w-6 text-blue-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>
                                 Active Departments
                              </p>
                              <p className='text-2xl font-bold text-green-600'>
                                 {activeDepartments}
                              </p>
                           </div>
                           <div className='rounded-lg bg-green-100 p-3'>
                              <Activity className='h-6 w-6 text-green-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>
                                 Total Staff
                              </p>
                              <p className='text-2xl font-bold text-purple-600'>
                                 {totalStaff}
                              </p>
                           </div>
                           <div className='rounded-lg bg-purple-100 p-3'>
                              <Users className='h-6 w-6 text-purple-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>
                                 Total Beds
                              </p>
                              <p className='text-2xl font-bold text-orange-600'>
                                 {totalBeds}
                              </p>
                           </div>
                           <div className='rounded-lg bg-orange-100 p-3'>
                              <Bed className='h-6 w-6 text-orange-600' />
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
                              placeholder='Search departments by name, description, or head...'
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
                              <option value='maintenance'>Maintenance</option>
                              <option value='closed'>Closed</option>
                           </select>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Departments Grid */}
               <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                  {filteredDepartments.length > 0 ? (
                     filteredDepartments.map((department) => (
                        <DepartmentCard
                           key={department.id}
                           department={department}
                        />
                     ))
                  ) : (
                     <div className='lg:col-span-2'>
                        <Card>
                           <CardContent className='p-12 text-center'>
                              <Stethoscope className='mx-auto mb-4 h-12 w-12 text-gray-400' />
                              <h3 className='mb-2 text-lg font-medium text-gray-900'>
                                 No departments found
                              </h3>
                              <p className='mb-4 text-gray-600'>
                                 No departments match your current search
                                 criteria.
                              </p>
                              <Button>
                                 <Plus className='mr-2 h-4 w-4' />
                                 Add New Department
                              </Button>
                           </CardContent>
                        </Card>
                     </div>
                  )}
               </div>
            </main>
         </div>
      </div>
   );
}

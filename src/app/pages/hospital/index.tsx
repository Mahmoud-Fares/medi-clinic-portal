import { useEffect, useState } from 'react';

import {
   Activity,
   Bed,
   Building,
   Clock,
   Edit,
   Eye,
   MapPin,
   Phone,
   Plus,
   Settings,
   UserCog,
   Users,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
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
}

export default function HospitalManagementPage() {
   const { user, isAuthenticated } = useAuthStore();
   const [sidebarOpen, setSidebarOpen] = useState(false);
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
                        Hospital Management
                     </h1>
                     <p className='mt-1 text-gray-600'>
                        Manage hospital departments, facilities, and operations
                     </p>
                  </div>
                  <div className='flex items-center space-x-3'>
                     <Link to='/hospital/facilities'>
                        <Button variant='outline'>
                           <Building className='mr-2 h-4 w-4' />
                           Facilities
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

               {/* Quick Stats */}
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

               {/* Quick Access Cards */}
               <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
                  <Link to='/hospital/departments'>
                     <Card className='cursor-pointer transition-shadow duration-200 hover:shadow-md'>
                        <CardContent className='p-6 text-center'>
                           <div className='mx-auto mb-3 w-fit rounded-lg bg-blue-100 p-3'>
                              <Building className='h-8 w-8 text-blue-600' />
                           </div>
                           <h3 className='mb-2 font-semibold text-gray-900'>
                              Departments
                           </h3>
                           <p className='text-sm text-gray-600'>
                              Manage hospital departments and services
                           </p>
                        </CardContent>
                     </Card>
                  </Link>

                  <Link to='/hospital/beds'>
                     <Card className='cursor-pointer transition-shadow duration-200 hover:shadow-md'>
                        <CardContent className='p-6 text-center'>
                           <div className='mx-auto mb-3 w-fit rounded-lg bg-green-100 p-3'>
                              <Bed className='h-8 w-8 text-green-600' />
                           </div>
                           <h3 className='mb-2 font-semibold text-gray-900'>
                              Bed Management
                           </h3>
                           <p className='text-sm text-gray-600'>
                              Monitor bed availability and assignments
                           </p>
                        </CardContent>
                     </Card>
                  </Link>

                  <Link to='/hospital/staff'>
                     <Card className='cursor-pointer transition-shadow duration-200 hover:shadow-md'>
                        <CardContent className='p-6 text-center'>
                           <div className='mx-auto mb-3 w-fit rounded-lg bg-purple-100 p-3'>
                              <Users className='h-8 w-8 text-purple-600' />
                           </div>
                           <h3 className='mb-2 font-semibold text-gray-900'>
                              Staff Management
                           </h3>
                           <p className='text-sm text-gray-600'>
                              Manage hospital staff and schedules
                           </p>
                        </CardContent>
                     </Card>
                  </Link>

                  <Link to='/hospital/facilities'>
                     <Card className='cursor-pointer transition-shadow duration-200 hover:shadow-md'>
                        <CardContent className='p-6 text-center'>
                           <div className='mx-auto mb-3 w-fit rounded-lg bg-orange-100 p-3'>
                              <Settings className='h-8 w-8 text-orange-600' />
                           </div>
                           <h3 className='mb-2 font-semibold text-gray-900'>
                              Facilities
                           </h3>
                           <p className='text-sm text-gray-600'>
                              Manage hospital facilities and equipment
                           </p>
                        </CardContent>
                     </Card>
                  </Link>
               </div>

               {/* Departments Overview */}
               <Card>
                  <CardHeader>
                     <CardTitle>Departments Overview</CardTitle>
                     <CardDescription>
                        Current status and information for all hospital
                        departments
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <div className='grid grid-cols-1 gap-6'>
                        {mockDepartments.map((department) => (
                           <DepartmentCard
                              key={department.id}
                              department={department}
                           />
                        ))}
                     </div>
                  </CardContent>
               </Card>
            </main>
         </div>
      </div>
   );
}

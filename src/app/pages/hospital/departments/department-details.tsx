import { useEffect, useState } from 'react';

import {
   Activity,
   ArrowLeft,
   Bed,
   Building,
   Clock,
   Edit,
   Mail,
   MapPin,
   Phone,
   User,
   Users,
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

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

interface Department {
   id: string;
   name: string;
   description: string;
   headOfDepartment: string;
   location: string;
   phone: string;
   email: string;
   operatingHours: string;
   status: 'active' | 'maintenance' | 'closed';
   totalBeds: number;
   occupiedBeds: number;
   totalStaff: number;
   activePatients: number;
}

export function DepartmentDetailPage() {
   const { id } = useParams();

   const { user, isAuthenticated } = useAuthStore();
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [department, setDepartment] = useState<Department | null>(null);
   const navigate = useNavigate();

   useEffect(() => {
      if (!isAuthenticated || !user) {
         navigate('/');
         return;
      }

      // Load department data
      const loadDepartment = async () => {
         setIsLoading(true);

         // Simulate API call delay
         await new Promise((resolve) => setTimeout(resolve, 1000));

         // Mock department data based on departmentId
         const mockDepartment: Department = {
            id: id!,
            name: 'Emergency Department',
            description:
               'Emergency medical care and trauma services providing 24/7 critical care to patients with urgent medical conditions.',
            headOfDepartment: 'Dr. Sarah Wilson',
            location: 'Ground Floor, Wing A',
            phone: '+1-555-0100',
            email: 'emergency@hospital.com',
            operatingHours: '24/7',
            status: 'active',
            totalBeds: 25,
            occupiedBeds: 18,
            totalStaff: 45,
            activePatients: 23,
         };

         setDepartment(mockDepartment);
         setIsLoading(false);
      };

      loadDepartment();
   }, [isAuthenticated, user, navigate, id]);

   if (!isAuthenticated || !user) {
      return null;
   }

   const getStatusColor = (status: string) => {
      switch (status) {
         case 'active':
            return 'bg-green-100 text-green-800 border-green-200';
         case 'maintenance':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
         case 'closed':
            return 'bg-red-100 text-red-800 border-red-200';
         default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
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
                           Loading department details...
                        </p>
                     </div>
                  </div>
               </main>
            </div>
         </div>
      );
   }

   if (!department) {
      return (
         <div className='flex min-h-screen bg-gray-50'>
            <Sidebar
               isOpen={sidebarOpen}
               onClose={() => setSidebarOpen(false)}
            />

            <div className='w-full'>
               <Header onMenuClick={() => setSidebarOpen(true)} />

               <main className='p-6'>
                  <div className='flex min-h-96 items-center justify-center'>
                     <div className='text-center'>
                        <Building className='mx-auto mb-4 h-16 w-16 text-gray-400' />
                        <h2 className='mb-2 text-xl font-semibold text-gray-900'>
                           Department Not Found
                        </h2>
                        <p className='mb-4 text-gray-600'>
                           The requested department could not be found.
                        </p>
                        <Link to='/hospital/departments'>
                           <Button variant='outline'>
                              <ArrowLeft className='mr-2 h-4 w-4' />
                              Back to Departments
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
      <div className='min-h-screen bg-gray-50'>
         <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

         <div className='w-full'>
            <Header onMenuClick={() => setSidebarOpen(true)} />

            <main className='space-y-6 p-6'>
               {/* Page Header */}
               <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                     <Link to='/hospital/departments'>
                        <Button variant='outline' size='sm'>
                           <ArrowLeft className='mr-2 h-4 w-4' />
                           Back to Departments
                        </Button>
                     </Link>
                     <div>
                        <h1 className='font-inter text-2xl font-bold text-gray-900'>
                           {department.name}
                        </h1>
                        <p className='mt-1 text-gray-600'>
                           Department Details and Information
                        </p>
                     </div>
                  </div>
                  {user.role === 'admin' && (
                     <Link to={`/hospital/departments/${department.id}/edit`}>
                        <Button className='bg-blue-600 hover:bg-blue-700'>
                           <Edit className='mr-2 h-4 w-4' />
                           Edit Department
                        </Button>
                     </Link>
                  )}
               </div>

               {/* Department Overview */}
               <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
                  {/* Main Information */}
                  <div className='lg:col-span-2'>
                     <Card>
                        <CardHeader>
                           <div className='flex items-center justify-between'>
                              <CardTitle className='flex items-center space-x-2'>
                                 <Building className='h-5 w-5 text-blue-600' />
                                 <span>Department Information</span>
                              </CardTitle>
                              <Badge
                                 className={getStatusColor(department.status)}
                              >
                                 {department.status.charAt(0).toUpperCase() +
                                    department.status.slice(1)}
                              </Badge>
                           </div>
                        </CardHeader>
                        <CardContent className='space-y-6'>
                           <div>
                              <h3 className='mb-2 font-semibold text-gray-900'>
                                 Description
                              </h3>
                              <p className='leading-relaxed text-gray-600'>
                                 {department.description}
                              </p>
                           </div>

                           <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                              <div className='space-y-4'>
                                 <div className='flex items-center space-x-3'>
                                    <User className='h-5 w-5 text-gray-400' />
                                    <div>
                                       <p className='text-sm text-gray-500'>
                                          Head of Department
                                       </p>
                                       <p className='font-medium text-gray-900'>
                                          {department.headOfDepartment}
                                       </p>
                                    </div>
                                 </div>

                                 <div className='flex items-center space-x-3'>
                                    <MapPin className='h-5 w-5 text-gray-400' />
                                    <div>
                                       <p className='text-sm text-gray-500'>
                                          Location
                                       </p>
                                       <p className='font-medium text-gray-900'>
                                          {department.location}
                                       </p>
                                    </div>
                                 </div>

                                 <div className='flex items-center space-x-3'>
                                    <Clock className='h-5 w-5 text-gray-400' />
                                    <div>
                                       <p className='text-sm text-gray-500'>
                                          Operating Hours
                                       </p>
                                       <p className='font-medium text-gray-900'>
                                          {department.operatingHours}
                                       </p>
                                    </div>
                                 </div>
                              </div>

                              <div className='space-y-4'>
                                 <div className='flex items-center space-x-3'>
                                    <Phone className='h-5 w-5 text-gray-400' />
                                    <div>
                                       <p className='text-sm text-gray-500'>
                                          Phone
                                       </p>
                                       <p className='font-medium text-gray-900'>
                                          {department.phone}
                                       </p>
                                    </div>
                                 </div>

                                 <div className='flex items-center space-x-3'>
                                    <Mail className='h-5 w-5 text-gray-400' />
                                    <div>
                                       <p className='text-sm text-gray-500'>
                                          Email
                                       </p>
                                       <p className='font-medium text-gray-900'>
                                          {department.email}
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  </div>

                  {/* Statistics */}
                  <div className='space-y-6'>
                     <Card>
                        <CardHeader>
                           <CardTitle className='text-lg'>
                              Department Statistics
                           </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                           <div className='flex items-center justify-between rounded-lg bg-blue-50 p-3'>
                              <div className='flex items-center space-x-3'>
                                 <Bed className='h-5 w-5 text-blue-600' />
                                 <div>
                                    <p className='text-sm text-gray-600'>
                                       Bed Occupancy
                                    </p>
                                    <p className='font-semibold text-gray-900'>
                                       {department.occupiedBeds}/
                                       {department.totalBeds}
                                    </p>
                                 </div>
                              </div>
                              <div className='text-right'>
                                 <p className='text-sm font-medium text-blue-600'>
                                    {Math.round(
                                       (department.occupiedBeds /
                                          department.totalBeds) *
                                          100
                                    )}
                                    %
                                 </p>
                              </div>
                           </div>

                           <div className='flex items-center justify-between rounded-lg bg-green-50 p-3'>
                              <div className='flex items-center space-x-3'>
                                 <Users className='h-5 w-5 text-green-600' />
                                 <div>
                                    <p className='text-sm text-gray-600'>
                                       Total Staff
                                    </p>
                                    <p className='font-semibold text-gray-900'>
                                       {department.totalStaff}
                                    </p>
                                 </div>
                              </div>
                           </div>

                           <div className='flex items-center justify-between rounded-lg bg-orange-50 p-3'>
                              <div className='flex items-center space-x-3'>
                                 <Activity className='h-5 w-5 text-orange-600' />
                                 <div>
                                    <p className='text-sm text-gray-600'>
                                       Active Patients
                                    </p>
                                    <p className='font-semibold text-gray-900'>
                                       {department.activePatients}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </CardContent>
                     </Card>

                     {/* Quick Actions */}
                     <Card>
                        <CardHeader>
                           <CardTitle className='text-lg'>
                              Quick Actions
                           </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                           <Button
                              variant='outline'
                              className='w-full justify-start'
                           >
                              <Users className='mr-2 h-4 w-4' />
                              View Staff
                           </Button>
                           <Button
                              variant='outline'
                              className='w-full justify-start'
                           >
                              <Bed className='mr-2 h-4 w-4' />
                              Manage Beds
                           </Button>
                           <Button
                              variant='outline'
                              className='w-full justify-start'
                           >
                              <Activity className='mr-2 h-4 w-4' />
                              View Patients
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

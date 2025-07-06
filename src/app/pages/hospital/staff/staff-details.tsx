import { useEffect, useState } from 'react';

import {
   Activity,
   ArrowLeft,
   Award,
   Building,
   Calendar,
   Clock,
   Edit,
   Mail,
   MapPin,
   Phone,
   Shield,
   Stethoscope,
   User,
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

interface StaffMember {
   id: string;
   firstName: string;
   lastName: string;
   email: string;
   phone: string;
   role: string;
   department: string;
   position: string;
   employeeId: string;
   hireDate: Date;
   status: 'active' | 'inactive' | 'on-leave';
   avatar?: string;
   address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
   };
   schedule: {
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
      sunday: string;
   };
   qualifications: string[];
   certifications: {
      name: string;
      issuer: string;
      issueDate: Date;
      expiryDate: Date;
   }[];
   emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
   };
}

export default function StaffDetailPage() {
   const { id } = useParams();

   const { user, isAuthenticated } = useAuthStore();
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [staffMember, setStaffMember] = useState<StaffMember | null>(null);
   const [isLoading, setIsLoading] = useState(true);
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

      // Simulate loading staff member data
      const loadStaffMember = async () => {
         setIsLoading(true);

         // Simulate API call delay
         await new Promise((resolve) => setTimeout(resolve, 1000));

         // Mock staff member data
         const mockStaffMember: StaffMember = {
            id: id!,
            firstName: 'Dr. Sarah',
            lastName: 'Wilson',
            email: 'sarah.wilson@hospital.com',
            phone: '+1-555-0123',
            role: 'doctor',
            department: 'Cardiology',
            position: 'Senior Cardiologist',
            employeeId: 'EMP001',
            hireDate: new Date('2020-03-15'),
            status: 'active',
            avatar:
               'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
            address: {
               street: '123 Medical Drive',
               city: 'Healthcare City',
               state: 'CA',
               zipCode: '90210',
            },
            schedule: {
               monday: '8:00 AM - 6:00 PM',
               tuesday: '8:00 AM - 6:00 PM',
               wednesday: '8:00 AM - 6:00 PM',
               thursday: '8:00 AM - 6:00 PM',
               friday: '8:00 AM - 4:00 PM',
               saturday: 'Off',
               sunday: 'Off',
            },
            qualifications: [
               'MD - Harvard Medical School',
               'Residency - Johns Hopkins Hospital',
               'Fellowship - Mayo Clinic Cardiology',
            ],
            certifications: [
               {
                  name: 'Board Certification in Cardiology',
                  issuer: 'American Board of Internal Medicine',
                  issueDate: new Date('2018-06-01'),
                  expiryDate: new Date('2028-06-01'),
               },
               {
                  name: 'Advanced Cardiac Life Support (ACLS)',
                  issuer: 'American Heart Association',
                  issueDate: new Date('2023-01-15'),
                  expiryDate: new Date('2025-01-15'),
               },
            ],
            emergencyContact: {
               name: 'John Wilson',
               relationship: 'Spouse',
               phone: '+1-555-0124',
            },
         };

         setStaffMember(mockStaffMember);
         setIsLoading(false);
      };

      loadStaffMember();
   }, [isAuthenticated, user, navigate, id]);

   if (!isAuthenticated || !user || user.role !== 'admin') {
      return null;
   }

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
                           Loading staff member details...
                        </p>
                     </div>
                  </div>
               </main>
            </div>
         </div>
      );
   }

   if (!staffMember) {
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
                        <User className='mx-auto mb-4 h-16 w-16 text-gray-400' />
                        <h3 className='mb-2 text-lg font-medium text-gray-900'>
                           Staff Member Not Found
                        </h3>
                        <p className='mb-4 text-gray-600'>
                           The requested staff member could not be found.
                        </p>
                        <Link to='/hospital/staff'>
                           <Button>
                              <ArrowLeft className='mr-2 h-4 w-4' />
                              Back to Staff List
                           </Button>
                        </Link>
                     </div>
                  </div>
               </main>
            </div>
         </div>
      );
   }

   const getStatusColor = (status: string) => {
      switch (status) {
         case 'active':
            return 'bg-green-100 text-green-800';
         case 'inactive':
            return 'bg-red-100 text-red-800';
         case 'on-leave':
            return 'bg-yellow-100 text-yellow-800';
         default:
            return 'bg-gray-100 text-gray-800';
      }
   };

   const getRoleColor = (role: string) => {
      switch (role) {
         case 'doctor':
            return 'bg-blue-100 text-blue-800';
         case 'nurse':
            return 'bg-green-100 text-green-800';
         case 'admin':
            return 'bg-purple-100 text-purple-800';
         case 'technician':
            return 'bg-orange-100 text-orange-800';
         default:
            return 'bg-gray-100 text-gray-800';
      }
   };

   return (
      <div className='min-h-screen bg-gray-50'>
         <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

         <div className='w-full'>
            <Header onMenuClick={() => setSidebarOpen(true)} />

            <main className='space-y-6 p-6'>
               {/* Page Header */}
               <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                     <Link to='/hospital/staff'>
                        <Button variant='outline' size='sm'>
                           <ArrowLeft className='mr-2 h-4 w-4' />
                           Back to Staff
                        </Button>
                     </Link>
                     <div>
                        <h1 className='font-inter text-2xl font-bold text-gray-900'>
                           Staff Member Details
                        </h1>
                        <p className='mt-1 text-gray-600'>
                           View and manage staff member information
                        </p>
                     </div>
                  </div>
                  <div className='flex items-center space-x-3'>
                     <Button variant='outline'>
                        <Edit className='mr-2 h-4 w-4' />
                        Edit Profile
                     </Button>
                     <Button>
                        <Calendar className='mr-2 h-4 w-4' />
                        View Schedule
                     </Button>
                  </div>
               </div>

               {/* Staff Profile Header */}
               <Card>
                  <CardContent className='p-6'>
                     <div className='flex flex-col items-start space-y-4 md:flex-row md:items-center md:space-x-6 md:space-y-0'>
                        <Avatar className='h-24 w-24'>
                           <AvatarImage
                              src={staffMember.avatar}
                              alt={`${staffMember.firstName} ${staffMember.lastName}`}
                           />
                           <AvatarFallback className='text-2xl'>
                              {staffMember.firstName[0]}
                              {staffMember.lastName[0]}
                           </AvatarFallback>
                        </Avatar>

                        <div className='flex-1'>
                           <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
                              <div>
                                 <h1 className='text-2xl font-bold text-gray-900'>
                                    {staffMember.firstName}{' '}
                                    {staffMember.lastName}
                                 </h1>
                                 <p className='text-gray-600'>
                                    {staffMember.position}
                                 </p>
                                 <div className='mt-2 flex items-center space-x-2'>
                                    <Badge
                                       className={getRoleColor(
                                          staffMember.role
                                       )}
                                    >
                                       <Stethoscope className='mr-1 h-3 w-3' />
                                       {staffMember.role.toUpperCase()}
                                    </Badge>
                                    <Badge
                                       className={getStatusColor(
                                          staffMember.status
                                       )}
                                    >
                                       <Activity className='mr-1 h-3 w-3' />
                                       {staffMember.status.toUpperCase()}
                                    </Badge>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
                  {/* Contact Information */}
                  <div className='space-y-6 lg:col-span-2'>
                     <Card>
                        <CardHeader>
                           <CardTitle className='flex items-center space-x-2'>
                              <User className='h-5 w-5' />
                              <span>Contact Information</span>
                           </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                           <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                              <div className='flex items-center space-x-3'>
                                 <div className='rounded-lg bg-blue-100 p-2'>
                                    <Mail className='h-4 w-4 text-blue-600' />
                                 </div>
                                 <div>
                                    <p className='text-sm text-gray-500'>
                                       Email
                                    </p>
                                    <p className='font-medium'>
                                       {staffMember.email}
                                    </p>
                                 </div>
                              </div>

                              <div className='flex items-center space-x-3'>
                                 <div className='rounded-lg bg-green-100 p-2'>
                                    <Phone className='h-4 w-4 text-green-600' />
                                 </div>
                                 <div>
                                    <p className='text-sm text-gray-500'>
                                       Phone
                                    </p>
                                    <p className='font-medium'>
                                       {staffMember.phone}
                                    </p>
                                 </div>
                              </div>

                              <div className='flex items-start space-x-3 md:col-span-2'>
                                 <div className='rounded-lg bg-purple-100 p-2'>
                                    <MapPin className='h-4 w-4 text-purple-600' />
                                 </div>
                                 <div>
                                    <p className='text-sm text-gray-500'>
                                       Address
                                    </p>
                                    <p className='font-medium'>
                                       {staffMember.address.street}
                                       <br />
                                       {staffMember.address.city},{' '}
                                       {staffMember.address.state}{' '}
                                       {staffMember.address.zipCode}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </CardContent>
                     </Card>

                     {/* Employment Information */}
                     <Card>
                        <CardHeader>
                           <CardTitle className='flex items-center space-x-2'>
                              <Building className='h-5 w-5' />
                              <span>Employment Information</span>
                           </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                           <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                              <div>
                                 <p className='text-sm text-gray-500'>
                                    Employee ID
                                 </p>
                                 <p className='font-medium'>
                                    {staffMember.employeeId}
                                 </p>
                              </div>
                              <div>
                                 <p className='text-sm text-gray-500'>
                                    Department
                                 </p>
                                 <p className='font-medium'>
                                    {staffMember.department}
                                 </p>
                              </div>
                              <div>
                                 <p className='text-sm text-gray-500'>
                                    Position
                                 </p>
                                 <p className='font-medium'>
                                    {staffMember.position}
                                 </p>
                              </div>
                              <div>
                                 <p className='text-sm text-gray-500'>
                                    Hire Date
                                 </p>
                                 <p className='font-medium'>
                                    {staffMember.hireDate.toLocaleDateString()}
                                 </p>
                              </div>
                           </div>
                        </CardContent>
                     </Card>

                     {/* Schedule */}
                     <Card>
                        <CardHeader>
                           <CardTitle className='flex items-center space-x-2'>
                              <Clock className='h-5 w-5' />
                              <span>Weekly Schedule</span>
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className='space-y-3'>
                              {Object.entries(staffMember.schedule).map(
                                 ([day, hours]) => (
                                    <div
                                       key={day}
                                       className='flex items-center justify-between'
                                    >
                                       <span className='font-medium capitalize'>
                                          {day}
                                       </span>
                                       <span
                                          className={`text-sm ${hours === 'Off' ? 'text-gray-500' : 'text-gray-900'}`}
                                       >
                                          {hours}
                                       </span>
                                    </div>
                                 )
                              )}
                           </div>
                        </CardContent>
                     </Card>
                  </div>

                  {/* Sidebar Information */}
                  <div className='space-y-6'>
                     {/* Qualifications */}
                     <Card>
                        <CardHeader>
                           <CardTitle className='flex items-center space-x-2'>
                              <Award className='h-5 w-5' />
                              <span>Qualifications</span>
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className='space-y-2'>
                              {staffMember.qualifications.map(
                                 (qualification, index) => (
                                    <div key={index} className='text-sm'>
                                       <p className='font-medium'>
                                          {qualification}
                                       </p>
                                    </div>
                                 )
                              )}
                           </div>
                        </CardContent>
                     </Card>

                     {/* Certifications */}
                     <Card>
                        <CardHeader>
                           <CardTitle className='flex items-center space-x-2'>
                              <Shield className='h-5 w-5' />
                              <span>Certifications</span>
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className='space-y-4'>
                              {staffMember.certifications.map((cert, index) => (
                                 <div
                                    key={index}
                                    className='rounded-lg border p-3'
                                 >
                                    <h4 className='text-sm font-medium'>
                                       {cert.name}
                                    </h4>
                                    <p className='text-xs text-gray-600'>
                                       {cert.issuer}
                                    </p>
                                    <div className='mt-2 flex justify-between text-xs text-gray-500'>
                                       <span>
                                          Issued:{' '}
                                          {cert.issueDate.toLocaleDateString()}
                                       </span>
                                       <span>
                                          Expires:{' '}
                                          {cert.expiryDate.toLocaleDateString()}
                                       </span>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </CardContent>
                     </Card>

                     {/* Emergency Contact */}
                     <Card>
                        <CardHeader>
                           <CardTitle>Emergency Contact</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className='space-y-2'>
                              <p className='font-medium'>
                                 {staffMember.emergencyContact.name}
                              </p>
                              <p className='text-sm text-gray-600'>
                                 {staffMember.emergencyContact.relationship}
                              </p>
                              <p className='text-sm text-gray-600'>
                                 {staffMember.emergencyContact.phone}
                              </p>
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

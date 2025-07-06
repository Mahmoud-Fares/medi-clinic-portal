import { useEffect, useState } from 'react';

import { ArrowLeft, Building, Save, X } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useAuthStore } from '@/shared/lib/store';

import { Header } from '@/app/layouts/components/header';
import { Sidebar } from '@/app/layouts/components/sidebar';

interface DepartmentForm {
   name: string;
   description: string;
   headOfDepartment: string;
   location: string;
   phone: string;
   email: string;
   operatingHours: string;
   status: 'active' | 'maintenance' | 'closed';
}

export default function DepartmentEditPage() {
   const { id } = useParams();

   const { user, isAuthenticated } = useAuthStore();
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [isSaving, setIsSaving] = useState(false);
   const navigate = useNavigate();

   const [formData, setFormData] = useState<DepartmentForm>({
      name: '',
      description: '',
      headOfDepartment: '',
      location: '',
      phone: '',
      email: '',
      operatingHours: '',
      status: 'active',
   });

   useEffect(() => {
      if (!isAuthenticated || !user) {
         navigate('/');
         return;
      }
      if (user.role !== 'admin') {
         navigate('/dashboard');
         return;
      }

      // Load department data
      const loadDepartment = async () => {
         setIsLoading(true);

         // Simulate API call delay
         await new Promise((resolve) => setTimeout(resolve, 1000));

         // Mock department data based on departmentId
         const mockDepartment = {
            name: 'Emergency Department',
            description: 'Emergency medical care and trauma services',
            headOfDepartment: 'Dr. Sarah Wilson',
            location: 'Ground Floor, Wing A',
            phone: '+1-555-0100',
            email: 'emergency@hospital.com',
            operatingHours: '24/7',
            status: 'active' as const,
         };

         setFormData(mockDepartment);
         setIsLoading(false);
      };

      loadDepartment();
   }, [isAuthenticated, user, navigate, id]);

   if (!isAuthenticated || !user || user.role !== 'admin') {
      return null;
   }

   const handleInputChange = (field: keyof DepartmentForm, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSaving(true);

      try {
         // Simulate API call
         await new Promise((resolve) => setTimeout(resolve, 1500));

         console.log('Saving department:', formData);
         alert('Department updated successfully!');
         navigate('/hospital/departments');
      } catch (error) {
         console.error('Error saving department:', error);
         alert('Error saving department. Please try again.');
      } finally {
         setIsSaving(false);
      }
   };

   const handleCancel = () => {
      navigate('/hospital/departments');
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

   return (
      <div className='flex min-h-screen bg-gray-50'>
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
                           Edit Department
                        </h1>
                        <p className='mt-1 text-gray-600'>
                           Update department information and settings
                        </p>
                     </div>
                  </div>
               </div>

               {/* Edit Form */}
               <Card className='max-w-4xl'>
                  <CardHeader>
                     <CardTitle className='flex items-center space-x-2'>
                        <Building className='h-5 w-5 text-blue-600' />
                        <span>Department Information</span>
                     </CardTitle>
                     <CardDescription>
                        Update the department details below
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                           <div className='space-y-2'>
                              <Label htmlFor='name'>Department Name *</Label>
                              <Input
                                 id='name'
                                 value={formData.name}
                                 onChange={(e) =>
                                    handleInputChange('name', e.target.value)
                                 }
                                 placeholder='e.g., Emergency Department'
                                 required
                              />
                           </div>

                           <div className='space-y-2'>
                              <Label htmlFor='headOfDepartment'>
                                 Head of Department *
                              </Label>
                              <Input
                                 id='headOfDepartment'
                                 value={formData.headOfDepartment}
                                 onChange={(e) =>
                                    handleInputChange(
                                       'headOfDepartment',
                                       e.target.value
                                    )
                                 }
                                 placeholder='e.g., Dr. Sarah Wilson'
                                 required
                              />
                           </div>

                           <div className='space-y-2 md:col-span-2'>
                              <Label htmlFor='description'>Description *</Label>
                              <textarea
                                 id='description'
                                 value={formData.description}
                                 onChange={(e) =>
                                    handleInputChange(
                                       'description',
                                       e.target.value
                                    )
                                 }
                                 placeholder="Brief description of the department's services"
                                 className='w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                                 rows={3}
                                 required
                              />
                           </div>

                           <div className='space-y-2'>
                              <Label htmlFor='location'>Location *</Label>
                              <Input
                                 id='location'
                                 value={formData.location}
                                 onChange={(e) =>
                                    handleInputChange(
                                       'location',
                                       e.target.value
                                    )
                                 }
                                 placeholder='e.g., Ground Floor, Wing A'
                                 required
                              />
                           </div>

                           <div className='space-y-2'>
                              <Label htmlFor='operatingHours'>
                                 Operating Hours *
                              </Label>
                              <Input
                                 id='operatingHours'
                                 value={formData.operatingHours}
                                 onChange={(e) =>
                                    handleInputChange(
                                       'operatingHours',
                                       e.target.value
                                    )
                                 }
                                 placeholder='e.g., 24/7 or 8:00 AM - 6:00 PM'
                                 required
                              />
                           </div>

                           <div className='space-y-2'>
                              <Label htmlFor='phone'>Phone Number *</Label>
                              <Input
                                 id='phone'
                                 type='tel'
                                 value={formData.phone}
                                 onChange={(e) =>
                                    handleInputChange('phone', e.target.value)
                                 }
                                 placeholder='e.g., +1-555-0100'
                                 required
                              />
                           </div>

                           <div className='space-y-2'>
                              <Label htmlFor='email'>Email Address *</Label>
                              <Input
                                 id='email'
                                 type='email'
                                 value={formData.email}
                                 onChange={(e) =>
                                    handleInputChange('email', e.target.value)
                                 }
                                 placeholder='e.g., emergency@hospital.com'
                                 required
                              />
                           </div>

                           <div className='space-y-2'>
                              <Label htmlFor='status'>Status *</Label>
                              <select
                                 id='status'
                                 value={formData.status}
                                 onChange={(e) =>
                                    handleInputChange('status', e.target.value)
                                 }
                                 className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                                 required
                              >
                                 <option value='active'>Active</option>
                                 <option value='maintenance'>
                                    Maintenance
                                 </option>
                                 <option value='closed'>Closed</option>
                              </select>
                           </div>
                        </div>

                        {/* Form Actions */}
                        <div className='flex justify-end space-x-3 border-t pt-6'>
                           <Button
                              type='button'
                              variant='outline'
                              onClick={handleCancel}
                              disabled={isSaving}
                           >
                              <X className='mr-2 h-4 w-4' />
                              Cancel
                           </Button>
                           <Button
                              type='submit'
                              disabled={isSaving}
                              className='bg-blue-600 hover:bg-blue-700'
                           >
                              {isSaving ? (
                                 <>
                                    <div className='mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white'></div>
                                    Saving...
                                 </>
                              ) : (
                                 <>
                                    <Save className='mr-2 h-4 w-4' />
                                    Save Changes
                                 </>
                              )}
                           </Button>
                        </div>
                     </form>
                  </CardContent>
               </Card>
            </main>
         </div>
      </div>
   );
}

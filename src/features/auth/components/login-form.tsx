'use client';

import { useState } from 'react';

import {
   Calculator,
   Eye,
   EyeOff,
   Loader2,
   Pill,
   Shield,
   Stethoscope,
   Users,
} from 'lucide-react';

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
import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from '@/shared/components/ui/tabs';
import { authService } from '@/shared/lib/auth';
import { useAuthStore } from '@/shared/lib/store';

export function LoginForm() {
   const [showPassword, setShowPassword] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState('');
   const { setUser, setLoading } = useAuthStore();

   const [formData, setFormData] = useState({
      email: '',
      password: '',
   });

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (error) setError(''); // Clear error when user starts typing
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      console.log('🔐 LoginForm: Attempting login for:', formData.email);

      if (!formData.email || !formData.password) {
         setError('Please fill in all fields');
         return;
      }

      setIsLoading(true);
      setLoading(true);
      setError('');

      try {
         const { user } = await authService.login(
            formData.email,
            formData.password
         );
         console.log('✅ LoginForm: Login successful, setting user');
         setUser(user);
      } catch (error) {
         console.error('❌ LoginForm: Login failed:', error);
         setError('Invalid email or password. Please try again.');
      } finally {
         setIsLoading(false);
         setLoading(false);
      }
   };

   const demoUsers = [
      {
         role: 'patient',
         email: 'patient@demo.com',
         icon: Users,
         title: 'Patient Portal',
         description: 'Access appointments, medical records, and billing',
      },
      {
         role: 'doctor',
         email: 'doctor@demo.com',
         icon: Stethoscope,
         title: 'Doctor Dashboard',
         description: 'Manage patients, consultations, and prescriptions',
      },
      {
         role: 'admin',
         email: 'admin@demo.com',
         icon: Shield,
         title: 'Hospital Admin',
         description: 'Oversee operations, staff, and emergency management',
      },
      {
         role: 'pharmacy',
         email: 'pharmacy@demo.com',
         icon: Pill,
         title: 'Pharmacy System',
         description: 'Process prescriptions and manage inventory',
      },
      {
         role: 'accountant',
         email: 'accountant@demo.com',
         icon: Calculator,
         title: 'Financial Portal',
         description: 'Handle billing, payments, and financial reports',
      },
   ];

   const fillDemoCredentials = (email: string) => {
      setFormData({ email, password: 'demo123' });
      setError('');
   };

   return (
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4'>
         <div className='w-full max-w-4xl'>
            <Tabs defaultValue='login' className='space-y-8'>
               {/* Header */}
               <div className='space-y-4 text-center'>
                  <div className='flex justify-center'>
                     <div className='bg-gradient-medical flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-white'>
                           <div className='h-6 w-6 rounded-full bg-primary'></div>
                        </div>
                     </div>
                  </div>
                  <div>
                     <h1 className='font-inter text-3xl font-bold text-gray-900'>
                        MediCare Hospital System
                     </h1>
                     <p className='mt-2 text-gray-600'>
                        Comprehensive healthcare management platform
                     </p>
                  </div>
               </div>

               <TabsList className='mx-auto grid w-full max-w-md grid-cols-2'>
                  <TabsTrigger value='login'>Sign In</TabsTrigger>
                  <TabsTrigger value='demo'>Demo Access</TabsTrigger>
               </TabsList>

               <TabsContent value='login' className='space-y-6'>
                  <Card className='mx-auto max-w-md'>
                     <CardHeader className='space-y-1'>
                        <CardTitle className='font-center text-2xl'>
                           Sign in
                        </CardTitle>
                        <CardDescription>
                           Enter your credentials to access the system
                        </CardDescription>
                     </CardHeader>
                     <CardContent className='space-y-4'>
                        <form onSubmit={handleSubmit} className='space-y-4'>
                           <div className='space-y-2'>
                              <Label htmlFor='email'>Email</Label>
                              <Input
                                 id='email'
                                 name='email'
                                 type='email'
                                 placeholder='Enter your email'
                                 value={formData.email}
                                 onChange={handleInputChange}
                                 disabled={isLoading}
                                 required
                              />
                           </div>
                           <div className='space-y-2'>
                              <Label htmlFor='password'>Password</Label>
                              <div className='relative'>
                                 <Input
                                    id='password'
                                    name='password'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Enter your password'
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    required
                                 />
                                 <Button
                                    type='button'
                                    variant='ghost'
                                    size='sm'
                                    className='absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 transform p-0'
                                    onClick={() =>
                                       setShowPassword(!showPassword)
                                    }
                                    disabled={isLoading}
                                 >
                                    {showPassword ? (
                                       <EyeOff className='h-4 w-4' />
                                    ) : (
                                       <Eye className='h-4 w-4' />
                                    )}
                                 </Button>
                              </div>
                           </div>

                           {error && (
                              <div className='rounded-lg border border-red-200 bg-red-50 p-3'>
                                 <p className='text-sm text-red-600'>{error}</p>
                              </div>
                           )}

                           <Button
                              type='submit'
                              className='w-full'
                              disabled={isLoading}
                           >
                              {isLoading ? (
                                 <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Signing in...
                                 </>
                              ) : (
                                 'Sign in'
                              )}
                           </Button>
                        </form>
                     </CardContent>
                  </Card>
               </TabsContent>

               <TabsContent value='demo' className='space-y-6'>
                  <div className='text-center'>
                     <h2 className='mb-2 text-xl font-semibold text-gray-900'>
                        Try Demo Accounts
                     </h2>
                     <p className='text-sm text-gray-600'>
                        Explore different user roles with pre-configured demo
                        accounts
                     </p>
                  </div>

                  <div className='mx-auto grid max-w-4xl gap-4'>
                     {demoUsers.map((user) => {
                        const Icon = user.icon;
                        return (
                           <Card
                              key={user.role}
                              className='cursor-pointer transition-shadow duration-200 hover:shadow-md'
                              onClick={() => fillDemoCredentials(user.email)}
                           >
                              <CardContent className='flex items-center p-6'>
                                 <div className='mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100'>
                                    <Icon className='h-6 w-6 text-blue-600' />
                                 </div>
                                 <div className='flex-1'>
                                    <h3 className='font-semibold text-gray-900'>
                                       {user.title}
                                    </h3>
                                    <p className='text-sm text-gray-600'>
                                       {user.description}
                                    </p>
                                    <p className='mt-1 text-xs text-blue-600'>
                                       {user.email} • Password: demo123
                                    </p>
                                 </div>
                                 <Button variant='outline' size='sm'>
                                    Try Now
                                 </Button>
                              </CardContent>
                           </Card>
                        );
                     })}
                  </div>

                  <div className='text-center'>
                     <p className='text-sm text-gray-500'>
                        All demo accounts use the password:{' '}
                        <span className='font-mono font-semibold'>demo123</span>
                     </p>
                  </div>
               </TabsContent>
            </Tabs>

            {/* Features */}
            <div className='mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3'>
               <div className='space-y-2 text-center'>
                  <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100'>
                     <Shield className='h-6 w-6 text-blue-600' />
                  </div>
                  <h3 className='font-semibold text-gray-900'>
                     HIPAA Compliant
                  </h3>
                  <p className='text-sm text-gray-600'>
                     End-to-end encryption and secure data handling
                  </p>
               </div>
               <div className='space-y-2 text-center'>
                  <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-green-100'>
                     <Stethoscope className='h-6 w-6 text-green-600' />
                  </div>
                  <h3 className='font-semibold text-gray-900'>
                     Telemedicine Ready
                  </h3>
                  <p className='text-sm text-gray-600'>
                     Built-in video consultations and remote care
                  </p>
               </div>
               <div className='space-y-2 text-center'>
                  <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100'>
                     <Users className='h-6 w-6 text-purple-600' />
                  </div>
                  <h3 className='font-semibold text-gray-900'>
                     Multi-Role Support
                  </h3>
                  <p className='text-sm text-gray-600'>
                     Patients, doctors, admins, pharmacy, and accounting
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}

import { Navigate, Outlet, ScrollRestoration } from 'react-router-dom';

import { BackToHomeButton } from '@/shared/components/back-to-home';

import { useAuth } from '@/features/auth';

export default function AuthLayout() {
   const { isAuthenticated } = useAuth();

   if (isAuthenticated) return <Navigate to='/' replace />;

   return (
      <>
         <ScrollRestoration />

         <div className='flex min-h-screen animate-fade-in flex-col justify-center px-3 py-12 sm:px-6 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
               <BackToHomeButton className='mb-6' />

               <h2 className='gradient-text mt-6 animate-fade-in text-center text-3xl font-extrabold'>
                  Healthcare
               </h2>
            </div>

            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
               <Outlet />
            </div>
         </div>
      </>
   );
}

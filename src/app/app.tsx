import { RouterProvider } from 'react-router-dom';

import { Toaster } from '@/shared/components/ui/sonner';

import { router } from '@/app/router';

export default function App() {
   return (
      <>
         <RouterProvider router={router} />
         <Toaster
            position='top-right'
            toastOptions={{
               duration: 4000,
               style: {
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  color: '#374151',
               },
            }}
         />
      </>
   );
}

import { MoveRight } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

import consultation from '/landing/consultation.png';

export const RightCard = () => (
   <div className='gap-4 rounded bg-lightGreen p-6 max-md:space-y-6 md:flex'>
      <div className='flex flex-1 flex-col justify-between gap-4 md:gap-6'>
         <div className='space-y-3 lg:space-y-6'>
            <Button variant='outline' className='w-fit'>
               Healthy lifestyle
            </Button>

            <h4 className='max-w-[90%] text-2xl font-semibold lg:text-4xl'>
               Your Ultimate Guide to Health and Wellness
            </h4>
         </div>

         <div className='flex items-center gap-2'>
            <Button variant='secondary' className='rounded-full'>
               Book Consultation
            </Button>
            <Button variant='secondary' size='icon' className='rounded-full'>
               <MoveRight />
            </Button>
         </div>
      </div>

      <figure className='flex justify-center object-contain md:basis-1/3'>
         <img src={consultation} alt='doctor image' className='max-w-full' />
      </figure>
   </div>
);

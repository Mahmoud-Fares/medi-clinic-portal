import { Button } from '@/shared/components/ui/button';

import blog1 from '/landing/blog1.png';
import blog2 from '/landing/blog2.png';
import blog3 from '/landing/blog3.png';

export const LeftCard = () => (
   <div className='space-y-6 rounded bg-lightPurple/30 p-6'>
      <Button variant='outline'>Blog Topic</Button>

      <div className='grid grid-cols-3 gap-4'>
         <img src={blog1} alt='blog-1 image' className='rounded' />
         <img src={blog2} alt='blog-2 image' className='rounded-full' />
         <img src={blog3} alt='blog-3 image' className='rounded' />
      </div>

      <h4 className='text-2xl font-semibold lg:text-4xl'>
         Acne Care Combo of <br /> Cetaphil Oily Skin Cleanse.
      </h4>
   </div>
);

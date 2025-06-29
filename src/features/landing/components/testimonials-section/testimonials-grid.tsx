import { Play } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

import { TestimonialsCard } from './testimonials-card';
import testimonials1 from '/landing/testimonials1.png';
import testimonials2 from '/landing/testimonials2.png';
import testimonials3 from '/landing/testimonials3.png';
import testimonials4 from '/landing/testimonials4.png';

type Props = {
   className?: string;
};

export function TestimonialsGrid({ className }: Props) {
   return (
      <div
         className={cn(
            'grid grid-cols-1 gap-2 py-2 md:grid-cols-4 md:grid-rows-[auto_auto]',
            className
         )}
      >
         <TestimonialsCard
            badge='Podcast'
            header='Nutrition and mental health.'
            paragraph='The food we eat provide the nutrients that our bodies needs to function properly.'
            imageSrc={testimonials1}
            imageAlt='testimonials image'
            className='md:col-span-2 md:row-span-2'
         >
            <span className='inline-flex w-fit rounded-full bg-secondary p-4'>
               <Play className='fill-primary' />
            </span>
         </TestimonialsCard>

         <TestimonialsCard
            badge='Live event'
            header='Healthy Habits for a happy heart'
            imageSrc={testimonials2}
            imageAlt='testimonials image'
            className='bg-primary text-primary-foreground md:col-span-2'
            imageClassName='max-h-40'
         />

         <TestimonialsCard
            header='09'
            paragraph='Years Experience.'
            imageSrc={testimonials3}
            imageAlt='testimonials image'
            className='bg-lightGreen'
            contentClassName='mt-auto'
         />

         <TestimonialsCard
            header='150k'
            paragraph='Happy Customers.'
            imageSrc={testimonials4}
            imageAlt='testimonials image'
            className='bg-lightPurple'
            contentClassName='mt-auto'
         />
      </div>
   );
}

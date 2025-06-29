import { Plus, Star } from 'lucide-react';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

import placeholder from '/placeholder.svg';

type Props = {
   className?: string;
};

export const DealsCard = ({ className }: Props) => {
   return (
      <article
         className={cn(
            'group relative aspect-square min-h-72 overflow-hidden rounded-lg',
            className
         )}
      >
         <img
            src={placeholder}
            alt='deals image'
            className='size-full object-contain'
         />

         <DetailsSection className='absolute bottom-0 left-0 translate-y-full transform transition-smooth group-hover:translate-y-0' />
      </article>
   );
};

type DetailsProps = {
   className?: string;
};
export const DetailsSection = ({ className }: DetailsProps) => (
   <section
      className={cn(
         'space-y-2 rounded-lg bg-background p-3 text-foreground',
         className
      )}
   >
      <div className='flex items-center justify-between gap-2'>
         <span className='text-lightGreen'>Nutrition</span>

         <Badge
            variant='secondary'
            className='bg-transparent capitalize text-lightGreen hover:bg-transparent'
         >
            <Star className='fill-yellow-500 stroke-yellow-500 text-yellow-500' />
            (4.5)
         </Badge>
      </div>

      <h4 className='max-w-[60%]'>Dietary Supplement Health Products</h4>

      <div className='flex items-center justify-between gap-4'>
         <Button
            variant='outline'
            className='flex items-center gap-2 rounded-full hover:bg-primary hover:text-primary-foreground'
         >
            <Plus />
            <span>Add to Cart</span>
         </Button>

         <span className='flex items-center gap-2 font-semibold'>
            <span className='text-muted-foreground'>$80.00</span>
            <span>$50.00</span>
         </span>
      </div>
   </section>
);

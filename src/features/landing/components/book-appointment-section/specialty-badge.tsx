import { cn } from '@/shared/lib/utils';

import specialtyImage from '/landing/specialty.png';

export const SpecialtyBadge = () => {
   return (
      <span
         className={cn(
            'inline-flex items-center gap-2 rounded bg-secondary p-4 text-secondary-foreground',
            'transition-smooth hover:bg-primary hover:text-primary-foreground'
         )}
      >
         Obesity
         <img
            src={specialtyImage}
            alt='specialty badge'
            className='max-h-8 max-w-8 flex-shrink-0 object-contain'
         />
      </span>
   );
};

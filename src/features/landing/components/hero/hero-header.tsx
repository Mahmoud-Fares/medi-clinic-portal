import { Activity, CloudRain } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

type Props = {
   className?: string;
};

export const HeroHeader = ({ className }: Props) => (
   <header className={cn('', className)}>
      <h1 className='text-center text-hero font-bold leading-none'>
         Healthcare
      </h1>

      <HeroBadges />
   </header>
);

const HeroBadges = ({ className }: Props) => {
   const BADGES = [
      {
         title: 'Reduce HbA1c',
         icon: Activity,
         className: 'bg-lightPurple',
      },
      {
         title: 'No More Medications',
         icon: CloudRain,
         className: 'bg-lightGreen',
      },
   ];

   return (
      <div
         className={cn(
            'relative top-4 flex flex-wrap items-center justify-evenly gap-2 sm:top-8 sm:px-4 lg:top-10 lg:px-8',
            className
         )}
      >
         {BADGES.map((badge) => (
            <div
               key={badge.title}
               className='flex items-center gap-3 rounded-full shadow-lg sm:px-4 sm:py-2 lg:px-6 lg:py-3'
            >
               <Button
                  variant='secondary'
                  size='icon'
                  className={cn('rounded-full', badge.className)}
               >
                  <badge.icon className='size-4 lg:size-5' />
               </Button>

               <span className='text-sm font-semibold lg:text-base'>
                  {badge.title}
               </span>
            </div>
         ))}
      </div>
   );
};

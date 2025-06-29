import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

import { NAVIGATION_LINKS } from './navigation-links';
import { SearchInput } from './search-input';

type Props = {
   className?: string;
};

export const MobileDropdownMenu = ({ className }: Props) => {
   return (
      <div className={cn('rounded shadow-lg', className)}>
         <div className='mt-3 space-y-1 px-4 py-4'>
            <MobileNavigationLinks />

            <MobileActions />

            <SearchInput className='xs:hidden pt-3' />
         </div>
      </div>
   );
};

const MobileNavigationLinks = ({ className }: Props) => (
   <nav className={cn('flex flex-col items-center gap-3', className)}>
      {NAVIGATION_LINKS.map((link) => (
         <Button
            variant='link'
            key={link.label}
            className={cn(
               'flex w-full items-center justify-between gap-6',
               'border border-transparent transition-smooth hover:border-b-transparent hover:border-l-primary hover:bg-accent',
               link.className
            )}
         >
            <span>{link.label}</span>

            <link.icon />
         </Button>
      ))}
   </nav>
);

const MobileActions = () => (
   <div className={cn('border-t border-border pt-3', 'grid grid-cols-2 gap-3')}>
      <Button
         variant='secondary'
         className={cn(
            'flex h-full flex-col items-center gap-2 rounded-lg bg-lightBlue/30 py-3',
            'hover:bg-lightBlue/60'
         )}
      >
         <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-600'>
            📋
         </div>

         <span className='text-xs font-medium text-blue-700'>
            Book Appointment
         </span>
      </Button>

      <Button
         variant='secondary'
         className={cn(
            'flex h-full flex-col items-center gap-2 rounded-lg bg-lightGreen/30 py-3',
            'hover:bg-lightGreen/60'
         )}
      >
         <div className='flex h-10 w-10 items-center justify-center rounded-full bg-green-600'>
            💊
         </div>

         <span className='text-xs font-medium text-green-700'>
            Book Appointment
         </span>
      </Button>
   </div>
);

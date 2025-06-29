import { Search } from 'lucide-react';

import { Input } from '@/shared/components/ui/input';
import { cn } from '@/shared/lib/utils';

export const SearchInput = ({ className }: { className?: string }) => {
   return (
      <div className={cn('relative flex items-center', className)}>
         <div className='absolute left-1 z-10 flex size-7 items-center justify-center rounded-full bg-lightOrange'>
            <Search className='size-4 text-primary' />
         </div>

         <Input
            type='search'
            placeholder='Search Here...'
            className='rounded-full bg-background py-2 pl-10 text-sm placeholder-muted-foreground shadow-sm'
            aria-label='Search healthcare services'
         />
      </div>
   );
};

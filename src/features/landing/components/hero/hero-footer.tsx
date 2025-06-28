import { MoveRight } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

type Props = {
   className?: string;
};

export const HeroFooter = ({ className }: Props) => (
   <footer
      className={cn(
         'flex flex-col items-center justify-between gap-4 md:flex-row',
         className
      )}
   >
      <p className='max-w-[37ch] uppercase hero:max-w-[28%]'>
         If you are looking for a creative and easy way to build a website. Wow!
         is the perfect solution.
      </p>

      <div className='flex items-center gap-1'>
         <Button variant='secondary' className='rounded-full'>
            Book Consultation
         </Button>
         <Button variant='secondary' size='icon' className='rounded-full'>
            <MoveRight />
         </Button>
      </div>
   </footer>
);

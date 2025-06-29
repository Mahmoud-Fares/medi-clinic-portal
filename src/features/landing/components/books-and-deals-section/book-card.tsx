import { cn } from '@/shared/lib/utils';

import image from '/landing/books.png';
import placeholder from '/placeholder.svg';

export const BooksCard = ({ className }: { className?: string }) => {
   return (
      <article
         className={cn(
            'grid gap-2',
            'aspect-square min-h-72 rounded-lg bg-card text-card-foreground',
            className
         )}
      >
         <BooksCardContent className='col-start-1 col-end-3 row-start-1 row-end-4' />

         <img
            src={image ?? placeholder}
            alt='book image'
            className={cn(
               'col-start-2 col-end-3 row-start-2 row-end-4 self-end justify-self-end',
               'aspect-square object-contain'
            )}
         />
      </article>
   );
};

const BooksCardContent = ({ className }: { className?: string }) => {
   return (
      <div className={cn('flex flex-col justify-between gap-2 p-6', className)}>
         <header className={cn('relative space-y-2')}>
            <span className='inline-flex w-[40%] bg-lightGreen py-1 pl-1 text-sm font-semibold'>
               60%
            </span>
            <h4 className='max-w-[12ch] text-3xl'>Orthopedists tests</h4>

            <p className='leading-1 max-w-[25ch]'>
               Orthropedists can cllagnose ard Irieat var ous lypen cl bock and
               neck pain
            </p>
         </header>

         <p className={cn('flex items-start gap-2 text-2xl font-semibold')}>
            $120{' '}
            <span className='text-base text-muted-foreground/30 line-through'>
               $140
            </span>
         </p>
      </div>
   );
};

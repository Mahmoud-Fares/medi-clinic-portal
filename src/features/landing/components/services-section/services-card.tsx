import { MoveRight } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

import placeholder from '/placeholder.svg';

type CardProps = {
   title: React.ReactElement;
   content: string;
   image?: string;
   colorClassName?: string;
};
export const ServicesCard = ({
   title,
   content,
   image = placeholder,
   colorClassName,
}: CardProps) => {
   return (
      <article className={cn('space-y-5 rounded p-4', colorClassName)}>
         <header className='space-y-2 capitalize'>
            <h4 className='text-2xl font-bold'>{title}</h4>
            <p className='text-sm'>{content}</p>
         </header>

         <div className='flex items-end justify-between gap-4'>
            <Button size='icon' className='m-4 rounded-full p-5'>
               <MoveRight className='size-8' />
            </Button>

            <img
               src={image}
               alt='service image'
               className='aspect-square h-40 object-contain sm:h-48'
            />
         </div>
      </article>
   );
};

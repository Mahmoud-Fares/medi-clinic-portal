import { Badge } from '@/shared/components/ui/badge';
import { cn } from '@/shared/lib/utils';

type Props = {
   className?: string;
   badge?: string;
   header?: string;
   paragraph?: string;
   children?: React.ReactNode;
   imageSrc: string;
   imageAlt: string;
   imageClassName?: string;
   contentClassName?: string;
};
export const TestimonialsCard = ({
   className,
   badge,
   header,
   paragraph,
   children,
   imageSrc,
   imageAlt,
   imageClassName,
   contentClassName,
}: Props) => {
   return (
      <article
         className={cn(
            'grid grid-cols-2 rounded bg-lightOrange p-6',
            className
         )}
      >
         <div
            className={cn(
               'flex flex-col justify-between gap-4',
               contentClassName
            )}
         >
            <header className={cn('space-y-2')}>
               {badge && (
                  <Badge variant='secondary' className='capitalize'>
                     {badge}
                  </Badge>
               )}
               <h4 className='text-4xl font-semibold capitalize'>{header}</h4>
               <p className={cn('max-w-[90%] text-sm capitalize')}>
                  {paragraph}
               </p>
            </header>

            {children && children}
         </div>

         <img
            src={imageSrc}
            alt={imageAlt}
            className={cn(
               'mx-auto mt-auto flex aspect-square object-contain',
               imageClassName
            )}
         />
      </article>
   );
};

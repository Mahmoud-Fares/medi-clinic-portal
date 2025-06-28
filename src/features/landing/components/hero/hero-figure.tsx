import { cn } from '@/shared/lib/utils';

type Props = {
   className?: string;
};
export const HeroFigure = ({ className }: Props) => (
   <figure className={cn('', className)}>
      <img src='/landing/hero.png' alt='hero image' className='mx-auto' />
   </figure>
);

import { Container } from '@/shared/components/container';
import { cn } from '@/shared/lib/utils';

import { HeroFigure } from './hero-figure';
import { HeroFooter } from './hero-footer';
import { HeroHeader } from './hero-header';

export default function Hero() {
   return (
      <section>
         <Container>
            <div
               className={cn(
                  'space-y-4 rounded bg-primary p-6 text-primary-foreground',
                  'hero:grid hero:pb-0'
               )}
            >
               <HeroHeader className='hero:col-start-1 hero:col-end-4 hero:row-start-1 hero:row-end-3' />

               <HeroFigure className='hero:col-start-1 hero:col-end-4 hero:row-start-2 hero:row-end-4' />

               <HeroFooter className='hero:col-start-1 hero:col-end-4 hero:row-start-3 hero:row-end-4 hero:pb-6' />
            </div>
         </Container>
      </section>
   );
}

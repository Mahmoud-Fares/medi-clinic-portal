import { MoveRight } from 'lucide-react';

import { Container } from '@/shared/components/container';
import SectionHeader from '@/shared/components/section-header';
import { Button } from '@/shared/components/ui/button';

import { BooksList } from './books-list';
import { DealsList } from './deals-list';

export default function BooksAndDealsSection() {
   return (
      <section className='py-section'>
         <Container>
            <div className='space-y-6 rounded bg-primary p-4 text-primary-foreground md:p-6'>
               <ListHeader buttonLabel='View All Deals'>
                  Frequently Book <br />
                  Lab Tests
               </ListHeader>
               <BooksList />

               <ListHeader buttonLabel='see all products'>
                  Todays best deals <br />
                  for you!
               </ListHeader>
               <DealsList />
            </div>
         </Container>
      </section>
   );
}

type ListHeaderProps = {
   children: React.ReactNode;
   buttonLabel: string;
};
const ListHeader = ({ children, buttonLabel }: ListHeaderProps) => (
   <div className='flex flex-wrap items-end justify-between gap-4'>
      <SectionHeader>{children}</SectionHeader>

      <Button
         variant='link'
         className='uppercase text-primary-foreground hover:border-b-primary-foreground'
      >
         {buttonLabel}
         <MoveRight className='size-8' />
      </Button>
   </div>
);

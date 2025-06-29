import { MoveRight } from 'lucide-react';

import { Container } from '@/shared/components/container';
import SectionHeader from '@/shared/components/section-header';
import { Button } from '@/shared/components/ui/button';

import { LeftCard } from './left-card';
import { RightCard } from './right-card';

export default function TopArticlesSection() {
   return (
      <section className='py-section'>
         <Container className='space-y-6'>
            <Title>
               Read top articles from <br />
               health experts
            </Title>

            <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
               <LeftCard />
               <RightCard />
            </div>
         </Container>
      </section>
   );
}

type Props = {
   children: React.ReactNode;
};
const Title = ({ children }: Props) => (
   <div className='flex flex-wrap items-end justify-between gap-4'>
      <SectionHeader>{children}</SectionHeader>

      <Button variant='link' className='uppercase'>
         READ ALL BLOGS
         <MoveRight className='size-8' />
      </Button>
   </div>
);

import { Container } from '@/shared/components/container';

import { ServicesList } from './services-list';

export default function ServicesSection() {
   return (
      <section className='pb-section'>
         <Container className='space-y-6'>
            <ServicesList />
         </Container>
      </section>
   );
}

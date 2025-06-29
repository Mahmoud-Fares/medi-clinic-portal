import { Container } from '@/shared/components/container';
import SectionHeader from '@/shared/components/section-header';

import { TestimonialsGrid } from './testimonials-grid';

export default function TestimonialsSection() {
   return (
      <section className='py-section'>
         <Container className='space-y-section'>
            <SectionHeader className='text-center capitalize'>
               our doctors and clinics have earned over <br /> 5,000+ reviews on
               google!
            </SectionHeader>

            <TestimonialsGrid />
         </Container>
      </section>
   );
}

import { Container } from '@/shared/components/container';
import SectionHeader from '@/shared/components/section-header';

import { DoctorsList } from './doctors-list';
import { SpecialtyList } from './specialty-list';

export default function BookAppointmentSection() {
   return (
      <section className='py-section'>
         <Container className='space-y-6'>
            <SectionHeader>
               Book an Appointment for an <br /> in-clinic consultation{' '}
            </SectionHeader>

            <SpecialtyList />
            <DoctorsList />
         </Container>
      </section>
   );
}

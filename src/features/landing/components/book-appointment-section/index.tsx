import { Container } from '@/shared/components/container';

import { DoctorsList } from './doctors-list';
import { SpecialtyList } from './specialty-list';

export default function BookAppointmentSection() {
   return (
      <section className='py-section'>
         <Container className='space-y-6'>
            <h2 className='text-4xl font-bold'>
               Book an Appointment for an <br /> in-clinic consultation{' '}
            </h2>

            <SpecialtyList />
            <DoctorsList />
         </Container>
      </section>
   );
}

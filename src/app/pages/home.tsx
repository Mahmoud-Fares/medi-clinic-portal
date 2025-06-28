import BookAppointmentSection from '@/features/landing/components/book-appointment-section';
import Hero from '@/features/landing/components/hero';
import ServicesSection from '@/features/landing/components/services-section';

export default function Home() {
   return (
      <div className='flex min-h-screen flex-col'>
         <Hero />

         <ServicesSection />

         <BookAppointmentSection />
      </div>
   );
}

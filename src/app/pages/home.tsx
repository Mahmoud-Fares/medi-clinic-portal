import BookAppointmentSection from '@/features/landing/components/book-appointment-section';
import BooksAndDealsSection from '@/features/landing/components/books-and-deals-section';
import Header from '@/features/landing/components/header';
import Hero from '@/features/landing/components/hero';
import ServicesSection from '@/features/landing/components/services-section';
import TestimonialsSection from '@/features/landing/components/testimonials-section';
import TopArticlesSection from '@/features/landing/components/top-articles-section';

export default function Home() {
   return (
      <div className='flex min-h-screen flex-col'>
         <Header />

         <Hero />

         <ServicesSection />

         <BookAppointmentSection />

         <BooksAndDealsSection />

         <TestimonialsSection />

         <TopArticlesSection />
      </div>
   );
}

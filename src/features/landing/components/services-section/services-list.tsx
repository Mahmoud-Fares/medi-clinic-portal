import { ServicesCard } from './services-card';
import labTestImage from '/landing/Business Business Trip.png';
import medicineImage from '/landing/Business Startup Character Black Man.png';
import findDoctorImage from '/landing/Find Doctor.png';
import consultationImage from '/landing/Social Media Lots Of Followers Post Engagement.png';

export const ServicesList = () => {
   const ITEMS = [
      {
         title: (
            <>
               Instant video <br /> consultation.
            </>
         ),
         content: 'Connect within 60 seconds.',
         image: consultationImage,
         colorClassName: 'bg-lightGreen',
      },
      {
         title: (
            <>
               Find the doctors <br /> near you.
            </>
         ),
         content: 'Confirmed Appointments.',
         image: findDoctorImage,
         colorClassName: 'bg-lightOrange',
      },
      {
         title: (
            <>
               24/7 <br /> medicine.
            </>
         ),
         content: 'Essentials at your doorstep.',
         image: medicineImage,
         colorClassName: 'bg-lightPurple',
      },
      {
         title: (
            <>
               Lab <br /> Tests.
            </>
         ),
         content: 'Simple pickup at your home.',
         image: labTestImage,
         colorClassName: 'bg-lightBlue',
      },
   ];

   return (
      <ul className='grid grid-cols-1 gap-2 py-2 sm:grid-cols-2 xl:grid-cols-4'>
         {ITEMS.map((item) => (
            <li key={item.content}>
               <ServicesCard
                  title={item.title}
                  content={item.content}
                  colorClassName={item.colorClassName}
                  image={item.image}
               />
            </li>
         ))}
      </ul>
   );
};

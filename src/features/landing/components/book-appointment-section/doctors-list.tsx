import { HorizontalScroll } from '@/shared/components/horizontal-scroll';

import { DoctorCard } from './doctor-card';

export const DoctorsList = () => {
   const ITEMS = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Card ${i + 1}`,
      content: `This is content for card ${i + 1}`,
   }));

   return (
      <HorizontalScroll scrollBarClassName='bg-muted'>
         <ul className='flex gap-6 pb-6'>
            {ITEMS.map((item) => (
               <li key={item.id}>
                  <DoctorCard />
               </li>
            ))}
         </ul>
      </HorizontalScroll>
   );
};

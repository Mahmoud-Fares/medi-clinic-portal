import { HorizontalScroll } from '@/shared/components/horizontal-scroll';

import { BooksCard } from './book-card';

export const BooksList = () => {
   const ITEMS = Array.from({ length: 7 }, (_, i) => ({
      id: i + 1,
      title: `Card ${i + 1}`,
      content: `This is content for card ${i + 1}`,
   }));

   return (
      <HorizontalScroll noScrollBar>
         <ul className='flex gap-2'>
            {ITEMS.map((item) => (
               <li key={item.id}>
                  <BooksCard />
               </li>
            ))}
         </ul>
      </HorizontalScroll>
   );
};

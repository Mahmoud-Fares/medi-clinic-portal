import placeholder from '/placeholder.svg';

export const DoctorCard = () => {
   return (
      <article className='grid w-64 max-w-[15rem] gap-2 transition-smooth hover:translate-y-1'>
         <img
            src={placeholder}
            alt='test'
            className='flex aspect-square rounded'
         />

         <div>
            <h4 className='text-xl font-semibold'>Dr. Jen Gunter</h4>
            <p className='text-sm text-muted-foreground'>Neurologist</p>
         </div>
      </article>
   );
};

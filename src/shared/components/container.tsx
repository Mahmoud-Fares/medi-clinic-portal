import { cn } from './../lib/utils';

type Props = {
   children: React.ReactNode;
   className?: string;
};
export const Container = ({ children, className }: Props) => (
   <div
      className={cn('mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8', className)}
   >
      {children}
   </div>
);

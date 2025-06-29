import { cn } from '@/shared/lib/utils';

type Props = {
   children?: React.ReactNode;
   className?: string;
};

export default function SectionHeader({ children, className }: Props) {
   return <h3 className={cn('text-4xl font-bold', className)}>{children}</h3>;
}

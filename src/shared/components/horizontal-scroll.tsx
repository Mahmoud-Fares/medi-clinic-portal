import { ScrollArea, ScrollBar } from '@/shared/components/ui/scroll-area';

import { cn } from '../lib/utils';

type Props = {
   children: React.ReactNode;
   className?: string;
   noScrollBar?: boolean;
   scrollBarClassName?: string;
   scrollbarColorClassName?: string;
};
export const HorizontalScroll = ({
   children,
   className,
   noScrollBar,
   scrollBarClassName,
   scrollbarColorClassName,
}: Props) => (
   <ScrollArea className={className}>
      {children}

      <ScrollBar
         orientation='horizontal'
         className={cn('h-1.5', scrollBarClassName, noScrollBar && 'h-0')}
         scrollbarColorClassName={cn('bg-primary', scrollbarColorClassName)}
      />
   </ScrollArea>
);

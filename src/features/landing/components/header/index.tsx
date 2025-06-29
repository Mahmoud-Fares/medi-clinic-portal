import { useState } from 'react';

import { Container } from '@/shared/components/container';
import { cn } from '@/shared/lib/utils';

import { DesktopHeader } from './desktop-header';
import { MobileDropdownMenu } from './mobile-dropdown-menu';

export default function Header() {
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
   };

   return (
      <header>
         <Container className='relative py-4'>
            <DesktopHeader
               isMobileMenuOpen={isMobileMenuOpen}
               toggleMobileMenu={toggleMobileMenu}
            />

            <MobileDropdownMenu
               className={cn(
                  'absolute left-4 right-4 z-50 origin-top scale-y-0 bg-background opacity-0 transition-smooth lg:hidden',
                  isMobileMenuOpen && 'scale-y-100 opacity-100'
               )}
            />
         </Container>
      </header>
   );
}

import { Menu, User, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

import { NAVIGATION_LINKS } from './navigation-links';
import { SearchInput } from './search-input';

type Props = {
   isMobileMenuOpen: boolean;
   toggleMobileMenu: () => void;
   className?: string;
};

export const DesktopHeader = ({
   isMobileMenuOpen,
   toggleMobileMenu,
   className,
}: Props) => {
   const navigate = useNavigate();
   return (
      <div
         className={cn(
            'flex items-center justify-between rounded bg-secondary px-10 py-4 text-secondary-foreground',
            className
         )}
      >
         <h1 className='text-2xl font-bold'>Medcare</h1>

         <SearchInput className='mx-4 hidden max-w-lg flex-1 xs:flex' />

         <NavigationLinks className='hidden lg:flex' />

         <div className='flex items-center'>
            <Button
               variant='link'
               className={cn('items-center gap-1 transition-smooth')}
               onClick={() => navigate('/login', { viewTransition: true })}
            >
               <span>Login</span>
               <span className='hidden text-lg lg:flex'>
                  <User />
               </span>
            </Button>

            <MobileMenuToggler
               className='flex lg:hidden'
               isMobileMenuOpen={isMobileMenuOpen}
               toggleMobileMenu={toggleMobileMenu}
            />
         </div>
      </div>
   );
};

const NavigationLinks = ({ className }: { className?: string }) => {
   return (
      <nav className={cn('flex items-center', className)}>
         {NAVIGATION_LINKS.map((link) => (
            <Button
               variant='link'
               key={link.label}
               className={cn(
                  'flex items-center gap-1 transition-smooth',
                  link.className
               )}
            >
               <span>{link.label}</span>

               <link.icon />
            </Button>
         ))}
      </nav>
   );
};

const MobileMenuToggler = ({
   isMobileMenuOpen,
   toggleMobileMenu,
   className,
}: Props) => {
   return (
      <Button
         onClick={toggleMobileMenu}
         size='icon'
         variant='secondary'
         className={cn(
            'shadow-none transition-smooth focus:ring-1 focus:ring-primary',
            className
         )}
         aria-label='Toggle mobile menu'
         aria-expanded={isMobileMenuOpen}
      >
         {isMobileMenuOpen ? (
            <X className='h-6 w-6' />
         ) : (
            <Menu className='h-6 w-6' />
         )}
      </Button>
   );
};

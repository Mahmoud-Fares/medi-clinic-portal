import { useState } from 'react';

import {
   Bell,
   LogOut,
   Menu,
   Search,
   Settings,
   Shield,
   User,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from '@/shared/components/ui/avatar';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Input } from '@/shared/components/ui/input';
import { authService } from '@/shared/lib/auth';
import { useAppStore, useAuthStore } from '@/shared/lib/store';

interface HeaderProps {
   onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
   const { user, logout } = useAuthStore();
   const { notifications } = useAppStore();
   const [searchQuery, setSearchQuery] = useState('');
   const navigate = useNavigate();

   const unreadCount = notifications.filter((n) => !n.read).length;

   const handleLogout = async () => {
      console.log('🚪 Header: Logging out user');
      try {
         await authService.logout();
         logout();
         navigate('/');
      } catch (error) {
         console.error('❌ Header: Logout error:', error);
      }
   };

   const handleProfileClick = () => {
      console.log('👤 Header: Navigating to profile');
      navigate('/profile');
   };

   const handleSettingsClick = () => {
      console.log('⚙️ Header: Navigating to settings');
      navigate('/settings');
   };

   const handleNotificationsClick = () => {
      console.log('🔔 Header: Opening notifications');
      // For now, just log - could open a notifications panel
      alert('Notifications panel would open here');
   };

   const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
         console.log('🔍 Header: Searching for:', searchQuery);
         // Navigate to search results or perform search
         navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      }
   };

   const getRoleColor = (role: string) => {
      const colors = {
         patient: 'bg-blue-100 text-blue-800',
         doctor: 'bg-green-100 text-green-800',
         admin: 'bg-purple-100 text-purple-800',
         pharmacy: 'bg-orange-100 text-orange-800',
         accountant: 'bg-teal-100 text-teal-800',
      };
      return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
   };

   const getRoleIcon = (role: string) => {
      const icons = {
         admin: Shield,
         doctor: User,
         patient: User,
         pharmacy: User,
         accountant: User,
      };
      const Icon = icons[role as keyof typeof icons] || User;
      return <Icon className='h-4 w-4' />;
   };

   return (
      <header className='sticky top-0 z-50 border-b border-gray-200 bg-white px-4 py-3'>
         <div className='flex items-center justify-between'>
            {/* Left side - Menu and Logo */}
            <div className='flex items-center space-x-4'>
               <Button
                  variant='ghost'
                  size='sm'
                  onClick={onMenuClick}
                  className='lg:hidden'
               >
                  <Menu className='h-6 w-6' />
               </Button>

               <div className='flex items-center space-x-3'>
                  <div className='bg-gradient-medical flex h-8 w-8 items-center justify-center rounded-lg'>
                     <div className='flex h-5 w-5 items-center justify-center rounded-sm bg-white'>
                        <div className='h-3 w-3 rounded-full bg-primary'></div>
                     </div>
                  </div>
                  <div className='hidden sm:block'>
                     <h1 className='font-inter text-xl font-semibold text-gray-900'>
                        MediCare System
                     </h1>
                     <p className='text-xs text-gray-500'>
                        Multi-Hospital Platform
                     </p>
                  </div>
               </div>
            </div>

            {/* Center - Search */}
            <div className='mx-8 hidden max-w-lg flex-1 md:flex'>
               <form onSubmit={handleSearchSubmit} className='relative w-full'>
                  <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
                  <Input
                     type='text'
                     placeholder='Search patients, appointments, prescriptions...'
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className='w-full pl-10 pr-4'
                  />
               </form>
            </div>

            {/* Right side - Notifications and User */}
            <div className='flex items-center space-x-3'>
               {/* Notifications */}
               <Button
                  variant='ghost'
                  size='sm'
                  className='relative'
                  onClick={handleNotificationsClick}
               >
                  <Bell className='h-5 w-5' />
                  {unreadCount > 0 && (
                     <Badge
                        variant='destructive'
                        className='absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center p-0 text-xs'
                     >
                        {unreadCount > 9 ? '9+' : unreadCount}
                     </Badge>
                  )}
               </Button>

               {/* User Menu */}
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button
                        variant='ghost'
                        className='flex h-auto items-center space-x-2 p-2'
                     >
                        <Avatar className='h-8 w-8'>
                           <AvatarImage
                              src={user?.profile.avatar}
                              alt={user?.profile.firstName}
                           />
                           <AvatarFallback>
                              {user?.profile.firstName?.[0]}
                              {user?.profile.lastName?.[0]}
                           </AvatarFallback>
                        </Avatar>
                        <div className='hidden text-left sm:block'>
                           <p className='text-sm font-medium text-gray-900'>
                              {user?.profile.firstName} {user?.profile.lastName}
                           </p>
                           <div className='flex items-center space-x-1'>
                              {getRoleIcon(user?.role || '')}
                              <Badge
                                 variant='secondary'
                                 className={`text-xs ${getRoleColor(user?.role || '')}`}
                              >
                                 {user?.role?.toUpperCase()}
                              </Badge>
                           </div>
                        </div>
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end' className='w-56'>
                     <DropdownMenuLabel>
                        <div className='flex flex-col space-y-1'>
                           <p className='text-sm font-medium'>
                              {user?.profile.firstName} {user?.profile.lastName}
                           </p>
                           <p className='text-xs text-gray-500'>
                              {user?.email}
                           </p>
                        </div>
                     </DropdownMenuLabel>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem onClick={handleProfileClick}>
                        <User className='mr-2 h-4 w-4' />
                        <span>Profile</span>
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={handleSettingsClick}>
                        <Settings className='mr-2 h-4 w-4' />
                        <span>Settings</span>
                     </DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem
                        onClick={handleLogout}
                        className='text-red-600'
                     >
                        <LogOut className='mr-2 h-4 w-4' />
                        <span>Log out</span>
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         </div>
      </header>
   );
}

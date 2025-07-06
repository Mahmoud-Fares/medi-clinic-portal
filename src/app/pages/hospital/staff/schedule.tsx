import { useEffect, useState } from 'react';

import {
   Calendar,
   ChevronLeft,
   ChevronRight,
   Edit,
   Eye,
   Filter,
   Plus,
   Search,
   UserCheck,
   UserX,
   Users,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { useAuthStore } from '@/shared/lib/store';

import { Header } from '@/app/layouts/components/header';
import { Sidebar } from '@/app/layouts/components/sidebar';

interface StaffSchedule {
   id: string;
   staffId: string;
   staffName: string;
   role: string;
   department: string;
   shifts: Shift[];
   totalHours: number;
   status: 'active' | 'on-leave' | 'sick' | 'vacation';
}

interface Shift {
   id: string;
   date: Date;
   startTime: string;
   endTime: string;
   type: 'regular' | 'overtime' | 'on-call' | 'emergency';
   location: string;
   status: 'scheduled' | 'completed' | 'missed' | 'cancelled';
}

export default function StaffSchedulePage() {
   const { user, isAuthenticated } = useAuthStore();
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
   const [currentWeek, setCurrentWeek] = useState(new Date());
   const navigate = useNavigate();

   useEffect(() => {
      if (!isAuthenticated || !user) {
         navigate('/');
         return;
      }
      if (user.role !== 'admin') {
         navigate('/dashboard');
         return;
      }
   }, [isAuthenticated, user, navigate]);

   if (!isAuthenticated || !user || user.role !== 'admin') {
      return null;
   }

   // Mock staff schedule data
   const mockSchedules: StaffSchedule[] = [
      {
         id: 'schedule_1',
         staffId: 'staff_1',
         staffName: 'Dr. Sarah Wilson',
         role: 'Cardiologist',
         department: 'Cardiology',
         totalHours: 40,
         status: 'active',
         shifts: [
            {
               id: 'shift_1',
               date: new Date(),
               startTime: '08:00',
               endTime: '16:00',
               type: 'regular',
               location: 'Cardiology Wing',
               status: 'scheduled',
            },
            {
               id: 'shift_2',
               date: new Date(Date.now() + 86400000),
               startTime: '08:00',
               endTime: '16:00',
               type: 'regular',
               location: 'Cardiology Wing',
               status: 'scheduled',
            },
         ],
      },
      {
         id: 'schedule_2',
         staffId: 'staff_2',
         staffName: 'Nurse Jennifer Martinez',
         role: 'Registered Nurse',
         department: 'Emergency',
         totalHours: 36,
         status: 'active',
         shifts: [
            {
               id: 'shift_3',
               date: new Date(),
               startTime: '12:00',
               endTime: '20:00',
               type: 'regular',
               location: 'Emergency Department',
               status: 'scheduled',
            },
         ],
      },
   ];

   const getStatusColor = (status: string) => {
      switch (status) {
         case 'active':
            return 'bg-green-100 text-green-800';
         case 'on-leave':
            return 'bg-blue-100 text-blue-800';
         case 'sick':
            return 'bg-red-100 text-red-800';
         case 'vacation':
            return 'bg-purple-100 text-purple-800';
         default:
            return 'bg-gray-100 text-gray-800';
      }
   };

   const getShiftTypeColor = (type: string) => {
      switch (type) {
         case 'regular':
            return 'bg-blue-100 text-blue-800';
         case 'overtime':
            return 'bg-orange-100 text-orange-800';
         case 'on-call':
            return 'bg-purple-100 text-purple-800';
         case 'emergency':
            return 'bg-red-100 text-red-800';
         default:
            return 'bg-gray-100 text-gray-800';
      }
   };

   const filteredSchedules = mockSchedules.filter((schedule) => {
      const matchesSearch =
         schedule.staffName.toLowerCase().includes(searchQuery.toLowerCase()) ||
         schedule.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDepartment =
         selectedDepartment === 'all' ||
         schedule.department === selectedDepartment;
      return matchesSearch && matchesDepartment;
   });

   const navigateWeek = (direction: 'prev' | 'next') => {
      const newDate = new Date(currentWeek);
      if (direction === 'prev') {
         newDate.setDate(newDate.getDate() - 7);
      } else {
         newDate.setDate(newDate.getDate() + 7);
      }
      setCurrentWeek(newDate);
   };

   const getWeekDates = () => {
      const startOfWeek = new Date(currentWeek);
      startOfWeek.setDate(currentWeek.getDate() - currentWeek.getDay());

      const dates = [];
      for (let i = 0; i < 7; i++) {
         const date = new Date(startOfWeek);
         date.setDate(startOfWeek.getDate() + i);
         dates.push(date);
      }
      return dates;
   };

   const weekDates = getWeekDates();

   return (
      <div className='flex min-h-screen bg-gray-50'>
         <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

         <div className='w-full'>
            <Header onMenuClick={() => setSidebarOpen(true)} />

            <main className='space-y-6 p-6'>
               {/* Page Header */}
               <div className='flex items-center justify-between'>
                  <div>
                     <h1 className='font-inter text-2xl font-bold text-gray-900'>
                        Staff Schedule Management
                     </h1>
                     <p className='mt-1 text-gray-600'>
                        Manage staff schedules and shift assignments
                     </p>
                  </div>
                  <div className='flex items-center space-x-3'>
                     <Button variant='outline'>
                        <Calendar className='mr-2 h-4 w-4' />
                        Export Schedule
                     </Button>
                     <Button>
                        <Plus className='mr-2 h-4 w-4' />
                        Add Shift
                     </Button>
                  </div>
               </div>

               {/* Search and Filters */}
               <Card>
                  <CardContent className='p-6'>
                     <div className='flex flex-col gap-4 sm:flex-row'>
                        <div className='relative flex-1'>
                           <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
                           <Input
                              placeholder='Search staff by name or role...'
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className='pl-10'
                           />
                        </div>
                        <div className='flex items-center space-x-2'>
                           <Filter className='h-4 w-4 text-gray-400' />
                           <select
                              value={selectedDepartment}
                              onChange={(e) =>
                                 setSelectedDepartment(e.target.value)
                              }
                              className='rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                           >
                              <option value='all'>All Departments</option>
                              <option value='Emergency'>Emergency</option>
                              <option value='Cardiology'>Cardiology</option>
                              <option value='Surgery'>Surgery</option>
                              <option value='Radiology'>Radiology</option>
                              <option value='Pediatrics'>Pediatrics</option>
                           </select>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Week Navigation */}
               <Card>
                  <CardHeader>
                     <div className='flex items-center justify-between'>
                        <CardTitle className='flex items-center space-x-2'>
                           <Calendar className='h-5 w-5 text-blue-600' />
                           <span>Weekly Schedule</span>
                        </CardTitle>
                        <div className='flex items-center space-x-2'>
                           <Button
                              variant='outline'
                              size='sm'
                              onClick={() => navigateWeek('prev')}
                           >
                              <ChevronLeft className='h-4 w-4' />
                           </Button>
                           <span className='px-4 text-sm font-medium'>
                              {weekDates[0].toLocaleDateString()} -{' '}
                              {weekDates[6].toLocaleDateString()}
                           </span>
                           <Button
                              variant='outline'
                              size='sm'
                              onClick={() => navigateWeek('next')}
                           >
                              <ChevronRight className='h-4 w-4' />
                           </Button>
                        </div>
                     </div>
                  </CardHeader>
                  <CardContent>
                     {/* Calendar Header */}
                     <div className='mb-4 grid grid-cols-8 gap-2'>
                        <div className='p-2 text-sm font-medium text-gray-600'>
                           Staff
                        </div>
                        {weekDates.map((date, index) => (
                           <div
                              key={index}
                              className='border-b p-2 text-center text-sm font-medium text-gray-600'
                           >
                              <div>
                                 {
                                    [
                                       'Sun',
                                       'Mon',
                                       'Tue',
                                       'Wed',
                                       'Thu',
                                       'Fri',
                                       'Sat',
                                    ][index]
                                 }
                              </div>
                              <div className='text-xs text-gray-500'>
                                 {date.getDate()}
                              </div>
                           </div>
                        ))}
                     </div>

                     {/* Schedule Grid */}
                     <div className='space-y-2'>
                        {filteredSchedules.map((schedule) => (
                           <div
                              key={schedule.id}
                              className='grid grid-cols-8 items-center gap-2 rounded-lg border p-2 hover:bg-gray-50'
                           >
                              <div className='flex items-center space-x-3'>
                                 <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-100'>
                                    <Users className='h-5 w-5 text-blue-600' />
                                 </div>
                                 <div>
                                    <p className='text-sm font-medium'>
                                       {schedule.staffName}
                                    </p>
                                    <p className='text-xs text-gray-500'>
                                       {schedule.role}
                                    </p>
                                    <Badge
                                       className={getStatusColor(
                                          schedule.status
                                       )}
                                    >
                                       {schedule.status}
                                    </Badge>
                                 </div>
                              </div>

                              {weekDates.map((date, dayIndex) => {
                                 const dayShifts = schedule.shifts.filter(
                                    (shift) =>
                                       shift.date.toDateString() ===
                                       date.toDateString()
                                 );

                                 return (
                                    <div
                                       key={dayIndex}
                                       className='min-h-16 p-1'
                                    >
                                       {dayShifts.map((shift) => (
                                          <div
                                             key={shift.id}
                                             className={`mb-1 rounded p-2 text-xs ${getShiftTypeColor(shift.type)}`}
                                          >
                                             <div className='font-medium'>
                                                {shift.startTime} -{' '}
                                                {shift.endTime}
                                             </div>
                                             <div className='text-xs opacity-75'>
                                                {shift.location}
                                             </div>
                                          </div>
                                       ))}
                                    </div>
                                 );
                              })}
                           </div>
                        ))}
                     </div>
                  </CardContent>
               </Card>

               {/* Staff List */}
               <Card>
                  <CardHeader>
                     <CardTitle>Staff Overview</CardTitle>
                     <CardDescription>
                        Current staff status and schedule summary
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <div className='space-y-4'>
                        {filteredSchedules.map((schedule) => (
                           <div
                              key={schedule.id}
                              className='flex items-center justify-between rounded-lg border p-4 transition-shadow hover:shadow-sm'
                           >
                              <div className='flex items-center space-x-4'>
                                 <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-100'>
                                    <Users className='h-6 w-6 text-blue-600' />
                                 </div>
                                 <div>
                                    <h3 className='font-semibold text-gray-900'>
                                       {schedule.staffName}
                                    </h3>
                                    <p className='text-sm text-gray-600'>
                                       {schedule.role} • {schedule.department}
                                    </p>
                                    <div className='mt-1 flex items-center space-x-2'>
                                       <Badge
                                          className={getStatusColor(
                                             schedule.status
                                          )}
                                       >
                                          {schedule.status === 'active' ? (
                                             <UserCheck className='mr-1 h-3 w-3' />
                                          ) : (
                                             <UserX className='mr-1 h-3 w-3' />
                                          )}
                                          {schedule.status}
                                       </Badge>
                                       <span className='text-xs text-gray-500'>
                                          {schedule.totalHours}h/week
                                       </span>
                                    </div>
                                 </div>
                              </div>

                              <div className='flex space-x-2'>
                                 <Button variant='outline' size='sm'>
                                    <Eye className='mr-1 h-4 w-4' />
                                    View
                                 </Button>
                                 <Button variant='outline' size='sm'>
                                    <Edit className='mr-1 h-4 w-4' />
                                    Edit Schedule
                                 </Button>
                              </div>
                           </div>
                        ))}
                     </div>
                  </CardContent>
               </Card>
            </main>
         </div>
      </div>
   );
}

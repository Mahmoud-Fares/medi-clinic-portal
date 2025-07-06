import { useEffect, useState } from 'react';

import {
   Activity,
   AlertTriangle,
   Building,
   CheckCircle,
   Edit,
   Eye,
   Filter,
   MapPin,
   Plus,
   Search,
   Settings,
   Shield,
   Thermometer,
   Users,
   Wifi,
   Wrench,
   XCircle,
   Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from '@/shared/components/ui/tabs';
import { useAuthStore } from '@/shared/lib/store';

import { Header } from '@/app/layouts/components/header';
import { Sidebar } from '@/app/layouts/components/sidebar';

interface Facility {
   id: string;
   name: string;
   type: 'building' | 'wing' | 'floor' | 'room' | 'equipment' | 'utility';
   location: string;
   capacity?: number;
   status: 'operational' | 'maintenance' | 'offline' | 'construction';
   department: string;
   manager: string;
   equipment: Equipment[];
   utilities: Utility[];
   accessibility: string[];
   lastInspection: Date;
   nextMaintenance: Date;
   description: string;
}

interface Equipment {
   id: string;
   name: string;
   type: string;
   status: 'operational' | 'maintenance' | 'defective' | 'offline';
   lastChecked: Date;
   nextMaintenance: Date;
}

interface Utility {
   type: 'electrical' | 'plumbing' | 'hvac' | 'network' | 'security';
   status: 'operational' | 'maintenance' | 'offline';
   lastChecked: Date;
}

export default function HospitalFacilitiesPage() {
   const { user, isAuthenticated } = useAuthStore();
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedType, setSelectedType] = useState<string>('all');
   const [selectedStatus, setSelectedStatus] = useState<string>('all');
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

   // Mock facilities data
   const mockFacilities: Facility[] = [
      {
         id: 'facility_1',
         name: 'Emergency Department - Building A',
         type: 'building',
         location: 'Ground Floor, Wing A',
         capacity: 50,
         status: 'operational',
         department: 'Emergency Medicine',
         manager: 'Dr. Sarah Wilson',
         equipment: [
            {
               id: 'eq_1',
               name: 'MRI Machine',
               type: 'Imaging',
               status: 'operational',
               lastChecked: new Date(Date.now() - 86400000),
               nextMaintenance: new Date(Date.now() + 2592000000),
            },
            {
               id: 'eq_2',
               name: 'X-Ray Unit',
               type: 'Imaging',
               status: 'operational',
               lastChecked: new Date(Date.now() - 172800000),
               nextMaintenance: new Date(Date.now() + 1296000000),
            },
         ],
         utilities: [
            {
               type: 'electrical',
               status: 'operational',
               lastChecked: new Date(Date.now() - 604800000),
            },
            {
               type: 'hvac',
               status: 'operational',
               lastChecked: new Date(Date.now() - 432000000),
            },
            {
               type: 'network',
               status: 'operational',
               lastChecked: new Date(Date.now() - 259200000),
            },
         ],
         accessibility: [
            'Wheelchair accessible',
            'Elevator access',
            'Emergency exits',
         ],
         lastInspection: new Date(Date.now() - 2592000000),
         nextMaintenance: new Date(Date.now() + 5184000000),
         description:
            'Main emergency department with trauma bays and critical care units',
      },
      {
         id: 'facility_2',
         name: 'Operating Theater Complex',
         type: 'wing',
         location: '4th Floor, Wing C',
         capacity: 12,
         status: 'operational',
         department: 'Surgery',
         manager: 'Dr. Jennifer Martinez',
         equipment: [
            {
               id: 'eq_3',
               name: 'Surgical Robot',
               type: 'Surgical',
               status: 'operational',
               lastChecked: new Date(Date.now() - 86400000),
               nextMaintenance: new Date(Date.now() + 1296000000),
            },
            {
               id: 'eq_4',
               name: 'Anesthesia Machine',
               type: 'Anesthesia',
               status: 'maintenance',
               lastChecked: new Date(Date.now() - 259200000),
               nextMaintenance: new Date(Date.now() + 604800000),
            },
         ],
         utilities: [
            {
               type: 'electrical',
               status: 'operational',
               lastChecked: new Date(Date.now() - 432000000),
            },
            {
               type: 'hvac',
               status: 'operational',
               lastChecked: new Date(Date.now() - 345600000),
            },
            {
               type: 'security',
               status: 'operational',
               lastChecked: new Date(Date.now() - 172800000),
            },
         ],
         accessibility: [
            'Sterile environment',
            'Restricted access',
            'Emergency power backup',
         ],
         lastInspection: new Date(Date.now() - 1296000000),
         nextMaintenance: new Date(Date.now() + 2592000000),
         description:
            'State-of-the-art surgical suites with advanced equipment',
      },
      {
         id: 'facility_3',
         name: 'ICU Ward - Floor 3B',
         type: 'floor',
         location: '3rd Floor, Wing B',
         capacity: 24,
         status: 'operational',
         department: 'Critical Care',
         manager: 'Dr. Michael Chen',
         equipment: [
            {
               id: 'eq_5',
               name: 'Ventilators',
               type: 'Life Support',
               status: 'operational',
               lastChecked: new Date(Date.now() - 43200000),
               nextMaintenance: new Date(Date.now() + 1296000000),
            },
            {
               id: 'eq_6',
               name: 'Patient Monitors',
               type: 'Monitoring',
               status: 'operational',
               lastChecked: new Date(Date.now() - 86400000),
               nextMaintenance: new Date(Date.now() + 2592000000),
            },
         ],
         utilities: [
            {
               type: 'electrical',
               status: 'operational',
               lastChecked: new Date(Date.now() - 259200000),
            },
            {
               type: 'hvac',
               status: 'operational',
               lastChecked: new Date(Date.now() - 432000000),
            },
            {
               type: 'network',
               status: 'operational',
               lastChecked: new Date(Date.now() - 172800000),
            },
         ],
         accessibility: [
            '24/7 monitoring',
            'Isolation rooms',
            'Family consultation areas',
         ],
         lastInspection: new Date(Date.now() - 1728000000),
         nextMaintenance: new Date(Date.now() + 3888000000),
         description: 'Intensive care unit with advanced life support systems',
      },
      {
         id: 'facility_4',
         name: 'Radiology Department',
         type: 'room',
         location: 'Basement Level, Wing A',
         capacity: 8,
         status: 'maintenance',
         department: 'Radiology',
         manager: 'Dr. Robert Taylor',
         equipment: [
            {
               id: 'eq_7',
               name: 'CT Scanner',
               type: 'Imaging',
               status: 'maintenance',
               lastChecked: new Date(Date.now() - 172800000),
               nextMaintenance: new Date(Date.now() + 604800000),
            },
            {
               id: 'eq_8',
               name: 'Ultrasound Machine',
               type: 'Imaging',
               status: 'operational',
               lastChecked: new Date(Date.now() - 86400000),
               nextMaintenance: new Date(Date.now() + 1296000000),
            },
         ],
         utilities: [
            {
               type: 'electrical',
               status: 'maintenance',
               lastChecked: new Date(Date.now() - 345600000),
            },
            {
               type: 'hvac',
               status: 'operational',
               lastChecked: new Date(Date.now() - 259200000),
            },
            {
               type: 'network',
               status: 'operational',
               lastChecked: new Date(Date.now() - 432000000),
            },
         ],
         accessibility: [
            'Lead-lined rooms',
            'Radiation safety protocols',
            'Patient preparation areas',
         ],
         lastInspection: new Date(Date.now() - 2160000000),
         nextMaintenance: new Date(Date.now() + 1296000000),
         description: 'Comprehensive imaging facility with multiple modalities',
      },
      {
         id: 'facility_5',
         name: 'Central Pharmacy',
         type: 'room',
         location: '1st Floor, Wing B',
         capacity: 15,
         status: 'operational',
         department: 'Pharmacy',
         manager: 'PharmD Lisa Brown',
         equipment: [
            {
               id: 'eq_9',
               name: 'Automated Dispensing System',
               type: 'Pharmacy',
               status: 'operational',
               lastChecked: new Date(Date.now() - 86400000),
               nextMaintenance: new Date(Date.now() + 2592000000),
            },
            {
               id: 'eq_10',
               name: 'Refrigeration Units',
               type: 'Storage',
               status: 'operational',
               lastChecked: new Date(Date.now() - 43200000),
               nextMaintenance: new Date(Date.now() + 1296000000),
            },
         ],
         utilities: [
            {
               type: 'electrical',
               status: 'operational',
               lastChecked: new Date(Date.now() - 172800000),
            },
            {
               type: 'hvac',
               status: 'operational',
               lastChecked: new Date(Date.now() - 259200000),
            },
            {
               type: 'security',
               status: 'operational',
               lastChecked: new Date(Date.now() - 86400000),
            },
         ],
         accessibility: [
            'Controlled access',
            'Temperature monitoring',
            'Inventory tracking',
         ],
         lastInspection: new Date(Date.now() - 1728000000),
         nextMaintenance: new Date(Date.now() + 2592000000),
         description: 'Central medication storage and dispensing facility',
      },
      {
         id: 'facility_6',
         name: 'Data Center',
         type: 'utility',
         location: 'Basement Level, Wing C',
         status: 'offline',
         department: 'IT Services',
         manager: 'IT Director John Smith',
         equipment: [
            {
               id: 'eq_11',
               name: 'Server Racks',
               type: 'IT',
               status: 'offline',
               lastChecked: new Date(Date.now() - 259200000),
               nextMaintenance: new Date(Date.now() + 604800000),
            },
            {
               id: 'eq_12',
               name: 'Network Switches',
               type: 'Network',
               status: 'defective',
               lastChecked: new Date(Date.now() - 172800000),
               nextMaintenance: new Date(Date.now() + 432000000),
            },
         ],
         utilities: [
            {
               type: 'electrical',
               status: 'offline',
               lastChecked: new Date(Date.now() - 432000000),
            },
            {
               type: 'hvac',
               status: 'maintenance',
               lastChecked: new Date(Date.now() - 345600000),
            },
            {
               type: 'security',
               status: 'operational',
               lastChecked: new Date(Date.now() - 86400000),
            },
         ],
         accessibility: [
            'Restricted access',
            'Environmental monitoring',
            'Fire suppression',
         ],
         lastInspection: new Date(Date.now() - 1296000000),
         nextMaintenance: new Date(Date.now() + 604800000),
         description: 'Primary data center for hospital information systems',
      },
   ];

   const getStatusColor = (status: string) => {
      switch (status) {
         case 'operational':
            return 'bg-green-100 text-green-800 hover:bg-green-100';
         case 'maintenance':
            return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
         case 'offline':
            return 'bg-red-100 text-red-800 hover:bg-red-100';
         case 'construction':
            return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
         default:
            return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
      }
   };

   const getStatusIcon = (status: string) => {
      switch (status) {
         case 'operational':
            return <CheckCircle className='h-4 w-4 text-green-600' />;
         case 'maintenance':
            return <Wrench className='h-4 w-4 text-yellow-600' />;
         case 'offline':
            return <XCircle className='h-4 w-4 text-red-600' />;
         case 'construction':
            return <Settings className='h-4 w-4 text-blue-600' />;
         default:
            return <AlertTriangle className='h-4 w-4 text-gray-600' />;
      }
   };

   const getTypeIcon = (type: string) => {
      switch (type) {
         case 'building':
            return <Building className='h-5 w-5 text-blue-600' />;
         case 'wing':
            return <Building className='h-5 w-5 text-purple-600' />;
         case 'floor':
            return <Building className='h-5 w-5 text-green-600' />;
         case 'room':
            return <MapPin className='h-5 w-5 text-orange-600' />;
         case 'equipment':
            return <Settings className='h-5 w-5 text-gray-600' />;
         case 'utility':
            return <Zap className='h-5 w-5 text-yellow-600' />;
         default:
            return <Building className='h-5 w-5 text-gray-600' />;
      }
   };

   const getUtilityIcon = (type: string) => {
      switch (type) {
         case 'electrical':
            return <Zap className='h-4 w-4 text-yellow-600' />;
         case 'plumbing':
            return <Activity className='h-4 w-4 text-blue-600' />;
         case 'hvac':
            return <Thermometer className='h-4 w-4 text-green-600' />;
         case 'network':
            return <Wifi className='h-4 w-4 text-purple-600' />;
         case 'security':
            return <Shield className='h-4 w-4 text-red-600' />;
         default:
            return <Settings className='h-4 w-4 text-gray-600' />;
      }
   };

   const filteredFacilities = mockFacilities.filter((facility) => {
      const matchesSearch =
         facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         facility.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
         facility.department
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
         facility.manager.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType =
         selectedType === 'all' || facility.type === selectedType;
      const matchesStatus =
         selectedStatus === 'all' || facility.status === selectedStatus;
      return matchesSearch && matchesType && matchesStatus;
   });

   const operationalFacilities = filteredFacilities.filter(
      (f) => f.status === 'operational'
   );
   const maintenanceFacilities = filteredFacilities.filter(
      (f) => f.status === 'maintenance' || f.status === 'offline'
   );

   const FacilityCard = ({ facility }: { facility: Facility }) => (
      <Card className='transition-shadow duration-200 hover:shadow-md'>
         <CardContent className='p-6'>
            <div className='mb-4 flex items-start justify-between'>
               <div className='flex items-center space-x-3'>
                  <div className='rounded-lg bg-gray-100 p-2'>
                     {getTypeIcon(facility.type)}
                  </div>
                  <div>
                     <h3 className='text-lg font-semibold text-gray-900'>
                        {facility.name}
                     </h3>
                     <p className='text-sm text-gray-600'>
                        {facility.description}
                     </p>
                  </div>
               </div>
               <Badge className={getStatusColor(facility.status)}>
                  {getStatusIcon(facility.status)}
                  <span className='ml-1'>
                     {facility.status.charAt(0).toUpperCase() +
                        facility.status.slice(1)}
                  </span>
               </Badge>
            </div>

            <div className='mb-4 grid grid-cols-1 gap-3 text-sm text-gray-600 md:grid-cols-2'>
               <div className='flex items-center space-x-2'>
                  <MapPin className='h-4 w-4' />
                  <span>{facility.location}</span>
               </div>
               <div className='flex items-center space-x-2'>
                  <Users className='h-4 w-4' />
                  <span>Manager: {facility.manager}</span>
               </div>
               <div className='flex items-center space-x-2'>
                  <Building className='h-4 w-4' />
                  <span>Department: {facility.department}</span>
               </div>
               {facility.capacity && (
                  <div className='flex items-center space-x-2'>
                     <Activity className='h-4 w-4' />
                     <span>Capacity: {facility.capacity}</span>
                  </div>
               )}
            </div>

            {/* Equipment Status */}
            <div className='mb-4'>
               <h4 className='mb-2 font-medium text-gray-900'>
                  Equipment ({facility.equipment.length})
               </h4>
               <div className='flex flex-wrap gap-1'>
                  {facility.equipment.slice(0, 3).map((equipment) => (
                     <Badge
                        key={equipment.id}
                        variant='outline'
                        className={`text-xs ${getStatusColor(equipment.status)}`}
                     >
                        {equipment.name}
                     </Badge>
                  ))}
                  {facility.equipment.length > 3 && (
                     <Badge variant='outline' className='text-xs'>
                        +{facility.equipment.length - 3} more
                     </Badge>
                  )}
               </div>
            </div>

            {/* Utilities Status */}
            <div className='mb-4'>
               <h4 className='mb-2 font-medium text-gray-900'>Utilities</h4>
               <div className='flex space-x-3'>
                  {facility.utilities.map((utility, index) => (
                     <div key={index} className='flex items-center space-x-1'>
                        {getUtilityIcon(utility.type)}
                        <Badge
                           variant='outline'
                           className={`text-xs ${getStatusColor(utility.status)}`}
                        >
                           {utility.type}
                        </Badge>
                     </div>
                  ))}
               </div>
            </div>

            <div className='flex space-x-2'>
               <Button size='sm' variant='outline'>
                  <Eye className='mr-1 h-4 w-4' />
                  View Details
               </Button>
               <Button size='sm' variant='outline'>
                  <Edit className='mr-1 h-4 w-4' />
                  Edit
               </Button>
               <Button size='sm' variant='outline'>
                  <Settings className='mr-1 h-4 w-4' />
                  Manage
               </Button>
            </div>
         </CardContent>
      </Card>
   );

   const totalFacilities = mockFacilities.length;
   const operationalCount = mockFacilities.filter(
      (f) => f.status === 'operational'
   ).length;
   const maintenanceCount = mockFacilities.filter(
      (f) => f.status === 'maintenance'
   ).length;
   const offlineCount = mockFacilities.filter(
      (f) => f.status === 'offline'
   ).length;

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
                        Hospital Facilities Management
                     </h1>
                     <p className='mt-1 text-gray-600'>
                        Monitor and manage hospital facilities, equipment, and
                        utilities
                     </p>
                  </div>
                  <div className='flex items-center space-x-3'>
                     <Button variant='outline'>
                        <Activity className='mr-2 h-4 w-4' />
                        Maintenance Schedule
                     </Button>
                     <Button>
                        <Plus className='mr-2 h-4 w-4' />
                        Add Facility
                     </Button>
                  </div>
               </div>

               {/* Stats Cards */}
               <div className='grid grid-cols-1 gap-6 md:grid-cols-4'>
                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>
                                 Total Facilities
                              </p>
                              <p className='text-2xl font-bold text-gray-900'>
                                 {totalFacilities}
                              </p>
                           </div>
                           <div className='rounded-lg bg-blue-100 p-3'>
                              <Building className='h-6 w-6 text-blue-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>
                                 Operational
                              </p>
                              <p className='text-2xl font-bold text-green-600'>
                                 {operationalCount}
                              </p>
                           </div>
                           <div className='rounded-lg bg-green-100 p-3'>
                              <CheckCircle className='h-6 w-6 text-green-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>
                                 Maintenance
                              </p>
                              <p className='text-2xl font-bold text-yellow-600'>
                                 {maintenanceCount}
                              </p>
                           </div>
                           <div className='rounded-lg bg-yellow-100 p-3'>
                              <Wrench className='h-6 w-6 text-yellow-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>Offline</p>
                              <p className='text-2xl font-bold text-red-600'>
                                 {offlineCount}
                              </p>
                           </div>
                           <div className='rounded-lg bg-red-100 p-3'>
                              <XCircle className='h-6 w-6 text-red-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </div>

               {/* Search and Filters */}
               <Card>
                  <CardContent className='p-6'>
                     <div className='flex flex-col gap-4 lg:flex-row'>
                        <div className='relative flex-1'>
                           <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
                           <Input
                              placeholder='Search facilities by name, location, or department...'
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className='pl-10'
                           />
                        </div>
                        <div className='flex items-center space-x-2'>
                           <Filter className='h-4 w-4 text-gray-400' />
                           <select
                              value={selectedType}
                              onChange={(e) => setSelectedType(e.target.value)}
                              className='rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                           >
                              <option value='all'>All Types</option>
                              <option value='building'>Buildings</option>
                              <option value='wing'>Wings</option>
                              <option value='floor'>Floors</option>
                              <option value='room'>Rooms</option>
                              <option value='equipment'>Equipment</option>
                              <option value='utility'>Utilities</option>
                           </select>
                           <select
                              value={selectedStatus}
                              onChange={(e) =>
                                 setSelectedStatus(e.target.value)
                              }
                              className='rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                           >
                              <option value='all'>All Status</option>
                              <option value='operational'>Operational</option>
                              <option value='maintenance'>Maintenance</option>
                              <option value='offline'>Offline</option>
                              <option value='construction'>Construction</option>
                           </select>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Facilities Tabs */}
               <Tabs defaultValue='operational' className='space-y-6'>
                  <TabsList className='grid w-full max-w-md grid-cols-2'>
                     <TabsTrigger value='operational'>
                        Operational ({operationalFacilities.length})
                     </TabsTrigger>
                     <TabsTrigger value='maintenance'>
                        Maintenance ({maintenanceFacilities.length})
                     </TabsTrigger>
                  </TabsList>

                  <TabsContent value='operational' className='space-y-4'>
                     {operationalFacilities.length > 0 ? (
                        <div className='grid grid-cols-1 gap-4'>
                           {operationalFacilities.map((facility) => (
                              <FacilityCard
                                 key={facility.id}
                                 facility={facility}
                              />
                           ))}
                        </div>
                     ) : (
                        <Card>
                           <CardContent className='p-12 text-center'>
                              <CheckCircle className='mx-auto mb-4 h-12 w-12 text-green-400' />
                              <h3 className='mb-2 text-lg font-medium text-gray-900'>
                                 No operational facilities found
                              </h3>
                              <p className='text-gray-600'>
                                 No facilities match your current search
                                 criteria.
                              </p>
                           </CardContent>
                        </Card>
                     )}
                  </TabsContent>

                  <TabsContent value='maintenance' className='space-y-4'>
                     {maintenanceFacilities.length > 0 ? (
                        <div className='grid grid-cols-1 gap-4'>
                           {maintenanceFacilities.map((facility) => (
                              <FacilityCard
                                 key={facility.id}
                                 facility={facility}
                              />
                           ))}
                        </div>
                     ) : (
                        <Card>
                           <CardContent className='p-12 text-center'>
                              <Wrench className='mx-auto mb-4 h-12 w-12 text-gray-400' />
                              <h3 className='mb-2 text-lg font-medium text-gray-900'>
                                 No facilities under maintenance
                              </h3>
                              <p className='text-gray-600'>
                                 All facilities are currently operational.
                              </p>
                           </CardContent>
                        </Card>
                     )}
                  </TabsContent>
               </Tabs>
            </main>
         </div>
      </div>
   );
}

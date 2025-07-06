import { useEffect, useState } from 'react';

import {
   Activity,
   AlertTriangle,
   Calendar,
   Download,
   Eye,
   FileText,
   Filter,
   Heart,
   Pill,
   Plus,
   Search,
   TestTube,
   User,
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

interface MedicalRecord {
   id: string;
   patientId: string;
   patientName: string;
   type: 'visit' | 'lab' | 'imaging' | 'prescription' | 'procedure';
   title: string;
   description: string;
   date: Date;
   provider: string;
   status: 'completed' | 'pending' | 'cancelled';
   attachments: number;
   priority: 'low' | 'medium' | 'high' | 'critical';
}

export default function MedicalRecordsPage() {
   const { user, isAuthenticated } = useAuthStore();
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedType, setSelectedType] = useState<string>('all');
   const [selectedPatient, setSelectedPatient] = useState<string>('all');
   const navigate = useNavigate();

   useEffect(() => {
      if (!isAuthenticated || !user) {
         navigate('/', { replace: true, viewTransition: true });
         return;
      }
      if (user.role !== 'admin' && user.role !== 'doctor') {
         navigate('/dashboard', { replace: true, viewTransition: true });
         return;
      }
   }, [isAuthenticated, user, navigate]);

   if (
      !isAuthenticated ||
      !user ||
      (user.role !== 'admin' && user.role !== 'doctor')
   ) {
      return null;
   }

   // Mock medical records data
   const mockRecords: MedicalRecord[] = [
      {
         id: 'record_1',
         patientId: 'patient_1',
         patientName: 'John Doe',
         type: 'visit',
         title: 'Annual Physical Examination',
         description:
            'Comprehensive annual health checkup including vital signs, blood work, and general assessment',
         date: new Date(Date.now() - 86400000), // 1 day ago
         provider: 'Dr. Sarah Wilson',
         status: 'completed',
         attachments: 3,
         priority: 'medium',
      },
      {
         id: 'record_2',
         patientId: 'patient_1',
         patientName: 'John Doe',
         type: 'lab',
         title: 'Complete Blood Count (CBC)',
         description:
            'Routine blood work to check for infections, anemia, and other blood disorders',
         date: new Date(Date.now() - 172800000), // 2 days ago
         provider: 'Lab Department',
         status: 'completed',
         attachments: 1,
         priority: 'low',
      },
      {
         id: 'record_3',
         patientId: 'patient_2',
         patientName: 'Emily Johnson',
         type: 'imaging',
         title: 'Chest X-Ray',
         description:
            'Chest radiograph to evaluate respiratory symptoms and rule out pneumonia',
         date: new Date(Date.now() - 259200000), // 3 days ago
         provider: 'Radiology Department',
         status: 'completed',
         attachments: 2,
         priority: 'medium',
      },
      {
         id: 'record_4',
         patientId: 'patient_3',
         patientName: 'Robert Smith',
         type: 'prescription',
         title: 'Cardiac Medication Adjustment',
         description:
            'Updated prescription for Lisinopril and added Metoprolol for blood pressure management',
         date: new Date(Date.now() - 345600000), // 4 days ago
         provider: 'Dr. Michael Chen',
         status: 'completed',
         attachments: 0,
         priority: 'high',
      },
      {
         id: 'record_5',
         patientId: 'patient_3',
         patientName: 'Robert Smith',
         type: 'procedure',
         title: 'Echocardiogram',
         description:
            'Cardiac ultrasound to assess heart function and structure',
         date: new Date(Date.now() - 432000000), // 5 days ago
         provider: 'Dr. Sarah Wilson',
         status: 'completed',
         attachments: 4,
         priority: 'critical',
      },
      {
         id: 'record_6',
         patientId: 'patient_4',
         patientName: 'Maria Garcia',
         type: 'lab',
         title: 'Pregnancy Test',
         description: 'Routine pregnancy screening test',
         date: new Date(Date.now() - 518400000), // 6 days ago
         provider: 'Lab Department',
         status: 'pending',
         attachments: 0,
         priority: 'medium',
      },
   ];

   const getTypeIcon = (type: string) => {
      switch (type) {
         case 'visit':
            return <User className='h-4 w-4 text-blue-600' />;
         case 'lab':
            return <TestTube className='h-4 w-4 text-green-600' />;
         case 'imaging':
            return <Activity className='h-4 w-4 text-purple-600' />;
         case 'prescription':
            return <Pill className='h-4 w-4 text-orange-600' />;
         case 'procedure':
            return <Heart className='h-4 w-4 text-red-600' />;
         default:
            return <FileText className='h-4 w-4 text-gray-600' />;
      }
   };

   const getTypeColor = (type: string) => {
      switch (type) {
         case 'visit':
            return 'bg-blue-100 text-blue-800';
         case 'lab':
            return 'bg-green-100 text-green-800';
         case 'imaging':
            return 'bg-purple-100 text-purple-800';
         case 'prescription':
            return 'bg-orange-100 text-orange-800';
         case 'procedure':
            return 'bg-red-100 text-red-800';
         default:
            return 'bg-gray-100 text-gray-800';
      }
   };

   const getStatusColor = (status: string) => {
      switch (status) {
         case 'completed':
            return 'bg-green-100 text-green-800 hover:bg-green-100';
         case 'pending':
            return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
         case 'cancelled':
            return 'bg-red-100 text-red-800 hover:bg-red-100';
         default:
            return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
      }
   };

   const getPriorityColor = (priority: string) => {
      switch (priority) {
         case 'critical':
            return 'bg-red-100 text-red-800';
         case 'high':
            return 'bg-orange-100 text-orange-800';
         case 'medium':
            return 'bg-yellow-100 text-yellow-800';
         case 'low':
            return 'bg-green-100 text-green-800';
         default:
            return 'bg-gray-100 text-gray-800';
      }
   };

   const filteredRecords = mockRecords.filter((record) => {
      const matchesSearch =
         record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         record.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
         record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
         record.provider.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType =
         selectedType === 'all' || record.type === selectedType;
      const matchesPatient =
         selectedPatient === 'all' || record.patientId === selectedPatient;
      return matchesSearch && matchesType && matchesPatient;
   });

   const recentRecords = filteredRecords.filter(
      (record) => record.date > new Date(Date.now() - 604800000) // Last 7 days
   );

   const allRecords = filteredRecords;

   const RecordCard = ({ record }: { record: MedicalRecord }) => (
      <Card className='transition-shadow duration-200 hover:shadow-md'>
         <CardContent className='p-6'>
            <div className='flex items-start justify-between'>
               <div className='flex-1'>
                  <div className='mb-2 flex items-center space-x-2'>
                     {getTypeIcon(record.type)}
                     <h3 className='font-semibold text-gray-900'>
                        {record.title}
                     </h3>
                     <Badge className={getTypeColor(record.type)}>
                        {record.type.charAt(0).toUpperCase() +
                           record.type.slice(1)}
                     </Badge>
                     <Badge className={getPriorityColor(record.priority)}>
                        {record.priority.charAt(0).toUpperCase() +
                           record.priority.slice(1)}
                     </Badge>
                  </div>

                  <p className='mb-3 text-sm text-gray-600'>
                     {record.description}
                  </p>

                  <div className='grid grid-cols-1 gap-3 text-sm text-gray-500 sm:grid-cols-2'>
                     <div className='flex items-center space-x-2'>
                        <User className='h-4 w-4' />
                        <span>Patient: {record.patientName}</span>
                     </div>
                     <div className='flex items-center space-x-2'>
                        <Calendar className='h-4 w-4' />
                        <span>{record.date.toLocaleDateString()}</span>
                     </div>
                     <div className='flex items-center space-x-2'>
                        <Activity className='h-4 w-4' />
                        <span>Provider: {record.provider}</span>
                     </div>
                     {record.attachments > 0 && (
                        <div className='flex items-center space-x-2'>
                           <FileText className='h-4 w-4' />
                           <span>
                              {record.attachments} attachment
                              {record.attachments > 1 ? 's' : ''}
                           </span>
                        </div>
                     )}
                  </div>
               </div>

               <div className='ml-4 flex flex-col items-end space-y-2'>
                  <Badge className={getStatusColor(record.status)}>
                     {record.status.charAt(0).toUpperCase() +
                        record.status.slice(1)}
                  </Badge>
                  <div className='flex space-x-2'>
                     <Button variant='outline' size='sm'>
                        <Eye className='mr-1 h-4 w-4' />
                        View
                     </Button>
                     <Button variant='outline' size='sm'>
                        <Download className='mr-1 h-4 w-4' />
                        Export
                     </Button>
                  </div>
               </div>
            </div>
         </CardContent>
      </Card>
   );

   const uniquePatients = Array.from(
      new Set(mockRecords.map((r) => r.patientId))
   )
      .map((id) => mockRecords.find((r) => r.patientId === id))
      .filter(Boolean);

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
                        Medical Records
                     </h1>
                     <p className='mt-1 text-gray-600'>
                        Access and manage patient medical records and
                        documentation
                     </p>
                  </div>
                  <div className='flex items-center space-x-3'>
                     <Button variant='outline'>
                        <Download className='mr-2 h-4 w-4' />
                        Export Records
                     </Button>
                     <Button>
                        <Plus className='mr-2 h-4 w-4' />
                        Add Record
                     </Button>
                  </div>
               </div>

               {/* Stats Cards */}
               <div className='grid grid-cols-1 gap-6 md:grid-cols-5'>
                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>
                                 Total Records
                              </p>
                              <p className='text-2xl font-bold text-gray-900'>
                                 {mockRecords.length}
                              </p>
                           </div>
                           <div className='rounded-lg bg-blue-100 p-3'>
                              <FileText className='h-6 w-6 text-blue-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>
                                 Lab Results
                              </p>
                              <p className='text-2xl font-bold text-green-600'>
                                 {
                                    mockRecords.filter((r) => r.type === 'lab')
                                       .length
                                 }
                              </p>
                           </div>
                           <div className='rounded-lg bg-green-100 p-3'>
                              <TestTube className='h-6 w-6 text-green-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>Imaging</p>
                              <p className='text-2xl font-bold text-purple-600'>
                                 {
                                    mockRecords.filter(
                                       (r) => r.type === 'imaging'
                                    ).length
                                 }
                              </p>
                           </div>
                           <div className='rounded-lg bg-purple-100 p-3'>
                              <Activity className='h-6 w-6 text-purple-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>
                                 Prescriptions
                              </p>
                              <p className='text-2xl font-bold text-orange-600'>
                                 {
                                    mockRecords.filter(
                                       (r) => r.type === 'prescription'
                                    ).length
                                 }
                              </p>
                           </div>
                           <div className='rounded-lg bg-orange-100 p-3'>
                              <Pill className='h-6 w-6 text-orange-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>Critical</p>
                              <p className='text-2xl font-bold text-red-600'>
                                 {
                                    mockRecords.filter(
                                       (r) => r.priority === 'critical'
                                    ).length
                                 }
                              </p>
                           </div>
                           <div className='rounded-lg bg-red-100 p-3'>
                              <AlertTriangle className='h-6 w-6 text-red-600' />
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
                              placeholder='Search records by title, description, patient, or provider...'
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
                              <option value='visit'>Visits</option>
                              <option value='lab'>Lab Results</option>
                              <option value='imaging'>Imaging</option>
                              <option value='prescription'>
                                 Prescriptions
                              </option>
                              <option value='procedure'>Procedures</option>
                           </select>
                           <select
                              value={selectedPatient}
                              onChange={(e) =>
                                 setSelectedPatient(e.target.value)
                              }
                              className='rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                           >
                              <option value='all'>All Patients</option>
                              {uniquePatients.map((patient) => (
                                 <option
                                    key={patient?.patientId}
                                    value={patient?.patientId}
                                 >
                                    {patient?.patientName}
                                 </option>
                              ))}
                           </select>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Records Tabs */}
               <Tabs defaultValue='recent' className='space-y-6'>
                  <TabsList className='grid w-full max-w-md grid-cols-2'>
                     <TabsTrigger value='recent'>
                        Recent ({recentRecords.length})
                     </TabsTrigger>
                     <TabsTrigger value='all'>
                        All Records ({allRecords.length})
                     </TabsTrigger>
                  </TabsList>

                  <TabsContent value='recent' className='space-y-4'>
                     {recentRecords.length > 0 ? (
                        recentRecords.map((record) => (
                           <RecordCard key={record.id} record={record} />
                        ))
                     ) : (
                        <Card>
                           <CardContent className='p-12 text-center'>
                              <FileText className='mx-auto mb-4 h-12 w-12 text-gray-400' />
                              <h3 className='mb-2 text-lg font-medium text-gray-900'>
                                 No recent records
                              </h3>
                              <p className='text-gray-600'>
                                 No medical records found in the last 7 days.
                              </p>
                           </CardContent>
                        </Card>
                     )}
                  </TabsContent>

                  <TabsContent value='all' className='space-y-4'>
                     {allRecords.length > 0 ? (
                        allRecords.map((record) => (
                           <RecordCard key={record.id} record={record} />
                        ))
                     ) : (
                        <Card>
                           <CardContent className='p-12 text-center'>
                              <FileText className='mx-auto mb-4 h-12 w-12 text-gray-400' />
                              <h3 className='mb-2 text-lg font-medium text-gray-900'>
                                 No records found
                              </h3>
                              <p className='mb-4 text-gray-600'>
                                 No medical records match your current search
                                 criteria.
                              </p>
                              <Button>
                                 <Plus className='mr-2 h-4 w-4' />
                                 Add New Record
                              </Button>
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

import { useEffect, useState } from 'react';

import {
   AlertTriangle,
   Calendar,
   CheckCircle,
   Clock,
   Eye,
   FileText,
   Filter,
   Package,
   Phone,
   Pill,
   Search,
   Truck,
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

interface PrescriptionOrder {
   id: string;
   prescriptionId: string;
   patientName: string;
   patientPhone: string;
   doctorName: string;
   medicationName: string;
   strength: string;
   quantity: number;
   instructions: string;
   status: 'received' | 'processing' | 'ready' | 'dispensed' | 'delivered';
   priority: 'normal' | 'urgent' | 'stat';
   receivedAt: Date;
   estimatedReady?: Date;
   notes?: string;
   insuranceInfo?: string;
}

export default function PrescriptionQueuePage() {
   const { user, isAuthenticated } = useAuthStore();
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedStatus, setSelectedStatus] = useState<string>('all');
   const [selectedPriority, setSelectedPriority] = useState<string>('all');
   const navigate = useNavigate();

   useEffect(() => {
      if (!isAuthenticated || !user) {
         navigate('/', { replace: true, viewTransition: true });
         return;
      }
      if (user.role !== 'pharmacy') {
         navigate('/dashboard', { replace: true, viewTransition: true });
         return;
      }
   }, [isAuthenticated, user, navigate]);

   if (!isAuthenticated || !user || user.role !== 'pharmacy') {
      return null;
   }

   // Mock prescription orders data
   const mockOrders: PrescriptionOrder[] = [
      {
         id: 'order_1',
         prescriptionId: 'rx_001',
         patientName: 'John Doe',
         patientPhone: '+1-555-0123',
         doctorName: 'Dr. Sarah Wilson',
         medicationName: 'Amoxicillin',
         strength: '500mg',
         quantity: 21,
         instructions:
            'Take one capsule three times daily with food for 7 days',
         status: 'received',
         priority: 'normal',
         receivedAt: new Date(Date.now() - 1800000), // 30 minutes ago
         estimatedReady: new Date(Date.now() + 3600000), // 1 hour from now
         insuranceInfo: 'Blue Cross Blue Shield',
      },
      {
         id: 'order_2',
         prescriptionId: 'rx_002',
         patientName: 'Emily Johnson',
         patientPhone: '+1-555-0124',
         doctorName: 'Dr. Michael Chen',
         medicationName: 'Lisinopril',
         strength: '10mg',
         quantity: 30,
         instructions: 'Take one tablet once daily in the morning',
         status: 'processing',
         priority: 'normal',
         receivedAt: new Date(Date.now() - 3600000), // 1 hour ago
         estimatedReady: new Date(Date.now() + 1800000), // 30 minutes from now
         insuranceInfo: 'Aetna',
      },
      {
         id: 'order_3',
         prescriptionId: 'rx_003',
         patientName: 'Robert Smith',
         patientPhone: '+1-555-0125',
         doctorName: 'Dr. Jennifer Martinez',
         medicationName: 'Metformin',
         strength: '500mg',
         quantity: 60,
         instructions: 'Take one tablet twice daily with meals',
         status: 'ready',
         priority: 'normal',
         receivedAt: new Date(Date.now() - 7200000), // 2 hours ago
         notes: 'Patient prefers generic version',
      },
      {
         id: 'order_4',
         prescriptionId: 'rx_004',
         patientName: 'Maria Garcia',
         patientPhone: '+1-555-0126',
         doctorName: 'Dr. Robert Taylor',
         medicationName: 'Albuterol Inhaler',
         strength: '90mcg',
         quantity: 1,
         instructions:
            'Use as needed for breathing difficulty, 2 puffs every 4-6 hours',
         status: 'received',
         priority: 'urgent',
         receivedAt: new Date(Date.now() - 900000), // 15 minutes ago
         estimatedReady: new Date(Date.now() + 1800000), // 30 minutes from now
         insuranceInfo: 'Medicare',
      },
      {
         id: 'order_5',
         prescriptionId: 'rx_005',
         patientName: 'David Brown',
         patientPhone: '+1-555-0127',
         doctorName: 'Dr. Lisa Anderson',
         medicationName: 'Atorvastatin',
         strength: '20mg',
         quantity: 30,
         instructions: 'Take one tablet once daily at bedtime',
         status: 'dispensed',
         priority: 'normal',
         receivedAt: new Date(Date.now() - 10800000), // 3 hours ago
         notes: 'Picked up by patient',
      },
   ];

   const getStatusColor = (status: string) => {
      switch (status) {
         case 'received':
            return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
         case 'processing':
            return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
         case 'ready':
            return 'bg-green-100 text-green-800 hover:bg-green-100';
         case 'dispensed':
            return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
         case 'delivered':
            return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
         default:
            return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
      }
   };

   const getStatusIcon = (status: string) => {
      switch (status) {
         case 'received':
            return <Clock className='h-4 w-4 text-blue-600' />;
         case 'processing':
            return <Package className='h-4 w-4 text-yellow-600' />;
         case 'ready':
            return <CheckCircle className='h-4 w-4 text-green-600' />;
         case 'dispensed':
            return <CheckCircle className='h-4 w-4 text-gray-600' />;
         case 'delivered':
            return <Truck className='h-4 w-4 text-purple-600' />;
         default:
            return <Clock className='h-4 w-4 text-gray-600' />;
      }
   };

   const getPriorityColor = (priority: string) => {
      switch (priority) {
         case 'stat':
            return 'bg-red-100 text-red-800';
         case 'urgent':
            return 'bg-orange-100 text-orange-800';
         default:
            return 'bg-gray-100 text-gray-800';
      }
   };

   const handleStatusUpdate = (orderId: string, newStatus: string) => {
      console.log('Updating order status:', orderId, newStatus);
      alert(`Order ${orderId} status updated to ${newStatus}`);
   };

   const handleViewDetails = (order: PrescriptionOrder) => {
      console.log('Viewing order details:', order.id);
      alert('Order details modal would open here');
   };

   const handleContactPatient = (phone: string) => {
      console.log('Contacting patient:', phone);
      alert(`Calling patient at ${phone}`);
   };

   const filteredOrders = mockOrders.filter((order) => {
      const matchesSearch =
         order.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
         order.medicationName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
         order.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
         order.prescriptionId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
         selectedStatus === 'all' || order.status === selectedStatus;
      const matchesPriority =
         selectedPriority === 'all' || order.priority === selectedPriority;
      return matchesSearch && matchesStatus && matchesPriority;
   });

   const pendingOrders = filteredOrders.filter((order) =>
      ['received', 'processing'].includes(order.status)
   );

   const readyOrders = filteredOrders.filter(
      (order) => order.status === 'ready'
   );

   const completedOrders = filteredOrders.filter((order) =>
      ['dispensed', 'delivered'].includes(order.status)
   );

   const OrderCard = ({ order }: { order: PrescriptionOrder }) => (
      <Card className='transition-shadow duration-200 hover:shadow-md'>
         <CardContent className='p-6'>
            <div className='flex items-start justify-between'>
               <div className='flex-1'>
                  <div className='mb-2 flex items-center space-x-2'>
                     <Pill className='h-5 w-5 text-blue-600' />
                     <h3 className='font-semibold text-gray-900'>
                        {order.medicationName} {order.strength}
                     </h3>
                     <Badge className={getStatusColor(order.status)}>
                        {getStatusIcon(order.status)}
                        <span className='ml-1'>
                           {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                        </span>
                     </Badge>
                     {order.priority !== 'normal' && (
                        <Badge className={getPriorityColor(order.priority)}>
                           <AlertTriangle className='mr-1 h-3 w-3' />
                           {order.priority.toUpperCase()}
                        </Badge>
                     )}
                  </div>

                  <div className='mb-4 space-y-2 text-sm text-gray-700'>
                     <div className='flex items-center space-x-2'>
                        <User className='h-4 w-4' />
                        <span>
                           <strong>Patient:</strong> {order.patientName}
                        </span>
                     </div>
                     <div className='flex items-center space-x-2'>
                        <FileText className='h-4 w-4' />
                        <span>
                           <strong>Doctor:</strong> {order.doctorName}
                        </span>
                     </div>
                     <div className='flex items-center space-x-2'>
                        <Package className='h-4 w-4' />
                        <span>
                           <strong>Quantity:</strong> {order.quantity}
                        </span>
                     </div>
                     <p>
                        <strong>Instructions:</strong> {order.instructions}
                     </p>
                     {order.insuranceInfo && (
                        <p>
                           <strong>Insurance:</strong> {order.insuranceInfo}
                        </p>
                     )}
                     {order.notes && (
                        <p className='text-blue-700'>
                           <strong>Notes:</strong> {order.notes}
                        </p>
                     )}
                  </div>

                  <div className='grid grid-cols-1 gap-3 text-sm text-gray-500 sm:grid-cols-2'>
                     <div className='flex items-center space-x-2'>
                        <Calendar className='h-4 w-4' />
                        <span>
                           Received: {order.receivedAt.toLocaleString()}
                        </span>
                     </div>
                     {order.estimatedReady && (
                        <div className='flex items-center space-x-2'>
                           <Clock className='h-4 w-4' />
                           <span>
                              Est. Ready:{' '}
                              {order.estimatedReady.toLocaleString()}
                           </span>
                        </div>
                     )}
                  </div>
               </div>

               <div className='ml-4 flex flex-col space-y-2'>
                  {order.status === 'received' && (
                     <Button
                        size='sm'
                        className='bg-yellow-600 hover:bg-yellow-700'
                        onClick={() =>
                           handleStatusUpdate(order.id, 'processing')
                        }
                     >
                        Start Processing
                     </Button>
                  )}
                  {order.status === 'processing' && (
                     <Button
                        size='sm'
                        className='bg-green-600 hover:bg-green-700'
                        onClick={() => handleStatusUpdate(order.id, 'ready')}
                     >
                        Mark Ready
                     </Button>
                  )}
                  {order.status === 'ready' && (
                     <Button
                        size='sm'
                        className='bg-blue-600 hover:bg-blue-700'
                        onClick={() =>
                           handleStatusUpdate(order.id, 'dispensed')
                        }
                     >
                        Dispense
                     </Button>
                  )}
                  <Button
                     variant='outline'
                     size='sm'
                     onClick={() => handleViewDetails(order)}
                  >
                     <Eye className='mr-1 h-4 w-4' />
                     Details
                  </Button>
                  <Button
                     variant='outline'
                     size='sm'
                     onClick={() => handleContactPatient(order.patientPhone)}
                  >
                     <Phone className='mr-1 h-4 w-4' />
                     Call Patient
                  </Button>
               </div>
            </div>
         </CardContent>
      </Card>
   );

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
                        Pharmacy Queue
                     </h1>
                     <p className='mt-1 text-gray-600'>
                        Process and manage prescription orders
                     </p>
                  </div>
                  <div className='text-right'>
                     <p className='text-sm text-gray-500'>Active Orders</p>
                     <p className='text-2xl font-bold text-blue-600'>
                        {pendingOrders.length + readyOrders.length}
                     </p>
                  </div>
               </div>

               {/* Summary Cards */}
               <div className='grid grid-cols-1 gap-6 md:grid-cols-4'>
                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>Pending</p>
                              <p className='text-2xl font-bold text-blue-600'>
                                 {pendingOrders.length}
                              </p>
                           </div>
                           <div className='rounded-lg bg-blue-100 p-3'>
                              <Clock className='h-6 w-6 text-blue-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>Ready</p>
                              <p className='text-2xl font-bold text-green-600'>
                                 {readyOrders.length}
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
                                 Completed Today
                              </p>
                              <p className='text-2xl font-bold text-purple-600'>
                                 {completedOrders.length}
                              </p>
                           </div>
                           <div className='rounded-lg bg-purple-100 p-3'>
                              <Package className='h-6 w-6 text-purple-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>
                                 Urgent Orders
                              </p>
                              <p className='text-2xl font-bold text-orange-600'>
                                 {
                                    mockOrders.filter(
                                       (o) =>
                                          o.priority === 'urgent' ||
                                          o.priority === 'stat'
                                    ).length
                                 }
                              </p>
                           </div>
                           <div className='rounded-lg bg-orange-100 p-3'>
                              <AlertTriangle className='h-6 w-6 text-orange-600' />
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
                              placeholder='Search by patient name, medication, or prescription ID...'
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className='pl-10'
                           />
                        </div>
                        <div className='flex items-center space-x-2'>
                           <Filter className='h-4 w-4 text-gray-400' />
                           <select
                              value={selectedStatus}
                              onChange={(e) =>
                                 setSelectedStatus(e.target.value)
                              }
                              className='rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                           >
                              <option value='all'>All Status</option>
                              <option value='received'>Received</option>
                              <option value='processing'>Processing</option>
                              <option value='ready'>Ready</option>
                              <option value='dispensed'>Dispensed</option>
                              <option value='delivered'>Delivered</option>
                           </select>
                           <select
                              value={selectedPriority}
                              onChange={(e) =>
                                 setSelectedPriority(e.target.value)
                              }
                              className='rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                           >
                              <option value='all'>All Priority</option>
                              <option value='normal'>Normal</option>
                              <option value='urgent'>Urgent</option>
                              <option value='stat'>STAT</option>
                           </select>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Orders Tabs */}
               <Tabs defaultValue='pending' className='space-y-6'>
                  <TabsList className='grid w-full max-w-lg grid-cols-3'>
                     <TabsTrigger value='pending'>
                        Pending ({pendingOrders.length})
                     </TabsTrigger>
                     <TabsTrigger value='ready'>
                        Ready ({readyOrders.length})
                     </TabsTrigger>
                     <TabsTrigger value='completed'>
                        Completed ({completedOrders.length})
                     </TabsTrigger>
                  </TabsList>

                  <TabsContent value='pending' className='space-y-4'>
                     {pendingOrders.length > 0 ? (
                        pendingOrders.map((order) => (
                           <OrderCard key={order.id} order={order} />
                        ))
                     ) : (
                        <Card>
                           <CardContent className='p-12 text-center'>
                              <Clock className='mx-auto mb-4 h-12 w-12 text-gray-400' />
                              <h3 className='mb-2 text-lg font-medium text-gray-900'>
                                 No pending orders
                              </h3>
                              <p className='text-gray-600'>
                                 All prescription orders have been processed.
                              </p>
                           </CardContent>
                        </Card>
                     )}
                  </TabsContent>

                  <TabsContent value='ready' className='space-y-4'>
                     {readyOrders.length > 0 ? (
                        readyOrders.map((order) => (
                           <OrderCard key={order.id} order={order} />
                        ))
                     ) : (
                        <Card>
                           <CardContent className='p-12 text-center'>
                              <CheckCircle className='mx-auto mb-4 h-12 w-12 text-gray-400' />
                              <h3 className='mb-2 text-lg font-medium text-gray-900'>
                                 No orders ready
                              </h3>
                              <p className='text-gray-600'>
                                 Orders ready for pickup will appear here.
                              </p>
                           </CardContent>
                        </Card>
                     )}
                  </TabsContent>

                  <TabsContent value='completed' className='space-y-4'>
                     {completedOrders.length > 0 ? (
                        completedOrders.map((order) => (
                           <OrderCard key={order.id} order={order} />
                        ))
                     ) : (
                        <Card>
                           <CardContent className='p-12 text-center'>
                              <Package className='mx-auto mb-4 h-12 w-12 text-gray-400' />
                              <h3 className='mb-2 text-lg font-medium text-gray-900'>
                                 No completed orders
                              </h3>
                              <p className='text-gray-600'>
                                 Completed orders will appear here.
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

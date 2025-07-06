import { useEffect, useState } from 'react';

import {
   Activity,
   AlertTriangle,
   CheckCircle,
   Clock,
   Heart,
   MapPin,
   Navigation,
   Radio,
   Shield,
   Truck,
   User,
   XCircle,
   Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Alert, AlertDescription } from '@/shared/components/ui/alert';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
import { useAppStore, useAuthStore } from '@/shared/lib/store';
import { EmergencyAlert, EmergencyStatus } from '@/shared/types';

import { Header } from '@/app/layouts/components/header';
import { Sidebar } from '@/app/layouts/components/sidebar';

interface Ambulance {
   id: string;
   vehicleNumber: string;
   status:
      | 'available'
      | 'dispatched'
      | 'on-scene'
      | 'transporting'
      | 'at-hospital'
      | 'out-of-service';
   location: string;
   crew: string[];
   currentCall?: string;
   eta?: number;
}

export default function EmergencyCenterPage() {
   const { user, isAuthenticated } = useAuthStore();
   const { emergencyAlerts, updateEmergencyAlert } = useAppStore();
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [selectedAlert, setSelectedAlert] = useState<EmergencyAlert | null>(
      null
   );
   const navigate = useNavigate();

   useEffect(() => {
      if (!isAuthenticated || !user) {
         navigate('/');
         return;
      }
      if (user.role !== 'admin' && user.role !== 'doctor') {
         navigate('/dashboard');
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

   // Mock ambulances data
   const mockAmbulances: Ambulance[] = [
      {
         id: 'amb_1',
         vehicleNumber: 'AMB-001',
         status: 'available',
         location: 'Station 1 - Downtown',
         crew: ['John Smith (Paramedic)', 'Sarah Johnson (EMT)'],
      },
      {
         id: 'amb_2',
         vehicleNumber: 'AMB-002',
         status: 'dispatched',
         location: 'En route to 123 Main St',
         crew: ['Mike Wilson (Paramedic)', 'Lisa Brown (EMT)'],
         currentCall: 'emergency_1',
         eta: 8,
      },
      {
         id: 'amb_3',
         vehicleNumber: 'AMB-003',
         status: 'on-scene',
         location: '456 Oak Avenue',
         crew: ['David Lee (Paramedic)', 'Emma Davis (EMT)'],
         currentCall: 'emergency_2',
      },
      {
         id: 'amb_4',
         vehicleNumber: 'AMB-004',
         status: 'transporting',
         location: 'En route to General Hospital',
         crew: ['Robert Taylor (Paramedic)', 'Jennifer White (EMT)'],
         currentCall: 'emergency_3',
         eta: 12,
      },
      {
         id: 'amb_5',
         vehicleNumber: 'AMB-005',
         status: 'out-of-service',
         location: 'Maintenance Facility',
         crew: [],
      },
   ];

   // Mock emergency alerts
   const mockEmergencyAlerts: EmergencyAlert[] = [
      {
         id: 'emergency_1',
         patientId: 'patient_1',
         type: 'cardiac',
         severity: 'critical',
         location: {
            latitude: 37.7749,
            longitude: -122.4194,
            address: '123 Main St, San Francisco, CA',
         },
         timestamp: new Date(Date.now() - 300000), // 5 minutes ago
         status: 'dispatched',
         description: 'Chest pain, difficulty breathing, possible heart attack',
         respondersNotified: ['ambulance_amb_2', 'hospital_general'],
      },
      {
         id: 'emergency_2',
         patientId: 'patient_2',
         type: 'trauma',
         severity: 'high',
         location: {
            latitude: 37.7849,
            longitude: -122.4094,
            address: '456 Oak Avenue, San Francisco, CA',
         },
         timestamp: new Date(Date.now() - 600000), // 10 minutes ago
         status: 'on-scene',
         description: 'Motor vehicle accident, multiple injuries',
         respondersNotified: ['ambulance_amb_3', 'fire_department', 'police'],
      },
      {
         id: 'emergency_3',
         patientId: 'patient_3',
         type: 'medical',
         severity: 'medium',
         location: {
            latitude: 37.7649,
            longitude: -122.4294,
            address: '789 Pine Street, San Francisco, CA',
         },
         timestamp: new Date(Date.now() - 900000), // 15 minutes ago
         status: 'on-scene',
         description: 'Elderly patient fall, possible fracture',
         respondersNotified: ['ambulance_amb_4'],
      },
      {
         id: 'emergency_4',
         patientId: 'patient_4',
         type: 'respiratory',
         severity: 'high',
         location: {
            latitude: 37.7549,
            longitude: -122.4394,
            address: '321 Elm Drive, San Francisco, CA',
         },
         timestamp: new Date(Date.now() - 120000), // 2 minutes ago
         status: 'active',
         description: 'Severe asthma attack, patient unconscious',
         respondersNotified: ['dispatch_center'],
      },
   ];

   const getStatusColor = (status: EmergencyStatus) => {
      switch (status) {
         case 'active':
            return 'bg-red-100 text-red-800 border-red-200';
         case 'dispatched':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
         case 'on-scene':
            return 'bg-blue-100 text-blue-800 border-blue-200';
         case 'resolved':
            return 'bg-green-100 text-green-800 border-green-200';
         case 'cancelled':
            return 'bg-gray-100 text-gray-800 border-gray-200';
         default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
      }
   };

   const getStatusIcon = (status: EmergencyStatus) => {
      switch (status) {
         case 'active':
            return <AlertTriangle className='h-4 w-4' />;
         case 'dispatched':
            return <Truck className='h-4 w-4' />;
         case 'on-scene':
            return <Activity className='h-4 w-4' />;
         case 'resolved':
            return <CheckCircle className='h-4 w-4' />;
         case 'cancelled':
            return <XCircle className='h-4 w-4' />;
         default:
            return <Clock className='h-4 w-4' />;
      }
   };

   const getSeverityColor = (severity: string) => {
      switch (severity) {
         case 'critical':
            return 'bg-red-500 text-white';
         case 'high':
            return 'bg-orange-500 text-white';
         case 'medium':
            return 'bg-yellow-500 text-white';
         case 'low':
            return 'bg-green-500 text-white';
         default:
            return 'bg-gray-500 text-white';
      }
   };

   const getTypeIcon = (type: string) => {
      switch (type) {
         case 'cardiac':
            return <Heart className='h-4 w-4' />;
         case 'trauma':
            return <Zap className='h-4 w-4' />;
         case 'respiratory':
            return <Activity className='h-4 w-4' />;
         default:
            return <AlertTriangle className='h-4 w-4' />;
      }
   };

   const getAmbulanceStatusColor = (status: string) => {
      switch (status) {
         case 'available':
            return 'bg-green-100 text-green-800';
         case 'dispatched':
            return 'bg-yellow-100 text-yellow-800';
         case 'on-scene':
            return 'bg-blue-100 text-blue-800';
         case 'transporting':
            return 'bg-purple-100 text-purple-800';
         case 'at-hospital':
            return 'bg-indigo-100 text-indigo-800';
         case 'out-of-service':
            return 'bg-red-100 text-red-800';
         default:
            return 'bg-gray-100 text-gray-800';
      }
   };

   const handleDispatchAmbulance = (alertId: string) => {
      console.log('Dispatching ambulance for alert:', alertId);
      updateEmergencyAlert(alertId, { status: 'dispatched' });
      alert('Ambulance dispatched successfully!');
   };

   const handleUpdateStatus = (alertId: string, newStatus: EmergencyStatus) => {
      console.log('Updating alert status:', alertId, newStatus);
      updateEmergencyAlert(alertId, { status: newStatus });
   };

   const activeAlerts = [...mockEmergencyAlerts, ...emergencyAlerts].filter(
      (alert) =>
         alert.status === 'active' ||
         alert.status === 'dispatched' ||
         alert.status === 'on-scene'
   );

   const resolvedAlerts = [...mockEmergencyAlerts, ...emergencyAlerts].filter(
      (alert) => alert.status === 'resolved' || alert.status === 'cancelled'
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
                        Emergency Command Center
                     </h1>
                     <p className='mt-1 text-gray-600'>
                        Monitor and coordinate emergency response operations
                     </p>
                  </div>
                  <div className='flex items-center space-x-3'>
                     <Badge className='bg-red-100 px-3 py-1 text-red-800'>
                        <Radio className='mr-1 h-4 w-4' />
                        LIVE
                     </Badge>
                     <Button variant='outline'>
                        <Navigation className='mr-2 h-4 w-4' />
                        View Map
                     </Button>
                  </div>
               </div>

               {/* Critical Alerts Banner */}
               {activeAlerts.filter((alert) => alert.severity === 'critical')
                  .length > 0 && (
                  <Alert className='border-red-200 bg-red-50'>
                     <AlertTriangle className='h-4 w-4 text-red-600' />
                     <AlertDescription className='text-red-800'>
                        <strong>CRITICAL ALERT:</strong>{' '}
                        {
                           activeAlerts.filter(
                              (alert) => alert.severity === 'critical'
                           ).length
                        }{' '}
                        critical emergency
                        {activeAlerts.filter(
                           (alert) => alert.severity === 'critical'
                        ).length > 1
                           ? 'ies'
                           : 'y'}{' '}
                        requiring immediate attention.
                     </AlertDescription>
                  </Alert>
               )}

               {/* Stats Cards */}
               <div className='grid grid-cols-1 gap-6 md:grid-cols-4'>
                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>
                                 Active Emergencies
                              </p>
                              <p className='text-2xl font-bold text-red-600'>
                                 {activeAlerts.length}
                              </p>
                           </div>
                           <div className='rounded-lg bg-red-100 p-3'>
                              <AlertTriangle className='h-6 w-6 text-red-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>
                                 Available Ambulances
                              </p>
                              <p className='text-2xl font-bold text-green-600'>
                                 {
                                    mockAmbulances.filter(
                                       (amb) => amb.status === 'available'
                                    ).length
                                 }
                              </p>
                           </div>
                           <div className='rounded-lg bg-green-100 p-3'>
                              <Truck className='h-6 w-6 text-green-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>
                                 Response Time
                              </p>
                              <p className='text-2xl font-bold text-blue-600'>
                                 6.2 min
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
                              <p className='text-sm text-gray-600'>
                                 Resolved Today
                              </p>
                              <p className='text-2xl font-bold text-purple-600'>
                                 24
                              </p>
                           </div>
                           <div className='rounded-lg bg-purple-100 p-3'>
                              <CheckCircle className='h-6 w-6 text-purple-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </div>

               <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
                  {/* Active Emergencies */}
                  <div className='space-y-6 lg:col-span-2'>
                     <Card>
                        <CardHeader>
                           <CardTitle className='flex items-center space-x-2'>
                              <AlertTriangle className='h-5 w-5 text-red-600' />
                              <span>
                                 Active Emergencies ({activeAlerts.length})
                              </span>
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           {activeAlerts.length > 0 ? (
                              <div className='space-y-4'>
                                 {activeAlerts.map((alert) => (
                                    <div
                                       key={alert.id}
                                       className={`cursor-pointer rounded-lg border p-4 transition-shadow hover:shadow-md ${getStatusColor(alert.status)}`}
                                       onClick={() => setSelectedAlert(alert)}
                                    >
                                       <div className='mb-2 flex items-start justify-between'>
                                          <div className='flex items-center space-x-2'>
                                             {getTypeIcon(alert.type)}
                                             <span className='font-medium'>
                                                {alert.type
                                                   .charAt(0)
                                                   .toUpperCase() +
                                                   alert.type.slice(1)}{' '}
                                                Emergency
                                             </span>
                                             <Badge
                                                className={getSeverityColor(
                                                   alert.severity
                                                )}
                                             >
                                                {alert.severity.toUpperCase()}
                                             </Badge>
                                          </div>
                                          <Badge
                                             className={getStatusColor(
                                                alert.status
                                             )}
                                          >
                                             {getStatusIcon(alert.status)}
                                             <span className='ml-1'>
                                                {alert.status}
                                             </span>
                                          </Badge>
                                       </div>

                                       <p className='mb-3 text-sm text-gray-700'>
                                          {alert.description}
                                       </p>

                                       <div className='grid grid-cols-1 gap-2 text-xs text-gray-600 sm:grid-cols-2'>
                                          <div className='flex items-center space-x-1'>
                                             <MapPin className='h-3 w-3' />
                                             <span>
                                                {alert.location.address}
                                             </span>
                                          </div>
                                          <div className='flex items-center space-x-1'>
                                             <Clock className='h-3 w-3' />
                                             <span>
                                                {Math.floor(
                                                   (Date.now() -
                                                      alert.timestamp.getTime()) /
                                                      60000
                                                )}{' '}
                                                min ago
                                             </span>
                                          </div>
                                       </div>

                                       {alert.status === 'active' && (
                                          <div className='mt-3 flex space-x-2'>
                                             <Button
                                                size='sm'
                                                className='bg-red-600 hover:bg-red-700'
                                                onClick={(e) => {
                                                   e.stopPropagation();
                                                   handleDispatchAmbulance(
                                                      alert.id
                                                   );
                                                }}
                                             >
                                                <Truck className='mr-1 h-3 w-3' />
                                                Dispatch
                                             </Button>
                                             <Button
                                                size='sm'
                                                variant='outline'
                                                onClick={(e) => {
                                                   e.stopPropagation();
                                                   handleUpdateStatus(
                                                      alert.id,
                                                      'on-scene'
                                                   );
                                                }}
                                             >
                                                Mark On-Scene
                                             </Button>
                                          </div>
                                       )}
                                    </div>
                                 ))}
                              </div>
                           ) : (
                              <div className='py-8 text-center'>
                                 <Shield className='mx-auto mb-4 h-12 w-12 text-green-400' />
                                 <h3 className='mb-2 text-lg font-medium text-gray-900'>
                                    No Active Emergencies
                                 </h3>
                                 <p className='text-gray-600'>
                                    All emergency situations are currently
                                    resolved.
                                 </p>
                              </div>
                           )}
                        </CardContent>
                     </Card>
                  </div>

                  {/* Ambulance Status & Selected Alert Details */}
                  <div className='space-y-6'>
                     {/* Ambulance Fleet Status */}
                     <Card>
                        <CardHeader>
                           <CardTitle className='flex items-center space-x-2'>
                              <Truck className='h-5 w-5 text-blue-600' />
                              <span>Ambulance Fleet</span>
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className='space-y-3'>
                              {mockAmbulances.map((ambulance) => (
                                 <div
                                    key={ambulance.id}
                                    className='rounded-lg border p-3'
                                 >
                                    <div className='mb-2 flex items-center justify-between'>
                                       <span className='font-medium'>
                                          {ambulance.vehicleNumber}
                                       </span>
                                       <Badge
                                          className={getAmbulanceStatusColor(
                                             ambulance.status
                                          )}
                                       >
                                          {ambulance.status.replace('-', ' ')}
                                       </Badge>
                                    </div>
                                    <div className='space-y-1 text-sm text-gray-600'>
                                       <div className='flex items-center space-x-1'>
                                          <MapPin className='h-3 w-3' />
                                          <span>{ambulance.location}</span>
                                       </div>
                                       {ambulance.eta && (
                                          <div className='flex items-center space-x-1'>
                                             <Clock className='h-3 w-3' />
                                             <span>
                                                ETA: {ambulance.eta} min
                                             </span>
                                          </div>
                                       )}
                                       {ambulance.crew.length > 0 && (
                                          <div className='flex items-center space-x-1'>
                                             <User className='h-3 w-3' />
                                             <span>
                                                {ambulance.crew.length} crew
                                             </span>
                                          </div>
                                       )}
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </CardContent>
                     </Card>

                     {/* Selected Alert Details */}
                     {selectedAlert && (
                        <Card>
                           <CardHeader>
                              <CardTitle>Emergency Details</CardTitle>
                           </CardHeader>
                           <CardContent>
                              <div className='space-y-4'>
                                 <div>
                                    <h4 className='mb-2 font-medium text-gray-900'>
                                       {selectedAlert.type
                                          .charAt(0)
                                          .toUpperCase() +
                                          selectedAlert.type.slice(1)}{' '}
                                       Emergency
                                    </h4>
                                    <p className='text-sm text-gray-600'>
                                       {selectedAlert.description}
                                    </p>
                                 </div>

                                 <div className='space-y-2 text-sm'>
                                    <div className='flex justify-between'>
                                       <span className='text-gray-500'>
                                          Severity:
                                       </span>
                                       <Badge
                                          className={getSeverityColor(
                                             selectedAlert.severity
                                          )}
                                       >
                                          {selectedAlert.severity.toUpperCase()}
                                       </Badge>
                                    </div>
                                    <div className='flex justify-between'>
                                       <span className='text-gray-500'>
                                          Status:
                                       </span>
                                       <Badge
                                          className={getStatusColor(
                                             selectedAlert.status
                                          )}
                                       >
                                          {selectedAlert.status}
                                       </Badge>
                                    </div>
                                    <div className='flex justify-between'>
                                       <span className='text-gray-500'>
                                          Time:
                                       </span>
                                       <span>
                                          {selectedAlert.timestamp.toLocaleTimeString()}
                                       </span>
                                    </div>
                                    <div className='flex justify-between'>
                                       <span className='text-gray-500'>
                                          Location:
                                       </span>
                                       <span className='text-right'>
                                          {selectedAlert.location.address}
                                       </span>
                                    </div>
                                 </div>

                                 <div className='space-y-2 border-t pt-4'>
                                    <Button
                                       size='sm'
                                       className='w-full'
                                       onClick={() =>
                                          handleUpdateStatus(
                                             selectedAlert.id,
                                             'resolved'
                                          )
                                       }
                                    >
                                       <CheckCircle className='mr-2 h-4 w-4' />
                                       Mark Resolved
                                    </Button>
                                    <Button
                                       size='sm'
                                       variant='outline'
                                       className='w-full'
                                       onClick={() => setSelectedAlert(null)}
                                    >
                                       Close Details
                                    </Button>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                     )}
                  </div>
               </div>
            </main>
         </div>
      </div>
   );
}

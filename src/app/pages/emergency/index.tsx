import { useEffect, useState } from 'react';

import {
   Activity,
   AlertTriangle,
   Clock,
   Heart,
   MapPin,
   Navigation,
   Phone,
   Shield,
   Truck,
   Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Alert, AlertDescription } from '@/shared/components/ui/alert';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
import { useAppStore, useAuthStore } from '@/shared/lib/store';
import { EmergencyAlert, EmergencyStatus } from '@/shared/types';

import { Header } from '@/app/layouts/components/header';
import { Sidebar } from '@/app/layouts/components/sidebar';

export default function EmergencyPage() {
   const { user, isAuthenticated } = useAuthStore();
   const { emergencyAlerts, addEmergencyAlert, updateEmergencyAlert } =
      useAppStore();
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [isEmergencyActive, setIsEmergencyActive] = useState(false);
   const [currentLocation, setCurrentLocation] = useState<{
      lat: number;
      lng: number;
   } | null>(null);

   const navigate = useNavigate();

   useEffect(() => {
      if (!isAuthenticated || !user) {
         navigate('/');
         return;
      }

      // Get user's current location
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
            (position) => {
               setCurrentLocation({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
               });
            },
            (error) => {
               console.error('Error getting location:', error);
            }
         );
      }
   }, [isAuthenticated, user, navigate]);

   if (!isAuthenticated || !user) {
      return null;
   }

   const triggerEmergency = async () => {
      console.log('🚨 Emergency: Triggering SOS alert');
      setIsEmergencyActive(true);

      const newAlert: EmergencyAlert = {
         id: `emergency_${Date.now()}`,
         patientId: user.id,
         type: 'medical',
         severity: 'critical',
         location: {
            latitude: currentLocation?.lat || 37.7749,
            longitude: currentLocation?.lng || -122.4194,
            address: '123 Main St, San Francisco, CA 94102',
         },
         timestamp: new Date(),
         status: 'active',
         description: 'Emergency SOS triggered by patient',
         respondersNotified: ['emergency_dispatch', 'nearest_hospital'],
      };

      addEmergencyAlert(newAlert);

      // Simulate emergency response workflow
      setTimeout(() => {
         updateEmergencyAlert(newAlert.id, {
            status: 'dispatched',
            respondersNotified: [
               ...newAlert.respondersNotified,
               'ambulance_unit_1',
            ],
         });
      }, 3000);

      setTimeout(() => {
         updateEmergencyAlert(newAlert.id, { status: 'on-scene' });
      }, 8000);
   };

   const cancelEmergency = () => {
      console.log('❌ Emergency: Cancelling SOS alert');
      setIsEmergencyActive(false);

      const activeAlert = emergencyAlerts.find(
         (alert) => alert.status === 'active' || alert.status === 'dispatched'
      );
      if (activeAlert) {
         updateEmergencyAlert(activeAlert.id, { status: 'cancelled' });
      }
   };

   const getStatusColor = (status: EmergencyStatus) => {
      switch (status) {
         case 'active':
            return 'bg-red-100 text-red-800';
         case 'dispatched':
            return 'bg-yellow-100 text-yellow-800';
         case 'on-scene':
            return 'bg-blue-100 text-blue-800';
         case 'resolved':
            return 'bg-green-100 text-green-800';
         case 'cancelled':
            return 'bg-gray-100 text-gray-800';
         default:
            return 'bg-gray-100 text-gray-800';
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
            return <Shield className='h-4 w-4' />;
         default:
            return <Clock className='h-4 w-4' />;
      }
   };

   const activeAlert = emergencyAlerts.find(
      (alert) =>
         alert.status === 'active' ||
         alert.status === 'dispatched' ||
         alert.status === 'on-scene'
   );

   const emergencyContacts = [
      { name: 'Emergency Services', number: '911', type: 'emergency' },
      {
         name: 'Hospital Emergency',
         number: '(555) 123-4567',
         type: 'hospital',
      },
      { name: 'Poison Control', number: '1-800-222-1222', type: 'poison' },
      { name: 'Mental Health Crisis', number: '988', type: 'mental' },
   ];

   const emergencyTypes = [
      {
         type: 'medical',
         title: 'Medical Emergency',
         description: 'Heart attack, stroke, severe injury',
         icon: Heart,
         color: 'text-red-600',
      },
      {
         type: 'trauma',
         title: 'Trauma/Accident',
         description: 'Car accident, fall, severe injury',
         icon: Zap,
         color: 'text-orange-600',
      },
      {
         type: 'cardiac',
         title: 'Cardiac Emergency',
         description: 'Chest pain, heart attack symptoms',
         icon: Heart,
         color: 'text-red-600',
      },
      {
         type: 'respiratory',
         title: 'Breathing Problems',
         description: 'Difficulty breathing, choking',
         icon: Activity,
         color: 'text-blue-600',
      },
   ];

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
                        Emergency Services
                     </h1>
                     <p className='mt-1 text-gray-600'>
                        Quick access to emergency services and SOS alerts
                     </p>
                  </div>
               </div>

               {/* Active Emergency Alert */}
               {activeAlert && (
                  <Alert className='border-red-200 bg-red-50'>
                     <AlertTriangle className='h-4 w-4 text-red-600' />
                     <AlertDescription className='text-red-800'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <strong>Emergency Alert Active:</strong>{' '}
                              {activeAlert.description}
                              <br />
                              <span className='text-sm'>
                                 Status: {activeAlert.status} •{' '}
                                 {activeAlert.timestamp.toLocaleTimeString()}
                              </span>
                           </div>
                           <Button
                              variant='outline'
                              size='sm'
                              onClick={cancelEmergency}
                              className='border-red-300 text-red-700 hover:bg-red-100'
                           >
                              Cancel Alert
                           </Button>
                        </div>
                     </AlertDescription>
                  </Alert>
               )}

               <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
                  {/* SOS Button */}
                  <div className='lg:col-span-2'>
                     <Card className='border-red-200'>
                        <CardHeader className='text-center'>
                           <CardTitle className='flex items-center justify-center space-x-2 text-red-600'>
                              <Phone className='h-6 w-6' />
                              <span>Emergency SOS</span>
                           </CardTitle>
                           <CardDescription>
                              Press and hold the button below to trigger an
                              emergency alert
                           </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-6 text-center'>
                           <div className='flex justify-center'>
                              <Button
                                 size='lg'
                                 className={`h-32 w-32 rounded-full text-xl font-bold ${
                                    isEmergencyActive
                                       ? 'cursor-not-allowed bg-gray-400'
                                       : 'emergency-button animate-pulse-medical'
                                 }`}
                                 onClick={triggerEmergency}
                                 disabled={isEmergencyActive || !!activeAlert}
                              >
                                 {isEmergencyActive ? (
                                    <div className='flex flex-col items-center'>
                                       <Activity className='mb-2 h-8 w-8 animate-spin' />
                                       <span className='text-sm'>ACTIVE</span>
                                    </div>
                                 ) : (
                                    <div className='flex flex-col items-center'>
                                       <Phone className='mb-2 h-8 w-8' />
                                       <span className='text-sm'>SOS</span>
                                    </div>
                                 )}
                              </Button>
                           </div>

                           <div className='space-y-2 text-sm text-gray-600'>
                              <p>This will immediately:</p>
                              <ul className='mx-auto max-w-md list-inside list-disc space-y-1 text-left'>
                                 <li>
                                    Alert emergency services with your location
                                 </li>
                                 <li>Notify your emergency contacts</li>
                                 <li>Dispatch the nearest ambulance</li>
                                 <li>
                                    Send your medical information to responders
                                 </li>
                              </ul>
                           </div>

                           {currentLocation && (
                              <div className='rounded-lg bg-blue-50 p-4'>
                                 <div className='flex items-center justify-center space-x-2 text-blue-700'>
                                    <Navigation className='h-4 w-4' />
                                    <span className='text-sm font-medium'>
                                       Location Services Active
                                    </span>
                                 </div>
                                 <p className='mt-1 text-xs text-blue-600'>
                                    Your current location will be shared with
                                    emergency responders
                                 </p>
                              </div>
                           )}
                        </CardContent>
                     </Card>

                     {/* Emergency Types */}
                     <Card className='mt-6'>
                        <CardHeader>
                           <CardTitle>Emergency Types</CardTitle>
                           <CardDescription>
                              Quick access to specific emergency protocols
                           </CardDescription>
                        </CardHeader>
                        <CardContent>
                           <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                              {emergencyTypes.map((emergency) => {
                                 const Icon = emergency.icon;
                                 return (
                                    <Button
                                       key={emergency.type}
                                       variant='outline'
                                       className='flex h-auto flex-col items-start space-y-2 p-4 transition-all duration-200 hover:shadow-md'
                                       disabled={!!activeAlert}
                                    >
                                       <div className='flex items-center space-x-2'>
                                          <Icon
                                             className={`h-5 w-5 ${emergency.color}`}
                                          />
                                          <span className='font-medium'>
                                             {emergency.title}
                                          </span>
                                       </div>
                                       <p className='text-left text-xs text-gray-500'>
                                          {emergency.description}
                                       </p>
                                    </Button>
                                 );
                              })}
                           </div>
                        </CardContent>
                     </Card>
                  </div>

                  {/* Emergency Contacts & Recent Alerts */}
                  <div className='space-y-6'>
                     {/* Emergency Contacts */}
                     <Card>
                        <CardHeader>
                           <CardTitle className='flex items-center space-x-2'>
                              <Phone className='h-5 w-5 text-blue-600' />
                              <span>Emergency Contacts</span>
                           </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                           {emergencyContacts.map((contact, index) => (
                              <div
                                 key={index}
                                 className='flex items-center justify-between rounded-lg bg-gray-50 p-3'
                              >
                                 <div>
                                    <p className='text-sm font-medium'>
                                       {contact.name}
                                    </p>
                                    <p className='text-xs text-gray-500'>
                                       {contact.number}
                                    </p>
                                 </div>
                                 <Button size='sm' variant='outline'>
                                    <Phone className='h-4 w-4' />
                                 </Button>
                              </div>
                           ))}
                        </CardContent>
                     </Card>

                     {/* Recent Emergency Alerts */}
                     <Card>
                        <CardHeader>
                           <CardTitle className='flex items-center space-x-2'>
                              <AlertTriangle className='h-5 w-5 text-orange-600' />
                              <span>Recent Alerts</span>
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           {emergencyAlerts.length > 0 ? (
                              <div className='space-y-3'>
                                 {emergencyAlerts.slice(0, 5).map((alert) => (
                                    <div
                                       key={alert.id}
                                       className='rounded-lg border p-3'
                                    >
                                       <div className='mb-2 flex items-center justify-between'>
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
                                          <span className='text-xs text-gray-500'>
                                             {alert.timestamp.toLocaleDateString()}
                                          </span>
                                       </div>
                                       <p className='text-sm text-gray-700'>
                                          {alert.description}
                                       </p>
                                       <div className='mt-2 flex items-center space-x-1 text-xs text-gray-500'>
                                          <MapPin className='h-3 w-3' />
                                          <span>{alert.location.address}</span>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           ) : (
                              <div className='py-6 text-center'>
                                 <Shield className='mx-auto mb-2 h-8 w-8 text-gray-400' />
                                 <p className='text-sm text-gray-500'>
                                    No recent emergency alerts
                                 </p>
                              </div>
                           )}
                        </CardContent>
                     </Card>
                  </div>
               </div>
            </main>
         </div>
      </div>
   );
}

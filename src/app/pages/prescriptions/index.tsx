import { useEffect, useState } from 'react';

import {
   AlertTriangle,
   Building,
   Calendar,
   CheckCircle,
   Clock,
   Eye,
   Filter,
   Pill,
   Plus,
   RefreshCw,
   Search,
   User,
   X,
   XCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from '@/shared/components/ui/tabs';
import { useAuthStore } from '@/shared/lib/store';
import { Prescription, PrescriptionStatus } from '@/shared/types';

import { Header } from '@/app/layouts/components/header';
import { Sidebar } from '@/app/layouts/components/sidebar';

export default function PrescriptionsPage() {
   const { user, isAuthenticated } = useAuthStore();
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedStatus, setSelectedStatus] = useState<
      PrescriptionStatus | 'all'
   >('all');
   const [selectedPrescription, setSelectedPrescription] =
      useState<Prescription | null>(null);
   const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
   const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
   const [requestForm, setRequestForm] = useState({
      medication: '',
      reason: '',
      notes: '',
      preferredPharmacy: '',
   });
   const navigate = useNavigate();

   useEffect(() => {
      if (!isAuthenticated || !user) {
         navigate('/', { replace: true, viewTransition: true });
         return;
      }
   }, [isAuthenticated, user, navigate]);

   if (!isAuthenticated || !user) {
      return null;
   }

   // Mock prescriptions data
   const mockPrescriptions: Prescription[] = [
      {
         id: 'rx_1',
         patientId: 'patient_1',
         doctorId: 'doctor_1',
         pharmacyId: 'pharmacy_1',
         medication: {
            id: 'med_1',
            name: 'Amoxicillin',
            genericName: 'Amoxicillin',
            brandName: 'Amoxil',
            ndcNumber: '0093-4155-73',
            strength: '500mg',
            form: 'capsule',
            routeOfAdministration: 'Oral',
            contraindications: ['Penicillin allergy'],
            sideEffects: ['Nausea', 'Diarrhea', 'Rash'],
            warnings: ['Take with food'],
         },
         dosage: {
            amount: 1,
            unit: 'capsule',
            frequency: 'Three times daily',
            duration: '7 days',
            route: 'Oral',
         },
         quantity: 21,
         refills: 0,
         refillsRemaining: 0,
         status: 'active',
         prescribedDate: new Date(Date.now() - 86400000), // Yesterday
         expirationDate: new Date(Date.now() + 31536000000), // 1 year from now
         instructions:
            'Take one capsule three times daily with food for 7 days',
         notes: 'For bacterial infection treatment',
         interactions: [],
      },
      {
         id: 'rx_2',
         patientId: 'patient_1',
         doctorId: 'doctor_2',
         pharmacyId: 'pharmacy_1',
         medication: {
            id: 'med_2',
            name: 'Lisinopril',
            genericName: 'Lisinopril',
            brandName: 'Prinivil',
            ndcNumber: '0071-0222-23',
            strength: '10mg',
            form: 'tablet',
            routeOfAdministration: 'Oral',
            contraindications: ['Pregnancy', 'Angioedema history'],
            sideEffects: ['Dry cough', 'Dizziness', 'Hyperkalemia'],
            warnings: ['Monitor blood pressure regularly'],
         },
         dosage: {
            amount: 1,
            unit: 'tablet',
            frequency: 'Once daily',
            duration: 'Ongoing',
            route: 'Oral',
         },
         quantity: 30,
         refills: 5,
         refillsRemaining: 5,
         status: 'active',
         prescribedDate: new Date(Date.now() - 2592000000), // 30 days ago
         expirationDate: new Date(Date.now() + 31536000000), // 1 year from now
         instructions: 'Take one tablet once daily in the morning',
         notes: 'For blood pressure management',
         interactions: [],
      },
      {
         id: 'rx_3',
         patientId: 'patient_1',
         doctorId: 'doctor_1',
         pharmacyId: 'pharmacy_1',
         medication: {
            id: 'med_3',
            name: 'Ibuprofen',
            genericName: 'Ibuprofen',
            brandName: 'Advil',
            ndcNumber: '0573-0164-40',
            strength: '200mg',
            form: 'tablet',
            routeOfAdministration: 'Oral',
            contraindications: ['GI bleeding', 'Kidney disease'],
            sideEffects: ['Stomach upset', 'Heartburn', 'Dizziness'],
            warnings: ['Take with food or milk'],
         },
         dosage: {
            amount: 1,
            unit: 'tablet',
            frequency: 'As needed',
            duration: '30 days',
            route: 'Oral',
         },
         quantity: 60,
         refills: 2,
         refillsRemaining: 0,
         status: 'completed',
         prescribedDate: new Date(Date.now() - 5184000000), // 60 days ago
         expirationDate: new Date(Date.now() - 2592000000), // 30 days ago
         instructions:
            'Take one tablet as needed for pain, maximum 3 times daily',
         notes: 'For pain management',
         interactions: [],
      },
   ];

   const getStatusIcon = (status: PrescriptionStatus) => {
      switch (status) {
         case 'completed':
            return <CheckCircle className='h-4 w-4 text-green-600' />;
         case 'cancelled':
            return <XCircle className='h-4 w-4 text-red-600' />;
         case 'expired':
            return <AlertTriangle className='h-4 w-4 text-orange-600' />;
         default:
            return <Clock className='h-4 w-4 text-blue-600' />;
      }
   };

   const getStatusColor = (status: PrescriptionStatus) => {
      switch (status) {
         case 'completed':
            return 'bg-green-100 text-green-800 hover:bg-green-100';
         case 'cancelled':
            return 'bg-red-100 text-red-800 hover:bg-red-100';
         case 'expired':
            return 'bg-orange-100 text-orange-800 hover:bg-orange-100';
         default:
            return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      }
   };

   const handleRefillRequest = (prescriptionId: string) => {
      console.log('Requesting refill for prescription:', prescriptionId);
      alert(
         "Refill request submitted successfully! You will be notified when it's ready for pickup."
      );
   };

   const handleReorder = (prescriptionId: string) => {
      console.log('Reordering prescription:', prescriptionId);
      alert(
         'Reorder request submitted! Please consult with your doctor for a new prescription.'
      );
   };

   const handleViewDetails = (prescription: Prescription) => {
      console.log('Viewing prescription details:', prescription.id);
      setSelectedPrescription(prescription);
      setIsDetailsDialogOpen(true);
   };

   const handleRequestPrescription = () => {
      console.log('Opening prescription request dialog');
      setIsRequestDialogOpen(true);
   };
   const handleNewPrescription = () => {
      navigate('/prescriptions/create');
      console.log('Navigating to new prescription creation page');
      setIsRequestDialogOpen(false);
   };

   const handleRequestSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Submitting prescription request:', requestForm);

      // Here you would typically send the data to your API
      alert(
         'Prescription request submitted successfully! Your doctor will review and respond shortly.'
      );

      // Reset form and close dialog
      setRequestForm({
         medication: '',
         reason: '',
         notes: '',
         preferredPharmacy: '',
      });
      setIsRequestDialogOpen(false);
   };

   const filteredPrescriptions = mockPrescriptions.filter((prescription) => {
      const matchesSearch =
         prescription.medication.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
         prescription.medication.genericName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
         prescription.instructions
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
      const matchesStatus =
         selectedStatus === 'all' || prescription.status === selectedStatus;
      return matchesSearch && matchesStatus;
   });

   const activePrescriptions = filteredPrescriptions.filter(
      (rx) => rx.status === 'active'
   );
   const completedPrescriptions = filteredPrescriptions.filter(
      (rx) => rx.status === 'completed' || rx.status === 'expired'
   );

   const PrescriptionCard = ({
      prescription,
   }: {
      prescription: Prescription;
   }) => (
      <Card className='transition-shadow duration-200 hover:shadow-md'>
         <CardContent className='p-6'>
            <div className='flex items-start justify-between'>
               <div className='flex-1'>
                  <div className='mb-2 flex items-center space-x-2'>
                     <Pill className='h-5 w-5 text-blue-600' />
                     <h3 className='font-semibold text-gray-900'>
                        {prescription.medication.name}{' '}
                        {prescription.medication.strength}
                     </h3>
                     <Badge className={getStatusColor(prescription.status)}>
                        {getStatusIcon(prescription.status)}
                        <span className='ml-1'>
                           {prescription.status.charAt(0).toUpperCase() +
                              prescription.status.slice(1)}
                        </span>
                     </Badge>
                  </div>

                  <p className='mb-3 text-sm text-gray-600'>
                     {prescription.medication.genericName} •{' '}
                     {prescription.medication.form}
                  </p>

                  <div className='space-y-2 text-sm text-gray-700'>
                     <p>
                        <strong>Instructions:</strong>{' '}
                        {prescription.instructions}
                     </p>
                     <p>
                        <strong>Quantity:</strong> {prescription.quantity}{' '}
                        {prescription.dosage.unit}s
                     </p>
                     {prescription.refillsRemaining > 0 && (
                        <p>
                           <strong>Refills Remaining:</strong>{' '}
                           {prescription.refillsRemaining}
                        </p>
                     )}
                  </div>

                  <div className='mt-4 grid grid-cols-1 gap-3 text-sm text-gray-500 sm:grid-cols-2'>
                     <div className='flex items-center space-x-2'>
                        <Calendar className='h-4 w-4' />
                        <span>
                           Prescribed:{' '}
                           {prescription.prescribedDate.toLocaleDateString()}
                        </span>
                     </div>
                     <div className='flex items-center space-x-2'>
                        <Clock className='h-4 w-4' />
                        <span>
                           Expires:{' '}
                           {prescription.expirationDate.toLocaleDateString()}
                        </span>
                     </div>
                     <div className='flex items-center space-x-2'>
                        <User className='h-4 w-4' />
                        <span>
                           Dr. {user.role === 'patient' ? 'Smith' : 'Johnson'}
                        </span>
                     </div>
                     <div className='flex items-center space-x-2'>
                        <Building className='h-4 w-4' />
                        <span>Main Pharmacy</span>
                     </div>
                  </div>
               </div>

               <div className='ml-4 flex flex-col space-y-2'>
                  {prescription.status === 'active' &&
                     prescription.refillsRemaining > 0 && (
                        <Button
                           size='sm'
                           className='bg-blue-600 hover:bg-blue-700'
                           onClick={() => handleRefillRequest(prescription.id)}
                        >
                           <RefreshCw className='mr-1 h-4 w-4' />
                           Request Refill
                        </Button>
                     )}
                  <Button
                     variant='outline'
                     size='sm'
                     onClick={() => handleViewDetails(prescription)}
                  >
                     <Eye className='mr-1 h-4 w-4' />
                     View Details
                  </Button>
                  {prescription.status === 'completed' && (
                     <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleReorder(prescription.id)}
                     >
                        Reorder
                     </Button>
                  )}
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
                        {user.role === 'patient'
                           ? 'My Prescriptions'
                           : user.role === 'doctor'
                             ? 'Patient Prescriptions'
                             : 'Prescription Management'}
                     </h1>
                     <p className='mt-1 text-gray-600'>
                        {user.role === 'patient'
                           ? 'View and manage your current and past prescriptions'
                           : user.role === 'doctor'
                             ? 'Create and manage patient prescriptions'
                             : 'Process and fulfill prescription orders'}
                     </p>
                  </div>

                  {/* Request Prescription Dialog */}
                  {user.role === 'patient' ? (
                     <Dialog
                        open={isRequestDialogOpen}
                        onOpenChange={setIsRequestDialogOpen}
                     >
                        <DialogTrigger asChild>
                           <Button
                              onClick={handleRequestPrescription}
                              className='flex items-center space-x-2'
                           >
                              <Plus className='h-4 w-4' />
                              <span>Request Prescription</span>
                           </Button>
                        </DialogTrigger>
                        <DialogContent className='max-w-md'>
                           <DialogHeader>
                              <DialogTitle>
                                 Request New Prescription
                              </DialogTitle>
                              <DialogDescription>
                                 Submit a request for a new prescription to your
                                 doctor
                              </DialogDescription>
                           </DialogHeader>

                           <form
                              onSubmit={handleRequestSubmit}
                              className='space-y-4'
                           >
                              <div className='space-y-2'>
                                 <Label htmlFor='medication'>
                                    Medication Name
                                 </Label>
                                 <Input
                                    id='medication'
                                    value={requestForm.medication}
                                    onChange={(e) =>
                                       setRequestForm((prev) => ({
                                          ...prev,
                                          medication: e.target.value,
                                       }))
                                    }
                                    placeholder='e.g., Lisinopril, Amoxicillin'
                                    required
                                 />
                              </div>

                              <div className='space-y-2'>
                                 <Label htmlFor='reason'>
                                    Reason for Request
                                 </Label>
                                 <Input
                                    id='reason'
                                    value={requestForm.reason}
                                    onChange={(e) =>
                                       setRequestForm((prev) => ({
                                          ...prev,
                                          reason: e.target.value,
                                       }))
                                    }
                                    placeholder='e.g., Blood pressure management, Infection'
                                    required
                                 />
                              </div>

                              <div className='space-y-2'>
                                 <Label htmlFor='pharmacy'>
                                    Preferred Pharmacy
                                 </Label>
                                 <select
                                    id='pharmacy'
                                    value={requestForm.preferredPharmacy}
                                    onChange={(e) =>
                                       setRequestForm((prev) => ({
                                          ...prev,
                                          preferredPharmacy: e.target.value,
                                       }))
                                    }
                                    className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    required
                                 >
                                    <option value=''>Select a pharmacy</option>
                                    <option value='main'>
                                       Main Hospital Pharmacy
                                    </option>
                                    <option value='cvs'>CVS Pharmacy</option>
                                    <option value='walgreens'>Walgreens</option>
                                    <option value='rite-aid'>Rite Aid</option>
                                 </select>
                              </div>

                              <div className='space-y-2'>
                                 <Label htmlFor='notes'>
                                    Additional Notes (Optional)
                                 </Label>
                                 <textarea
                                    id='notes'
                                    value={requestForm.notes}
                                    onChange={(e) =>
                                       setRequestForm((prev) => ({
                                          ...prev,
                                          notes: e.target.value,
                                       }))
                                    }
                                    placeholder='Any additional information for your doctor...'
                                    className='w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    rows={3}
                                 />
                              </div>

                              <div className='flex space-x-3 pt-4'>
                                 <Button type='submit' className='flex-1'>
                                    Submit Request
                                 </Button>
                                 <Button
                                    type='button'
                                    variant='outline'
                                    onClick={() =>
                                       setIsRequestDialogOpen(false)
                                    }
                                 >
                                    Cancel
                                 </Button>
                              </div>
                           </form>
                        </DialogContent>
                     </Dialog>
                  ) : (
                     <Button
                        className='flex items-center space-x-2'
                        onClick={() => navigate('/prescriptions/create')}
                     >
                        <Plus className='h-4 w-4' />
                        <span>New Prescription</span>
                     </Button>
                  )}
               </div>

               {/* Search and Filters */}
               <Card>
                  <CardContent className='p-6'>
                     <div className='flex flex-col gap-4 sm:flex-row'>
                        <div className='relative flex-1'>
                           <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
                           <Input
                              placeholder='Search prescriptions...'
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
                                 setSelectedStatus(
                                    e.target.value as PrescriptionStatus | 'all'
                                 )
                              }
                              className='rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                           >
                              <option value='all'>All Status</option>
                              <option value='active'>Active</option>
                              <option value='completed'>Completed</option>
                              <option value='cancelled'>Cancelled</option>
                              <option value='expired'>Expired</option>
                           </select>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Prescriptions Tabs */}
               <Tabs defaultValue='active' className='space-y-6'>
                  <TabsList className='grid w-full max-w-md grid-cols-2'>
                     <TabsTrigger value='active'>
                        Active ({activePrescriptions.length})
                     </TabsTrigger>
                     <TabsTrigger value='history'>
                        History ({completedPrescriptions.length})
                     </TabsTrigger>
                  </TabsList>

                  <TabsContent value='active' className='space-y-4'>
                     {activePrescriptions.length > 0 ? (
                        activePrescriptions.map((prescription) => (
                           <PrescriptionCard
                              key={prescription.id}
                              prescription={prescription}
                           />
                        ))
                     ) : (
                        <Card>
                           <CardContent className='p-12 text-center'>
                              <Pill className='mx-auto mb-4 h-12 w-12 text-gray-400' />
                              <h3 className='mb-2 text-lg font-medium text-gray-900'>
                                 No active prescriptions
                              </h3>
                              <p className='mb-4 text-gray-600'>
                                 You don't have any active prescriptions at the
                                 moment.
                              </p>
                              {user.role === 'patient' && (
                                 <Button onClick={handleRequestPrescription}>
                                    <Plus className='mr-2 h-4 w-4' />
                                    Request Prescription
                                 </Button>
                              )}
                           </CardContent>
                        </Card>
                     )}
                  </TabsContent>

                  <TabsContent value='history' className='space-y-4'>
                     {completedPrescriptions.length > 0 ? (
                        completedPrescriptions.map((prescription) => (
                           <PrescriptionCard
                              key={prescription.id}
                              prescription={prescription}
                           />
                        ))
                     ) : (
                        <Card>
                           <CardContent className='p-12 text-center'>
                              <Clock className='mx-auto mb-4 h-12 w-12 text-gray-400' />
                              <h3 className='mb-2 text-lg font-medium text-gray-900'>
                                 No prescription history
                              </h3>
                              <p className='text-gray-600'>
                                 Your prescription history will appear here.
                              </p>
                           </CardContent>
                        </Card>
                     )}
                  </TabsContent>
               </Tabs>

               {/* Prescription Details Dialog */}
               <Dialog
                  open={isDetailsDialogOpen}
                  onOpenChange={setIsDetailsDialogOpen}
               >
                  <DialogContent className='max-w-2xl'>
                     <DialogHeader>
                        <DialogTitle className='flex items-center justify-between'>
                           <span>Prescription Details</span>
                           <Button
                              variant='ghost'
                              size='sm'
                              onClick={() => setIsDetailsDialogOpen(false)}
                           >
                              <X className='h-4 w-4' />
                           </Button>
                        </DialogTitle>
                        <DialogDescription>
                           Complete information for{' '}
                           {selectedPrescription?.medication.name}
                        </DialogDescription>
                     </DialogHeader>
                     {selectedPrescription && (
                        <div className='space-y-6'>
                           <div className='grid grid-cols-2 gap-4'>
                              <div>
                                 <h3 className='mb-2 font-semibold'>
                                    Medication
                                 </h3>
                                 <p>
                                    <strong>Name:</strong>{' '}
                                    {selectedPrescription.medication.name}
                                 </p>
                                 <p>
                                    <strong>Generic:</strong>{' '}
                                    {
                                       selectedPrescription.medication
                                          .genericName
                                    }
                                 </p>
                                 <p>
                                    <strong>Brand:</strong>{' '}
                                    {selectedPrescription.medication.brandName}
                                 </p>
                                 <p>
                                    <strong>Strength:</strong>{' '}
                                    {selectedPrescription.medication.strength}
                                 </p>
                                 <p>
                                    <strong>Form:</strong>{' '}
                                    {selectedPrescription.medication.form}
                                 </p>
                              </div>
                              <div>
                                 <h3 className='mb-2 font-semibold'>Dosage</h3>
                                 <p>
                                    <strong>Amount:</strong>{' '}
                                    {selectedPrescription.dosage.amount}{' '}
                                    {selectedPrescription.dosage.unit}
                                 </p>
                                 <p>
                                    <strong>Frequency:</strong>{' '}
                                    {selectedPrescription.dosage.frequency}
                                 </p>
                                 <p>
                                    <strong>Duration:</strong>{' '}
                                    {selectedPrescription.dosage.duration}
                                 </p>
                                 <p>
                                    <strong>Route:</strong>{' '}
                                    {selectedPrescription.dosage.route}
                                 </p>
                              </div>
                           </div>

                           <div>
                              <h3 className='mb-2 font-semibold'>
                                 Instructions
                              </h3>
                              <p className='text-gray-700'>
                                 {selectedPrescription.instructions}
                              </p>
                              {selectedPrescription.notes && (
                                 <p className='mt-2 text-gray-600'>
                                    <strong>Notes:</strong>{' '}
                                    {selectedPrescription.notes}
                                 </p>
                              )}
                           </div>

                           <div>
                              <h3 className='mb-2 font-semibold'>
                                 Warnings & Side Effects
                              </h3>
                              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                                 <div>
                                    <p className='font-medium text-red-600'>
                                       Contraindications:
                                    </p>
                                    <ul className='list-inside list-disc text-sm text-gray-700'>
                                       {selectedPrescription.medication.contraindications.map(
                                          (item, index) => (
                                             <li key={index}>{item}</li>
                                          )
                                       )}
                                    </ul>
                                 </div>
                                 <div>
                                    <p className='font-medium text-orange-600'>
                                       Side Effects:
                                    </p>
                                    <ul className='list-inside list-disc text-sm text-gray-700'>
                                       {selectedPrescription.medication.sideEffects.map(
                                          (item, index) => (
                                             <li key={index}>{item}</li>
                                          )
                                       )}
                                    </ul>
                                 </div>
                              </div>
                              <div className='mt-4'>
                                 <p className='font-medium text-blue-600'>
                                    Warnings:
                                 </p>
                                 <ul className='list-inside list-disc text-sm text-gray-700'>
                                    {selectedPrescription.medication.warnings.map(
                                       (item, index) => (
                                          <li key={index}>{item}</li>
                                       )
                                    )}
                                 </ul>
                              </div>
                           </div>
                        </div>
                     )}
                  </DialogContent>
               </Dialog>
            </main>
         </div>
      </div>
   );
}

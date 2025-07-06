import { useEffect, useState } from 'react';

import {
   AlertTriangle,
   ArrowLeft,
   CheckCircle,
   Pill,
   Search,
   User,
   X,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

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
import { Label } from '@/shared/components/ui/label';
import { useAuthStore } from '@/shared/lib/store';

import { Header } from '@/app/layouts/components/header';
import { Sidebar } from '@/app/layouts/components/sidebar';

interface PrescriptionForm {
   patientId: string;
   patientName: string;
   medicationName: string;
   genericName: string;
   strength: string;
   form: string;
   dosageAmount: string;
   dosageUnit: string;
   frequency: string;
   duration: string;
   quantity: string;
   refills: string;
   instructions: string;
   notes: string;
   pharmacyId: string;
}

interface Patient {
   id: string;
   name: string;
   age: number;
   allergies: string[];
   currentMedications: string[];
}

export default function CreatePrescriptionPage() {
   const { user, isAuthenticated } = useAuthStore();
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
   const [isSearchingPatients, setIsSearchingPatients] = useState(false);
   const [searchResults, setSearchResults] = useState<Patient[]>([]);
   const navigate = useNavigate();

   const [prescriptionForm, setPrescriptionForm] = useState<PrescriptionForm>({
      patientId: '',
      patientName: '',
      medicationName: '',
      genericName: '',
      strength: '',
      form: 'tablet',
      dosageAmount: '',
      dosageUnit: 'mg',
      frequency: '',
      duration: '',
      quantity: '',
      refills: '0',
      instructions: '',
      notes: '',
      pharmacyId: '',
   });

   useEffect(() => {
      if (!isAuthenticated || !user) {
         navigate('/', { replace: true, viewTransition: true });
         return;
      }
      if (user.role !== 'doctor') {
         navigate('/dashboard', { replace: true, viewTransition: true });
         return;
      }
   }, [isAuthenticated, user, navigate]);

   if (!isAuthenticated || !user || user.role !== 'doctor') {
      return null;
   }

   // Mock patients data
   const mockPatients: Patient[] = [
      {
         id: 'patient_1',
         name: 'John Doe',
         age: 45,
         allergies: ['Penicillin', 'Sulfa'],
         currentMedications: ['Lisinopril 10mg', 'Metformin 500mg'],
      },
      {
         id: 'patient_2',
         name: 'Emily Johnson',
         age: 32,
         allergies: ['None known'],
         currentMedications: ['Birth control pill'],
      },
      {
         id: 'patient_3',
         name: 'Robert Smith',
         age: 67,
         allergies: ['Aspirin'],
         currentMedications: [
            'Atorvastatin 20mg',
            'Metoprolol 50mg',
            'Warfarin 5mg',
         ],
      },
   ];

   const handlePatientSearch = async () => {
      if (!searchQuery.trim()) return;

      setIsSearchingPatients(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const results = mockPatients.filter((patient) =>
         patient.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchResults(results);
      setIsSearchingPatients(false);
   };

   const handleSelectPatient = (patient: Patient) => {
      setSelectedPatient(patient);
      setPrescriptionForm((prev) => ({
         ...prev,
         patientId: patient.id,
         patientName: patient.name,
      }));
      setSearchResults([]);
      setSearchQuery('');
   };

   const handleFormChange = (field: keyof PrescriptionForm, value: string) => {
      setPrescriptionForm((prev) => ({ ...prev, [field]: value }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!selectedPatient) {
         alert('Please select a patient first');
         return;
      }

      console.log('Creating prescription:', prescriptionForm);

      // Here you would typically send the data to your API
      alert('Prescription created successfully and sent to pharmacy!');

      // Reset form
      setPrescriptionForm({
         patientId: '',
         patientName: '',
         medicationName: '',
         genericName: '',
         strength: '',
         form: 'tablet',
         dosageAmount: '',
         dosageUnit: 'mg',
         frequency: '',
         duration: '',
         quantity: '',
         refills: '0',
         instructions: '',
         notes: '',
         pharmacyId: '',
      });
      setSelectedPatient(null);
   };

   const commonMedications = [
      {
         name: 'Amoxicillin',
         generic: 'Amoxicillin',
         strength: '500mg',
         form: 'capsule',
      },
      {
         name: 'Lisinopril',
         generic: 'Lisinopril',
         strength: '10mg',
         form: 'tablet',
      },
      {
         name: 'Metformin',
         generic: 'Metformin',
         strength: '500mg',
         form: 'tablet',
      },
      {
         name: 'Atorvastatin',
         generic: 'Atorvastatin',
         strength: '20mg',
         form: 'tablet',
      },
      {
         name: 'Omeprazole',
         generic: 'Omeprazole',
         strength: '20mg',
         form: 'capsule',
      },
   ];

   const fillMedicationDetails = (
      medication: (typeof commonMedications)[0]
   ) => {
      setPrescriptionForm((prev) => ({
         ...prev,
         medicationName: medication.name,
         genericName: medication.generic,
         strength: medication.strength,
         form: medication.form,
      }));
   };

   return (
      <div className='flex min-h-screen bg-gray-50'>
         <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

         <div className='w-full'>
            <Header onMenuClick={() => setSidebarOpen(true)} />

            <main className='space-y-6 p-6'>
               {/* Page Header */}
               <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                     <Link to='/prescriptions'>
                        <Button variant='outline' size='sm'>
                           <ArrowLeft className='mr-2 h-4 w-4' />
                           Back to Prescriptions
                        </Button>
                     </Link>
                     <div>
                        <h1 className='font-inter text-2xl font-bold text-gray-900'>
                           Create New Prescription
                        </h1>
                        <p className='mt-1 text-gray-600'>
                           Write and send electronic prescriptions to patients
                        </p>
                     </div>
                  </div>
               </div>

               <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
                  {/* Main Form */}
                  <div className='lg:col-span-2'>
                     <form onSubmit={handleSubmit} className='space-y-6'>
                        {/* Patient Selection */}
                        <Card>
                           <CardHeader>
                              <CardTitle className='flex items-center space-x-2'>
                                 <User className='h-5 w-5 text-blue-600' />
                                 <span>Patient Selection</span>
                              </CardTitle>
                           </CardHeader>
                           <CardContent className='space-y-4'>
                              {!selectedPatient ? (
                                 <div className='space-y-4'>
                                    <div className='flex space-x-2'>
                                       <Input
                                          placeholder='Search patient by name...'
                                          value={searchQuery}
                                          onChange={(e) =>
                                             setSearchQuery(e.target.value)
                                          }
                                          onKeyPress={(e) =>
                                             e.key === 'Enter' &&
                                             handlePatientSearch()
                                          }
                                       />
                                       <Button
                                          type='button'
                                          onClick={handlePatientSearch}
                                          disabled={isSearchingPatients}
                                       >
                                          <Search className='h-4 w-4' />
                                       </Button>
                                    </div>

                                    {searchResults.length > 0 && (
                                       <div className='divide-y rounded-lg border'>
                                          {searchResults.map((patient) => (
                                             <div
                                                key={patient.id}
                                                className='cursor-pointer p-3 hover:bg-gray-50'
                                                onClick={() =>
                                                   handleSelectPatient(patient)
                                                }
                                             >
                                                <div className='flex items-start justify-between'>
                                                   <div>
                                                      <p className='font-medium'>
                                                         {patient.name}
                                                      </p>
                                                      <p className='text-sm text-gray-600'>
                                                         Age: {patient.age}
                                                      </p>
                                                   </div>
                                                   <Button
                                                      size='sm'
                                                      variant='outline'
                                                   >
                                                      Select
                                                   </Button>
                                                </div>
                                             </div>
                                          ))}
                                       </div>
                                    )}
                                 </div>
                              ) : (
                                 <div className='flex items-center justify-between rounded-lg bg-blue-50 p-4'>
                                    <div>
                                       <p className='font-medium text-blue-900'>
                                          {selectedPatient.name}
                                       </p>
                                       <p className='text-sm text-blue-700'>
                                          Age: {selectedPatient.age}
                                       </p>
                                    </div>
                                    <Button
                                       type='button'
                                       variant='ghost'
                                       size='sm'
                                       onClick={() => {
                                          setSelectedPatient(null);
                                          setPrescriptionForm((prev) => ({
                                             ...prev,
                                             patientId: '',
                                             patientName: '',
                                          }));
                                       }}
                                    >
                                       <X className='h-4 w-4' />
                                    </Button>
                                 </div>
                              )}
                           </CardContent>
                        </Card>

                        {/* Medication Details */}
                        <Card>
                           <CardHeader>
                              <CardTitle className='flex items-center space-x-2'>
                                 <Pill className='h-5 w-5 text-purple-600' />
                                 <span>Medication Details</span>
                              </CardTitle>
                           </CardHeader>
                           <CardContent className='space-y-4'>
                              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                                 <div className='space-y-2'>
                                    <Label htmlFor='medicationName'>
                                       Medication Name *
                                    </Label>
                                    <Input
                                       id='medicationName'
                                       value={prescriptionForm.medicationName}
                                       onChange={(e) =>
                                          handleFormChange(
                                             'medicationName',
                                             e.target.value
                                          )
                                       }
                                       placeholder='e.g., Amoxicillin'
                                       required
                                    />
                                 </div>
                                 <div className='space-y-2'>
                                    <Label htmlFor='genericName'>
                                       Generic Name
                                    </Label>
                                    <Input
                                       id='genericName'
                                       value={prescriptionForm.genericName}
                                       onChange={(e) =>
                                          handleFormChange(
                                             'genericName',
                                             e.target.value
                                          )
                                       }
                                       placeholder='e.g., Amoxicillin'
                                    />
                                 </div>
                                 <div className='space-y-2'>
                                    <Label htmlFor='strength'>Strength *</Label>
                                    <Input
                                       id='strength'
                                       value={prescriptionForm.strength}
                                       onChange={(e) =>
                                          handleFormChange(
                                             'strength',
                                             e.target.value
                                          )
                                       }
                                       placeholder='e.g., 500mg'
                                       required
                                    />
                                 </div>
                                 <div className='space-y-2'>
                                    <Label htmlFor='form'>Form *</Label>
                                    <select
                                       id='form'
                                       value={prescriptionForm.form}
                                       onChange={(e) =>
                                          handleFormChange(
                                             'form',
                                             e.target.value
                                          )
                                       }
                                       className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                                       required
                                    >
                                       <option value='tablet'>Tablet</option>
                                       <option value='capsule'>Capsule</option>
                                       <option value='liquid'>Liquid</option>
                                       <option value='injection'>
                                          Injection
                                       </option>
                                       <option value='cream'>Cream</option>
                                       <option value='ointment'>
                                          Ointment
                                       </option>
                                       <option value='drops'>Drops</option>
                                    </select>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>

                        {/* Dosage Instructions */}
                        <Card>
                           <CardHeader>
                              <CardTitle>Dosage & Instructions</CardTitle>
                           </CardHeader>
                           <CardContent className='space-y-4'>
                              <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                                 <div className='space-y-2'>
                                    <Label htmlFor='dosageAmount'>
                                       Dosage Amount *
                                    </Label>
                                    <Input
                                       id='dosageAmount'
                                       value={prescriptionForm.dosageAmount}
                                       onChange={(e) =>
                                          handleFormChange(
                                             'dosageAmount',
                                             e.target.value
                                          )
                                       }
                                       placeholder='e.g., 1'
                                       required
                                    />
                                 </div>
                                 <div className='space-y-2'>
                                    <Label htmlFor='dosageUnit'>Unit</Label>
                                    <select
                                       id='dosageUnit'
                                       value={prescriptionForm.dosageUnit}
                                       onChange={(e) =>
                                          handleFormChange(
                                             'dosageUnit',
                                             e.target.value
                                          )
                                       }
                                       className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    >
                                       <option value='tablet'>tablet</option>
                                       <option value='capsule'>capsule</option>
                                       <option value='ml'>ml</option>
                                       <option value='mg'>mg</option>
                                       <option value='tsp'>tsp</option>
                                       <option value='tbsp'>tbsp</option>
                                    </select>
                                 </div>
                                 <div className='space-y-2'>
                                    <Label htmlFor='frequency'>
                                       Frequency *
                                    </Label>
                                    <select
                                       id='frequency'
                                       value={prescriptionForm.frequency}
                                       onChange={(e) =>
                                          handleFormChange(
                                             'frequency',
                                             e.target.value
                                          )
                                       }
                                       className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                                       required
                                    >
                                       <option value=''>
                                          Select frequency
                                       </option>
                                       <option value='Once daily'>
                                          Once daily
                                       </option>
                                       <option value='Twice daily'>
                                          Twice daily
                                       </option>
                                       <option value='Three times daily'>
                                          Three times daily
                                       </option>
                                       <option value='Four times daily'>
                                          Four times daily
                                       </option>
                                       <option value='Every 4 hours'>
                                          Every 4 hours
                                       </option>
                                       <option value='Every 6 hours'>
                                          Every 6 hours
                                       </option>
                                       <option value='Every 8 hours'>
                                          Every 8 hours
                                       </option>
                                       <option value='As needed'>
                                          As needed
                                       </option>
                                    </select>
                                 </div>
                              </div>

                              <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                                 <div className='space-y-2'>
                                    <Label htmlFor='duration'>Duration *</Label>
                                    <Input
                                       id='duration'
                                       value={prescriptionForm.duration}
                                       onChange={(e) =>
                                          handleFormChange(
                                             'duration',
                                             e.target.value
                                          )
                                       }
                                       placeholder='e.g., 7 days, 30 days'
                                       required
                                    />
                                 </div>
                                 <div className='space-y-2'>
                                    <Label htmlFor='quantity'>Quantity *</Label>
                                    <Input
                                       id='quantity'
                                       value={prescriptionForm.quantity}
                                       onChange={(e) =>
                                          handleFormChange(
                                             'quantity',
                                             e.target.value
                                          )
                                       }
                                       placeholder='e.g., 30'
                                       required
                                    />
                                 </div>
                                 <div className='space-y-2'>
                                    <Label htmlFor='refills'>Refills</Label>
                                    <select
                                       id='refills'
                                       value={prescriptionForm.refills}
                                       onChange={(e) =>
                                          handleFormChange(
                                             'refills',
                                             e.target.value
                                          )
                                       }
                                       className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    >
                                       <option value='0'>0 refills</option>
                                       <option value='1'>1 refill</option>
                                       <option value='2'>2 refills</option>
                                       <option value='3'>3 refills</option>
                                       <option value='4'>4 refills</option>
                                       <option value='5'>5 refills</option>
                                    </select>
                                 </div>
                              </div>

                              <div className='space-y-2'>
                                 <Label htmlFor='instructions'>
                                    Instructions for Patient *
                                 </Label>
                                 <textarea
                                    id='instructions'
                                    value={prescriptionForm.instructions}
                                    onChange={(e) =>
                                       handleFormChange(
                                          'instructions',
                                          e.target.value
                                       )
                                    }
                                    placeholder='e.g., Take one tablet three times daily with food for 7 days'
                                    className='w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    rows={3}
                                    required
                                 />
                              </div>

                              <div className='space-y-2'>
                                 <Label htmlFor='notes'>Additional Notes</Label>
                                 <textarea
                                    id='notes'
                                    value={prescriptionForm.notes}
                                    onChange={(e) =>
                                       handleFormChange('notes', e.target.value)
                                    }
                                    placeholder='Any additional notes for the pharmacist...'
                                    className='w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    rows={2}
                                 />
                              </div>
                           </CardContent>
                        </Card>

                        {/* Pharmacy Selection */}
                        <Card>
                           <CardHeader>
                              <CardTitle>Pharmacy Selection</CardTitle>
                           </CardHeader>
                           <CardContent>
                              <div className='space-y-2'>
                                 <Label htmlFor='pharmacy'>
                                    Preferred Pharmacy *
                                 </Label>
                                 <select
                                    id='pharmacy'
                                    value={prescriptionForm.pharmacyId}
                                    onChange={(e) =>
                                       handleFormChange(
                                          'pharmacyId',
                                          e.target.value
                                       )
                                    }
                                    className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    required
                                 >
                                    <option value=''>Select a pharmacy</option>
                                    <option value='main'>
                                       Main Hospital Pharmacy
                                    </option>
                                    <option value='cvs'>
                                       CVS Pharmacy - Main St
                                    </option>
                                    <option value='walgreens'>
                                       Walgreens - Oak Ave
                                    </option>
                                    <option value='rite-aid'>
                                       Rite Aid - Pine St
                                    </option>
                                 </select>
                              </div>
                           </CardContent>
                        </Card>

                        {/* Submit Button */}
                        <div className='flex space-x-3'>
                           <Button
                              type='submit'
                              className='flex-1'
                              disabled={!selectedPatient}
                           >
                              <Pill className='mr-2 h-4 w-4' />
                              Create Prescription
                           </Button>
                           <Button
                              type='button'
                              variant='outline'
                              onClick={() => navigate(-1)}
                           >
                              Cancel
                           </Button>
                        </div>
                     </form>
                  </div>

                  {/* Sidebar */}
                  <div className='space-y-6'>
                     {/* Patient Info */}
                     {selectedPatient && (
                        <Card>
                           <CardHeader>
                              <CardTitle className='text-lg'>
                                 Patient Information
                              </CardTitle>
                           </CardHeader>
                           <CardContent className='space-y-4'>
                              <div>
                                 <p className='font-medium'>
                                    {selectedPatient.name}
                                 </p>
                                 <p className='text-sm text-gray-600'>
                                    Age: {selectedPatient.age}
                                 </p>
                              </div>

                              <div>
                                 <h4 className='mb-2 font-medium text-red-600'>
                                    Allergies
                                 </h4>
                                 {selectedPatient.allergies.length > 0 ? (
                                    <div className='space-y-1'>
                                       {selectedPatient.allergies.map(
                                          (allergy, index) => (
                                             <Badge
                                                key={index}
                                                variant='destructive'
                                                className='mr-1'
                                             >
                                                <AlertTriangle className='mr-1 h-3 w-3' />
                                                {allergy}
                                             </Badge>
                                          )
                                       )}
                                    </div>
                                 ) : (
                                    <p className='text-sm text-gray-500'>
                                       No known allergies
                                    </p>
                                 )}
                              </div>

                              <div>
                                 <h4 className='mb-2 font-medium text-blue-600'>
                                    Current Medications
                                 </h4>
                                 {selectedPatient.currentMedications.length >
                                 0 ? (
                                    <div className='space-y-1'>
                                       {selectedPatient.currentMedications.map(
                                          (med, index) => (
                                             <p
                                                key={index}
                                                className='text-sm text-gray-700'
                                             >
                                                {med}
                                             </p>
                                          )
                                       )}
                                    </div>
                                 ) : (
                                    <p className='text-sm text-gray-500'>
                                       No current medications
                                    </p>
                                 )}
                              </div>
                           </CardContent>
                        </Card>
                     )}

                     {/* Common Medications */}
                     <Card>
                        <CardHeader>
                           <CardTitle className='text-lg'>
                              Common Medications
                           </CardTitle>
                           <CardDescription>
                              Click to quickly fill medication details
                           </CardDescription>
                        </CardHeader>
                        <CardContent>
                           <div className='space-y-2'>
                              {commonMedications.map((med, index) => (
                                 <Button
                                    key={index}
                                    variant='outline'
                                    size='sm'
                                    className='h-auto w-full justify-start p-3 text-left'
                                    type='button'
                                    onClick={() => fillMedicationDetails(med)}
                                 >
                                    <div>
                                       <p className='font-medium'>{med.name}</p>
                                       <p className='text-xs text-gray-500'>
                                          {med.strength} {med.form}
                                       </p>
                                    </div>
                                 </Button>
                              ))}
                           </div>
                        </CardContent>
                     </Card>

                     {/* Quick Tips */}
                     <Card>
                        <CardHeader>
                           <CardTitle className='text-lg'>
                              Prescription Tips
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className='space-y-3 text-sm'>
                              <div className='flex items-start space-x-2'>
                                 <CheckCircle className='mt-0.5 h-4 w-4 text-green-600' />
                                 <p>
                                    Always check patient allergies before
                                    prescribing
                                 </p>
                              </div>
                              <div className='flex items-start space-x-2'>
                                 <CheckCircle className='mt-0.5 h-4 w-4 text-green-600' />
                                 <p>
                                    Review current medications for interactions
                                 </p>
                              </div>
                              <div className='flex items-start space-x-2'>
                                 <CheckCircle className='mt-0.5 h-4 w-4 text-green-600' />
                                 <p>Provide clear instructions for patient</p>
                              </div>
                              <div className='flex items-start space-x-2'>
                                 <CheckCircle className='mt-0.5 h-4 w-4 text-green-600' />
                                 <p>
                                    Consider generic alternatives when
                                    appropriate
                                 </p>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  </div>
               </div>
            </main>
         </div>
      </div>
   );
}

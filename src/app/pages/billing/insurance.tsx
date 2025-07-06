import { useEffect, useState } from 'react';

import {
   AlertTriangle,
   Calendar,
   CheckCircle,
   Clock,
   DollarSign,
   Download,
   Eye,
   FileText,
   Filter,
   Plus,
   Search,
   Shield,
   XCircle,
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

interface InsuranceClaim {
   id: string;
   claimNumber: string;
   patientName: string;
   patientId: string;
   insuranceProvider: string;
   policyNumber: string;
   serviceDate: Date;
   submittedDate: Date;
   claimAmount: number;
   approvedAmount?: number;
   paidAmount?: number;
   status:
      | 'submitted'
      | 'processing'
      | 'approved'
      | 'denied'
      | 'appealed'
      | 'paid';
   denialReason?: string;
   services: ClaimService[];
   notes?: string;
}

interface ClaimService {
   id: string;
   description: string;
   cptCode: string;
   quantity: number;
   unitPrice: number;
   totalPrice: number;
}

export default function InsuranceClaimsPage() {
   const { user, isAuthenticated } = useAuthStore();
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedStatus, setSelectedStatus] = useState<string>('all');
   const [selectedProvider, setSelectedProvider] = useState<string>('all');
   const navigate = useNavigate();

   useEffect(() => {
      if (!isAuthenticated || !user) {
         navigate('/');
         return;
      }
      if (user.role !== 'admin' && user.role !== 'accountant') {
         navigate('/dashboard');
         return;
      }
   }, [isAuthenticated, user, navigate]);

   if (
      !isAuthenticated ||
      !user ||
      (user.role !== 'admin' && user.role !== 'accountant')
   ) {
      return null;
   }

   // Mock insurance claims data
   const mockClaims: InsuranceClaim[] = [
      {
         id: 'claim_1',
         claimNumber: 'CLM-2024-001',
         patientName: 'John Doe',
         patientId: 'patient_1',
         insuranceProvider: 'Blue Cross Blue Shield',
         policyNumber: 'BC123456789',
         serviceDate: new Date(Date.now() - 1209600000), // 14 days ago
         submittedDate: new Date(Date.now() - 604800000), // 7 days ago
         claimAmount: 850.0,
         approvedAmount: 765.0,
         paidAmount: 765.0,
         status: 'paid',
         services: [
            {
               id: 'svc_1',
               description: 'Office Visit - Established Patient',
               cptCode: '99213',
               quantity: 1,
               unitPrice: 250.0,
               totalPrice: 250.0,
            },
            {
               id: 'svc_2',
               description: 'ECG Interpretation',
               cptCode: '93000',
               quantity: 1,
               unitPrice: 150.0,
               totalPrice: 150.0,
            },
            {
               id: 'svc_3',
               description: 'Blood Work - Comprehensive Panel',
               cptCode: '80053',
               quantity: 1,
               unitPrice: 450.0,
               totalPrice: 450.0,
            },
         ],
      },
      {
         id: 'claim_2',
         claimNumber: 'CLM-2024-002',
         patientName: 'Emily Johnson',
         patientId: 'patient_2',
         insuranceProvider: 'Aetna',
         policyNumber: 'AET987654321',
         serviceDate: new Date(Date.now() - 864000000), // 10 days ago
         submittedDate: new Date(Date.now() - 432000000), // 5 days ago
         claimAmount: 1250.0,
         status: 'processing',
         services: [
            {
               id: 'svc_4',
               description: 'Emergency Room Visit',
               cptCode: '99284',
               quantity: 1,
               unitPrice: 750.0,
               totalPrice: 750.0,
            },
            {
               id: 'svc_5',
               description: 'X-Ray Chest',
               cptCode: '71020',
               quantity: 1,
               unitPrice: 200.0,
               totalPrice: 200.0,
            },
            {
               id: 'svc_6',
               description: 'IV Therapy',
               cptCode: '96365',
               quantity: 1,
               unitPrice: 300.0,
               totalPrice: 300.0,
            },
         ],
      },
      {
         id: 'claim_3',
         claimNumber: 'CLM-2024-003',
         patientName: 'Robert Smith',
         patientId: 'patient_3',
         insuranceProvider: 'Medicare',
         policyNumber: 'MED555666777',
         serviceDate: new Date(Date.now() - 1728000000), // 20 days ago
         submittedDate: new Date(Date.now() - 1296000000), // 15 days ago
         claimAmount: 2100.0,
         approvedAmount: 1680.0,
         status: 'approved',
         services: [
            {
               id: 'svc_7',
               description: 'Cardiac Catheterization',
               cptCode: '93458',
               quantity: 1,
               unitPrice: 1500.0,
               totalPrice: 1500.0,
            },
            {
               id: 'svc_8',
               description: 'Anesthesia Services',
               cptCode: '00560',
               quantity: 1,
               unitPrice: 400.0,
               totalPrice: 400.0,
            },
            {
               id: 'svc_9',
               description: 'Recovery Room',
               cptCode: '99231',
               quantity: 1,
               unitPrice: 200.0,
               totalPrice: 200.0,
            },
         ],
      },
      {
         id: 'claim_4',
         claimNumber: 'CLM-2024-004',
         patientName: 'Maria Garcia',
         patientId: 'patient_4',
         insuranceProvider: 'Cigna',
         policyNumber: 'CIG111222333',
         serviceDate: new Date(Date.now() - 518400000), // 6 days ago
         submittedDate: new Date(Date.now() - 259200000), // 3 days ago
         claimAmount: 450.0,
         status: 'denied',
         denialReason: 'Service not covered under current plan',
         services: [
            {
               id: 'svc_10',
               description: 'Cosmetic Consultation',
               cptCode: '99201',
               quantity: 1,
               unitPrice: 450.0,
               totalPrice: 450.0,
            },
         ],
         notes: 'Patient seeking appeal for coverage determination',
      },
      {
         id: 'claim_5',
         claimNumber: 'CLM-2024-005',
         patientName: 'David Brown',
         patientId: 'patient_5',
         insuranceProvider: 'United Healthcare',
         policyNumber: 'UHC444555666',
         serviceDate: new Date(Date.now() - 172800000), // 2 days ago
         submittedDate: new Date(Date.now() - 86400000), // 1 day ago
         claimAmount: 320.0,
         status: 'submitted',
         services: [
            {
               id: 'svc_11',
               description: 'Telemedicine Consultation',
               cptCode: '99421',
               quantity: 1,
               unitPrice: 180.0,
               totalPrice: 180.0,
            },
            {
               id: 'svc_12',
               description: 'Prescription Management',
               cptCode: '99211',
               quantity: 1,
               unitPrice: 140.0,
               totalPrice: 140.0,
            },
         ],
      },
   ];

   const getStatusIcon = (status: string) => {
      switch (status) {
         case 'paid':
            return <CheckCircle className='h-4 w-4 text-green-600' />;
         case 'approved':
            return <CheckCircle className='h-4 w-4 text-blue-600' />;
         case 'denied':
            return <XCircle className='h-4 w-4 text-red-600' />;
         case 'appealed':
            return <AlertTriangle className='h-4 w-4 text-orange-600' />;
         case 'processing':
            return <Clock className='h-4 w-4 text-yellow-600' />;
         default:
            return <FileText className='h-4 w-4 text-gray-600' />;
      }
   };

   const getStatusColor = (status: string) => {
      switch (status) {
         case 'paid':
            return 'bg-green-100 text-green-800 hover:bg-green-100';
         case 'approved':
            return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
         case 'denied':
            return 'bg-red-100 text-red-800 hover:bg-red-100';
         case 'appealed':
            return 'bg-orange-100 text-orange-800 hover:bg-orange-100';
         case 'processing':
            return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
         default:
            return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
      }
   };

   const filteredClaims = mockClaims.filter((claim) => {
      const matchesSearch =
         claim.claimNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
         claim.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
         claim.insuranceProvider
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
         claim.policyNumber.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
         selectedStatus === 'all' || claim.status === selectedStatus;
      const matchesProvider =
         selectedProvider === 'all' ||
         claim.insuranceProvider === selectedProvider;
      return matchesSearch && matchesStatus && matchesProvider;
   });

   const pendingClaims = filteredClaims.filter((claim) =>
      ['submitted', 'processing', 'appealed'].includes(claim.status)
   );

   const processedClaims = filteredClaims.filter((claim) =>
      ['approved', 'denied', 'paid'].includes(claim.status)
   );

   const uniqueProviders = Array.from(
      new Set(mockClaims.map((claim) => claim.insuranceProvider))
   );

   const ClaimCard = ({ claim }: { claim: InsuranceClaim }) => (
      <Card className='transition-shadow duration-200 hover:shadow-md'>
         <CardContent className='p-6'>
            <div className='flex items-start justify-between'>
               <div className='flex-1'>
                  <div className='mb-2 flex items-center space-x-2'>
                     <Shield className='h-5 w-5 text-blue-600' />
                     <h3 className='font-semibold text-gray-900'>
                        {claim.claimNumber}
                     </h3>
                     <Badge className={getStatusColor(claim.status)}>
                        {getStatusIcon(claim.status)}
                        <span className='ml-1'>
                           {claim.status.charAt(0).toUpperCase() +
                              claim.status.slice(1)}
                        </span>
                     </Badge>
                  </div>

                  <div className='mb-4 space-y-2 text-sm text-gray-700'>
                     <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
                        <div>
                           <strong>Patient:</strong> {claim.patientName}
                        </div>
                        <div>
                           <strong>Provider:</strong> {claim.insuranceProvider}
                        </div>
                        <div>
                           <strong>Policy:</strong> {claim.policyNumber}
                        </div>
                        <div>
                           <strong>Service Date:</strong>{' '}
                           {claim.serviceDate.toLocaleDateString()}
                        </div>
                     </div>

                     <div className='border-t pt-2'>
                        <div className='grid grid-cols-1 gap-2 sm:grid-cols-3'>
                           <div>
                              <strong>Claim Amount:</strong> $
                              {claim.claimAmount.toFixed(2)}
                           </div>
                           {claim.approvedAmount && (
                              <div>
                                 <strong>Approved:</strong> $
                                 {claim.approvedAmount.toFixed(2)}
                              </div>
                           )}
                           {claim.paidAmount && (
                              <div>
                                 <strong>Paid:</strong> $
                                 {claim.paidAmount.toFixed(2)}
                              </div>
                           )}
                        </div>
                     </div>

                     {claim.denialReason && (
                        <div className='mt-2 rounded border border-red-200 bg-red-50 p-2'>
                           <strong className='text-red-800'>
                              Denial Reason:
                           </strong>
                           <p className='mt-1 text-xs text-red-700'>
                              {claim.denialReason}
                           </p>
                        </div>
                     )}

                     {claim.notes && (
                        <div className='mt-2 rounded border border-blue-200 bg-blue-50 p-2'>
                           <strong className='text-blue-800'>Notes:</strong>
                           <p className='mt-1 text-xs text-blue-700'>
                              {claim.notes}
                           </p>
                        </div>
                     )}
                  </div>

                  <div className='text-xs text-gray-500'>
                     <div className='flex items-center space-x-4'>
                        <div className='flex items-center space-x-1'>
                           <Calendar className='h-3 w-3' />
                           <span>
                              Submitted:{' '}
                              {claim.submittedDate.toLocaleDateString()}
                           </span>
                        </div>
                        <div className='flex items-center space-x-1'>
                           <FileText className='h-3 w-3' />
                           <span>
                              {claim.services.length} service
                              {claim.services.length > 1 ? 's' : ''}
                           </span>
                        </div>
                     </div>
                  </div>
               </div>

               <div className='ml-4 flex flex-col space-y-2'>
                  <Button variant='outline' size='sm'>
                     <Eye className='mr-1 h-4 w-4' />
                     View Details
                  </Button>
                  <Button variant='outline' size='sm'>
                     <Download className='mr-1 h-4 w-4' />
                     Export
                  </Button>
                  {claim.status === 'denied' && (
                     <Button
                        size='sm'
                        className='bg-orange-600 hover:bg-orange-700'
                     >
                        <AlertTriangle className='mr-1 h-4 w-4' />
                        Appeal
                     </Button>
                  )}
                  {claim.status === 'approved' && !claim.paidAmount && (
                     <Button
                        size='sm'
                        className='bg-green-600 hover:bg-green-700'
                     >
                        <DollarSign className='mr-1 h-4 w-4' />
                        Process Payment
                     </Button>
                  )}
               </div>
            </div>
         </CardContent>
      </Card>
   );

   const totalClaimAmount = mockClaims.reduce(
      (sum, claim) => sum + claim.claimAmount,
      0
   );
   const totalApprovedAmount = mockClaims.reduce(
      (sum, claim) => sum + (claim.approvedAmount || 0),
      0
   );
   const totalPaidAmount = mockClaims.reduce(
      (sum, claim) => sum + (claim.paidAmount || 0),
      0
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
                        Insurance Claims Management
                     </h1>
                     <p className='mt-1 text-gray-600'>
                        Process and track insurance claims and reimbursements
                     </p>
                  </div>
                  <div className='flex items-center space-x-3'>
                     <Button variant='outline'>
                        <Download className='mr-2 h-4 w-4' />
                        Export Claims
                     </Button>
                     <Button>
                        <Plus className='mr-2 h-4 w-4' />
                        Submit New Claim
                     </Button>
                  </div>
               </div>

               {/* Summary Cards */}
               <div className='grid grid-cols-1 gap-6 md:grid-cols-4'>
                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>
                                 Total Claims
                              </p>
                              <p className='text-2xl font-bold text-gray-900'>
                                 {mockClaims.length}
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
                                 Claim Amount
                              </p>
                              <p className='text-2xl font-bold text-blue-600'>
                                 ${totalClaimAmount.toFixed(2)}
                              </p>
                           </div>
                           <div className='rounded-lg bg-blue-100 p-3'>
                              <DollarSign className='h-6 w-6 text-blue-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>
                                 Approved Amount
                              </p>
                              <p className='text-2xl font-bold text-green-600'>
                                 ${totalApprovedAmount.toFixed(2)}
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
                                 Paid Amount
                              </p>
                              <p className='text-2xl font-bold text-purple-600'>
                                 ${totalPaidAmount.toFixed(2)}
                              </p>
                           </div>
                           <div className='rounded-lg bg-purple-100 p-3'>
                              <Shield className='h-6 w-6 text-purple-600' />
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
                              placeholder='Search by claim number, patient name, or policy number...'
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
                              <option value='submitted'>Submitted</option>
                              <option value='processing'>Processing</option>
                              <option value='approved'>Approved</option>
                              <option value='denied'>Denied</option>
                              <option value='appealed'>Appealed</option>
                              <option value='paid'>Paid</option>
                           </select>
                           <select
                              value={selectedProvider}
                              onChange={(e) =>
                                 setSelectedProvider(e.target.value)
                              }
                              className='rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                           >
                              <option value='all'>All Providers</option>
                              {uniqueProviders.map((provider) => (
                                 <option key={provider} value={provider}>
                                    {provider}
                                 </option>
                              ))}
                           </select>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Claims Tabs */}
               <Tabs defaultValue='pending' className='space-y-6'>
                  <TabsList className='grid w-full max-w-md grid-cols-2'>
                     <TabsTrigger value='pending'>
                        Pending ({pendingClaims.length})
                     </TabsTrigger>
                     <TabsTrigger value='processed'>
                        Processed ({processedClaims.length})
                     </TabsTrigger>
                  </TabsList>

                  <TabsContent value='pending' className='space-y-4'>
                     {pendingClaims.length > 0 ? (
                        pendingClaims.map((claim) => (
                           <ClaimCard key={claim.id} claim={claim} />
                        ))
                     ) : (
                        <Card>
                           <CardContent className='p-12 text-center'>
                              <Shield className='mx-auto mb-4 h-12 w-12 text-gray-400' />
                              <h3 className='mb-2 text-lg font-medium text-gray-900'>
                                 No pending claims
                              </h3>
                              <p className='mb-4 text-gray-600'>
                                 All claims have been processed.
                              </p>
                              <Button>
                                 <Plus className='mr-2 h-4 w-4' />
                                 Submit New Claim
                              </Button>
                           </CardContent>
                        </Card>
                     )}
                  </TabsContent>

                  <TabsContent value='processed' className='space-y-4'>
                     {processedClaims.length > 0 ? (
                        processedClaims.map((claim) => (
                           <ClaimCard key={claim.id} claim={claim} />
                        ))
                     ) : (
                        <Card>
                           <CardContent className='p-12 text-center'>
                              <FileText className='mx-auto mb-4 h-12 w-12 text-gray-400' />
                              <h3 className='mb-2 text-lg font-medium text-gray-900'>
                                 No processed claims
                              </h3>
                              <p className='text-gray-600'>
                                 Processed claims will appear here.
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

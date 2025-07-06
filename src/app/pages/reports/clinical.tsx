import { useEffect, useState } from 'react';

import {
   Activity,
   Building,
   Download,
   FileText,
   Filter,
   Heart,
   Stethoscope,
   TrendingDown,
   TrendingUp,
   Users,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from '@/shared/components/ui/tabs';
import { useAuthStore } from '@/shared/lib/store';

import { Header } from '@/app/layouts/components/header';
import { Sidebar } from '@/app/layouts/components/sidebar';

interface ClinicalMetrics {
   totalPatients: number;
   totalAppointments: number;
   completedAppointments: number;
   cancelledAppointments: number;
   averageWaitTime: number;
   patientSatisfaction: number;
   readmissionRate: number;
   mortalityRate: number;
}

interface DepartmentStats {
   department: string;
   patientCount: number;
   appointmentCount: number;
   averageStay: number;
   satisfaction: number;
}

interface DiagnosisData {
   diagnosis: string;
   count: number;
   percentage: number;
   trend: 'up' | 'down' | 'stable';
}

export default function ClinicalReportsPage() {
   const { user, isAuthenticated } = useAuthStore();
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [dateRange, setDateRange] = useState({
      startDate: new Date(Date.now() - 2592000000).toISOString().split('T')[0], // 30 days ago
      endDate: new Date().toISOString().split('T')[0],
   });
   const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
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

   // Mock clinical data
   const clinicalMetrics: ClinicalMetrics = {
      totalPatients: 2847,
      totalAppointments: 4521,
      completedAppointments: 4267,
      cancelledAppointments: 254,
      averageWaitTime: 18.5,
      patientSatisfaction: 4.6,
      readmissionRate: 8.2,
      mortalityRate: 1.4,
   };

   const departmentStats: DepartmentStats[] = [
      {
         department: 'Emergency',
         patientCount: 856,
         appointmentCount: 1245,
         averageStay: 4.2,
         satisfaction: 4.3,
      },
      {
         department: 'Cardiology',
         patientCount: 569,
         appointmentCount: 892,
         averageStay: 2.8,
         satisfaction: 4.7,
      },
      {
         department: 'Surgery',
         patientCount: 483,
         appointmentCount: 567,
         averageStay: 5.6,
         satisfaction: 4.5,
      },
      {
         department: 'Radiology',
         patientCount: 341,
         appointmentCount: 1234,
         averageStay: 1.2,
         satisfaction: 4.4,
      },
      {
         department: 'Laboratory',
         patientCount: 284,
         appointmentCount: 2156,
         averageStay: 0.5,
         satisfaction: 4.2,
      },
      {
         department: 'Pediatrics',
         patientCount: 314,
         appointmentCount: 427,
         averageStay: 3.1,
         satisfaction: 4.8,
      },
   ];

   const topDiagnoses: DiagnosisData[] = [
      { diagnosis: 'Hypertension', count: 342, percentage: 12.0, trend: 'up' },
      {
         diagnosis: 'Type 2 Diabetes',
         count: 298,
         percentage: 10.5,
         trend: 'stable',
      },
      {
         diagnosis: 'Coronary Artery Disease',
         count: 256,
         percentage: 9.0,
         trend: 'down',
      },
      { diagnosis: 'Pneumonia', count: 189, percentage: 6.6, trend: 'up' },
      {
         diagnosis: 'Chronic Kidney Disease',
         count: 167,
         percentage: 5.9,
         trend: 'stable',
      },
      { diagnosis: 'Depression', count: 145, percentage: 5.1, trend: 'up' },
      { diagnosis: 'Asthma', count: 134, percentage: 4.7, trend: 'stable' },
      {
         diagnosis: 'Osteoarthritis',
         count: 123,
         percentage: 4.3,
         trend: 'down',
      },
   ];

   const monthlyTrends = [
      { month: 'Jan', patients: 245, appointments: 389, satisfaction: 4.4 },
      { month: 'Feb', patients: 268, appointments: 412, satisfaction: 4.5 },
      { month: 'Mar', patients: 289, appointments: 445, satisfaction: 4.3 },
      { month: 'Apr', patients: 312, appointments: 478, satisfaction: 4.6 },
      { month: 'May', patients: 298, appointments: 456, satisfaction: 4.7 },
      { month: 'Jun', patients: 334, appointments: 501, satisfaction: 4.5 },
   ];

   const handleExportReport = (reportType: string) => {
      console.log(`Exporting ${reportType} report...`);
      alert(`${reportType} report export would be implemented here`);
   };

   const getTrendIcon = (trend: string) => {
      switch (trend) {
         case 'up':
            return <TrendingUp className='h-4 w-4 text-green-600' />;
         case 'down':
            return <TrendingDown className='h-4 w-4 text-red-600' />;
         default:
            return <Activity className='h-4 w-4 text-gray-600' />;
      }
   };

   const getTrendColor = (trend: string) => {
      switch (trend) {
         case 'up':
            return 'text-green-600';
         case 'down':
            return 'text-red-600';
         default:
            return 'text-gray-600';
      }
   };

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
                        Clinical Reports & Analytics
                     </h1>
                     <p className='mt-1 text-gray-600'>
                        Comprehensive clinical performance metrics and patient
                        care analytics
                     </p>
                  </div>
                  <div className='flex items-center space-x-3'>
                     <Button variant='outline'>
                        <Download className='mr-2 h-4 w-4' />
                        Export All Reports
                     </Button>
                     <Button>
                        <FileText className='mr-2 h-4 w-4' />
                        Generate Custom Report
                     </Button>
                  </div>
               </div>

               {/* Filters */}
               <Card>
                  <CardContent className='p-6'>
                     <div className='flex flex-col items-end gap-4 lg:flex-row'>
                        <div className='grid flex-1 grid-cols-1 gap-4 md:grid-cols-3'>
                           <div className='space-y-2'>
                              <Label htmlFor='startDate'>Start Date</Label>
                              <Input
                                 id='startDate'
                                 type='date'
                                 value={dateRange.startDate}
                                 onChange={(e) =>
                                    setDateRange((prev) => ({
                                       ...prev,
                                       startDate: e.target.value,
                                    }))
                                 }
                              />
                           </div>
                           <div className='space-y-2'>
                              <Label htmlFor='endDate'>End Date</Label>
                              <Input
                                 id='endDate'
                                 type='date'
                                 value={dateRange.endDate}
                                 onChange={(e) =>
                                    setDateRange((prev) => ({
                                       ...prev,
                                       endDate: e.target.value,
                                    }))
                                 }
                              />
                           </div>
                           <div className='space-y-2'>
                              <Label htmlFor='department'>Department</Label>
                              <select
                                 id='department'
                                 value={selectedDepartment}
                                 onChange={(e) =>
                                    setSelectedDepartment(e.target.value)
                                 }
                                 className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                              >
                                 <option value='all'>All Departments</option>
                                 <option value='emergency'>Emergency</option>
                                 <option value='cardiology'>Cardiology</option>
                                 <option value='surgery'>Surgery</option>
                                 <option value='radiology'>Radiology</option>
                                 <option value='laboratory'>Laboratory</option>
                                 <option value='pediatrics'>Pediatrics</option>
                              </select>
                           </div>
                        </div>
                        <Button>
                           <Filter className='mr-2 h-4 w-4' />
                           Apply Filters
                        </Button>
                     </div>
                  </CardContent>
               </Card>

               {/* Key Clinical Metrics */}
               <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>
                                 Total Patients
                              </p>
                              <p className='text-2xl font-bold text-blue-600'>
                                 {clinicalMetrics.totalPatients.toLocaleString()}
                              </p>
                              <div className='mt-1 flex items-center'>
                                 <TrendingUp className='mr-1 h-4 w-4 text-green-600' />
                                 <span className='text-sm text-green-600'>
                                    +8.2%
                                 </span>
                              </div>
                           </div>
                           <div className='rounded-lg bg-blue-100 p-3'>
                              <Users className='h-6 w-6 text-blue-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>
                                 Patient Satisfaction
                              </p>
                              <p className='text-2xl font-bold text-green-600'>
                                 {clinicalMetrics.patientSatisfaction}/5.0
                              </p>
                              <div className='mt-1 flex items-center'>
                                 <TrendingUp className='mr-1 h-4 w-4 text-green-600' />
                                 <span className='text-sm text-green-600'>
                                    +0.3
                                 </span>
                              </div>
                           </div>
                           <div className='rounded-lg bg-green-100 p-3'>
                              <Heart className='h-6 w-6 text-green-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>
                                 Avg Wait Time
                              </p>
                              <p className='text-2xl font-bold text-orange-600'>
                                 {clinicalMetrics.averageWaitTime} min
                              </p>
                              <div className='mt-1 flex items-center'>
                                 <TrendingDown className='mr-1 h-4 w-4 text-green-600' />
                                 <span className='text-sm text-green-600'>
                                    -2.1 min
                                 </span>
                              </div>
                           </div>
                           <div className='rounded-lg bg-orange-100 p-3'>
                              <Activity className='h-6 w-6 text-orange-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>
                                 Readmission Rate
                              </p>
                              <p className='text-2xl font-bold text-red-600'>
                                 {clinicalMetrics.readmissionRate}%
                              </p>
                              <div className='mt-1 flex items-center'>
                                 <TrendingDown className='mr-1 h-4 w-4 text-green-600' />
                                 <span className='text-sm text-green-600'>
                                    -1.2%
                                 </span>
                              </div>
                           </div>
                           <div className='rounded-lg bg-red-100 p-3'>
                              <Stethoscope className='h-6 w-6 text-red-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </div>

               {/* Reports Tabs */}
               <Tabs defaultValue='overview' className='space-y-6'>
                  <TabsList className='grid w-full max-w-2xl grid-cols-4'>
                     <TabsTrigger value='overview'>Overview</TabsTrigger>
                     <TabsTrigger value='departments'>Departments</TabsTrigger>
                     <TabsTrigger value='diagnoses'>Diagnoses</TabsTrigger>
                     <TabsTrigger value='trends'>Trends</TabsTrigger>
                  </TabsList>

                  <TabsContent value='overview' className='space-y-6'>
                     <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                        <Card>
                           <CardHeader>
                              <CardTitle className='flex items-center justify-between'>
                                 <span>Appointment Completion Rate</span>
                                 <Button
                                    variant='outline'
                                    size='sm'
                                    onClick={() =>
                                       handleExportReport(
                                          'Appointment Completion'
                                       )
                                    }
                                 >
                                    <Download className='mr-1 h-4 w-4' />
                                    Export
                                 </Button>
                              </CardTitle>
                           </CardHeader>
                           <CardContent>
                              <div className='space-y-4'>
                                 <div className='text-center'>
                                    <div className='mb-2 text-4xl font-bold text-green-600'>
                                       {(
                                          (clinicalMetrics.completedAppointments /
                                             clinicalMetrics.totalAppointments) *
                                          100
                                       ).toFixed(1)}
                                       %
                                    </div>
                                    <p className='text-gray-600'>
                                       {clinicalMetrics.completedAppointments.toLocaleString()}{' '}
                                       of{' '}
                                       {clinicalMetrics.totalAppointments.toLocaleString()}{' '}
                                       appointments completed
                                    </p>
                                 </div>

                                 <div className='space-y-2'>
                                    <div className='flex justify-between text-sm'>
                                       <span>Completed</span>
                                       <span>
                                          {clinicalMetrics.completedAppointments.toLocaleString()}
                                       </span>
                                    </div>
                                    <div className='h-2 w-full rounded-full bg-gray-200'>
                                       <div
                                          className='h-2 rounded-full bg-green-600'
                                          style={{
                                             width: `${(clinicalMetrics.completedAppointments / clinicalMetrics.totalAppointments) * 100}%`,
                                          }}
                                       ></div>
                                    </div>

                                    <div className='flex justify-between text-sm'>
                                       <span>Cancelled</span>
                                       <span>
                                          {clinicalMetrics.cancelledAppointments.toLocaleString()}
                                       </span>
                                    </div>
                                    <div className='h-2 w-full rounded-full bg-gray-200'>
                                       <div
                                          className='h-2 rounded-full bg-red-600'
                                          style={{
                                             width: `${(clinicalMetrics.cancelledAppointments / clinicalMetrics.totalAppointments) * 100}%`,
                                          }}
                                       ></div>
                                    </div>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>

                        <Card>
                           <CardHeader>
                              <CardTitle>Quality Metrics</CardTitle>
                           </CardHeader>
                           <CardContent>
                              <div className='space-y-6'>
                                 <div className='grid grid-cols-2 gap-4 text-center'>
                                    <div className='rounded-lg bg-green-50 p-4'>
                                       <p className='text-2xl font-bold text-green-600'>
                                          {clinicalMetrics.patientSatisfaction}
                                          /5.0
                                       </p>
                                       <p className='text-sm text-gray-600'>
                                          Patient Satisfaction
                                       </p>
                                    </div>
                                    <div className='rounded-lg bg-red-50 p-4'>
                                       <p className='text-2xl font-bold text-red-600'>
                                          {clinicalMetrics.mortalityRate}%
                                       </p>
                                       <p className='text-sm text-gray-600'>
                                          Mortality Rate
                                       </p>
                                    </div>
                                 </div>

                                 <div className='rounded-lg bg-orange-50 p-4 text-center'>
                                    <p className='text-3xl font-bold text-orange-600'>
                                       {clinicalMetrics.readmissionRate}%
                                    </p>
                                    <p className='text-sm text-gray-600'>
                                       30-Day Readmission Rate
                                    </p>
                                    <p className='mt-1 text-xs text-orange-600'>
                                       Target: &lt;10%
                                    </p>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                     </div>
                  </TabsContent>

                  <TabsContent value='departments' className='space-y-6'>
                     <Card>
                        <CardHeader>
                           <CardTitle className='flex items-center justify-between'>
                              <span>Department Performance</span>
                              <Button
                                 variant='outline'
                                 size='sm'
                                 onClick={() =>
                                    handleExportReport('Department Performance')
                                 }
                              >
                                 <Download className='mr-1 h-4 w-4' />
                                 Export
                              </Button>
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className='space-y-4'>
                              {departmentStats.map((dept) => (
                                 <div
                                    key={dept.department}
                                    className='rounded-lg border p-4'
                                 >
                                    <div className='mb-3 flex items-center justify-between'>
                                       <h3 className='font-semibold text-gray-900'>
                                          {dept.department}
                                       </h3>
                                       <div className='flex items-center space-x-2'>
                                          <Building className='h-4 w-4 text-gray-400' />
                                          <span className='text-sm text-gray-600'>
                                             {dept.patientCount} patients
                                          </span>
                                       </div>
                                    </div>

                                    <div className='grid grid-cols-1 gap-4 text-sm md:grid-cols-4'>
                                       <div>
                                          <p className='text-gray-500'>
                                             Appointments
                                          </p>
                                          <p className='font-semibold'>
                                             {dept.appointmentCount.toLocaleString()}
                                          </p>
                                       </div>
                                       <div>
                                          <p className='text-gray-500'>
                                             Avg Stay (days)
                                          </p>
                                          <p className='font-semibold'>
                                             {dept.averageStay}
                                          </p>
                                       </div>
                                       <div>
                                          <p className='text-gray-500'>
                                             Satisfaction
                                          </p>
                                          <p className='font-semibold text-green-600'>
                                             {dept.satisfaction}/5.0
                                          </p>
                                       </div>
                                       <div>
                                          <p className='text-gray-500'>
                                             Utilization
                                          </p>
                                          <p className='font-semibold'>
                                             {(
                                                (dept.patientCount /
                                                   clinicalMetrics.totalPatients) *
                                                100
                                             ).toFixed(1)}
                                             %
                                          </p>
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </CardContent>
                     </Card>
                  </TabsContent>

                  <TabsContent value='diagnoses' className='space-y-6'>
                     <Card>
                        <CardHeader>
                           <CardTitle className='flex items-center justify-between'>
                              <span>Top Diagnoses</span>
                              <Button
                                 variant='outline'
                                 size='sm'
                                 onClick={() =>
                                    handleExportReport('Top Diagnoses')
                                 }
                              >
                                 <Download className='mr-1 h-4 w-4' />
                                 Export
                              </Button>
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className='space-y-4'>
                              {topDiagnoses.map((diagnosis, index) => (
                                 <div
                                    key={diagnosis.diagnosis}
                                    className='flex items-center justify-between rounded-lg border p-3'
                                 >
                                    <div className='flex items-center space-x-3'>
                                       <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-100'>
                                          <span className='text-sm font-semibold text-blue-600'>
                                             {index + 1}
                                          </span>
                                       </div>
                                       <div>
                                          <p className='font-medium'>
                                             {diagnosis.diagnosis}
                                          </p>
                                          <p className='text-sm text-gray-500'>
                                             {diagnosis.count} cases (
                                             {diagnosis.percentage}%)
                                          </p>
                                       </div>
                                    </div>
                                    <div className='flex items-center space-x-2'>
                                       {getTrendIcon(diagnosis.trend)}
                                       <span
                                          className={`text-sm ${getTrendColor(diagnosis.trend)}`}
                                       >
                                          {diagnosis.trend}
                                       </span>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </CardContent>
                     </Card>
                  </TabsContent>

                  <TabsContent value='trends' className='space-y-6'>
                     <Card>
                        <CardHeader>
                           <CardTitle className='flex items-center justify-between'>
                              <span>Monthly Trends</span>
                              <Button
                                 variant='outline'
                                 size='sm'
                                 onClick={() =>
                                    handleExportReport('Monthly Trends')
                                 }
                              >
                                 <Download className='mr-1 h-4 w-4' />
                                 Export
                              </Button>
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className='space-y-6'>
                              {monthlyTrends.map((month) => (
                                 <div key={month.month} className='space-y-2'>
                                    <div className='flex items-center justify-between'>
                                       <span className='font-medium'>
                                          {month.month} 2024
                                       </span>
                                       <div className='text-right'>
                                          <div className='text-sm text-gray-500'>
                                             {month.patients} patients •{' '}
                                             {month.appointments} appointments
                                          </div>
                                          <div className='text-sm font-semibold text-green-600'>
                                             Satisfaction: {month.satisfaction}
                                             /5.0
                                          </div>
                                       </div>
                                    </div>
                                    <div className='h-2 w-full rounded-full bg-gray-200'>
                                       <div
                                          className='h-2 rounded-full bg-blue-600'
                                          style={{
                                             width: `${(month.patients / 350) * 100}%`,
                                          }}
                                       ></div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </CardContent>
                     </Card>
                  </TabsContent>
               </Tabs>
            </main>
         </div>
      </div>
   );
}

import { useEffect, useState } from 'react';

import {
   Activity,
   BarChart3,
   Bed,
   CheckCircle,
   Clock,
   Download,
   Filter,
   TrendingDown,
   TrendingUp,
   Users,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Badge } from '@/shared/components/ui/badge';
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

export default function OperationalReportsPage() {
   const { user, isAuthenticated } = useAuthStore();
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [dateRange, setDateRange] = useState({
      startDate: new Date(Date.now() - 2592000000).toISOString().split('T')[0], // 30 days ago
      endDate: new Date().toISOString().split('T')[0],
   });
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

   // Mock operational data
   const operationalMetrics = {
      totalPatients: 1429,
      totalAppointments: 247,
      bedOccupancyRate: 78.5,
      averageWaitTime: 12,
      staffUtilization: 85.2,
      emergencyResponseTime: 6.2,
      patientSatisfaction: 94.2,
      systemUptime: 99.8,
   };

   const departmentMetrics = [
      { name: 'Emergency', patients: 156, utilization: 92, satisfaction: 89 },
      { name: 'Cardiology', patients: 89, utilization: 78, satisfaction: 96 },
      { name: 'Surgery', patients: 67, utilization: 85, satisfaction: 98 },
      { name: 'Radiology', patients: 134, utilization: 71, satisfaction: 91 },
      { name: 'Pediatrics', patients: 78, utilization: 68, satisfaction: 97 },
   ];

   const handleExportReport = (reportType: string) => {
      console.log(`Exporting ${reportType} report...`);
      alert(`${reportType} report export would be implemented here`);
   };

   const formatPercentage = (value: number) => {
      return `${value.toFixed(1)}%`;
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
                        Operational Reports & Analytics
                     </h1>
                     <p className='mt-1 text-gray-600'>
                        Monitor hospital operations and performance metrics
                     </p>
                  </div>
                  <div className='flex items-center space-x-3'>
                     <Button variant='outline'>
                        <Download className='mr-2 h-4 w-4' />
                        Export All Reports
                     </Button>
                     <Button>
                        <BarChart3 className='mr-2 h-4 w-4' />
                        Generate Custom Report
                     </Button>
                  </div>
               </div>

               {/* Filters */}
               <Card>
                  <CardContent className='p-6'>
                     <div className='flex flex-col items-end gap-4 lg:flex-row'>
                        <div className='grid flex-1 grid-cols-1 gap-4 md:grid-cols-2'>
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
                        </div>
                        <Button>
                           <Filter className='mr-2 h-4 w-4' />
                           Apply Filters
                        </Button>
                     </div>
                  </CardContent>
               </Card>

               {/* Key Metrics */}
               <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>
                                 Total Patients
                              </p>
                              <p className='text-2xl font-bold text-blue-600'>
                                 {operationalMetrics.totalPatients}
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
                                 Bed Occupancy
                              </p>
                              <p className='text-2xl font-bold text-green-600'>
                                 {formatPercentage(
                                    operationalMetrics.bedOccupancyRate
                                 )}
                              </p>
                              <div className='mt-1 flex items-center'>
                                 <TrendingUp className='mr-1 h-4 w-4 text-green-600' />
                                 <span className='text-sm text-green-600'>
                                    +3.1%
                                 </span>
                              </div>
                           </div>
                           <div className='rounded-lg bg-green-100 p-3'>
                              <Bed className='h-6 w-6 text-green-600' />
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
                                 {operationalMetrics.averageWaitTime} min
                              </p>
                              <div className='mt-1 flex items-center'>
                                 <TrendingDown className='mr-1 h-4 w-4 text-green-600' />
                                 <span className='text-sm text-green-600'>
                                    -8.5%
                                 </span>
                              </div>
                           </div>
                           <div className='rounded-lg bg-orange-100 p-3'>
                              <Clock className='h-6 w-6 text-orange-600' />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                           <div>
                              <p className='text-sm text-gray-600'>
                                 System Uptime
                              </p>
                              <p className='text-2xl font-bold text-purple-600'>
                                 {formatPercentage(
                                    operationalMetrics.systemUptime
                                 )}
                              </p>
                              <div className='mt-1 flex items-center'>
                                 <CheckCircle className='mr-1 h-4 w-4 text-green-600' />
                                 <span className='text-sm text-green-600'>
                                    Excellent
                                 </span>
                              </div>
                           </div>
                           <div className='rounded-lg bg-purple-100 p-3'>
                              <Activity className='h-6 w-6 text-purple-600' />
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
                     <TabsTrigger value='efficiency'>Efficiency</TabsTrigger>
                     <TabsTrigger value='quality'>Quality</TabsTrigger>
                  </TabsList>

                  <TabsContent value='overview' className='space-y-6'>
                     <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                        <Card>
                           <CardHeader>
                              <CardTitle className='flex items-center justify-between'>
                                 <span>Patient Flow Overview</span>
                                 <Button
                                    variant='outline'
                                    size='sm'
                                    onClick={() =>
                                       handleExportReport('Patient Flow')
                                    }
                                 >
                                    <Download className='mr-1 h-4 w-4' />
                                    Export
                                 </Button>
                              </CardTitle>
                           </CardHeader>
                           <CardContent>
                              <div className='space-y-4'>
                                 <div className='flex items-center justify-between'>
                                    <span className='text-sm text-gray-600'>
                                       Total Admissions
                                    </span>
                                    <span className='font-semibold'>156</span>
                                 </div>
                                 <div className='flex items-center justify-between'>
                                    <span className='text-sm text-gray-600'>
                                       Total Discharges
                                    </span>
                                    <span className='font-semibold'>142</span>
                                 </div>
                                 <div className='flex items-center justify-between'>
                                    <span className='text-sm text-gray-600'>
                                       Emergency Visits
                                    </span>
                                    <span className='font-semibold'>89</span>
                                 </div>
                                 <div className='flex items-center justify-between'>
                                    <span className='text-sm text-gray-600'>
                                       Outpatient Visits
                                    </span>
                                    <span className='font-semibold'>234</span>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>

                        <Card>
                           <CardHeader>
                              <CardTitle>Resource Utilization</CardTitle>
                           </CardHeader>
                           <CardContent>
                              <div className='space-y-4'>
                                 <div>
                                    <div className='mb-1 flex justify-between text-sm'>
                                       <span>Staff Utilization</span>
                                       <span>
                                          {formatPercentage(
                                             operationalMetrics.staffUtilization
                                          )}
                                       </span>
                                    </div>
                                    <div className='h-2 w-full rounded-full bg-gray-200'>
                                       <div
                                          className='h-2 rounded-full bg-blue-600'
                                          style={{
                                             width: `${operationalMetrics.staffUtilization}%`,
                                          }}
                                       ></div>
                                    </div>
                                 </div>

                                 <div>
                                    <div className='mb-1 flex justify-between text-sm'>
                                       <span>Bed Occupancy</span>
                                       <span>
                                          {formatPercentage(
                                             operationalMetrics.bedOccupancyRate
                                          )}
                                       </span>
                                    </div>
                                    <div className='h-2 w-full rounded-full bg-gray-200'>
                                       <div
                                          className='h-2 rounded-full bg-green-600'
                                          style={{
                                             width: `${operationalMetrics.bedOccupancyRate}%`,
                                          }}
                                       ></div>
                                    </div>
                                 </div>

                                 <div>
                                    <div className='mb-1 flex justify-between text-sm'>
                                       <span>Equipment Usage</span>
                                       <span>72.3%</span>
                                    </div>
                                    <div className='h-2 w-full rounded-full bg-gray-200'>
                                       <div
                                          className='h-2 rounded-full bg-purple-600'
                                          style={{ width: '72.3%' }}
                                       ></div>
                                    </div>
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
                              {departmentMetrics.map((dept) => (
                                 <div
                                    key={dept.name}
                                    className='rounded-lg border p-4'
                                 >
                                    <div className='mb-3 flex items-center justify-between'>
                                       <h3 className='font-medium'>
                                          {dept.name}
                                       </h3>
                                       <Badge variant='outline'>
                                          {dept.patients} patients
                                       </Badge>
                                    </div>

                                    <div className='grid grid-cols-2 gap-4 text-sm'>
                                       <div>
                                          <div className='mb-1 flex justify-between'>
                                             <span className='text-gray-600'>
                                                Utilization
                                             </span>
                                             <span>
                                                {formatPercentage(
                                                   dept.utilization
                                                )}
                                             </span>
                                          </div>
                                          <div className='h-1.5 w-full rounded-full bg-gray-200'>
                                             <div
                                                className='h-1.5 rounded-full bg-blue-600'
                                                style={{
                                                   width: `${dept.utilization}%`,
                                                }}
                                             ></div>
                                          </div>
                                       </div>

                                       <div>
                                          <div className='mb-1 flex justify-between'>
                                             <span className='text-gray-600'>
                                                Satisfaction
                                             </span>
                                             <span>
                                                {formatPercentage(
                                                   dept.satisfaction
                                                )}
                                             </span>
                                          </div>
                                          <div className='h-1.5 w-full rounded-full bg-gray-200'>
                                             <div
                                                className='h-1.5 rounded-full bg-green-600'
                                                style={{
                                                   width: `${dept.satisfaction}%`,
                                                }}
                                             ></div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </CardContent>
                     </Card>
                  </TabsContent>

                  <TabsContent value='efficiency' className='space-y-6'>
                     <Card>
                        <CardHeader>
                           <CardTitle className='flex items-center justify-between'>
                              <span>Operational Efficiency Metrics</span>
                              <Button
                                 variant='outline'
                                 size='sm'
                                 onClick={() =>
                                    handleExportReport('Efficiency Metrics')
                                 }
                              >
                                 <Download className='mr-1 h-4 w-4' />
                                 Export
                              </Button>
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                              <div className='space-y-4'>
                                 <h4 className='font-medium text-gray-900'>
                                    Response Times
                                 </h4>
                                 <div className='space-y-3'>
                                    <div className='flex justify-between'>
                                       <span className='text-sm text-gray-600'>
                                          Emergency Response
                                       </span>
                                       <span className='font-semibold'>
                                          {
                                             operationalMetrics.emergencyResponseTime
                                          }{' '}
                                          min
                                       </span>
                                    </div>
                                    <div className='flex justify-between'>
                                       <span className='text-sm text-gray-600'>
                                          Average Wait Time
                                       </span>
                                       <span className='font-semibold'>
                                          {operationalMetrics.averageWaitTime}{' '}
                                          min
                                       </span>
                                    </div>
                                    <div className='flex justify-between'>
                                       <span className='text-sm text-gray-600'>
                                          Lab Results
                                       </span>
                                       <span className='font-semibold'>
                                          45 min
                                       </span>
                                    </div>
                                    <div className='flex justify-between'>
                                       <span className='text-sm text-gray-600'>
                                          Discharge Processing
                                       </span>
                                       <span className='font-semibold'>
                                          2.3 hours
                                       </span>
                                    </div>
                                 </div>
                              </div>

                              <div className='space-y-4'>
                                 <h4 className='font-medium text-gray-900'>
                                    Productivity Metrics
                                 </h4>
                                 <div className='space-y-3'>
                                    <div className='flex justify-between'>
                                       <span className='text-sm text-gray-600'>
                                          Patients per Hour
                                       </span>
                                       <span className='font-semibold'>
                                          4.2
                                       </span>
                                    </div>
                                    <div className='flex justify-between'>
                                       <span className='text-sm text-gray-600'>
                                          Bed Turnover Rate
                                       </span>
                                       <span className='font-semibold'>
                                          1.8 days
                                       </span>
                                    </div>
                                    <div className='flex justify-between'>
                                       <span className='text-sm text-gray-600'>
                                          Staff Productivity
                                       </span>
                                       <span className='font-semibold'>
                                          {formatPercentage(
                                             operationalMetrics.staffUtilization
                                          )}
                                       </span>
                                    </div>
                                    <div className='flex justify-between'>
                                       <span className='text-sm text-gray-600'>
                                          Equipment Uptime
                                       </span>
                                       <span className='font-semibold'>
                                          98.7%
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  </TabsContent>

                  <TabsContent value='quality' className='space-y-6'>
                     <Card>
                        <CardHeader>
                           <CardTitle className='flex items-center justify-between'>
                              <span>Quality & Safety Metrics</span>
                              <Button
                                 variant='outline'
                                 size='sm'
                                 onClick={() =>
                                    handleExportReport('Quality Metrics')
                                 }
                              >
                                 <Download className='mr-1 h-4 w-4' />
                                 Export
                              </Button>
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                              <div className='space-y-4'>
                                 <h4 className='font-medium text-gray-900'>
                                    Patient Safety
                                 </h4>
                                 <div className='space-y-3'>
                                    <div className='flex justify-between'>
                                       <span className='text-sm text-gray-600'>
                                          Medication Errors
                                       </span>
                                       <span className='font-semibold text-green-600'>
                                          0.02%
                                       </span>
                                    </div>
                                    <div className='flex justify-between'>
                                       <span className='text-sm text-gray-600'>
                                          Hospital Infections
                                       </span>
                                       <span className='font-semibold text-green-600'>
                                          0.8%
                                       </span>
                                    </div>
                                    <div className='flex justify-between'>
                                       <span className='text-sm text-gray-600'>
                                          Patient Falls
                                       </span>
                                       <span className='font-semibold text-green-600'>
                                          0.1%
                                       </span>
                                    </div>
                                    <div className='flex justify-between'>
                                       <span className='text-sm text-gray-600'>
                                          Readmission Rate
                                       </span>
                                       <span className='font-semibold text-yellow-600'>
                                          8.5%
                                       </span>
                                    </div>
                                 </div>
                              </div>

                              <div className='space-y-4'>
                                 <h4 className='font-medium text-gray-900'>
                                    Patient Experience
                                 </h4>
                                 <div className='space-y-3'>
                                    <div className='flex justify-between'>
                                       <span className='text-sm text-gray-600'>
                                          Overall Satisfaction
                                       </span>
                                       <span className='font-semibold text-green-600'>
                                          {formatPercentage(
                                             operationalMetrics.patientSatisfaction
                                          )}
                                       </span>
                                    </div>
                                    <div className='flex justify-between'>
                                       <span className='text-sm text-gray-600'>
                                          Communication Rating
                                       </span>
                                       <span className='font-semibold text-green-600'>
                                          4.6/5
                                       </span>
                                    </div>
                                    <div className='flex justify-between'>
                                       <span className='text-sm text-gray-600'>
                                          Cleanliness Rating
                                       </span>
                                       <span className='font-semibold text-green-600'>
                                          4.8/5
                                       </span>
                                    </div>
                                    <div className='flex justify-between'>
                                       <span className='text-sm text-gray-600'>
                                          Would Recommend
                                       </span>
                                       <span className='font-semibold text-green-600'>
                                          91%
                                       </span>
                                    </div>
                                 </div>
                              </div>
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

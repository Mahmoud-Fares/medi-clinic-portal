import { lazy } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import ErrorBoundary from '@/shared/components/error-boundary';

import MainLayout from './layouts/main-layout';

const LoginPage = lazy(() => import('@/app/pages/login'));

const Home = lazy(() => import('@/app/pages/home'));
const DashboardPage = lazy(() => import('@/app/pages/dashboard'));
const ProfilePage = lazy(() => import('@/app/pages/profile'));
const SettingsPage = lazy(() => import('@/app/pages/settings'));

const AppointmentsPage = lazy(() => import('@/app/pages/appointments'));
const AppointmentDetailPage = lazy(
   () => import('@/app/pages/appointments/appointment-details')
);
const AppointmentCalendarPage = lazy(
   () => import('@/app/pages/appointments/calendar')
);
const NewAppointmentPage = lazy(() => import('@/app/pages/appointments/new'));
const AppointmentSchedulePage = lazy(
   () => import('@/app/pages/appointments/schedule')
);

const BillingPage = lazy(() => import('@/app/pages/billing'));
const InsuranceClaimsPage = lazy(() => import('@/app/pages/billing/insurance'));
const PaymentsPage = lazy(() => import('@/app/pages/billing/payments'));
const FinancialReportsPage = lazy(() => import('@/app/pages/billing/reports'));

const EmergencyPage = lazy(() => import('@/app/pages/emergency'));
const AmbulanceTrackingPage = lazy(
   () => import('@/app/pages/emergency/ambulance')
);
const EmergencyCenterPage = lazy(() => import('@/app/pages/emergency/center'));

const HospitalManagementPage = lazy(() => import('@/app/pages/hospital'));
const HospitalBedsPage = lazy(() => import('@/app/pages/hospital/beds'));
const HospitalDepartmentsPage = lazy(
   () => import('@/app/pages/hospital/departments')
);
const DepartmentDetailPage = lazy(
   () => import('@/app/pages/hospital/departments')
);
const DepartmentEditPage = lazy(
   () => import('@/app/pages/hospital/departments')
);
const HospitalFacilitiesPage = lazy(
   () => import('@/app/pages/hospital/facilities')
);
const HospitalStaffPage = lazy(() => import('@/app/pages/hospital/staff'));
const StaffDetailPage = lazy(
   () => import('@/app/pages/hospital/staff/staff-details')
);
const StaffSchedulePage = lazy(
   () => import('@/app/pages/hospital/staff/schedule')
);

const PatientsPage = lazy(() => import('@/app/pages/patients'));
const MedicalRecordsPage = lazy(() => import('@/app/pages/patients/records'));
const PatientSearchPage = lazy(() => import('@/app/pages/patients/search'));

const PrescriptionsPage = lazy(() => import('@/app/pages/prescriptions'));
const CreatePrescriptionPage = lazy(
   () => import('@/app/pages/prescriptions/create')
);
const PharmacyInventoryPage = lazy(
   () => import('@/app/pages/prescriptions/inventory')
);
const PrescriptionQueuePage = lazy(
   () => import('@/app/pages/prescriptions/queue')
);

const ClinicalReportsPage = lazy(() => import('@/app/pages/reports/clinical'));
const OperationalReportsPage = lazy(
   () => import('@/app/pages/reports/operational')
);

const TelemedicinePage = lazy(() => import('@/app/pages/telemedicine'));
const ConsultationsPage = lazy(() => import('@/app/pages/consultations'));

const NotFound = lazy(() => import('@/app/pages/not-found'));

export const router = createBrowserRouter([
   {
      path: '/',
      element: <MainLayout />,
      errorElement: <ErrorBoundary />,
      children: [
         {
            index: true,
            element: <Home />,
         },
         {
            path: 'dashboard',
            element: <DashboardPage />,
         },
         {
            path: 'profile',
            element: <ProfilePage />,
         },
         {
            path: 'settings',
            element: <SettingsPage />,
         },

         {
            path: 'appointments',
            children: [
               {
                  index: true,
                  element: <AppointmentsPage />,
               },
               {
                  path: ':id',
                  element: <AppointmentDetailPage />,
               },
               {
                  path: 'calendar',
                  element: <AppointmentCalendarPage />,
               },
               {
                  path: 'new',
                  element: <NewAppointmentPage />,
               },
               {
                  path: 'schedule',
                  element: <AppointmentSchedulePage />,
               },
            ],
         },

         {
            path: 'billing',
            children: [
               {
                  index: true,
                  element: <BillingPage />,
               },
               {
                  path: 'insurance',
                  element: <InsuranceClaimsPage />,
               },
               {
                  path: 'payments',
                  element: <PaymentsPage />,
               },
               {
                  path: 'reports',
                  element: <FinancialReportsPage />,
               },
            ],
         },

         {
            path: 'emergency',
            children: [
               {
                  index: true,
                  element: <EmergencyPage />,
               },
               {
                  path: 'ambulance',
                  element: <AmbulanceTrackingPage />,
               },
               {
                  path: 'center',
                  element: <EmergencyCenterPage />,
               },
            ],
         },

         {
            path: 'hospital',
            children: [
               {
                  index: true,
                  element: <HospitalManagementPage />,
               },
               {
                  path: 'beds',
                  element: <HospitalBedsPage />,
               },
               {
                  path: 'departments',
                  children: [
                     {
                        index: true,
                        element: <HospitalDepartmentsPage />,
                     },
                     {
                        path: ':id',
                        element: <DepartmentDetailPage />,
                     },
                     {
                        path: ':id/edit',
                        element: <DepartmentEditPage />,
                     },
                  ],
               },
               {
                  path: 'facilities',
                  element: <HospitalFacilitiesPage />,
               },
               {
                  path: 'staff',
                  children: [
                     {
                        index: true,
                        element: <HospitalStaffPage />,
                     },
                     {
                        path: ':id',
                        element: <StaffDetailPage />,
                     },
                     {
                        path: 'schedule',
                        element: <StaffSchedulePage />,
                     },
                  ],
               },
            ],
         },

         {
            path: 'patients',
            children: [
               {
                  index: true,
                  element: <PatientsPage />,
               },
               {
                  path: 'records',
                  element: <MedicalRecordsPage />,
               },
               {
                  path: 'search',
                  element: <PatientSearchPage />,
               },
            ],
         },
         {
            path: 'prescriptions',
            children: [
               {
                  index: true,
                  element: <PrescriptionsPage />,
               },
               {
                  path: 'create',
                  element: <CreatePrescriptionPage />,
               },
               {
                  path: 'inventory',
                  element: <PharmacyInventoryPage />,
               },
               {
                  path: 'queue',
                  element: <PrescriptionQueuePage />,
               },
            ],
         },

         {
            path: 'reports',
            children: [
               {
                  path: 'clinical',
                  element: <ClinicalReportsPage />,
               },
               {
                  path: 'operational',
                  element: <OperationalReportsPage />,
               },
            ],
         },

         {
            path: 'telemedicine',
            children: [
               {
                  index: true,
                  element: <TelemedicinePage />,
               },
               {
                  path: 'consultations',
                  element: <ConsultationsPage />,
               },
            ],
         },

         {
            path: 'login',
            element: <LoginPage />,
         },
         {
            path: '*',
            element: <NotFound />,
         },
      ],
   },
   // Auth routes group
   // {
   //    path: '/',
   //    element: <AuthLayout />,
   //    errorElement: <ErrorBoundary />,
   //    children: [
   // {
   //    path: 'login',
   //    element: <LoginPage />,
   // },
   //    ],
   // },
]);

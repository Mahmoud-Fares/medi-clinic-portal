import { create } from 'zustand';

import {
   Appointment,
   EmergencyAlert,
   Notification,
   User,
} from '@/shared/types';

interface AuthState {
   user: User | null;
   isAuthenticated: boolean;
   isLoading: boolean;
   setUser: (user: User | null) => void;
   setLoading: (loading: boolean) => void;
   logout: () => void;
}

interface AppState {
   notifications: Notification[];
   appointments: Appointment[];
   emergencyAlerts: EmergencyAlert[];
   addNotification: (notification: Notification) => void;
   markNotificationRead: (id: string) => void;
   addEmergencyAlert: (alert: EmergencyAlert) => void;
   updateEmergencyAlert: (id: string, updates: Partial<EmergencyAlert>) => void;
}

// Auth Store
export const useAuthStore = create<AuthState>((set) => ({
   user: null,
   isAuthenticated: false,
   isLoading: false,
   setUser: (user) => {
      console.log('🏪 Store: Setting user:', user?.role);
      set({ user, isAuthenticated: !!user });
   },
   setLoading: (isLoading) => set({ isLoading }),
   logout: () => {
      console.log('🏪 Store: Logging out');
      set({ user: null, isAuthenticated: false });
   },
}));

// App Store
export const useAppStore = create<AppState>((set) => ({
   notifications: [],
   appointments: [],
   emergencyAlerts: [],

   addNotification: (notification) => {
      console.log('🔔 Store: Adding notification:', notification.type);
      set((state) => ({
         notifications: [notification, ...state.notifications],
      }));
   },

   markNotificationRead: (id) => {
      console.log('📖 Store: Marking notification read:', id);
      set((state) => ({
         notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
         ),
      }));
   },

   addEmergencyAlert: (alert) => {
      console.log('🚨 Store: Adding emergency alert:', alert.type);
      set((state) => ({
         emergencyAlerts: [alert, ...state.emergencyAlerts],
      }));
   },

   updateEmergencyAlert: (id, updates) => {
      console.log('🚨 Store: Updating emergency alert:', id, updates.status);
      set((state) => ({
         emergencyAlerts: state.emergencyAlerts.map((alert) =>
            alert.id === id ? { ...alert, ...updates } : alert
         ),
      }));
   },
}));

// Mock data generators for development
export const generateMockNotifications = (): Notification[] => [
   {
      id: '1',
      userId: 'current_user',
      type: 'appointment',
      title: 'Appointment Reminder',
      message: 'You have an appointment with Dr. Smith tomorrow at 2:00 PM',
      priority: 'medium',
      read: false,
      actionRequired: false,
      createdAt: new Date(),
   },
   {
      id: '2',
      userId: 'current_user',
      type: 'prescription',
      title: 'Prescription Ready',
      message: 'Your prescription for Amoxicillin is ready for pickup',
      priority: 'low',
      read: false,
      actionRequired: true,
      actionUrl: '/prescriptions',
      createdAt: new Date(Date.now() - 3600000), // 1 hour ago
   },
   {
      id: '3',
      userId: 'current_user',
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance tonight from 11 PM to 1 AM',
      priority: 'medium',
      read: true,
      actionRequired: false,
      createdAt: new Date(Date.now() - 86400000), // 24 hours ago
   },
];

export const generateMockAppointments = (): Appointment[] => [
   {
      id: 'apt_1',
      patientId: 'patient_1',
      doctorId: 'doctor_1',
      hospitalId: 'hospital_1',
      type: 'in-person',
      status: 'scheduled',
      scheduledTime: new Date(Date.now() + 86400000), // Tomorrow
      duration: 30,
      reason: 'Annual checkup',
      followUpRequired: false,
      createdAt: new Date(),
      updatedAt: new Date(),
   },
   {
      id: 'apt_2',
      patientId: 'patient_1',
      doctorId: 'doctor_2',
      hospitalId: 'hospital_1',
      type: 'video',
      status: 'scheduled',
      scheduledTime: new Date(Date.now() + 172800000), // Day after tomorrow
      duration: 45,
      reason: 'Follow-up consultation',
      followUpRequired: true,
      createdAt: new Date(),
      updatedAt: new Date(),
   },
];

// Core Types for Multi Hospital Medical System

export type UserRole =
   | 'patient'
   | 'doctor'
   | 'admin'
   | 'pharmacy'
   | 'accountant';

export type AppointmentStatus =
   | 'scheduled'
   | 'in-progress'
   | 'completed'
   | 'cancelled'
   | 'no-show';
export type AppointmentType = 'in-person' | 'video' | 'phone';

export type PrescriptionStatus =
   | 'active'
   | 'completed'
   | 'cancelled'
   | 'expired';
export type EmergencyStatus =
   | 'active'
   | 'dispatched'
   | 'on-scene'
   | 'resolved'
   | 'cancelled';

export type BedStatus = 'available' | 'occupied' | 'maintenance' | 'cleaning';
export type BedType = 'general' | 'icu' | 'emergency' | 'surgery' | 'pediatric';

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PaymentMethod = 'cash' | 'card' | 'insurance' | 'transfer';

// User Management
export interface User {
   id: string;
   email: string;
   role: UserRole;
   profile: UserProfile;
   permissions: Permission[];
   isActive: boolean;
   createdAt: Date;
   updatedAt: Date;
   lastLoginAt?: Date;
   tenantId: string; // Multi-hospital support
}

export interface UserProfile {
   firstName: string;
   lastName: string;
   phone: string;
   avatar?: string;
   address: Address;
   dateOfBirth?: Date;
   gender?: 'male' | 'female' | 'other';
   emergencyContact?: EmergencyContact;
}

export interface Permission {
   id: string;
   resource: string;
   action: string;
   conditions?: string[];
   expiresAt?: Date;
}

export interface Address {
   street: string;
   city: string;
   state: string;
   zipCode: string;
   country: string;
}

export interface EmergencyContact {
   name: string;
   relationship: string;
   phone: string;
   email?: string;
}

// Patient Management
export interface Patient extends User {
   role: 'patient';
   medicalRecordNumber: string;
   insurance: InsuranceInfo[];
   medicalHistory: MedicalHistory;
   allergies: Allergy[];
   currentMedications: Medication[];
   vitalSigns: VitalSigns[];
}

export interface InsuranceInfo {
   id: string;
   provider: string;
   policyNumber: string;
   groupNumber?: string;
   subscriberId: string;
   relationship: 'self' | 'spouse' | 'child' | 'other';
   effectiveDate: Date;
   expirationDate?: Date;
   isPrimary: boolean;
}

export interface MedicalHistory {
   conditions: MedicalCondition[];
   procedures: MedicalProcedure[];
   familyHistory: FamilyHistory[];
   socialHistory: SocialHistory;
   labResults: LabResult[];
}

export interface MedicalCondition {
   id: string;
   name: string;
   icd10Code: string;
   diagnosedDate: Date;
   status: 'active' | 'resolved' | 'chronic';
   severity?: 'mild' | 'moderate' | 'severe';
   notes?: string;
}

export interface MedicalProcedure {
   id: string;
   name: string;
   cptCode: string;
   performedDate: Date;
   provider: string;
   notes?: string;
}

export interface FamilyHistory {
   relationship: string;
   condition: string;
   ageOfOnset?: number;
}

export interface SocialHistory {
   smokingStatus: 'never' | 'former' | 'current';
   alcoholUse: 'none' | 'occasional' | 'moderate' | 'heavy';
   exerciseFrequency: 'none' | 'low' | 'moderate' | 'high';
   occupation?: string;
}

export interface Allergy {
   id: string;
   allergen: string;
   reaction: string;
   severity: 'mild' | 'moderate' | 'severe';
   onsetDate?: Date;
}

export interface VitalSigns {
   id: string;
   recordedAt: Date;
   bloodPressureSystolic?: number;
   bloodPressureDiastolic?: number;
   heartRate?: number;
   temperature?: number;
   respiratoryRate?: number;
   oxygenSaturation?: number;
   weight?: number;
   height?: number;
   bmi?: number;
}

export interface LabResult {
   id: string;
   testName: string;
   value: string;
   unit: string;
   referenceRange: string;
   status: 'normal' | 'abnormal' | 'critical';
   orderedDate: Date;
   collectedDate: Date;
   resultDate: Date;
   orderingProvider: string;
}

// Doctor/Provider Management
export interface Doctor extends User {
   role: 'doctor';
   licenseNumber: string;
   npiNumber: string;
   specialties: Specialty[];
   departments: Department[];
   schedule: Schedule;
   credentials: Credential[];
   availabilityStatus: 'available' | 'busy' | 'offline' | 'emergency';
}

export interface Specialty {
   id: string;
   name: string;
   description?: string;
   certificationRequired: boolean;
}

export interface Department {
   id: string;
   name: string;
   hospitalId: string;
   headOfDepartment?: string;
   location: string;
}

export interface Schedule {
   id: string;
   doctorId: string;
   workingHours: WorkingHours[];
   breaks: Break[];
   timeOffRequests: TimeOffRequest[];
   availableSlots: TimeSlot[];
   bookedSlots: TimeSlot[];
}

export interface WorkingHours {
   dayOfWeek: number; // 0-6 (Sunday-Saturday)
   startTime: string; // HH:mm format
   endTime: string;
   isActive: boolean;
}

export interface Break {
   startTime: string;
   endTime: string;
   description: string;
}

export interface TimeOffRequest {
   id: string;
   startDate: Date;
   endDate: Date;
   reason: string;
   status: 'pending' | 'approved' | 'denied';
}

export interface TimeSlot {
   id: string;
   startTime: Date;
   endTime: Date;
   isAvailable: boolean;
   appointmentId?: string;
   type: 'regular' | 'emergency' | 'break';
}

export interface Credential {
   id: string;
   type: 'license' | 'certification' | 'degree';
   name: string;
   issuingOrganization: string;
   issueDate: Date;
   expirationDate?: Date;
   verificationStatus: 'verified' | 'pending' | 'expired';
}

// Appointment Management
export interface Appointment {
   id: string;
   patientId: string;
   doctorId: string;
   hospitalId: string;
   type: AppointmentType;
   status: AppointmentStatus;
   scheduledTime: Date;
   duration: number; // in minutes
   reason: string;
   notes?: string;
   chiefComplaint?: string;
   roomNumber?: string;
   consultation?: ConsultationRecord;
   followUpRequired: boolean;
   createdAt: Date;
   updatedAt: Date;
}

export interface ConsultationRecord {
   id: string;
   appointmentId: string;
   startTime: Date;
   endTime?: Date;
   assessment: string;
   treatmentPlan: string;
   prescriptions: Prescription[];
   followUpInstructions?: string;
   nextAppointmentDate?: Date;
   recordingUrl?: string;
   attachments: Attachment[];
}

export interface Attachment {
   id: string;
   fileName: string;
   fileUrl: string;
   fileType: string;
   uploadedAt: Date;
   uploadedBy: string;
}

// Prescription Management
export interface Prescription {
   id: string;
   patientId: string;
   doctorId: string;
   pharmacyId?: string;
   medication: Medication;
   dosage: Dosage;
   quantity: number;
   refills: number;
   refillsRemaining: number;
   status: PrescriptionStatus;
   prescribedDate: Date;
   expirationDate: Date;
   instructions: string;
   notes?: string;
   interactions: DrugInteraction[];
}

export interface Medication {
   id: string;
   name: string;
   genericName: string;
   brandName?: string;
   ndcNumber: string;
   strength: string;
   form: 'tablet' | 'capsule' | 'liquid' | 'injection' | 'cream' | 'other';
   routeOfAdministration: string;
   contraindications: string[];
   sideEffects: string[];
   warnings: string[];
}

export interface Dosage {
   amount: number;
   unit: string;
   frequency: string;
   duration?: string;
   route: string;
}

export interface DrugInteraction {
   interactingDrug: string;
   severity: 'minor' | 'moderate' | 'major';
   description: string;
   recommendation: string;
}

// Pharmacy Management
export interface Pharmacy {
   id: string;
   name: string;
   address: Address;
   phone: string;
   email: string;
   licenseNumber: string;
   operatingHours: WorkingHours[];
   inventory: MedicationInventory[];
   prescriptionQueue: PrescriptionOrder[];
}

export interface MedicationInventory {
   medicationId: string;
   quantity: number;
   expirationDate: Date;
   batchNumber: string;
   cost: number;
   reorderLevel: number;
   isControlledSubstance: boolean;
   lastUpdated: Date;
}

export interface PrescriptionOrder {
   id: string;
   prescriptionId: string;
   status: 'received' | 'processing' | 'ready' | 'dispensed' | 'delivered';
   receivedAt: Date;
   processedAt?: Date;
   readyAt?: Date;
   dispensedAt?: Date;
   pharmacistId: string;
   notes?: string;
}

// Emergency Management
export interface EmergencyAlert {
   id: string;
   patientId: string;
   type: 'medical' | 'trauma' | 'cardiac' | 'respiratory' | 'other';
   severity: 'low' | 'medium' | 'high' | 'critical';
   location: Location;
   timestamp: Date;
   status: EmergencyStatus;
   description: string;
   respondersNotified: string[];
   response?: EmergencyResponse;
   resolvedAt?: Date;
}

export interface Location {
   latitude: number;
   longitude: number;
   address?: string;
   floor?: string;
   room?: string;
   landmark?: string;
}

export interface EmergencyResponse {
   id: string;
   alertId: string;
   ambulanceId?: string;
   dispatchTime: Date;
   arrivalTime?: Date;
   responseTime?: number; // in minutes
   crew: CrewMember[];
   equipment: Equipment[];
   treatmentProvided: string[];
   hospitalDestination?: string;
   patientCondition: string;
}

export interface Ambulance {
   id: string;
   vehicleNumber: string;
   currentLocation: Location;
   status:
      | 'available'
      | 'dispatched'
      | 'on-scene'
      | 'transporting'
      | 'at-hospital'
      | 'out-of-service';
   crew: CrewMember[];
   equipment: Equipment[];
   lastMaintenance: Date;
   nextMaintenance: Date;
}

export interface CrewMember {
   id: string;
   name: string;
   role: 'paramedic' | 'emt' | 'driver' | 'supervisor';
   licenseNumber: string;
   certificationLevel: string;
   experience: number; // years
}

export interface Equipment {
   id: string;
   name: string;
   type: string;
   status: 'available' | 'in-use' | 'maintenance' | 'defective';
   lastChecked: Date;
   nextMaintenance: Date;
}

// Hospital Administration
export interface Hospital {
   id: string;
   name: string;
   address: Address;
   phone: string;
   email: string;
   website?: string;
   licenseNumber: string;
   accreditation: Accreditation[];
   facilities: Facility[];
   departments: Department[];
   beds: Bed[];
   staff: Staff[];
   operatingHours: WorkingHours[];
}

export interface Accreditation {
   organization: string;
   type: string;
   issueDate: Date;
   expirationDate: Date;
   status: 'active' | 'expired' | 'suspended';
}

export interface Facility {
   id: string;
   name: string;
   type: 'building' | 'wing' | 'floor' | 'room';
   capacity?: number;
   equipment: Equipment[];
   accessibility: string[];
}

export interface Bed {
   id: string;
   roomNumber: string;
   bedNumber: string;
   type: BedType;
   status: BedStatus;
   department: string;
   patientId?: string;
   equipment: Equipment[];
   lastCleaned?: Date;
   nextMaintenance?: Date;
}

export interface Staff {
   id: string;
   userId: string;
   employeeId: string;
   department: string;
   position: string;
   hireDate: Date;
   employment: 'full-time' | 'part-time' | 'contract' | 'per-diem';
   supervisor?: string;
   permissions: Permission[];
}

// Financial Management
export interface Bill {
   id: string;
   patientId: string;
   hospitalId: string;
   billNumber: string;
   items: BillItem[];
   totalAmount: number;
   paidAmount: number;
   balanceAmount: number;
   status: 'draft' | 'sent' | 'partial' | 'paid' | 'overdue' | 'cancelled';
   issueDate: Date;
   dueDate: Date;
   payments: Payment[];
   insuranceClaims: InsuranceClaim[];
}

export interface BillItem {
   id: string;
   description: string;
   code: string; // CPT, HCPCS, or other billing code
   quantity: number;
   unitPrice: number;
   totalPrice: number;
   category:
      | 'consultation'
      | 'procedure'
      | 'medication'
      | 'test'
      | 'room'
      | 'other';
}

export interface Payment {
   id: string;
   billId: string;
   amount: number;
   method: PaymentMethod;
   status: PaymentStatus;
   transactionDate: Date;
   transactionId?: string;
   reference?: string;
   processedBy: string;
}

export interface InsuranceClaim {
   id: string;
   billId: string;
   insuranceId: string;
   claimNumber: string;
   submittedDate: Date;
   amount: number;
   status: 'submitted' | 'processing' | 'approved' | 'denied' | 'appealed';
   approvedAmount?: number;
   denialReason?: string;
   paidDate?: Date;
}

// Telemedicine
export interface VideoConsultation {
   id: string;
   appointmentId: string;
   sessionId: string;
   participants: Participant[];
   status: 'waiting' | 'active' | 'ended' | 'cancelled';
   startTime: Date;
   endTime?: Date;
   duration?: number; // in minutes
   recordingUrl?: string;
   recordingEnabled: boolean;
   chatMessages: ChatMessage[];
   sharedFiles: Attachment[];
   roomSettings: RoomSettings;
}

export interface Participant {
   userId: string;
   name: string;
   role: UserRole;
   joinedAt: Date;
   leftAt?: Date;
   isHost: boolean;
   hasVideo: boolean;
   hasAudio: boolean;
   isScreenSharing: boolean;
}

export interface ChatMessage {
   id: string;
   senderId: string;
   senderName: string;
   message: string;
   timestamp: Date;
   type: 'text' | 'file' | 'system';
   fileUrl?: string;
}

export interface RoomSettings {
   waitingRoomEnabled: boolean;
   recordingEnabled: boolean;
   chatEnabled: boolean;
   fileShareEnabled: boolean;
   screenShareEnabled: boolean;
   maxParticipants: number;
   autoAdmit: boolean;
}

// Audit and Compliance
export interface AuditLog {
   id: string;
   userId: string;
   userName: string;
   action: string;
   resource: string;
   resourceId?: string;
   timestamp: Date;
   ipAddress: string;
   userAgent: string;
   outcome: 'success' | 'failure';
   details: Record<string, any>;
   severity: 'low' | 'medium' | 'high' | 'critical';
}

// API Response Types
export interface ApiResponse<T> {
   success: boolean;
   data?: T;
   error?: string;
   message?: string;
   pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
   };
}

// Search and Filter Types
export interface SearchFilters {
   query?: string;
   category?: string;
   dateRange?: DateRange;
   status?: string;
   department?: string;
   provider?: string;
   specialty?: string;
   location?: string;
}

export interface DateRange {
   start: Date;
   end: Date;
}

// Notification Types
export interface Notification {
   id: string;
   userId: string;
   type: 'appointment' | 'prescription' | 'emergency' | 'system' | 'reminder';
   title: string;
   message: string;
   priority: 'low' | 'medium' | 'high' | 'urgent';
   read: boolean;
   actionRequired: boolean;
   actionUrl?: string;
   createdAt: Date;
   expiresAt?: Date;
}

// Dashboard and Analytics Types
export interface DashboardMetrics {
   totalPatients: number;
   totalAppointments: number;
   completedAppointments: number;
   cancelledAppointments: number;
   pendingPrescriptions: number;
   activeEmergencies: number;
   availableBeds: number;
   revenue: number;
   trends: Record<string, number[]>;
}

export interface ChartData {
   labels: string[];
   datasets: {
      label: string;
      data: number[];
      backgroundColor?: string;
      borderColor?: string;
   }[];
}

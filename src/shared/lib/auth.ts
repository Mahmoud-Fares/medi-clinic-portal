import { User, UserRole } from '@/shared/types';

// Mock authentication service - In production, this would connect to your auth provider
export class AuthService {
   private static instance: AuthService;
   private currentUser: User | null = null;

   private constructor() {}

   static getInstance(): AuthService {
      if (!AuthService.instance) {
         AuthService.instance = new AuthService();
      }
      return AuthService.instance;
   }

   async login(
      email: string,
      password: string
   ): Promise<{ user: User; token: string }> {
      console.log('🔐 AuthService: Attempting login for:', email);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user data based on email pattern
      const mockUser = this.createMockUser(email);
      this.currentUser = mockUser;

      // Generate mock JWT token
      const token = this.generateMockToken(mockUser);

      console.log(
         '✅ AuthService: Login successful for:',
         mockUser.role,
         mockUser.profile.firstName
      );

      return { user: mockUser, token };
   }

   async logout(): Promise<void> {
      console.log('🚪 AuthService: Logging out user');
      this.currentUser = null;
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
   }

   async getCurrentUser(): Promise<User | null> {
      if (this.currentUser) return this.currentUser;

      // Try to restore from localStorage
      const storedUser = localStorage.getItem('auth_user');
      const storedToken = localStorage.getItem('auth_token');

      if (storedUser && storedToken) {
         try {
            const parsedUser = JSON.parse(storedUser);

            // Convert date strings back to Date objects
            if (parsedUser.createdAt) {
               parsedUser.createdAt = new Date(parsedUser.createdAt);
            }
            if (parsedUser.updatedAt) {
               parsedUser.updatedAt = new Date(parsedUser.updatedAt);
            }
            if (parsedUser.lastLoginAt) {
               parsedUser.lastLoginAt = new Date(parsedUser.lastLoginAt);
            }

            this.currentUser = parsedUser;
            console.log(
               '🔄 AuthService: Restored user from storage:',
               this.currentUser?.role
            );
            return this.currentUser;
         } catch (error) {
            console.error('❌ AuthService: Error parsing stored user:', error);
            this.logout();
         }
      }

      return null;
   }

   async validateToken(token: string): Promise<boolean> {
      console.log('🔍 AuthService: Validating token');
      // In production, validate JWT token with your auth server
      return token.startsWith('mock_token_');
   }

   private createMockUser(email: string): User {
      const [username] = email.split('@');
      let role: UserRole = 'patient';

      // Determine role based on email pattern
      if (email.includes('doctor') || email.includes('dr.')) role = 'doctor';
      else if (email.includes('admin')) role = 'admin';
      else if (email.includes('pharmacy')) role = 'pharmacy';
      else if (email.includes('accountant')) role = 'accountant';

      const firstName = username.charAt(0).toUpperCase() + username.slice(1);

      return {
         id: `user_${Date.now()}`,
         email,
         role,
         profile: {
            firstName,
            lastName: role === 'doctor' ? 'Smith' : 'Johnson',
            phone: '+1-555-0123',
            avatar: `https://images.unsplash.com/photo-${role === 'doctor' ? '1559839734-2b71ea197ec2' : '1472099645785-5658abf4ff4e'}?w=150&h=150&fit=crop&crop=face`,
            address: {
               street: '123 Medical Center Dr',
               city: 'Healthcare City',
               state: 'CA',
               zipCode: '90210',
               country: 'US',
            },
         },
         permissions: this.getDefaultPermissions(role),
         isActive: true,
         createdAt: new Date(),
         updatedAt: new Date(),
         tenantId: 'hospital_main',
      };
   }

   private generateMockToken(user: User): string {
      const token = `mock_token_${user.id}_${Date.now()}`;
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
      return token;
   }

   private getDefaultPermissions(role: UserRole) {
      const permissions = {
         patient: [
            { id: '1', resource: 'appointments', action: 'read' },
            { id: '2', resource: 'appointments', action: 'create' },
            { id: '3', resource: 'medical-records', action: 'read' },
            { id: '4', resource: 'prescriptions', action: 'read' },
            { id: '5', resource: 'billing', action: 'read' },
         ],
         doctor: [
            { id: '1', resource: 'patients', action: 'read' },
            { id: '2', resource: 'appointments', action: 'manage' },
            { id: '3', resource: 'medical-records', action: 'manage' },
            { id: '4', resource: 'prescriptions', action: 'create' },
            { id: '5', resource: 'consultations', action: 'manage' },
         ],
         admin: [{ id: '1', resource: '*', action: 'manage' }],
         pharmacy: [
            { id: '1', resource: 'prescriptions', action: 'manage' },
            { id: '2', resource: 'inventory', action: 'manage' },
            { id: '3', resource: 'patients', action: 'read' },
         ],
         accountant: [
            { id: '1', resource: 'billing', action: 'manage' },
            { id: '2', resource: 'payments', action: 'manage' },
            { id: '3', resource: 'insurance', action: 'manage' },
            { id: '4', resource: 'reports', action: 'read' },
         ],
      };

      return permissions[role] || [];
   }

   hasPermission(resource: string, action: string): boolean {
      if (!this.currentUser) return false;

      return this.currentUser.permissions.some(
         (permission) =>
            (permission.resource === '*' || permission.resource === resource) &&
            (permission.action === 'manage' || permission.action === action)
      );
   }
}

export const authService = AuthService.getInstance();

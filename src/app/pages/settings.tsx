import { useEffect, useState } from 'react';

import {
   Bell,
   Camera,
   Eye,
   EyeOff,
   Lock,
   Save,
   Shield,
   User,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from '@/shared/components/ui/avatar';
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
import { Switch } from '@/shared/components/ui/switch';
import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from '@/shared/components/ui/tabs';
import { useAuthStore } from '@/shared/lib/store';

import { Header } from '@/app/layouts/components/header';
import { Sidebar } from '@/app/layouts/components/sidebar';

export default function SettingsPage() {
   const { user, isAuthenticated, setUser } = useAuthStore();
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const navigate = useNavigate();

   // Form states
   const [profileData, setProfileData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: {
         street: '',
         city: '',
         state: '',
         zipCode: '',
         country: '',
      },
   });

   const [notificationSettings, setNotificationSettings] = useState({
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      appointmentReminders: true,
      prescriptionAlerts: true,
      emergencyAlerts: true,
      marketingEmails: false,
   });

   const [securitySettings, setSecuritySettings] = useState({
      twoFactorEnabled: false,
      sessionTimeout: '30',
      loginAlerts: true,
   });

   const [passwordData, setPasswordData] = useState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
   });

   useEffect(() => {
      if (!isAuthenticated || !user) {
         navigate('/');
         return;
      }

      // Initialize form data with user data
      setProfileData({
         firstName: user.profile.firstName,
         lastName: user.profile.lastName,
         email: user.email,
         phone: user.profile.phone,
         address: user.profile.address,
      });
   }, [isAuthenticated, user, navigate]);

   if (!isAuthenticated || !user) {
      return null;
   }

   const handleProfileSave = async () => {
      setIsLoading(true);
      try {
         // Simulate API call
         await new Promise((resolve) => setTimeout(resolve, 1000));

         // Update user in store
         const updatedUser = {
            ...user,
            email: profileData.email,
            profile: {
               ...user.profile,
               firstName: profileData.firstName,
               lastName: profileData.lastName,
               phone: profileData.phone,
               address: profileData.address,
            },
         };

         setUser(updatedUser);
         alert('Profile updated successfully!');
      } catch (error) {
         alert('Failed to update profile. Please try again.');
      } finally {
         setIsLoading(false);
      }
   };

   const handlePasswordChange = async () => {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
         alert('New passwords do not match!');
         return;
      }

      if (passwordData.newPassword.length < 8) {
         alert('Password must be at least 8 characters long!');
         return;
      }

      setIsLoading(true);
      try {
         // Simulate API call
         await new Promise((resolve) => setTimeout(resolve, 1000));

         setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
         });

         alert('Password changed successfully!');
      } catch (error) {
         alert('Failed to change password. Please try again.');
      } finally {
         setIsLoading(false);
      }
   };

   const handleNotificationSave = async () => {
      setIsLoading(true);
      try {
         // Simulate API call
         await new Promise((resolve) => setTimeout(resolve, 1000));
         alert('Notification preferences saved!');
      } catch (error) {
         alert('Failed to save preferences. Please try again.');
      } finally {
         setIsLoading(false);
      }
   };

   const handleSecuritySave = async () => {
      setIsLoading(true);
      try {
         // Simulate API call
         await new Promise((resolve) => setTimeout(resolve, 1000));
         alert('Security settings saved!');
      } catch (error) {
         alert('Failed to save security settings. Please try again.');
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className='flex min-h-screen bg-gray-50'>
         <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

         <div className='w-full'>
            <Header onMenuClick={() => setSidebarOpen(true)} />

            <main className='space-y-6 p-6'>
               {/* Page Header */}
               <div>
                  <h1 className='font-inter text-2xl font-bold text-gray-900'>
                     Settings
                  </h1>
                  <p className='mt-1 text-gray-600'>
                     Manage your account settings and preferences
                  </p>
               </div>

               <Tabs defaultValue='profile' className='space-y-6'>
                  <TabsList className='grid w-full max-w-2xl grid-cols-4'>
                     <TabsTrigger value='profile'>Profile</TabsTrigger>
                     <TabsTrigger value='notifications'>
                        Notifications
                     </TabsTrigger>
                     <TabsTrigger value='security'>Security</TabsTrigger>
                     <TabsTrigger value='privacy'>Privacy</TabsTrigger>
                  </TabsList>

                  {/* Profile Tab */}
                  <TabsContent value='profile' className='space-y-6'>
                     <Card>
                        <CardHeader>
                           <CardTitle className='flex items-center space-x-2'>
                              <User className='h-5 w-5' />
                              <span>Profile Information</span>
                           </CardTitle>
                           <CardDescription>
                              Update your personal information and contact
                              details
                           </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-6'>
                           {/* Avatar Section */}
                           <div className='flex items-center space-x-4'>
                              <Avatar className='h-20 w-20'>
                                 <AvatarImage
                                    src={user.profile.avatar}
                                    alt={user.profile.firstName}
                                 />
                                 <AvatarFallback className='text-lg'>
                                    {user.profile.firstName[0]}
                                    {user.profile.lastName[0]}
                                 </AvatarFallback>
                              </Avatar>
                              <div>
                                 <Button variant='outline' size='sm'>
                                    <Camera className='mr-2 h-4 w-4' />
                                    Change Photo
                                 </Button>
                                 <p className='mt-1 text-sm text-gray-500'>
                                    JPG, GIF or PNG. 1MB max.
                                 </p>
                              </div>
                           </div>

                           {/* Personal Information */}
                           <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                              <div className='space-y-2'>
                                 <Label htmlFor='firstName'>First Name</Label>
                                 <Input
                                    id='firstName'
                                    value={profileData.firstName}
                                    onChange={(e) =>
                                       setProfileData((prev) => ({
                                          ...prev,
                                          firstName: e.target.value,
                                       }))
                                    }
                                 />
                              </div>
                              <div className='space-y-2'>
                                 <Label htmlFor='lastName'>Last Name</Label>
                                 <Input
                                    id='lastName'
                                    value={profileData.lastName}
                                    onChange={(e) =>
                                       setProfileData((prev) => ({
                                          ...prev,
                                          lastName: e.target.value,
                                       }))
                                    }
                                 />
                              </div>
                              <div className='space-y-2'>
                                 <Label htmlFor='email'>Email</Label>
                                 <Input
                                    id='email'
                                    type='email'
                                    value={profileData.email}
                                    onChange={(e) =>
                                       setProfileData((prev) => ({
                                          ...prev,
                                          email: e.target.value,
                                       }))
                                    }
                                 />
                              </div>
                              <div className='space-y-2'>
                                 <Label htmlFor='phone'>Phone</Label>
                                 <Input
                                    id='phone'
                                    value={profileData.phone}
                                    onChange={(e) =>
                                       setProfileData((prev) => ({
                                          ...prev,
                                          phone: e.target.value,
                                       }))
                                    }
                                 />
                              </div>
                           </div>

                           {/* Address Information */}
                           <div className='space-y-4'>
                              <h3 className='text-lg font-medium'>Address</h3>
                              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                                 <div className='space-y-2 md:col-span-2'>
                                    <Label htmlFor='street'>
                                       Street Address
                                    </Label>
                                    <Input
                                       id='street'
                                       value={profileData.address.street}
                                       onChange={(e) =>
                                          setProfileData((prev) => ({
                                             ...prev,
                                             address: {
                                                ...prev.address,
                                                street: e.target.value,
                                             },
                                          }))
                                       }
                                    />
                                 </div>
                                 <div className='space-y-2'>
                                    <Label htmlFor='city'>City</Label>
                                    <Input
                                       id='city'
                                       value={profileData.address.city}
                                       onChange={(e) =>
                                          setProfileData((prev) => ({
                                             ...prev,
                                             address: {
                                                ...prev.address,
                                                city: e.target.value,
                                             },
                                          }))
                                       }
                                    />
                                 </div>
                                 <div className='space-y-2'>
                                    <Label htmlFor='state'>State</Label>
                                    <Input
                                       id='state'
                                       value={profileData.address.state}
                                       onChange={(e) =>
                                          setProfileData((prev) => ({
                                             ...prev,
                                             address: {
                                                ...prev.address,
                                                state: e.target.value,
                                             },
                                          }))
                                       }
                                    />
                                 </div>
                                 <div className='space-y-2'>
                                    <Label htmlFor='zipCode'>ZIP Code</Label>
                                    <Input
                                       id='zipCode'
                                       value={profileData.address.zipCode}
                                       onChange={(e) =>
                                          setProfileData((prev) => ({
                                             ...prev,
                                             address: {
                                                ...prev.address,
                                                zipCode: e.target.value,
                                             },
                                          }))
                                       }
                                    />
                                 </div>
                                 <div className='space-y-2'>
                                    <Label htmlFor='country'>Country</Label>
                                    <Input
                                       id='country'
                                       value={profileData.address.country}
                                       onChange={(e) =>
                                          setProfileData((prev) => ({
                                             ...prev,
                                             address: {
                                                ...prev.address,
                                                country: e.target.value,
                                             },
                                          }))
                                       }
                                    />
                                 </div>
                              </div>
                           </div>

                           <Button
                              onClick={handleProfileSave}
                              disabled={isLoading}
                           >
                              <Save className='mr-2 h-4 w-4' />
                              {isLoading ? 'Saving...' : 'Save Changes'}
                           </Button>
                        </CardContent>
                     </Card>
                  </TabsContent>

                  {/* Notifications Tab */}
                  <TabsContent value='notifications' className='space-y-6'>
                     <Card>
                        <CardHeader>
                           <CardTitle className='flex items-center space-x-2'>
                              <Bell className='h-5 w-5' />
                              <span>Notification Preferences</span>
                           </CardTitle>
                           <CardDescription>
                              Choose how you want to receive notifications
                           </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-6'>
                           <div className='space-y-4'>
                              <div className='flex items-center justify-between'>
                                 <div className='space-y-0.5'>
                                    <Label>Email Notifications</Label>
                                    <p className='text-sm text-gray-500'>
                                       Receive notifications via email
                                    </p>
                                 </div>
                                 <Switch
                                    checked={
                                       notificationSettings.emailNotifications
                                    }
                                    onCheckedChange={(checked) =>
                                       setNotificationSettings((prev) => ({
                                          ...prev,
                                          emailNotifications: checked,
                                       }))
                                    }
                                 />
                              </div>

                              <div className='flex items-center justify-between'>
                                 <div className='space-y-0.5'>
                                    <Label>SMS Notifications</Label>
                                    <p className='text-sm text-gray-500'>
                                       Receive notifications via text message
                                    </p>
                                 </div>
                                 <Switch
                                    checked={
                                       notificationSettings.smsNotifications
                                    }
                                    onCheckedChange={(checked) =>
                                       setNotificationSettings((prev) => ({
                                          ...prev,
                                          smsNotifications: checked,
                                       }))
                                    }
                                 />
                              </div>

                              <div className='flex items-center justify-between'>
                                 <div className='space-y-0.5'>
                                    <Label>Push Notifications</Label>
                                    <p className='text-sm text-gray-500'>
                                       Receive push notifications in your
                                       browser
                                    </p>
                                 </div>
                                 <Switch
                                    checked={
                                       notificationSettings.pushNotifications
                                    }
                                    onCheckedChange={(checked) =>
                                       setNotificationSettings((prev) => ({
                                          ...prev,
                                          pushNotifications: checked,
                                       }))
                                    }
                                 />
                              </div>

                              <div className='flex items-center justify-between'>
                                 <div className='space-y-0.5'>
                                    <Label>Appointment Reminders</Label>
                                    <p className='text-sm text-gray-500'>
                                       Get reminded about upcoming appointments
                                    </p>
                                 </div>
                                 <Switch
                                    checked={
                                       notificationSettings.appointmentReminders
                                    }
                                    onCheckedChange={(checked) =>
                                       setNotificationSettings((prev) => ({
                                          ...prev,
                                          appointmentReminders: checked,
                                       }))
                                    }
                                 />
                              </div>

                              <div className='flex items-center justify-between'>
                                 <div className='space-y-0.5'>
                                    <Label>Prescription Alerts</Label>
                                    <p className='text-sm text-gray-500'>
                                       Get notified about prescription updates
                                    </p>
                                 </div>
                                 <Switch
                                    checked={
                                       notificationSettings.prescriptionAlerts
                                    }
                                    onCheckedChange={(checked) =>
                                       setNotificationSettings((prev) => ({
                                          ...prev,
                                          prescriptionAlerts: checked,
                                       }))
                                    }
                                 />
                              </div>

                              <div className='flex items-center justify-between'>
                                 <div className='space-y-0.5'>
                                    <Label>Emergency Alerts</Label>
                                    <p className='text-sm text-gray-500'>
                                       Receive critical emergency notifications
                                    </p>
                                 </div>
                                 <Switch
                                    checked={
                                       notificationSettings.emergencyAlerts
                                    }
                                    onCheckedChange={(checked) =>
                                       setNotificationSettings((prev) => ({
                                          ...prev,
                                          emergencyAlerts: checked,
                                       }))
                                    }
                                 />
                              </div>

                              <div className='flex items-center justify-between'>
                                 <div className='space-y-0.5'>
                                    <Label>Marketing Emails</Label>
                                    <p className='text-sm text-gray-500'>
                                       Receive promotional emails and updates
                                    </p>
                                 </div>
                                 <Switch
                                    checked={
                                       notificationSettings.marketingEmails
                                    }
                                    onCheckedChange={(checked) =>
                                       setNotificationSettings((prev) => ({
                                          ...prev,
                                          marketingEmails: checked,
                                       }))
                                    }
                                 />
                              </div>
                           </div>

                           <Button
                              onClick={handleNotificationSave}
                              disabled={isLoading}
                           >
                              <Save className='mr-2 h-4 w-4' />
                              {isLoading ? 'Saving...' : 'Save Preferences'}
                           </Button>
                        </CardContent>
                     </Card>
                  </TabsContent>

                  {/* Security Tab */}
                  <TabsContent value='security' className='space-y-6'>
                     <Card>
                        <CardHeader>
                           <CardTitle className='flex items-center space-x-2'>
                              <Shield className='h-5 w-5' />
                              <span>Security Settings</span>
                           </CardTitle>
                           <CardDescription>
                              Manage your account security and authentication
                           </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-6'>
                           {/* Password Change */}
                           <div className='space-y-4'>
                              <h3 className='text-lg font-medium'>
                                 Change Password
                              </h3>
                              <div className='grid max-w-md grid-cols-1 gap-4'>
                                 <div className='space-y-2'>
                                    <Label htmlFor='currentPassword'>
                                       Current Password
                                    </Label>
                                    <div className='relative'>
                                       <Input
                                          id='currentPassword'
                                          type={
                                             showPassword ? 'text' : 'password'
                                          }
                                          value={passwordData.currentPassword}
                                          onChange={(e) =>
                                             setPasswordData((prev) => ({
                                                ...prev,
                                                currentPassword: e.target.value,
                                             }))
                                          }
                                       />
                                       <Button
                                          type='button'
                                          variant='ghost'
                                          size='sm'
                                          className='absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 transform p-0'
                                          onClick={() =>
                                             setShowPassword(!showPassword)
                                          }
                                       >
                                          {showPassword ? (
                                             <EyeOff className='h-4 w-4' />
                                          ) : (
                                             <Eye className='h-4 w-4' />
                                          )}
                                       </Button>
                                    </div>
                                 </div>
                                 <div className='space-y-2'>
                                    <Label htmlFor='newPassword'>
                                       New Password
                                    </Label>
                                    <Input
                                       id='newPassword'
                                       type='password'
                                       value={passwordData.newPassword}
                                       onChange={(e) =>
                                          setPasswordData((prev) => ({
                                             ...prev,
                                             newPassword: e.target.value,
                                          }))
                                       }
                                    />
                                 </div>
                                 <div className='space-y-2'>
                                    <Label htmlFor='confirmPassword'>
                                       Confirm New Password
                                    </Label>
                                    <Input
                                       id='confirmPassword'
                                       type='password'
                                       value={passwordData.confirmPassword}
                                       onChange={(e) =>
                                          setPasswordData((prev) => ({
                                             ...prev,
                                             confirmPassword: e.target.value,
                                          }))
                                       }
                                    />
                                 </div>
                                 <Button
                                    onClick={handlePasswordChange}
                                    disabled={isLoading}
                                 >
                                    <Lock className='mr-2 h-4 w-4' />
                                    {isLoading
                                       ? 'Changing...'
                                       : 'Change Password'}
                                 </Button>
                              </div>
                           </div>

                           {/* Two-Factor Authentication */}
                           <div className='space-y-4'>
                              <h3 className='text-lg font-medium'>
                                 Two-Factor Authentication
                              </h3>
                              <div className='flex items-center justify-between'>
                                 <div className='space-y-0.5'>
                                    <Label>Enable 2FA</Label>
                                    <p className='text-sm text-gray-500'>
                                       Add an extra layer of security to your
                                       account
                                    </p>
                                 </div>
                                 <Switch
                                    checked={securitySettings.twoFactorEnabled}
                                    onCheckedChange={(checked) =>
                                       setSecuritySettings((prev) => ({
                                          ...prev,
                                          twoFactorEnabled: checked,
                                       }))
                                    }
                                 />
                              </div>
                           </div>

                           {/* Session Settings */}
                           <div className='space-y-4'>
                              <h3 className='text-lg font-medium'>
                                 Session Settings
                              </h3>
                              <div className='space-y-4'>
                                 <div className='space-y-2'>
                                    <Label htmlFor='sessionTimeout'>
                                       Session Timeout (minutes)
                                    </Label>
                                    <select
                                       id='sessionTimeout'
                                       value={securitySettings.sessionTimeout}
                                       onChange={(e) =>
                                          setSecuritySettings((prev) => ({
                                             ...prev,
                                             sessionTimeout: e.target.value,
                                          }))
                                       }
                                       className='rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    >
                                       <option value='15'>15 minutes</option>
                                       <option value='30'>30 minutes</option>
                                       <option value='60'>1 hour</option>
                                       <option value='120'>2 hours</option>
                                       <option value='480'>8 hours</option>
                                    </select>
                                 </div>

                                 <div className='flex items-center justify-between'>
                                    <div className='space-y-0.5'>
                                       <Label>Login Alerts</Label>
                                       <p className='text-sm text-gray-500'>
                                          Get notified when someone logs into
                                          your account
                                       </p>
                                    </div>
                                    <Switch
                                       checked={securitySettings.loginAlerts}
                                       onCheckedChange={(checked) =>
                                          setSecuritySettings((prev) => ({
                                             ...prev,
                                             loginAlerts: checked,
                                          }))
                                       }
                                    />
                                 </div>
                              </div>
                           </div>

                           <Button
                              onClick={handleSecuritySave}
                              disabled={isLoading}
                           >
                              <Save className='mr-2 h-4 w-4' />
                              {isLoading
                                 ? 'Saving...'
                                 : 'Save Security Settings'}
                           </Button>
                        </CardContent>
                     </Card>
                  </TabsContent>

                  {/* Privacy Tab */}
                  <TabsContent value='privacy' className='space-y-6'>
                     <Card>
                        <CardHeader>
                           <CardTitle>Privacy & Data</CardTitle>
                           <CardDescription>
                              Control your privacy settings and data usage
                           </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-6'>
                           <div className='space-y-4'>
                              <div className='rounded-lg border border-gray-200 p-4'>
                                 <h3 className='mb-2 font-medium'>
                                    Data Export
                                 </h3>
                                 <p className='mb-3 text-sm text-gray-600'>
                                    Download a copy of your medical data and
                                    account information.
                                 </p>
                                 <Button variant='outline'>
                                    Download My Data
                                 </Button>
                              </div>

                              <div className='rounded-lg border border-gray-200 p-4'>
                                 <h3 className='mb-2 font-medium'>
                                    Account Deletion
                                 </h3>
                                 <p className='mb-3 text-sm text-gray-600'>
                                    Permanently delete your account and all
                                    associated data.
                                 </p>
                                 <Button variant='destructive'>
                                    Delete Account
                                 </Button>
                              </div>

                              <div className='rounded-lg border border-gray-200 p-4'>
                                 <h3 className='mb-2 font-medium'>
                                    Privacy Policy
                                 </h3>
                                 <p className='mb-3 text-sm text-gray-600'>
                                    Review our privacy policy and terms of
                                    service.
                                 </p>
                                 <div className='space-x-2'>
                                    <Button variant='outline' size='sm'>
                                       Privacy Policy
                                    </Button>
                                    <Button variant='outline' size='sm'>
                                       Terms of Service
                                    </Button>
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

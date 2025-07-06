import React from 'react';

import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Outlet } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';

interface ErrorBoundaryState {
   hasError: boolean;
   error?: Error;
}

interface ErrorBoundaryProps {
   children?: React.ReactNode;
   fallback?: React.ComponentType<{ error?: Error; retry: () => void }>;
}

class ErrorBoundary extends React.Component<
   ErrorBoundaryProps,
   ErrorBoundaryState
> {
   constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false };
   }

   static getDerivedStateFromError(error: Error): ErrorBoundaryState {
      console.error('🚨 ErrorBoundary: Caught error:', error);
      return { hasError: true, error };
   }

   componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      console.error('🚨 ErrorBoundary: Error details:', error, errorInfo);
   }

   retry = () => {
      console.log('🔄 ErrorBoundary: Retrying...');
      this.setState({ hasError: false, error: undefined });
   };

   render() {
      if (this.state.hasError) {
         if (this.props.fallback) {
            const FallbackComponent = this.props.fallback;
            return (
               <FallbackComponent error={this.state.error} retry={this.retry} />
            );
         }

         return (
            <DefaultErrorFallback error={this.state.error} retry={this.retry} />
         );
      }

      return this.props.children ?? <Outlet />;
   }
}

function DefaultErrorFallback({
   error,
   retry,
}: {
   error?: Error;
   retry: () => void;
}) {
   return (
      <div className='flex min-h-screen items-center justify-center p-4'>
         <Card className='w-full max-w-md'>
            <CardHeader className='text-center'>
               <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
                  <AlertTriangle className='h-8 w-8 text-red-600' />
               </div>
               <CardTitle className='text-red-900'>
                  Something went wrong
               </CardTitle>
               <CardDescription>
                  An unexpected error occurred. Please try again or contact
                  support if the problem persists.
               </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
               {error && (
                  <div className='rounded-lg border border-red-200 bg-red-50 p-3'>
                     <p className='font-mono text-sm text-red-800'>
                        {error.message}
                     </p>
                  </div>
               )}
               <div className='flex justify-center space-x-3'>
                  <Button
                     variant='outline'
                     onClick={() => window.location.reload()}
                  >
                     Reload Page
                  </Button>
                  <Button
                     onClick={retry}
                     className='flex items-center space-x-2'
                  >
                     <RefreshCw className='h-4 w-4' />
                     <span>Try Again</span>
                  </Button>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}

export default ErrorBoundary;

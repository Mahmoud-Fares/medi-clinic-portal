/** @type {import('tailwindcss').Config} */
export default {
   darkMode: ['class'],
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      container: {
         center: true,
         padding: '1rem',
      },
      extend: {
         fontFamily: {
            inter: ['Inter', 'sans-serif'],
            roboto: ['Roboto', 'sans-serif'],
         },
         fontSize: {
            hero: 'clamp(3rem, 1rem + 10vw, 15rem)',
         },
         screens: {
            xs: '500px',
            hero: '960px',
         },
         borderRadius: {
            DEFAULT: 'var(--radius)',
         },
         spacing: {
            section: '1.5rem',
            18: '4.5rem',
            88: '22rem',
         },
         boxShadow: {
            'medical-sm': 'var(--shadow-sm)',
            'medical-md': 'var(--shadow-md)',
            'medical-lg': 'var(--shadow-lg)',
         },
         backgroundImage: {
            'gradient-medical':
               'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--medical-teal)) 100%)',
            'gradient-emergency':
               'linear-gradient(135deg, hsl(var(--error)) 0%, hsl(var(--warning)) 100%)',
         },

         colors: {
            background: 'hsl(var(--background))',
            foreground: 'hsl(var(--foreground))',
            card: {
               DEFAULT: 'hsl(var(--card))',
               foreground: 'hsl(var(--card-foreground))',
            },
            popover: {
               DEFAULT: 'hsl(var(--popover))',
               foreground: 'hsl(var(--popover-foreground))',
            },
            primary: {
               DEFAULT: 'hsl(var(--primary))',
               foreground: 'hsl(var(--primary-foreground))',
            },
            secondary: {
               DEFAULT: 'hsl(var(--secondary))',
               foreground: 'hsl(var(--secondary-foreground))',
            },
            muted: {
               DEFAULT: 'hsl(var(--muted))',
               foreground: 'hsl(var(--muted-foreground))',
            },
            accent: {
               DEFAULT: 'hsl(var(--accent))',
               foreground: 'hsl(var(--accent-foreground))',
            },
            destructive: {
               DEFAULT: 'hsl(var(--destructive))',
               foreground: 'hsl(var(--destructive-foreground))',
            },
            border: 'hsl(var(--border))',
            input: 'hsl(var(--input))',
            ring: 'hsl(var(--ring))',
            chart: {
               1: 'hsl(var(--chart-1))',
               2: 'hsl(var(--chart-2))',
               3: 'hsl(var(--chart-3))',
               4: 'hsl(var(--chart-4))',
               5: 'hsl(var(--chart-5))',
            },
            lightGreen: '#A3DAC2FF',
            lightOrange: '#F0DA69',
            lightBlue: '#92BDF6',
            lightPurple: '#E7C2D4',

            // extend color system
            success: {
               DEFAULT: 'hsl(var(--success))',
               foreground: 'hsl(var(--success-foreground))',
            },
            warning: {
               DEFAULT: 'hsl(var(--warning))',
               foreground: 'hsl(var(--warning-foreground))',
            },
            error: {
               DEFAULT: 'hsl(var(--error))',
               foreground: 'hsl(var(--error-foreground))',
            },
            medical: {
               blue: 'hsl(var(--medical-blue))',
               teal: 'hsl(var(--medical-teal))',
               green: 'hsl(var(--medical-green))',
               red: 'hsl(var(--medical-red))',
               orange: 'hsl(var(--medical-orange))',
               purple: 'hsl(var(--medical-purple))',
            },
            status: {
               available: 'hsl(var(--status-available))',
               busy: 'hsl(var(--status-busy))',
               offline: 'hsl(var(--status-offline))',
               emergency: 'hsl(var(--status-emergency))',
            },
         },

         keyframes: {
            'accordion-down': {
               from: { height: '0' },
               to: { height: 'var(--radix-accordion-content-height)' },
            },
            'accordion-up': {
               from: { height: 'var(--radix-accordion-content-height)' },
               to: { height: '0' },
            },
            'pulse-medical': {
               '0%, 100%': { opacity: '1' },
               '50%': { opacity: '0.5' },
            },
            'slide-in-from-right': {
               '0%': { transform: 'translateX(100%)' },
               '100%': { transform: 'translateX(0)' },
            },
            'slide-in-from-left': {
               '0%': { transform: 'translateX(-100%)' },
               '100%': { transform: 'translateX(0)' },
            },
            'scale-in': {
               '0%': { transform: 'scale(0.95)', opacity: '0' },
               '100%': { transform: 'scale(1)', opacity: '1' },
            },
         },
         animation: {
            'accordion-down': 'accordion-down 0.2s ease-out',
            'accordion-up': 'accordion-up 0.2s ease-out',
            'pulse-medical':
               'pulse-medical 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            'slide-in-right': 'slide-in-from-right 0.3s ease-out',
            'slide-in-left': 'slide-in-from-left 0.3s ease-out',
            'scale-in': 'scale-in 0.2s ease-out',
         },

         transitionProperty: {
            smooth: 'all',
         },
         transitionDuration: {
            smooth: '300ms',
         },
         transitionTimingFunction: {
            smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
         },
      },
   },
   plugins: [
      require('tailwindcss-animate'),
      function ({ addUtilities }) {
         addUtilities({
            '.scrollbar-none': {
               '-ms-overflow-style': 'none',
               'scrollbar-width': 'none',
               '&::-webkit-scrollbar': {
                  display: 'none',
               },
            },
            '.transition-smooth': {
               'transition-property': 'all',
               'transition-duration': '300ms',
               'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
         });
      },
   ],
};

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

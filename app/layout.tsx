import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Courier_Prime } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const courier = Courier_Prime({
  weight: '400',
  style: 'normal',
});

export const metadata: Metadata = {
  title: 'HexGen',
  description:
    'A simple web application to auto-generate hex codes using @jstock/hexgen.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${courier.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="m-8 h-auto">{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

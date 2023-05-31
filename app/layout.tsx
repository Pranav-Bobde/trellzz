import './globals.css';

export const metadata = {
  title: 'Trellzz',
  description: 'Trellzz is a task management app built with Next.js.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

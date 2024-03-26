import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './component/Header';
import Navbar from './component/Navbar';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import '@uploadthing/react/styles.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nội thất cao cấp Tiến Mạnh',
  description: 'Generated by create TienManh',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <meta
        property='og:image'
        content={`https://quan-ly-cua-hang-noi-that.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgiuong-ngu.49d43492.jpg&w=750&q=75`}
      ></meta>
      <link
        rel='shortcut icon'
        href='./logo.png'
        type='image/png'
      />
      <body className={inter.className}>
        <div className='relative w-full'>
          <div className=''>
            <ToastContainer />
          </div>
          <Header />
          <Navbar />
          <div className='absolute top-20 left-0 xl:left-[20%] bg-slate-100 px-5 w-[100%] xl:w-[80%] pb-96'>
            {/* <p className='text-4xl py-5 font-medium'>Dashboard</p> */}
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

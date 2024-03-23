import { Nunito } from 'next/font/google'

import Navbar from '@/app/components/navbar/Navbar';
import LoginModal from '@/app/components/modals/LoginModal';
import RegisterModal from '@/app/components/modals/RegisterModal';
import SearchModal from '@/app/components/modals/SearchModal';
import RentModal from '@/app/components/modals/RentModal';
import Footer from './components/navbar/Footer';
import ToasterProvider from '@/app/providers/ToasterProvider';
import { Metadata } from 'next';

import './globals.css'
import ClientOnly from './components/ClientOnly';
import getCurrentUser from './actions/getCurrentUser';

export const metadata = {
  manifest: "/manifest.json", 
  title: 'Calabr | Rent Your Property in Calabar.',
  description: 'Rent properties Around',
  icons: {apple: '/icon.png'},
  themeColor:  '#fff'
}

// const font = Nunito({ 
//   subsets: ['latin'], 
// });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}

        </div>
        <Footer/>
      </body>
    </html>
  )
}

import './globals.css'
import Hero from "@/components/Hero";
import Menu from '@/components/Menu';
import { Nav } from "@/components/Nav";
import { BookListProvider } from '@/context/BookListContext';
import { ToastProvider } from '@/context/ToastContext';
import { AuthContextProvider } from '@/context/authContext';
import { BodyContainerProvider } from '@/context/bodyContainerContext';
import { BooksProvider } from '@/context/booksContext';
import { VisitorProvider } from '@/context/visitorContext';
import { WindowDimensionsProvider } from '@/context/windowDimensionsContext';
import Head from 'next/head';

export const metadata = {
  title: 'Booklib - Manage Your Online Library',
  description: 'The best way to manage your online books library',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
        <Head>
          <title>{metadata.title}</title>
          <link rel="icon"  href="/favicon.ico" sizes='any' />
          {/* for any other devices */}
          <link
            rel="icon"
            href="/icon?<generated>"
            type="image/<generated>"
            sizes="<generated>"
          />
          {/* for apple devices icon */}
          <link
            rel="apple-touch-icon"
            href="/apple-icon?<generated>"
            type="image/<generated>"
            sizes="<generated>"
          />
            {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Booklib - Manage Your Online Library" />
        <meta property="og:description" content="The best way to manage your online books library" />
        <meta property="og:image" content="https://www.booklib.cloud/apple-touch-icon.png" />
        <meta property="og:url" content="https://www.booklib.cloud" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags (Optional) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Booklib - Manage Your Online Library" />
        <meta name="twitter:description" content="The best way to manage your online books library" />
        <meta name="twitter:image" content="https://www.booklib.cloud/apple-touch-icon.png" />
      </Head>
      <body >
      <WindowDimensionsProvider>
      <ToastProvider>
      <BodyContainerProvider>
        <VisitorProvider>
        <AuthContextProvider>
        <BookListProvider>
        <BooksProvider>
        {children}
        
        </BooksProvider>
        </BookListProvider>
        </AuthContextProvider>
        </VisitorProvider>
        </BodyContainerProvider>
        </ToastProvider>
        </WindowDimensionsProvider>
      </body>
    </html>
  )
}

// export async function getServerSideProps({ req }) {
//   const token = req.cookies.token || ""; // Retrieve the token from cookies
//   return {
//     props: {
//       token,
//     },
//   };
// }

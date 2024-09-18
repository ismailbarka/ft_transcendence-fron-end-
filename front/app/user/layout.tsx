import React, { Children } from 'react'
import classes from './page.module.css'
import NavBar from '../../Components/NavBar/NavBar'
import Menu from '@/Components/Menu/Menu'
import { useRouter } from 'next/navigation'

// export default layout
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={classes.main}>
              <NavBar/>
              <div className={classes.container}>
                  <div className={classes.nemu}>
                      <Menu/>
                  </div>
                  <div className={classes.Content}>
                  {children}    
                  </div>
              </div>
          </div>
        </body>
    </html>
  );
}

import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Auth',
  description: 'Auth page',
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
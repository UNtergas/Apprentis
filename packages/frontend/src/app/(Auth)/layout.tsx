import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Public Layout",
    description: "Public pages",
}

export default function PrivateLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <div>{children}</div>
}
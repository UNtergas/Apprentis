import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Private Layout",
    description: "Private Layout",
}

export default function PrivateLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <div className="bg-gruvbox min-h-screen w-screen">{children}</div>
}
'use client';
import { Header } from "@/container/header";
import { AppShell } from "@mantine/core";

export default function PrivatePage(){
    return(
            <AppShell header={{height: 50}} >
                <AppShell.Header>
                    <Header />
                </AppShell.Header>
                <AppShell.Main>
                    {/* Page content here */}
                    <h1>Tutor Page</h1>
                </AppShell.Main>
            </AppShell>
        )
}
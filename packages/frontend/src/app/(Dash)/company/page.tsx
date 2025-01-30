'use client';
import { Header } from "@/components/header";
import { AppShell } from "@mantine/core";

export default function CompanyPage(){
    return(
        <AppShell header={{height: 50}} >
            <AppShell.Header>
                <Header />
            </AppShell.Header>
            <AppShell.Main>
                {/* Page content here */}
                <h1>Company Page</h1>
            </AppShell.Main>
        </AppShell>
    )
}
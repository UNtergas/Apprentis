'use client';

import ApiClient from "@/api/ApiClient";
import { useAuth } from "@/auth.context";
import { MissionBlock } from "@/components/missionBlock";
import { DashBoardCompany } from "@/container/dashboardCompany";

import { Header } from "@/container/header";
import { AppShell, Box, Button, Modal, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { APIException, emailValidator, MissionCreateRequest, MissionDetailed } from "@shared/frontend";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CompanyPage(){
    const { currentUser } = useAuth();

    const [showForm, setShowForm] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [currentMission, setCurrentMission] = useState<MissionDetailed | null>(null);
    const [missions, setMissions] = useState<MissionDetailed[]>([]);
    const [loading, setLoading] = useState(false);

    const missionCallBack = (mission: MissionDetailed) => {
        setCurrentMission(mission);
        setShowInfo(true);
    }
    // Mission Info
    const form = useForm({
        initialValues: {
            title: '',
            description: '',
            semester: '',
            apprenticeEmail: '',
        },
        validate: {
            title: (value) => value.length > 0 ? null : 'Title is required',
            description: (value) => value.length > 0 ? null : 'Description is required',
            semester: (value) => value.length > 0 ? null : 'Semester is required',
            apprenticeEmail: (value) => emailValidator().test(value) ? null : 'Invalid email',
        },
    })
    const fetchMissions = async () => {
        const missions_ = await ApiClient.Activity.getMissions();
        setMissions([...missions_]);
        if (currentMission) {
            const updatedMission = missions_.find(m => m.id === currentMission.id);
            setCurrentMission(updatedMission ? { ...updatedMission } : null); // Trigger hierarchy update in MissionBlock
        }
    };

    useEffect(() => {
        fetchMissions();
    }, []);

    const handleSubmit = async (values: MissionCreateRequest) => {
        try{
            setLoading(true);
            await ApiClient.Company.createMission(values);
            const updatedMissions = await ApiClient.Activity.getMissions();
            setLoading(false);
            toast.success('Mission created successfully');
            setMissions(updatedMissions);
            setShowForm(false);
            form.reset();
        }catch(e){
            setLoading(false);
            if(e instanceof APIException){
                toast.warn(e.message);
            }
        }
    }
    return(
        <>{currentUser ? (
            <AppShell 
                header={{height: 50}} 
                navbar={{width: 300, breakpoint: 'sm'}}
                padding="md"
            >
                <AppShell.Header>
                    <Header />
                </AppShell.Header>
                <AppShell.Navbar>
                    <DashBoardCompany missions={missions} formCallBack={() => setShowForm(true)} missionCallBack={missionCallBack} role={currentUser.role} />
                </AppShell.Navbar>
                <AppShell.Main>
                    {/* Form Modal */}
                    <Modal opened={showForm} onClose={() => setShowForm(false)} title="Create New Mission" centered>
                        <Box p="md">
                            <form onSubmit={form.onSubmit(handleSubmit)}>
                            <Stack gap="sm">
    
                                <TextInput
                                label="Title"
                                placeholder="Enter mission title"
                                {...form.getInputProps("title")}
                                />
    
                                <Textarea
                                label="Description"
                                placeholder="Enter mission description"
                                {...form.getInputProps("description")}
                                />
    
                                <TextInput
                                label="Semester"
                                placeholder="e.g., Spring 2025"
                                {...form.getInputProps("semester")}
                                />
    
                                <TextInput
                                label="Apprentice Email"
                                placeholder="apprentice@example.com"
                                {...form.getInputProps("apprenticeEmail")}
                                />
    
                                <Button color="red.1" type="submit" loading={loading} fullWidth>
                                Create Mission
                                </Button>
                            </Stack>
                            </form>
                        </Box>
                    </Modal>
                    {/* Mission Info */}
                    {showInfo && <MissionBlock mission={currentMission} onClose={()=> setShowInfo(false)} reloadMissions={fetchMissions}/>}
                </AppShell.Main>
            </AppShell>
            ):(
                <div>Unauthorized</div>
            )}
        </>
    )
}
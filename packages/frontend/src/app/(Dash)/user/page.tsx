'use client';

import ApiClient from "@/api/ApiClient";
import { useAuth } from "@/auth.context";
import { MissionBlock } from "@/components/missionBlock";
import { DashBoard } from "@/container/dashboard";
import { Header } from "@/container/header";
import { AppShell, Box, Button, Modal, Select, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ActivityCreateRequest, APIException, MissionDetailed, PHASE } from "@shared/frontend";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UserPage(){
    const { currentUser } = useAuth();

    const [showForm, setShowForm] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [currentMission, setCurrentMission] = useState<MissionDetailed | null>(null);
    const [missions, setMissions] = useState<MissionDetailed[]>([]);
    const [loading, setLoading] = useState(false);

    // Activity Form
    const form = useForm({
        initialValues: {
            title: '',
            description: '',
            phase: PHASE.STUDY,
        },
        validate: {
            title: (value) => value.length > 0 ? null : 'Title is required',
            description: (value) => value.length > 0 ? null : 'Description is required',
        },
    })  

    const handleSubmit = async (values: Omit<ActivityCreateRequest,'missionId'>) => {
        try{
            setLoading(true);
            await ApiClient.Activity.createActivity({
                ...values,
                missionId: currentMission?.id as number
            });
            const updatedMission = await ApiClient.Activity.getMissions();
            if (currentMission) {
                const mission_ = updatedMission.find(m => m.id === currentMission.id);
                setCurrentMission(mission_ ? { ...mission_ } : null); // Trigger hierarchy update in MissionBlock
            }
            setLoading(false);
            toast.success('Activity created successfully');
            setMissions(updatedMission);
            setShowForm(false);
            form.reset();
        }catch(e){
            setLoading(false);
            if(e instanceof APIException){
                toast.warn(e.message);
            }
        }
    }
    const missionCallBack = (mission: MissionDetailed) => {
        setCurrentMission(mission);
        setShowInfo(true);
    }

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

    return(
        <>{currentUser ? (
            <AppShell
                header={{height: 60}}
                navbar={{width: 320, breakpoint: 'sm'}}
                padding="md"
                >
                <AppShell.Header>
                    <Header />
                </AppShell.Header>
                <AppShell.Navbar>
                    <DashBoard missions={missions} formCallBack={() => setShowForm(true)} missionCallBack={missionCallBack} role={currentUser?.role} />
                </AppShell.Navbar>
                <AppShell.Main>
                    {/* Form Modal */}
                    <Modal opened={showForm} onClose={() => setShowForm(false)} title="Create New Activity" centered>
                        <Box p="md">
                            <form onSubmit={form.onSubmit(handleSubmit)}>
                            <Stack gap="sm">

                                <TextInput
                                label="Title"
                                placeholder="Enter activity title"
                                {...form.getInputProps("title")}
                                />

                                <Textarea
                                label="Description"
                                placeholder="Enter activity description"
                                {...form.getInputProps("description")}
                                />
                                <Select
                                    label="Mission Phase"
                                    placeholder="Select mission phase"
                                    data={[PHASE.STUDY,PHASE.ACTION,PHASE.IMPROVEMENT]}
                                    defaultValue={PHASE.STUDY}
                                    {...form.getInputProps("phase")}
                                    />
                            

                                <Button color="red.1" type="submit" loading={loading} fullWidth>
                                    Create Activity
                                </Button>
                            </Stack>
                            </form>
                        </Box>
                    </Modal>
                    {/* Mission Info */}
                    {showInfo && 
                        <MissionBlock 
                            mission={currentMission} 
                            onClose={()=> setShowInfo(false)} 
                            reloadMissions={fetchMissions} 
                            currentUser={currentUser}
                        />
                    }
                </AppShell.Main>
            </AppShell>
            ):(
                <div>Unauthorized</div>
            )}
        </>
    )
}
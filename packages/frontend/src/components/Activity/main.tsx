'use client';

import ApiClient from "@/api/ApiClient";
import { useAuth } from "@/auth.context";
import { Accordion, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { APIException, Phase, PHASE, ROLE, Activity, LEVEL, skillPhaseMapping, SkillCreate, Level, MissionDetailed, ActivityDetailed } from "@shared/frontend";
import { IconBook, IconDirectionSign, IconProgressCheck } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { ActivityEdit } from "./activityEdit";
import { ActivityDisplay } from "./activityDisplay";
import { FeedbackForm } from "./activityFeedback";
import { SkillForm } from "./activitySkill";

const PHASES = [
    {phase: PHASE.STUDY, icon: <IconBook/>}, 
    {phase:PHASE.ACTION, icon: <IconDirectionSign/>}, 
    {phase:PHASE.IMPROVEMENT, icon: <IconProgressCheck/>}];
    
interface ActivityProps {
    mission: MissionDetailed;
    reloadMissions: () => Promise<void>;
}    
const ActivitySection = (
    {mission,reloadMissions}:ActivityProps
) => {
    // Auth context
    const { currentUser } = useAuth();
    //form state
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showSkillForm, setShowSkillForm] = useState(false);

    // Current Action state
    const [currentActivity, setCurrentActivity] = useState<ActivityDetailed | null>(null);
    const [isEditActivity, setIsEditActivity] = useState(false);
    const [editActivity, setEditActivity] = useState<ActivityDetailed | null>(null);

    // Authroization
    const role = currentUser?.role;
    const canLeaveFeedback = (role === ROLE.COMPANY || role === ROLE.TUTOR);
    const canEditActivity = (role === ROLE.STUDENT);
    // Function to filter activities by phase
    const getActivitiesByPhase = (phase:Phase) => 
        mission.activitiesDetailed.filter(activity => activity.phase === phase);

    //Feedback form info
    const feedbackForm = useForm({
        initialValues: {
            content: '',
        },
        validate: {
            content: (value) => value.length > 0 ? null : 'Title is required',
        },
    })

    const handleFeedbackSubmit = async (values: {content:string}) =>{
        try{
            setLoading(true);
            if (currentUser && currentActivity) {
            await ApiClient.Activity.createFeedback({
                content: values.content,
                senderId: currentUser.id,
                activityId: currentActivity.id,
            });
            toast.success('Feedback created successfully');
            setShowForm(false);
            await reloadMissions();
            feedbackForm.reset();
            setLoading(false);
            } else {
            toast.warn("Current user or activity is not available.");
            }
        }catch(e){
            if(e instanceof APIException){
                toast.warn(e.message);
            }
        }
    }

    // Skill Form
    const skillForm = useForm({
        initialValues: {
            description: '',
            level: LEVEL.BASIC as Level,
            type: skillPhaseMapping[PHASE.STUDY][0],
        },
        validate: {
            description: (value) => value.length > 0 ? null : 'Description is required',
        },
    })

    const handleSkillSubmit = async (values: SkillCreate,activityId:number) => {
        try{
            setLoading(true);
            await ApiClient.Activity.updateActivity(activityId,{
                skillDescription: values.description,
                skillLevel: values.level,
                skillType: values.type,
            })
            toast.success('Skill created successfully');
            setShowForm(false);
            await reloadMissions();
            skillForm.reset();
            setLoading(false);
      
        }catch(e){
            if(e instanceof APIException){
                toast.warn(e.message);
            }
        }
    }
    const handleSkillFormSubmit = async (values: SkillCreate) => {
        if(currentActivity && currentUser){
            await handleSkillSubmit(values,currentActivity.id);
        }else{
            toast.warn("Current user or activity is not available.");
        }
    }
    // Buttons Callbacks
    const triggerFeedback = (activity:ActivityDetailed) => {
        setCurrentActivity(activity);
        setShowForm(true);
    }
    const triggerSkill = (activity:ActivityDetailed) => {
        setCurrentActivity(activity);
        setShowSkillForm(true);
    }

    const startEditActivity = (activity:ActivityDetailed) => {
        setEditActivity(activity);
        setIsEditActivity(true);
    }

    const cancelEditActivity = () => {
        setEditActivity(null);
        setIsEditActivity(false);
    }

    const updateActivity = async (activity:Activity) => {
        if(!editActivity) return
        try{
            setLoading(true);
            await ApiClient.Activity.updateActivity(activity.id,{
            title: editActivity.title,
            description: editActivity.description,
            });
            toast.success('Activity updated successfully');
            await reloadMissions();
            cancelEditActivity();
            setLoading(false);
        }catch(e){
            if(e instanceof APIException){
                toast.warn(e.message);
            }
        }
    }

    return(
        <>
            <Title order={5} mt="md">Activities</Title>
            <Accordion variant="contained" mt="sm">
                {PHASES.map(
                    ({phase,icon},phaseIndex) => {
                        const phaseActivities = getActivitiesByPhase(phase);
                        return(
                            <Accordion.Item key={phaseIndex} value={phase}>
                                <Accordion.Control>{icon}{phase}</Accordion.Control>
                                <Accordion.Panel>
                                    {phaseActivities.length > 0 ? (
                                    <Stack align="stretch" justify="center">
                                        {phaseActivities.map((activity:ActivityDetailed,index) => (
                                            <div key={index}
                                            >
                                                {
                                                isEditActivity && editActivity?.id === activity.id ? (
                                                    <ActivityEdit
                                                        editActivity={editActivity}
                                                        setEditActivity={setEditActivity}
                                                        updateActivity={updateActivity}
                                                        cancelEditActivity={cancelEditActivity}
                                                        />
                                                    ):(
                                                    <ActivityDisplay
                                                    activity={activity}
                                                    canEditActivity={canEditActivity}
                                                    startEditActivity={startEditActivity}
                                                    triggerSkill={triggerSkill}
                                                    canLeaveFeedback={canLeaveFeedback}
                                                    triggerFeedback={triggerFeedback}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </Stack>
                                    ):(
                                        <p>No activities for this phase.</p>
                                    )}
                                </Accordion.Panel>
                            </Accordion.Item>
                        )
                    }
                )}
            </Accordion>

            {/* Feedback Form */}
            <FeedbackForm
                showForm={showForm}
                setShowForm={setShowForm}
                loading={loading}
                handleSubmit={handleFeedbackSubmit}
                form={feedbackForm}
            />
            {/* Skill Form */}
            <SkillForm
                showForm={showSkillForm}
                setShowForm={setShowSkillForm}
                loading={loading}
                handleSubmit={handleSkillFormSubmit}
                form={skillForm}
                currentPhase={PHASE.STUDY}
            />
        </>
    )
}

export default ActivitySection;



// key={index} 
// style={{
//     width: "100%", // Ensure the child spans the full width
//     display: "block", // Ensure the child spans the full width
//     backgroundColor: "lightblue", // For debugging
// }}
// <div
// style={{
// width: "100%", // Ensure the child spans the full width
// backgroundColor: "lightgreen", // For debugging
// }}
// >
// alacadabra sdasdadadadasddddddddddddddd
// </div>
// </List.Item>
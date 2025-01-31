'use client';
import ApiClient from "@/api/ApiClient";
import { useAuth } from "@/auth.context";
import { Accordion, Title, List, ThemeIcon, Button, Modal, Box, Stack, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Activity, APIException, Feedback, Mission, PHASE, Phase, ROLE} from "@shared/frontend";
import { IconBook, IconCheck, IconDirectionSign, IconProgressCheck } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "react-toastify";

// Define the three hardcoded phases
const PHASES = [
  {phase: PHASE.STUDY, icon: <IconBook/>}, 
  {phase:PHASE.ACTION, icon: <IconDirectionSign/>}, 
  {phase:PHASE.IMPROVEMENT, icon: <IconProgressCheck/>}];
interface ActivitiesSectionProps {
  mission: Mission;
  reloadMissions: () => Promise<void>;
}
export const ActivitiesSection = ({mission,reloadMissions}:ActivitiesSectionProps) => {
  const { currentUser } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const role = currentUser?.role;
  const canLeaveFeedback = (role === ROLE.COMPANY || role === ROLE.TUTOR);
  // Function to filter activities by phase
  const getActivitiesByPhase = (phase:Phase) => 
    mission.activities.filter(activity => activity.phase === phase);

  //Feedback info
  const form = useForm({
          initialValues: {
              content: '',
          },
          validate: {
              content: (value) => value.length > 0 ? null : 'Title is required',
          },
      })
  
  // Function to handle feedback submission
  const handleSubmit = async (values: {content:string}) =>{
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
          form.reset();
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
  const triggerFeedback = (activity:Activity) => {
    setCurrentActivity(activity);
    setShowForm(true);
  }

  return (
    <>
      <Title order={5} mt="md">Activities</Title>

      <Accordion variant="contained" mt="sm">
        {PHASES.map(({phase,icon}, phaseIndex) => {
          const phaseActivities = getActivitiesByPhase(phase);
          
          return (
            <Accordion.Item key={phaseIndex} value={phase}>
              <Accordion.Control>{icon}{phase}</Accordion.Control>
              <Accordion.Panel>
                {phaseActivities.length > 0 ? (
                  <List spacing="xs" icon={<ThemeIcon color="green" size={14}><IconCheck size={12} /></ThemeIcon>}>
                    {phaseActivities.map((activity, index) => (
                      <List.Item key={index}>
                        <strong>{activity.title}:</strong> {activity.description}
                         {/* Feedback Section */}
                         {activity.feedbacks && activity.feedbacks.length > 0 ? (
                          <List spacing="xs" mt="xs">
                              {activity.feedbacks.map((feedback: Feedback) => (
                                <List.Item key={feedback.id}>
                                  <em>{feedback.content}</em> <small>({new Date(feedback.createdAt).toLocaleDateString()})</small>
                                </List.Item>
                              ))}
                            </List>
                          ) : (
                            <p>No feedback available.</p>
                          )}

                          {/* Feedback Button (Only for COMPANY && Tutor Role) */}
                          {canLeaveFeedback && <Button color="red" onClick={() => triggerFeedback(activity)}> Add Feedback</Button>}
                      </List.Item>
                    ))}
                  </List>
                ) : (
                  <p>No activities for this phase.</p>
                )}
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>
      
      {/* Feedback Form */}
      <Modal opened={showForm} onClose={() => setShowForm(false)} title="Create New Feedback" centered>
          <Box p="md"> 
              <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="sm">
                <Textarea
                  label="Feedback Content"
                  placeholder="Enter your feedback"
                  {...form.getInputProps("content")}
                />
                <Button color="red.1" type="submit" loading={loading} fullWidth>
                  Create Feedback
                </Button>
              </Stack>
              </form>
          </Box>
      </Modal>
    </>
  );
};

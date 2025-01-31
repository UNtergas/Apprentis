import { Accordion, Title, List, ThemeIcon } from "@mantine/core";
import { Mission, PHASE, Phase } from "@shared/frontend";
import { IconBook, IconCheck, IconDirectionSign, IconProgressCheck } from "@tabler/icons-react";

// Define the three hardcoded phases
const PHASES = [
  {phase: PHASE.STUDY, icon: <IconBook/>}, 
  {phase:PHASE.ACTION, icon: <IconDirectionSign/>}, 
  {phase:PHASE.IMPROVEMENT, icon: <IconProgressCheck/>}];
interface ActivitiesSectionProps {
  mission: Mission;
}
export const ActivitiesSection = ({mission}:ActivitiesSectionProps) => {
  // Function to filter activities by phase
  const getActivitiesByPhase = (phase:Phase) => 
    mission.activities.filter(activity => activity.phase === phase);

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
    </>
  );
};

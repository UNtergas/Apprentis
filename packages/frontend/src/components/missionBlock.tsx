import { Card, Group, Title, Badge, Divider, Blockquote, Text, ActionIcon } from "@mantine/core";
import { IconTarget, IconX } from "@tabler/icons-react";
import { Mission } from "@shared/frontend";
import { ActivitiesSection } from "./activitySection";

interface MissionBlockProps {
  mission: Mission | null;
  onClose: () => void; // Callback when closing the card
  reloadMissions: () => Promise<void>; // Callback to reload missions
}

export function MissionBlock({ mission, onClose, reloadMissions }: MissionBlockProps) {
    if (!mission) {
      return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Text>
            No mission selected
          </Text>
        </Card>
      );
    }
    return (
      <Card shadow="sm" p="lg" radius="md" withBorder>
        {/* Title and Semester */}
        <Group gap='md' justify='space-between'>
          <Group gap='md'>
            <Title order={3}>{mission.title}</Title>
            <Badge color="blue">{mission.semester}</Badge>
          </Group>
          <ActionIcon size="sm" variant="subtle" onClick={onClose}>
            <IconX size={18} />
          </ActionIcon>
        </Group>
  
        <Divider my="sm" />
  
        {/* Description in Blockquote */}
        <Blockquote m="md" color="blue" cite="-" icon={<IconTarget size={20} />} bg="gray.0">
          {mission.description}
        </Blockquote>
  
        {/* Skills Section */}
        {/* {mission.skills.length > 0 && (
          <>
            <Title order={5} mt="md">
              Required Skills
            </Title>
            <Group gap="xs">
              {mission.skills.map((skill, index) => (
                <Badge key={index} color="teal">
                  {skill.name}
                </Badge>
              ))}
            </Group>
          </>
        )} */}
  
        {/* Activities Section */}
        <ActivitiesSection mission={mission} reloadMissions={reloadMissions}/>
      </Card>
    );
  }
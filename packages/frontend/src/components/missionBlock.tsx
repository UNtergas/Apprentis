import { Card, Group, Title, Badge, Divider, Blockquote, Text, ActionIcon } from "@mantine/core";
import { IconTarget, IconX } from "@tabler/icons-react";
import { MissionDetailed } from "@shared/frontend";
import ActivitySection from "./Activity/main";

interface MissionBlockProps {
  mission: MissionDetailed | null;
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
    console.log(mission);
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
  
        {/* Activities Section */}
        <ActivitySection mission={mission} reloadMissions={reloadMissions}/>
      </Card>
    );
  }
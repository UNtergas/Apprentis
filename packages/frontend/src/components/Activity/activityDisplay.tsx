import { Group, Text, Divider, Badge, Popover, Accordion, Button} from "@mantine/core"
import { ActivityDetailed, Phase, Skill } from "@shared/frontend";
import { IconCheck, IconPencil, IconPlus } from "@tabler/icons-react"
import { ActivityFeedback } from "./activityFeedback";
import classes from "@/styles/accordian.module.css";



interface AccordionLabelProps {
    title: string;
    date: Date;
  }
  
  function AccordionLabel({ title, date}: AccordionLabelProps) {
    return (
      <Group wrap="nowrap">
        <div>
            <Text size="lg" fw={700}>{title}</Text>
          <Text size="sm" c="dimmed" fw={400}>
            {new Date(date).toLocaleDateString()}
          </Text>
        </div>
      </Group>
    )
}

interface ActivityDisplayProps {
    activity: ActivityDetailed;
    canEditActivity: boolean;
    startEditActivity: (activity: ActivityDetailed) => void;
    triggerSkill: (activity: ActivityDetailed,phase: Phase) => void;
    canLeaveFeedback: boolean;
    triggerFeedback: (activity: ActivityDetailed) => void;
    triggerValidation: (activity: ActivityDetailed, skill: Skill) => void;
    canValidateSkill: boolean;
    phase: Phase;
}

export const ActivityDisplay = (
    {
        activity, 
        canEditActivity,
        startEditActivity,
        triggerSkill, 
        canLeaveFeedback, 
        triggerFeedback,
        canValidateSkill,
        triggerValidation,
        phase,
    }: ActivityDisplayProps
)=>{
    return(
        <div
            style={{
                width: "100%", // Ensures full width
                boxSizing: "border-box", // Includes padding and borders in width
            }}
        >

        <Accordion variant="separated" chevronPosition="left">
            <Accordion.Item className={classes.accordionItem} value={activity.id.toString()}>                
                <Accordion.Control>
                        <AccordionLabel title={activity.title} date={activity.date} />
                </Accordion.Control>
                <Accordion.Panel>
                    {/* <Text size="lg" fw={700}>{activity.title}</Text> */}
                    <Text mt="xs">{activity.description}</Text>
                    <Text mt="xs" fw={600}> Skills</Text>
                    {
                        activity.skillsDetailed.map((skill,index) => {
                            return(
                                <Popover key={index} position="left" withArrow shadow="md">
                                <Popover.Target>
                                    <Group key={index} m="sm" gap="xs" style={{ cursor: 'pointer' }} >
                                        <Text c="gruvbox.9" fw={700} >{skill.type}</Text>
                                        <Badge color="green">{skill.level}</Badge>
                                        {skill.validation && 
                                        <>
                                            <Badge color="orange"> Validated</Badge>
                                            <Text>{skill.validation.validatedLevel}</Text>
                                            <Text>{ new Date(skill.validation.validatedAt).toLocaleDateString()}</Text>
                                        </>
                                        }
                                        {canValidateSkill && 
                                        <Button size="compact-xs" color="blue" onClick={() => triggerValidation(activity,skill)}>
                                            <IconCheck/> Validate
                                        </Button>
                                        }
                                    </Group>
                                </Popover.Target>
                                <Popover.Dropdown style={{ pointerEvents: 'none' }}>
                                    <Text size="sm">{skill.description}</Text>
                                </Popover.Dropdown>
                            </Popover>
                            )
                        })
                    }
                    <Divider mt="sm" mb="sm" />
                    <Group>
                        {canEditActivity && <Button color="blue" onClick={() => startEditActivity(activity)}>
                            <IconPencil/> Edit Activity
                            </Button>}
                        {canEditActivity && <Button color="red" onClick={() => triggerSkill(activity,phase)}>
                            <IconPlus/> Add Skill
                            </Button>}
                    </Group>
                <ActivityFeedback
                    activity={activity}
                    canLeaveFeedback={canLeaveFeedback}
                    triggerFeedback={triggerFeedback}
                    />
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
        </div>
    )
}

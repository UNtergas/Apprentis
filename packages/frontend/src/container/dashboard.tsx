import { Group, Code, ScrollArea } from "@mantine/core";
import { IconBook, IconBuildings, IconDirectionSign, IconLicense, IconPencil, IconProgressCheck, IconSchool } from "@tabler/icons-react";
import classes from "@/styles/dashboard.module.css";
import { Mission, PHASE, ROLE, Role } from "@shared/frontend";
import { LinkItem, LinksGroup } from "@/components/linkgroup";

interface DashBoardProps {
    missions?: Mission[];
    formCallBack?: () => void;
    missionCallBack?: (mission: Mission) => void;
    role?: Role;
}

export function DashBoard({ missions = [], formCallBack, missionCallBack, role }: DashBoardProps) {
    const ICON = {
      [ROLE.COMPANY]: <IconBuildings />,
      [ROLE.STUDENT]: <IconSchool />,
    }
    const missionLinks:LinkItem[] = missions.map((mission) => ({
        link: mission.title,
        label: mission.title,
        icon: IconPencil,
        callback: () => missionCallBack?.(mission),
        links:[
          {
            link: PHASE.STUDY,
            icon: IconBook,
            label: "Study",
            links: mission.activities.filter((activity) => activity.phase === PHASE.STUDY).map((activity) => ({
              link: activity.id.toString(),
              label: activity.title,
            })),
          },
          {
            link: PHASE.ACTION,
            icon: IconDirectionSign,
            label: "Action",
            links: mission.activities.filter((activity) => activity.phase === PHASE.ACTION).map((activity) => ({
              link: activity.id.toString(),
              label: activity.title,
            })),
          },
          {
            link: PHASE.IMPROVEMENT,
            icon: IconProgressCheck,
            label: "Improvement",
            links: mission.activities.filter((activity) => activity.phase === PHASE.IMPROVEMENT).map((activity) => ({
              link: activity.id.toString(),
              label: activity.title,
            })),
          },
          ...(role === ROLE.STUDENT
            ? [
                {
                  link: "add-mission",
                  label: "+ Add new activity",
                  callback: formCallBack,
                },
              ]
            : []),
        ]
    }));
    
    if (role === ROLE.COMPANY) {
        missionLinks.push({
          link: "add-mission",
            label: "+ Add new mission",
            callback: formCallBack,
        });
    }

    return (
      <nav className={classes.navbar}>
        <div className={classes.header}>
          <Group justify="space-between">
            {role && ICON[role as keyof typeof ICON]}
            <Code fw={700}>Dashboard</Code>
          </Group>
        </div>
  
        <ScrollArea className={classes.links}>
           <LinksGroup icon={IconLicense} label="Missions" links={missionLinks} initiallyOpened />
        </ScrollArea>
      </nav>
    );
  }
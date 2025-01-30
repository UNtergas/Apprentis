
import { useState } from "react";
import { UnstyledButton, Group, Text, Collapse, Box, Button } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "./NavbarLinksGroup.module.css";

interface LinkItem {
  label: string;
  link?: string;
  links?: LinkItem[];
  isButton?: boolean;
  isActivity?: boolean; 
}

interface LinksGroupProps {
  label: string;
  links?: LinkItem[];
  isButton?: boolean;
  isActivity?: boolean; 
  onClickButton?: () => void;
  onClickLink?: () => void;
  onClickActivity?: () => void; 
}

export function LinksGroup({ 
  label, 
  links, 
  isButton, 
  isActivity,
  onClickButton, 
  onClickLink,
  onClickActivity 
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links) && links.length > 0;
  const [opened, setOpened] = useState(false);

  const handleClick = () => {
    if (isActivity) {
      onClickActivity?.();
    } else {
      setOpened((o) => !o);
      onClickLink?.();
    }
  };

  return (
    <Box>
      {isButton ? (
        <Button onClick={onClickButton} className={classes.button}>
          {label}
        </Button>
      ) : (
        <UnstyledButton
          onClick={handleClick} 
          className={classes.control}
        >
          <Group justify="space-between">
            <Text>{label}</Text>
            {hasLinks && !isActivity && ( 
              <IconChevronRight
                className={classes.chevron}
                stroke={1.5}
                size={16}
                style={{ transform: opened ? "rotate(-90deg)" : "none" }}
              />
            )}
          </Group>
        </UnstyledButton>
      )}

      {hasLinks && (
        <Collapse in={opened}>
          <Box className={classes.nestedLinks}>
            {links.map((link) => (
              <LinksGroup
                key={link.label}
                {...link}
                isActivity={link.isActivity} 
                onClickButton={onClickButton}
                onClickLink={onClickLink}
                onClickActivity={onClickActivity}
              />
            ))}
          </Box>
        </Collapse>
      )}
    </Box>
  );
}
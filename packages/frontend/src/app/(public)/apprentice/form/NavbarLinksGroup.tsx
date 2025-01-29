import { useState } from "react";
import { UnstyledButton, Group, Text, Collapse, Box, Button } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "./NavbarLinksGroup.module.css";

interface LinkItem {
  label: string;
  link?: string;
  links?: LinkItem[];
  isButton?: boolean;
}

interface LinksGroupProps {
  label: string;
  links?: LinkItem[];
  isButton?: boolean;
  onClickButton?: () => void;
  onClickLink?: () => void;
}

export function LinksGroup({ label, links, isButton, onClickButton, onClickLink }: LinksGroupProps) {
  const hasLinks = Array.isArray(links) && links.length > 0;
  const [opened, setOpened] = useState(false);

  return (
    <Box>
      {isButton ? (
        <Button onClick={onClickButton} className={classes.button}>
          {label}
        </Button>
      ) : (
        <UnstyledButton
          onClick={() => {
            setOpened((o) => !o);
            onClickLink?.();
          }}
          className={classes.control}
        >
          <Group justify="space-between">
            <Text>{label}</Text>
            {hasLinks && (
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
                onClickButton={onClickButton}
                onClickLink={onClickLink}
              />
            ))}
          </Box>
        </Collapse>
      )}
    </Box>
  );
}
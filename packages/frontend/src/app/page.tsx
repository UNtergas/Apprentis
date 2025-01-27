import Image from 'next/image';
import {Button, Container, Group } from '@mantine/core';
import classes from '@/styles/home.module.css';

export default function Home() {
  return(
    <Container
      fluid
      className={classes.root}
    >
      {/* Logo in the top-left corner */}
      <div className={classes.logo}>
        <Image
          src="/logo.png"
          alt="Logo"
          width={120}
          height={80}
        />
      </div>
    
      {/* Button row */}
      <div className={classes.buttonArea}>
        <Group align="center" justify="center" gap="xl">
          <Button size="xl" radius="sm" variant="filled" color="red.2">
            ÉTUDIANTS
          </Button>
          <Button size="xl" radius="sm" variant="filled" color="red.2">
            ENSEIGNANTS
          </Button>
          <Button size="xl" radius="sm" variant="filled" color="red.2">
            ENTREPRISES
          </Button>
          <Button size="xl" radius="sm" variant="filled" color="red.2">
            ADMINISTRATION
          </Button>
        </Group>
      </div>
    </Container>
  );
}

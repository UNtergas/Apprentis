import Image from 'next/image';
import {Button, Container, Group } from '@mantine/core';
import classes from '@/styles/home.module.css';
import Link from 'next/link';

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
            <Link href="/user">
              ÉTUDIANTS
            </Link>
          </Button>
          <Button size="xl" radius="sm" variant="filled" color="red.2">
            <Link href="/school">
              ENSEIGNANTS
            </Link>
          </Button>
          <Button size="xl" radius="sm" variant="filled" color="red.2">
            <Link href="/company">
              ENTREPRISES
            </Link>
          </Button>
          <Button size="xl" radius="sm" variant="filled" color="red.2">
            <Link href="/admin">
              ADMINISTRATION
            </Link>
          </Button>
        </Group>
      </div>
    </Container>
  );
}

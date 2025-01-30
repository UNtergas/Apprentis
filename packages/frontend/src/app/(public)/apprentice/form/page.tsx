"use client";
import {
  Code,
  Group,
  ScrollArea,
  Box,
  TextInput,
  Textarea,
  Button,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { LinksGroup } from "./NavbarLinksGroup";
import { UserButton } from "./UserButton";
import classes from "./NavbarNested.module.css";
import { useState } from "react";
import { useForm } from "@mantine/form";

const mockdata = [
  { label: "Dashboard" },
  {
    label: "Mission",
    links: [
      {
        label: "Mission 1",
        links: [
          {
            label: "Study phase",
            links: [
              { label: "Activity 1", link: "/" },
              { label: "Create Activity", isButton: true }, 
            ],
          },
          {
            label: "Implementation phase",
            links: [
              { label: "Activity 2", link: "/" },
              { label: "Create Activity", isButton: true }, 
            ],
          },
          {
            label: "Improvement phase",
            links: [
              { label: "Activity 3", link: "/" },
              { label: "Create Activity", isButton: true }, 
            ],
          },
        ],
      },
    ],
  },
];

export default function NavbarNested() {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm((prev) => !prev);
  };

  const handleLinkClick = () => {
    setShowForm(false);
  };

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      date: new Date(),
    },
  });

  const handleSubmit = () => {
    console.log("Form submitted:", form.values);
    setShowForm(false);
  };

  const links = mockdata.map((item) => (
    <LinksGroup
      {...item}
      key={item.label}
      onClickButton={handleButtonClick}
      onClickLink={handleLinkClick}
    />
  ));

  return (
    <Box style={{ display: "flex", height: "100vh" }}>
      <nav className={classes.navbar}>
        <div className={classes.header}>
          <Group justify="space-between">
            <Code fw={700}>v3.1.2</Code>
          </Group>
        </div>

        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>{links}</div>
        </ScrollArea>

        <div className={classes.footer}>
          <UserButton />
        </div>
      </nav>

      <Box style={{ flex: 1, padding: "20px" }}>
        {showForm && (
          <Box
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                placeholder="Mission Title"
                label="Title"
                required
                {...form.getInputProps("title")}
              />

              <Textarea
                placeholder="Description"
                label="Description"
                required
                autosize
                minRows={4}
                maxRows={6}
                {...form.getInputProps("description")}
              />
              <TextInput
                placeholder="Mission Title"
                label="Title"
                required
                {...form.getInputProps("title")}
              />

              <DateInput
                label="Date"
                placeholder="Select date"
                defaultValue={new Date()}
                minDate={new Date()}
                required
                valueFormat="DD/MM/YYYY"
                styles={{
                  input: {
                    borderRadius: "6px",
                    padding: "8px",
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #ced4da",
                    fontSize: "12px",
                    height: "32px",
                    width: "100%",
                  },
                  label: {
                    fontWeight: 500,
                    marginBottom: "6px",
                    fontSize: "12px",
                  },
                 
                  calendarHeaderControl: {
                    width: "24px",
                    height: "24px",
                  },
                  day: {
                    borderRadius: "4px",
                    padding: "4px",
                    fontSize: "12px",
                    "&[data-selected]": {
                      backgroundColor: "#228be6",
                      color: "#fff",
                    },
                    "&:hover": {
                      backgroundColor: "#f1f3f5",
                    },
                    "&[data-disabled]": {
                      color: "#adb5bd",
                      cursor: "not-allowed",
                    },
                  },
                  month: {
                    fontSize: "12px",
                  },
                 
                }}
                {...form.getInputProps("date")}
              />

              <Button type="submit" mt="sm">
                Submit
              </Button>
            </form>
          </Box>
        )}
      </Box>
    </Box>
  );
}
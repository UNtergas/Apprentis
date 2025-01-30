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
          { label: "Activity 1", isActivity: true },
          { label: "Activity 2", isActivity: true },
          { label: "Activity 3", isActivity: true },
        ],
      },
      {
        label: "Create Mission",
        isButton: true,
      },
    ],
  },
];

export default function NavbarNested() {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<"activity" | "mission">("mission");

  const handleActivityClick = () => {
    setShowForm(false);
    setFormType("activity");
    setShowForm(true);
  };

  const handleLinkClick = () => {
    setShowForm(false);
  };
  
  const handleButtonClick = () => {
    setShowForm(false);
    setFormType("mission");
    setShowForm(true);
  };

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      date: new Date(),
      feedback: "",
      apprentice: "", 
      semester: "", 
      company: "", 
      skills: "", 
    },
  });

  const handleSubmit = () => {
    console.log("Form submitted:");
    setShowForm(false);
    form.reset();
  };

  const links = mockdata.map((item) => (
    <LinksGroup
      {...item}
      key={item.label}
      onClickButton={handleButtonClick}
      onClickActivity={handleActivityClick}
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
              {formType === "activity" ? (
                <>
                  <TextInput
                    label="Activity Title"
                    value="Activity 1 - Apprentice's Submission"
                    readOnly
                    mb="sm"
                  />
                  <Textarea
                    label="Description"
                    value="Apprentice's pre-filled activity description..."
                    readOnly
                    autosize
                    minRows={4}
                    mb="sm"
                  />
                  <Textarea
                    label="Your Feedback"
                    placeholder="Add feedback here..."
                    {...form.getInputProps("feedback")}
                    autosize
                    minRows={4}
                    mb="sm"
                  />
                </>
              ) : (
                <>
                  <TextInput
                    placeholder="Apprentice"
                    label="Apprentice"
                    required
                    {...form.getInputProps("apprentice")}
                  />
                  <TextInput
                    placeholder="Semester"
                    label="Semester"
                    required
                    {...form.getInputProps("semester")}
                  />
                  <TextInput
                    placeholder="Company"
                    label="Company"
                    required
                    {...form.getInputProps("company")}
                  />
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
                    {...form.getInputProps("description")}
                  />
                  <Textarea
                    placeholder="Add skills here..."
                    label=" Skills"
                    required
                    autosize
                    minRows={4}
                    {...form.getInputProps("skills")}
                  />
                  <DateInput
                    label="Date"
                    placeholder="Select date"
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
                </>
              )}

              <Button type="submit" mt="sm">
                {formType === "activity" ? "Submit Feedback" : "Create Mission"}
              </Button>
            </form>
          </Box>
        )}
      </Box>
    </Box>
  );
}

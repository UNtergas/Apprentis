import { List, Button, Box, Modal, Stack, Textarea } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form";
import { ActivityDetailed, Feedback } from "@shared/frontend"

interface ActivityFeedbackProps {
    activity: ActivityDetailed;
    canLeaveFeedback: boolean;
    triggerFeedback: (activity: ActivityDetailed) => void;
}


export const ActivityFeedback = (
    {activity, canLeaveFeedback, triggerFeedback}: ActivityFeedbackProps
) => {
    return(
        <>
           {/* Feedback Section */}
           {activity.feedbacks && activity.feedbacks.length > 0 ? (
                <List spacing="xs" mt="xs">
                    {activity.feedbacks.map((feedback: Feedback) => (
                    <List.Item key={feedback.id}>
                        <em>{feedback.content}</em> <small>({new Date(feedback.createdAt).toLocaleDateString()})</small>
                    </List.Item>
                    ))}
                </List>
                ) : (
                    <p>No feedback available.</p>
                )}

            {/* Feedback Button (Only for COMPANY && Tutor Role) */}
            {canLeaveFeedback && <Button color="red" onClick={() => triggerFeedback(activity)}> Add Feedback</Button>}
        </>
    )
}


interface FeedbackFormProps {
    showForm: boolean;
    setShowForm: (show: boolean) => void;
    loading: boolean;
    handleSubmit: (values: {content: string}) => void;
    form: UseFormReturnType<{content: string}>;
}

export const FeedbackForm = (
    {showForm, setShowForm, loading, handleSubmit, form}: FeedbackFormProps
) => {

    return(
        <Modal opened={showForm} onClose={() => setShowForm(false)} title="Create New Feedback" centered>
            <Box p="md"> 
                <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="sm">
                <Textarea
                    label="Feedback Content"
                    placeholder="Enter your feedback"
                    {...form.getInputProps("content")}
                />
                <Button color="red.1" type="submit" loading={loading} fullWidth>
                    Create Feedback
                </Button>
                </Stack>
                </form>
            </Box>
        </Modal>
    )
}
import { Button, Modal, Select, Stack, Textarea } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Activity, LEVEL, Phase, SkillCreate, skillPhaseMapping } from "@shared/frontend";

interface FeedbackFormProps {
    showForm: boolean;
    setShowForm: (show: boolean) => void;
    loading: boolean;
    handleSubmit: (values: SkillCreate) => void;
    form: UseFormReturnType<SkillCreate>;
    currentPhase: Phase;
}

export const SkillForm = (
    {showForm, setShowForm, loading, handleSubmit, form, currentPhase}: FeedbackFormProps
) => {
    return(
        <Modal opened={showForm} onClose={() => setShowForm(false)} title="Add Skill To Activity" centered>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="sm">
                    <Textarea
                        label="Description"
                        placeholder="Enter activity description"
                        {...form.getInputProps("description")}
                    />
                    <Select
                        label="Skill Level"
                        placeholder="Select skill level"
                        data={[LEVEL.BASIC, LEVEL.INTERMEDIATE, LEVEL.ADVANCED, LEVEL.EXPERT]}
                        defaultValue={LEVEL.BASIC}
                        {...form.getInputProps("level")}
                    />
                    <Select
                        label="Skill Type"
                        placeholder="Select skill type"
                        data={skillPhaseMapping[currentPhase]}
                        defaultValue={skillPhaseMapping[currentPhase][0]}
                        {...form.getInputProps("type")}
                    />
                    <Button color="red.1" type="submit" loading={loading} fullWidth>
                        Add skill
                    </Button>
                </Stack>
            </form>
        </Modal>
    )
}

interface SkillDisplayProps {
    activity: Activity;
    canEditActivity: boolean;
    startEditActivity: (activity: Activity) => void;
}

// export const SkillDisplay =(

// )=>{
//     return(

//     )
// }
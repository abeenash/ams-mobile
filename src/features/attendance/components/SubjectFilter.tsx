import { FilterChip } from "@/components/ui/Chip";
import { ScrollView } from "react-native";
import { SubjectSummary } from "../types";

type SubjectFilterProps = {
    subjects: SubjectSummary[]
    selectedId: number | undefined
    onSelect: (subjectId: number | undefined) => void
}

export function SubjectFilter({ subjects, selectedId, onSelect }: SubjectFilterProps) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="grow-0"
            contentContainerClassName="gap-2 px-4 ">
            <FilterChip label="All" selected={selectedId === undefined} onPress={() => onSelect(undefined)} />
            {subjects.map((subject) => (
                <FilterChip
                    key={subject.subjectId}
                    label={subject.subjectCode}
                    selected={selectedId === subject.subjectId}
                    onPress={() => onSelect(subject.subjectId)} />
            ))}
        </ScrollView>
    )
}
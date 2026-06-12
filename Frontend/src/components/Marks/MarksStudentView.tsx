import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useAccount } from "../../context/AccountContext";
import { useAuth } from "../../context/AuthContext";
import { MarksService } from "../../services/MarksService";
import { MarksBySubject, UserMark } from "../../typings/Mark";
import { MarksDetailsPanel } from "./MarksDetailsPanel";
import { MarksTable } from "./MarksTable";

export const MarksStudentView: React.FC<{ semester: number }> = ({ semester }) => {
    const { accessToken, logout } = useAuth();
    const { account } = useAccount();
    const studentId = account?.id;
    const [selectedUserMark, setSelectedUserMark] = useState<UserMark | null>(null);
    const [userMarksMap, setUserMarksMap] = useState<MarksBySubject | null>();

    useEffect(() => {
        const retrieveMarks = async () => {
            if (!studentId) {
                return;
            }

            try {
                const response = await MarksService.GetMarks(accessToken, studentId, semester === 1 ? "FIRST" : "SECOND");
                setUserMarksMap(response);
            } catch (e) {
                logout();
            }
        };

        retrieveMarks();
    }, [accessToken, logout, studentId, semester]);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 3,
            }}
        >
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <MarksTable
                    userMarksMap={userMarksMap}
                    selectedUserMark={selectedUserMark}
                    onMarkSelected={setSelectedUserMark}
                />
            </Box>

            {selectedUserMark && (
                <MarksDetailsPanel
                    selectedUserMark={selectedUserMark}
                    onClose={() => setSelectedUserMark(null)}
                />
            )}
        </Box>
    );
};

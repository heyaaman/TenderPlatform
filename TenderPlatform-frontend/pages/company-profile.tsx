import dynamic from "next/dynamic";
import { CircularProgress, Box } from "@mui/material";

const CompanyProfile = dynamic(() => import("../components/CompanyProfile"), {
  ssr: false, // ✅ Prevent SSR mismatch
  loading: () => (
    <Box sx={{ m: 4 }}>
      <CircularProgress />
    </Box>
  ),
});

export default function CompanyProfilePage() {
  return <CompanyProfile />;
}

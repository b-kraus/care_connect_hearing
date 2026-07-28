import { useNavigate } from "react-router-dom";
import Emergency from "../Emergency/Emergency";

export default function EmergencyPage() {
  const navigate = useNavigate();

  return (
    <Emergency onClose={() => navigate("/home")} />
  );
}
import { Navigate } from "react-router-dom";
export default function Protected({ children }: any) {
    const token = localStorage.getItem("token");

    if (!token) return <Navigate to="/login" />;

    return children;
}


export function AdminProtected({ children }: any) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role")
    console.log("role", role);
    if (!token) return <Navigate to="/login" />;
    if(!role?.includes("admin")) return <Navigate to="/login" />
    return children;
}
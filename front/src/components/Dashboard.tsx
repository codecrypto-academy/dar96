import { Outlet } from "react-router-dom";
import { Header } from "./Header";
export function Dashboard() {
    
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}
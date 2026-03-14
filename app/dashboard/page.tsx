import ClientDashboard from "./ClientDashboard";
import { getUserFromToken } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getUserFromToken();
  //console.log("User from token:", user);
  return <ClientDashboard user={user} />;
}

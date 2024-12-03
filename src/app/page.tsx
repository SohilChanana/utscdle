import { redirect } from "next/navigation";

export default function Home() {
    redirect("/daily-challenge");
    return null;
}
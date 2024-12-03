import React from "react"
import { MapPin } from "lucide-react";
import { Button } from "../../components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { auth } from "@/lib/auth";

export default async function AccountInfo() {
    const session = await auth();
    const isAuthenticated = !!session;
    if (!isAuthenticated) {
        return <div className="mt-10 text-xl">Please sign in to view this page</div>;
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-start w-full">
            <div className="pt-4 pb-4 text-center">
                <div className="flex flex-col sm:flex-row items-center justify-center">
                    <MapPin className="h-10 w-10 text-white sm:mr-4 mr-0" />
                    <h1 className="text-3xl font-bold text-white sm:text-4xl">UTSCdle</h1>
                </div>
                <p className="mt-3 text-xl font-bold text-gray-300">Account Information</p>
            </div>
            <div className="w-full sm:w-1/2">
                <Card>
                    <CardHeader>
                        <CardTitle>Account</CardTitle>
                        <CardDescription>
                            Edit your account information here.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" defaultValue={session.user.name ?? ''} disabled />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" defaultValue={session.user.email ?? ''} disabled />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save changes</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

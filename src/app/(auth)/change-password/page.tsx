import ChangePasswordForm from "@/app/(auth)/change-password/change-password-form";
import {getUserSessionAction} from "@/app/actions/auth.action";

export default async function ChangeUserPasswordPage() {
    const session = await getUserSessionAction()
    if (!session){
        return <div>You are not logged in!</div>
    }
    return (
    <ChangePasswordForm email={session.email}/>
    )
}
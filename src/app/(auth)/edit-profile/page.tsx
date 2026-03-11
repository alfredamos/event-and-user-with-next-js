import EditProfileForm from "@/app/(auth)/edit-profile/edit-profile-form";
import {getCurrentUserAction} from "@/app/actions/auth.action";

export default async function EditUserProfilePage() {
    const user = await getCurrentUserAction()
    return (
    <EditProfileForm user={user}/>
    )
}
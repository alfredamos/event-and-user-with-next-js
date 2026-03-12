"use client"

import {Button} from "@/components/ui/button";
import {changeUserRoleAction} from "@/app/actions/auth.action";



type Props = {email: string}

export function ChangeUserRole({email}: Props) {

    const roleChanger = async () => {
        await changeUserRoleAction({email});
    }

    return (
        <Button variant="success" className="m-2" onClick={roleChanger}>Role?</Button>
    );
}
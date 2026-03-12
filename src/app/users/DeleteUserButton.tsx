"use client"

import {useRouter} from "next/navigation";
import {deleteUserByIdAction} from "@/app/actions/user.action";
import {DeleteActionButton} from "@/components/users/DeleteActionButton";

type Props = {
    name: string;
    id: string;
}

export function DeleteUserButton({ name, id }: Props) {
    const router = useRouter();

    const onCancel = () => {
        router.push("/users");
    }

    const onSubmit = async () => {
        await deleteUserByIdAction(id);
        router.push("/users");
    }

    return (
        <DeleteActionButton onCancel={onCancel} onSubmit={onSubmit} message={`Do you really want to delete this user : ${name}?`}/>
    );
}
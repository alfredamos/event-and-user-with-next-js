"use client"

import {useRouter} from "next/navigation";
import {DeleteActionButton} from "@/components/users/DeleteActionButton";

type Props = {
    name: string;
    id: string;
    path: string;
    action: (id: string) => Promise<void>;
}

export function DeleteResourceButton({ action, id, name, path }: Props) {
    const router = useRouter();

    const onCancel = () => {
        router.push(path);
    }

    const onSubmit = async () => {
        await action(id);
        router.push(path);
    }

    return (
        <DeleteActionButton onCancel={onCancel} onSubmit={onSubmit} message={`Do you really want to delete this user : ${name}?`}/>
    );
}
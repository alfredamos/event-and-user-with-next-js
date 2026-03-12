"use client"

import {useRouter} from "next/navigation";
import {DeleteActionButton} from "@/components/users/DeleteActionButton";
import {deleteAttendeesByIdAction} from "@/app/actions/attendee.action";

type Props = {
    name: string;
    eventId: string;
    userId: string;
}

export function DeleteAttendeeButton({ eventId, name, userId }: Props) {
    const router = useRouter();

    const onCancel = () => {
        router.push("/attendees");
    }

    const onSubmit = async () => {
        await deleteAttendeesByIdAction(eventId, userId);
        router.push("/users");
    }

    return (
        <DeleteActionButton onCancel={onCancel} onSubmit={onSubmit} message={`Do you really want to delete this user : ${name}?`}/>
    );
}
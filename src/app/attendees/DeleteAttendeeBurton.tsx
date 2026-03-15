"use client"

import {useRouter} from "next/navigation";
import {DeleteActionButton} from "@/components/users/DeleteActionButton";
import {deleteAttendeesByIdAction} from "@/app/actions/attendee.action";

type Props = {
    username: string;
    eventId: string;
    eventName: string;
    userId: string;
    isAdmin: boolean;
}

export function DeleteAttendeeButton({ eventId, eventName, isAdmin, username, userId }: Props) {
    const router = useRouter();

    const onCancel = () => {
        router.push(isAdmin? "/attendees" : `/attendees/by-user-id/${userId}`);
    }

    const onSubmit = async () => {
        await deleteAttendeesByIdAction(eventId, userId);
        router.refresh();
    }

    return (
        <DeleteActionButton onCancel={onCancel} onSubmit={onSubmit} message={`Do you really want to delete the user : ${username} from the event ${eventName}?`}/>
    );
}
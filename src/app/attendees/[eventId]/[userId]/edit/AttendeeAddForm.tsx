"use client"

import {useRouter} from "next/navigation";
import {FieldErrors, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {attendeeCreateSchema, AttendeeCreate} from "@/servers/validations/attendee.validation";
import {SelectWithLabel} from "@/components/form-elements/SelectWithLabel";
import {EventDto} from "@/servers/dto/event.dto";
import {UserDto} from "@/servers/dto/user.dto";

type Props = {
    attendee: AttendeeCreate;
    events: EventDto[];
    users: UserDto[];
    action: (request: AttendeeCreate) => Promise<void>;
}

export function AttendeeAddForm({action, attendee, events, users}: Props) {
    const router = useRouter();
    async function onSubmit(values: AttendeeCreate) {
        console.log("In attendee-form, values", values);
        await action(values);
        router.refresh();
    }

    const onError: SubmitHandler<FieldErrors<AttendeeCreate>> = (errors) => {
        console.error("Form Submission Errors:", errors); // Log errors to debug
    };

    const defaultValues: AttendeeCreate = {
        eventId: attendee.eventId,
        userId: attendee.userId,

    }

    const form = useForm<AttendeeCreate>({
        resolver: zodResolver(attendeeCreateSchema),
        mode:"onBlur",
        defaultValues,
    });

    //----> Object of ids and values of events and users
    const idsAndValuesOfEvents: {id: string, value: string}[] = events.map(event => ({id: event.id, value: event.name }));
    const idsAndValuesOfUsers: {id: string, value: string}[] = users.map(user => ({id:user.id, value: user.name}));

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)} className="bg-gray-50 dark:text-black dark:bg-black text-slate-800 max-w-sm items-center mx-auto rounded-xl shadow-2xl py-6 px-10 mt-10">
                <h4 className="font-bold text-slate-800 text-center text-xl mb-2 dark:text-white">
                    Edit Attendee Form
                </h4>
                <Separator className="mt-4 mb-4"/>
                <SelectWithLabel<AttendeeCreate> fieldTitle="Event ID" nameInSchema="eventId" data={[...idsAndValuesOfEvents]} className="mb-2 w-full dark:text-white"/>
                <SelectWithLabel<AttendeeCreate> fieldTitle="User ID" nameInSchema="userId" data={[...idsAndValuesOfUsers]} className="mb-2 w-full dark:text-white"/>
                <Separator className="mt-4"/>
                <div className="flex flex-col md:flex-row items-center md:justify-between mt-6 gap-2">
                    <Button type="button" size="lg" className="w-full md:w-1/4 mb-4" variant="back" onClick={() => router.back()}>Back</Button>
                    <Button type="submit" size="lg" className="w-full md:w-1/4 mb-4" variant="indigo">Save</Button>
                    <Button type="button" size="lg" className="w-full md:w-1/4 mb-4" variant="rose" onClick={() => form.reset(defaultValues)}>Reset</Button>
                </div>

            </form>
        </Form>
    );
}
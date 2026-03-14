"use client"

import {redirect, useRouter} from "next/navigation";
import {FieldErrors, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {Separator} from "@/components/ui/separator";
import {InputWithLabel} from "@/components/form-elements/InputWithLabel";
import {Button} from "@/components/ui/button";
import {attendeeSchema, Attendee} from "@/servers/validations/attendee.validation";
import {SelectWithLabel} from "@/components/form-elements/SelectWithLabel";

type Props = {
    attendee: Attendee,
    action: (eventId: string, userId: string, request: Attendee) => Promise<void>;
}

export function AttendeeForm({action, attendee}: Props) {
    const router = useRouter();
    async function onSubmit(values: Attendee) {
        console.log("In attendee-form, values", values);
        await action(values.eventId, values.userId, values);
        router.refresh();
    }

    const onError: SubmitHandler<FieldErrors<Event>> = (errors) => {
        console.error("Form Submission Errors:", errors); // Log errors to debug
    };

    const defaultValues: Attendee = {
        eventId: attendee.eventId,
        userId: attendee.userId,
        status: attendee.status,

    }

    const form = useForm<Attendee>({
        resolver: zodResolver(attendeeSchema),
        mode:"onBlur",
        defaultValues,
    });

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)} className="bg-gray-50 dark:text-black dark:bg-black text-slate-800 max-w-sm items-center mx-auto rounded-xl shadow-2xl py-6 px-10 mt-10">
                <h4 className="font-bold text-slate-800 text-center text-xl mb-2 dark:text-white">
                    Edit Attendee Form
                </h4>
                <Separator className="mt-4 mb-4"/>
                <InputWithLabel<Attendee> fieldTitle="" type="text" nameInSchema="eventId" className="mb-2 dark:text-white" hidden/>
                <InputWithLabel<Attendee> fieldTitle="" type="text" nameInSchema="userId" className="mb-2 dark:text-white"  hidden/>
                <SelectWithLabel<Attendee> fieldTitle="Status" nameInSchema="status" data={[{id: "Attending", value: "Attending"}, {id: "Cancelled", value: "Cancelled"}, {id: "Registered", value: "Registered"}]} className="mb-2 w-full dark:text-white"/>
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
"use client"

import {redirect, useRouter} from "next/navigation";
import {FieldErrors, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {eventUpdateSchema, EventUpdate} from "@/servers/validations/event.validation";
import {Separator} from "@/components/ui/separator";
import {InputWithLabel} from "@/components/form-elements/InputWithLabel";
import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import {formattedDate} from "@/utils/formattedDate";

type Props = {
    event: EventUpdate;
    formLabel: string;
    action: (id: string, request: EventUpdate) => Promise<void>;
};

export function EventUpdateForm({action, event, formLabel}: Props) {
    console.log("In event-form, formLabel", formLabel);
    console.log("In event-form, event", event);
    const router = useRouter();
    async function onSubmit(values: EventUpdate) {
        console.log("At point 1 in event-form, values", values);
        if(formLabel === "Edit") values.id = event.id;
        console.log("At point 2 in event-form, values", values);
        await action(values.id, values);
        redirect("/events")
    }

    const onError: SubmitHandler<FieldErrors<EventUpdate>> = (errors) => {
        console.error("Form Submission Errors:", errors); // Log errors to debug
    };

    const defaultValues: EventUpdate = {
        id: event.id,
        name: event.name,
        description: event.description,
        image: event.image,
        location: event.location,
        date: formattedDate(new Date(event.date))

    }

    const form = useForm<EventUpdate>({
        resolver: zodResolver(eventUpdateSchema),
        mode:"onBlur",
        defaultValues,
    });

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)} className="bg-gray-50 dark:text-black dark:bg-black text-slate-800 max-w-sm items-center mx-auto rounded-xl shadow-2xl py-6 px-10 mt-10">
                <h4 className="font-bold text-slate-800 text-center text-xl mb-2 dark:text-white">
                    {formLabel} Form
                </h4>
                <Separator className="mt-4 mb-4"/>
                <InputWithLabel<EventUpdate> fieldTitle="Name" type="text" nameInSchema="name" className="mb-2 dark:text-white"/>
                <InputWithLabel<EventUpdate> fieldTitle="Description" type="text" nameInSchema="description" className="mb-2 dark:text-white" />
                <InputWithLabel<EventUpdate> fieldTitle="Image" type="text" nameInSchema="image" className="mb-2 dark:text-white" />
                <InputWithLabel<EventUpdate> fieldTitle="Location" type="text" nameInSchema="location" className="mb-2 dark:text-white" />
                <InputWithLabel<EventUpdate> fieldTitle="Date" type="date" nameInSchema="date" className="mb-2 dark:text-white" />
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
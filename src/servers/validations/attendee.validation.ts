import {z} from "zod";
import {Status} from "@/generated/prisma/enums";

export const attendeeSchema = z.object({
    eventId: z.string().min(3, {message: "EventId must be provided"}),
    userId: z.string().min(3, {message: "UserId must be provided"}),
    status: z.enum(Status, {message: "Status must be provided"}),
});


export type Attendee = z.infer<typeof attendeeSchema>;
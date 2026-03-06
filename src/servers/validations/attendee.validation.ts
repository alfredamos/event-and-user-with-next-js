import {z} from "zod";

export const attendeeValidationSchema = z.object({
    eventId: z.string().min(3, {message: "EventId must be provided"}),
    userId: z.string().min(3, {message: "UserId must be provided"}),
});


type Attendee = z.infer<typeof attendeeValidationSchema>;
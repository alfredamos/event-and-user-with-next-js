import {z} from "zod";

export const eventSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(3, {message: "name must be provided"}),
    description: z.string().min(3, {message: "description must be provided"}),
    location: z.string().min(3, {message: "location must be provided"}),
    image: z.string().min(3, {message: "image must be provided"}),
    date: z.string().min(3, {message: "date must be provided"}),
})

export type Event = z.infer<typeof eventSchema>;
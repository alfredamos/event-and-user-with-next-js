"use server"

import {eventService} from "@/servers/services/event.service";
import {EventCreateInput, EventUncheckedUpdateInput} from "@/generated/prisma/models/Event";
import {redirect} from "next/navigation";

export async function createEventAction(request: EventCreateInput){
    console.log("In createEventAction, request : ", request);
    //----> Create a new event.
    try {
        await eventService.createEvent(request);
        redirect("/events")
    }catch (error) {
        throw error
    }
}

export async function deleteEventByIdAction(id: string){
    //----> Delete an event by id.
    try {
        await eventService.deleteEventById(id);
        redirect("/events")
    }catch (error) {
        throw error
    }
}

export async function editEventByIdAction(id: string, request: EventUncheckedUpdateInput){
    //----> Edit an event by id.
    try {
        await eventService.editEventById(id, request);
        redirect("/events")
    }catch (error) {
        throw error
    }
}

export async function getAllEventsAction(query?: string){
    //----> Retrieve all events.
    try {
        return await eventService.getAllEvents(query);
    }catch (error) {
        throw error
    }
}

export async function getEventByIdAction(id: string){
    //----> Fetch an event by id.
    try {
        return await eventService.getEventById(id);
    }catch (error) {
        throw error
    }
}
"use server"

import {eventService} from "@/servers/services/event.service";
import {EventCreateInput} from "@/generated/prisma/models/Event";
import {Event} from "@/generated/prisma/client";

export async function createEventAction(request: EventCreateInput){
    //----> Create a new event.
    try {
        return await eventService.createEvent(request);
    }catch (error) {
        throw error
    }
}

export async function deleteEventByIdAction(id: string){
    //----> Delete an event by id.
    try {
        return await eventService.deleteEventById(id);
    }catch (error) {
        throw error
    }
}

export async function editEventByIdAction(id: string, request: Event){
    //----> Edit an event by id.
    try {
        return await eventService.editEventById(id, request);
    }catch (error) {
        throw error
    }
}

export async function getAllEventsAction(){
    //----> Retrieve all events.
    try {
        return await eventService.getAllEvents();
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
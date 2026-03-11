"use client"

import * as ls from "local-storage";


export function useLocalStorage<T>(){

    const setLocalStorage = (key: string, value: T) => {
        ls.set<T>(key, value);
    }

    const getLocalStorage = (key: string) => {
        return ls.get<T>(key);
    }

    const removeLocalStorage = (key: string) => {
        ls.remove(key);
    }

    return {getLocalStorage, removeLocalStorage, setLocalStorage};
}


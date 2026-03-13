import Form from "next/form"
import {Button} from "@/components/ui/button";

type Prop = {
    path: string;
}

export default function SearchBar({path}: Prop) {
    return (
        <Form action={path}>
            <div className="flex justify-between items-center mb-5 mt-5 w-3/4 mx-auto">
                <input
                    type="search"
                    name="query"
                    className="border-solid border border-gray-700  focus:border-solid focus:border-indigo-600 focus:outline-none dark:text-white text-black w-full rounded-lg p-3 m-2"
                />
                <Button variant="indigo" size="xlg" type="submit">
                    Search
                </Button>
            </div>
        </Form>
    );
}
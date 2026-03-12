import {getAllUsersAction} from "@/app/actions/user.action";
import {UserTable} from "@/app/users/UserTable";

export default async function UsersListPage({searchParams}:{searchParams: Promise<{query?: string}>}) {
    //----> Get the search params if there are any.
    const {query} = await searchParams;


    const users = await getAllUsersAction(query);

    return(
        <UserTable users={users}/>
    );
}
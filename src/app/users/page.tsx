import {getAllUsersAction} from "@/app/actions/user.action";
import {UserTable} from "@/app/users/UserTable";
import {getUserSessionAction} from "@/app/actions/auth.action";

export default async function UsersListPage({searchParams}:{searchParams: Promise<{query?: string}>}) {
    //----> Get user session.
    const session = await getUserSessionAction();

    if (!session?.isAdmin) return <div className="h-dvh flex justify-center items-center">You are not permitted to perform this action.!</div>;

    //----> Get the search params if there are any.
    const {query} = await searchParams;


    const users = await getAllUsersAction(query);

    return(
        <UserTable users={users}/>
    );
}
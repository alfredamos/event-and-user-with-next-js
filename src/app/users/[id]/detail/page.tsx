import {UserCard} from "@/app/users/UserCard";
import {getUserByIdAction} from "@/app/actions/user.action";
import {getUserSessionAction} from "@/app/actions/auth.action";

type Params = {params: Promise<{id: string}>};


export default async function DetailPage({params}: Params) {
    //----> Get the user session.
    const session = await getUserSessionAction();

    //----> Get the user by id.
    const {id} = await params;

    if (!session?.isAdmin && session?.id !== id) return <div className="h-dvh flex justify-center items-center">You are not permitted to view this page!</div>;

    const user = await getUserByIdAction(id);
    return(
        <UserCard user={user}/>
    );
}
import {UserCard} from "@/app/users/UserCard";
import {getUserByIdAction} from "@/app/actions/user.action";

type Params = {params: Promise<{id: string}>};


export default async function DetailPage({params}: Params) {
    const {id} = await params;
    const user = await getUserByIdAction(id);
    return(
        <UserCard user={user}/>
    );
}
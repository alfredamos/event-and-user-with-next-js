import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {UserModel} from "@/servers/models/user.model";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";
import SearchBar from "@/components/users/SearchBar";
import {ChangeUserRole} from "@/app/users/ChangeUserRole";
import {DeleteResourceButton} from "@/utils/DeleteResourceButton";
import {deleteUserByIdAction} from "@/app/actions/user.action";

type Props = {
    users: UserModel[]
}

export function UserTable({users}: Props) {
    //----> Check for an empty array of customers.
    if (users?.length === 0) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">There are no users to display at this time!</h1></div>
    }

    return (
        <div className="mt-10 max-w-sm md:max-w-2xl mx-auto">
            <Separator className="mb-4 mt-2"/>
            <div className="flex items-center justify-between">
                <span className="font-bold">Add New User</span>
                <Button asChild size="lg" >
                    <Link href="/signup" className="font-bold">Add</Link>
                </Button>
            </div>
            <Separator className="mb-2 mt-4"/>
            <SearchBar path="/users" />
            <Separator className="mb-2 mt-2"/>
        <Table>
            <TableCaption>List of Users.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.email}>
                        <TableCell><img
                            src={user.image}
                            height={80}
                            width={80}
                            alt={user.name}
                        /></TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.gender}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                            <Button variant="indigo" className="mr-2">
                                <Link href={`/users/${user.id}/detail`} >Detail</Link>
                            </Button>
                            <DeleteResourceButton name={user.name} id={user.id as string} path={"/users"} action={deleteUserByIdAction}/>
                            <ChangeUserRole email={user.email}/>
                            <Button variant="back" className="mr-2">
                                <Link href={`/attendees/by-user-id/${user.id}`}>
                                    Events
                                </Link>
                            </Button>
                        </TableCell>


                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </div>
    )
}

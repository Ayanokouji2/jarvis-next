import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export default function UserAvatar() {

    const { user } = useUser();
    console.log(user)
    return (
        
        <Avatar className='h-8 w-8'>
            <AvatarImage src={user?.imageUrl}  />
            <AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
            <AvatarFallback>{user?.lastName?.charAt(0)}</AvatarFallback>
        </Avatar>
    )
}
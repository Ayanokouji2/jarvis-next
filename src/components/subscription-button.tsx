'use client'

import { Button } from "@/components/ui/button"
import axios from "axios"
import { Zap } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface SubscriptionButtonProps {
    isPro : boolean
}

export function SubscriptionButton({isPro = false} : SubscriptionButtonProps) {

    const [loading, setLoading] = useState(false)

    const handleClick = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/stripe')

            window.location.href = response.data.url
        } catch (error : any) {
			toast.error(error?.response?.data?.message || error.message)

            console.log(`${error.message} - [BILLING_ERROR]`)
        }finally{
            setLoading(false)
        }
    }
    return (
        <Button disabled={loading} variant={isPro ? "default" : "premium"} onClick={handleClick} className="">
            {isPro? "Manage Subscription" : "Upgrade to Pro"}
            {!isPro && <Zap className="h-4 aspect-square fill-white ml-2"/>}
        </Button>
    )
}
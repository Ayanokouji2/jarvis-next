import { LucideIcon } from "lucide-react";

interface HeadingProps {
    title       : string;
    description : string;
    icon        : LucideIcon;
    iconColor?  : string;
    bgColor?    : string;
}

export default function Heading({title, description, icon, iconColor, bgColor}: HeadingProps) {
    return (
        <div className="">
            I'm the heading 
        </div>
    )
}
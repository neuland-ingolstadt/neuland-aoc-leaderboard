import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LastUpdatedBadgeProps {
    date: Date;
    className?: string;
}

export function LastUpdatedBadge({ date, className }: LastUpdatedBadgeProps) {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    let colorClass = "bg-red-500";
    if (diffInMinutes < 60) {
        colorClass = "bg-green-500";
    } else if (diffInMinutes <= 300) {
        colorClass = "bg-yellow-500";
    }

    return (
        <Badge variant="outline" className={cn("gap-2 px-3 py-1", className)}>
            <span className="relative flex h-2 w-2">
                <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", colorClass)}></span>
                <span className={cn("relative inline-flex rounded-full h-2 w-2", colorClass)}></span>
            </span>
            <span>Vor {diffInMinutes} {diffInMinutes === 1 ? "Minute" : "Minuten"} aktualisiert</span>
        </Badge>
    );
}

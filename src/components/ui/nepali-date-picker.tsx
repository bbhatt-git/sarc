'use client';
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import { cn } from "@/lib/utils";

interface NepaliDatePickerProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    inputClassName?: string;
}

export function NepaliDatepicker({ value, onChange, className, inputClassName }: NepaliDatePickerProps) {
    return (
        <NepaliDatePicker
            inputClassName={cn(
                "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                inputClassName
            )}
            className={cn("w-full", className)}
            value={value}
            onChange={onChange}
            options={{ calenderLocale: "ne", valueLocale: "en" }}
        />
    )
}

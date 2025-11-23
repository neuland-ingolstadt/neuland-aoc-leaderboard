"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CopyCodeInputProps {
    code: string
}

export function CopyCodeInput({ code }: CopyCodeInputProps) {
    const [hasCopied, setHasCopied] = React.useState(false)

    const onCopy = async () => {
        try {
            await navigator.clipboard.writeText(code)
            setHasCopied(true)

            setTimeout(() => {
                setHasCopied(false)
            }, 2000)
        } catch (err) {
            // Error while copying
        }
    }

    return (
        <div className="w-full max-w-sm space-y-2">
            <div className="relative">
                <Input
                    type="text"
                    value={code}
                    readOnly
                    className="pr-12 font-mono bg-muted cursor-default text-muted-foreground"
                />

                <Button
                    size="icon"
                    variant="outline"
                    onClick={onCopy}
                    className="absolute right-0 top-1/2 h-8 w-8 -translate-y-1/2"
                    disabled={hasCopied}
                >
                    {hasCopied ? (
                        <Check className="h-4 w-4 text-accent" />
                    ) : (
                        <Copy className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">kopieren</span>
                </Button>
            </div>
        </div>
    )
}
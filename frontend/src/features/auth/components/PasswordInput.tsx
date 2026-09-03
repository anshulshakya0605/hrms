import type React from "react";
import { useState } from "react";


interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string
}

export function PasswordInput({ error, className = "", ...props }: PasswordInputProps) {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <div className="relative">
                <input
                    {...props}
                    type={
                        showPassword ? "text" : "password"
                    }
                    className={`w-full rounded-lg border border-input bg-background px-4 py-3 pr-20 text-foreground outline-none transition focus:border-primary ${className}`}
                />

                <button
                    type="button"
                    onClick={() =>
                        setShowPassword((value) => !value)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                >
                    {showPassword ? "Hide" : "Show"}
                </button>
            </div>

            {error && (
                <p className="mt-1 text-sm text-destructive">
                    {error}
                </p>
            )}
        </div>
    )

}
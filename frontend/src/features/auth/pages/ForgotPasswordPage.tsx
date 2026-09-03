import { useState } from "react";
import { useForm } from "react-hook-form";
import { type ForgotPasswordFormData, forgotPasswordSchema } from "../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getApiErrorMessage } from "../utils/auth-error";
import { authApi } from "../api/auth.api";
import { Link } from "react-router-dom";



export function ForgotPasswordPage() {

    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema), defaultValues: { email: "" }
    })

    const onSubmit = async (data: ForgotPasswordFormData) => {
        try {

            setServerError("");
            setSuccessMessage("");

            const response = await authApi.forgotPassword(data)
            setSuccessMessage(response.message)
            reset();
        } catch (error) {
            setServerError(
                getApiErrorMessage(error)
            )
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8">
                <h1 className="text-2xl font-bold text-card-foreground">Forgot Password</h1>
                <p className="mt-2 text-sm text-muted-foreground">Enter your email to reset your password</p>

                {
                    serverError && (
                        <div className="mt-5 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{serverError}</div>
                    )
                }
                {successMessage && (
                    <div className="mt-5 rounded-lg bg-primary/10 p-3 text-sm text-primary">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-card-foreground">Email</label>
                        <input type="email"
                            {...register("email")}
                            placeholder="Enter your email"
                            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-destructive">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground disabled:opacity-60"
                    >
                        {isSubmitting
                            ? "Sending..."
                            : "Send Reset Link"}
                    </button>
                </form>
                <Link
                    to="/login"
                    className="mt-5 block text-center text-sm text-primary hover:underline"
                >
                    Back to Login
                </Link>

            </div>
        </main>
    )

}
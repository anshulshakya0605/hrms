import { useState } from "react";

import {
    useForm,
} from "react-hook-form";

import {
    zodResolver,
} from "@hookform/resolvers/zod";

import {
    Link,
    useNavigate,
    useSearchParams,
} from "react-router-dom";



import { authApi } from "../api/auth.api";

import { getApiErrorMessage } from "../utils/auth-error";

import { PasswordInput } from "../components/PasswordInput";
import { resetPasswordSchema, type ResetPasswordFormData } from "../schemas/login.schema";

export function ResetPasswordPage() {
    const navigate = useNavigate();

    const [searchParams] =
        useSearchParams();

    const token = searchParams.get("token");

    const [serverError, setServerError] =
        useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(
            resetPasswordSchema,
        ),
    });

    const onSubmit = async (
        data: ResetPasswordFormData,
    ) => {
        if (!token) {
            setServerError(
                "Invalid or missing reset token.",
            );

            return;
        }

        try {
            setServerError("");

            await authApi.resetPassword({
                token,
                ...data,
            });

            navigate("/login", {
                replace: true,
                state: {
                    message:
                        "Password reset successfully. Please login.",
                },
            });
        } catch (error) {
            setServerError(
                getApiErrorMessage(error),
            );
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8">
                <h1 className="text-2xl font-bold text-card-foreground">
                    Reset Password
                </h1>

                {serverError && (
                    <div className="mt-5 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                        {serverError}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-6 space-y-5"
                >
                    <div>
                        <label className="mb-2 block text-sm font-medium text-card-foreground">
                            New Password
                        </label>

                        <PasswordInput
                            placeholder="Enter new password"
                            {...register("password")}
                            error={errors.password?.message}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-card-foreground">
                            Confirm Password
                        </label>

                        <PasswordInput
                            placeholder="Confirm new password"
                            {...register("confirmPassword")}
                            error={
                                errors.confirmPassword?.message
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || !token}
                        className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground disabled:opacity-60"
                    >
                        {isSubmitting
                            ? "Resetting..."
                            : "Reset Password"}
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
    );
}
import { useState } from "react";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";



import { authApi } from "../api/auth.api";

import { getApiErrorMessage } from "../utils/auth-error";

import { PasswordInput } from "../components/PasswordInput";
import { changePasswordSchema, type ChangePasswordFormData } from "../schemas/login.schema";

export function ChangePasswordPage() {
  const [serverError, setServerError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(
      changePasswordSchema,
    ),
  });

  const onSubmit = async (
    data: ChangePasswordFormData,
  ) => {
    try {
      setServerError("");
      setSuccessMessage("");

      const response =
        await authApi.changePassword(data);

      setSuccessMessage(response.message);

      reset();
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
          Change Password
        </h1>

        {serverError && (
          <div className="mt-5 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            {serverError}
          </div>
        )}

        {successMessage && (
          <div className="mt-5 rounded-lg bg-primary/10 p-3 text-sm text-primary">
            {successMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-card-foreground">
              Current Password
            </label>

            <PasswordInput
              placeholder="Current password"
              {...register("currentPassword")}
              error={
                errors.currentPassword?.message
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-card-foreground">
              New Password
            </label>

            <PasswordInput
              placeholder="New password"
              {...register("newPassword")}
              error={
                errors.newPassword?.message
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-card-foreground">
              Confirm Password
            </label>

            <PasswordInput
              placeholder="Confirm password"
              {...register("confirmPassword")}
              error={
                errors.confirmPassword?.message
              }
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground disabled:opacity-60"
          >
            {isSubmitting
              ? "Changing..."
              : "Change Password"}
          </button>
        </form>
      </div>
    </main>
  );
}
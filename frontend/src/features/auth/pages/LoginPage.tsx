import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { loginSchema, type LoginFormData } from '../schemas/login.schema'
import { useLogin } from '../hooks/use-login'
import { ThemeToggle } from '../../../components/ui/ThemeToggle'
import { useNavigate } from 'react-router-dom'
import { getApiErrorMessage } from '../utils/auth-error'
import { PasswordInput } from '../components/PasswordInput'

const LoginPage = () => {

    const navigate = useNavigate();
    const { loginUser, isLoading } = useLogin();
    const [serverError, setServerError] = useState('')

    const { register, handleSubmit, formState: { errors }, } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "", password: ""
        }
    })


    const onSubmit = async (data: LoginFormData) => {
        try {
            setServerError("")
            const response = await loginUser(data);
            navigate('/', { replace: true })
            console.log("Login successful", response);

        } catch (error) {
            setServerError(
                getApiErrorMessage(error)
            )
        }
    }

    return (
        <main className='relative flex min-h-screen items-center justify-center bg-background px-4 text-foreground'>
            <div className="absolute right-6 top-6">
                <ThemeToggle />
            </div>
            <div className='w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm'>
                <h1 className="text-3xl font-bold text-card-foreground">
                    Welcome Back
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Login to your HRMS account
                </p>


                <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-card-foreground">Email</label>
                        <input
                            id='email'
                            type="email"
                            placeholder='Enter you email'
                            autoComplete='email'
                            className='w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary'
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className='mt-1 text-sm text-destructive'> {errors.email.message} </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-card-foreground">Password</label>
                        <PasswordInput
                            type="password"
                            placeholder='Enter your password'
                            autoComplete='current-password'
                            className='w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary'
                            {...register("password")}
                            error={errors.password?.message}
                        />
                        {/* {errors.password && (
                            <p className='mt-1 text-sm text-destructive'> {errors.password.message} </p>
                        )} */}
                    </div>

                    {serverError && (
                        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                            {serverError}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>

                </form>
            </div>
        </main>
    )
}

export default LoginPage

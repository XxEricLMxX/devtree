import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import axios, {isAxiosError} from 'axios';
import {toast} from 'sonner'
import type { RegisterForm } from '../types'; 
import ErrorMessage from '../components/ErrorMessage';
import api from '../config/axios';

export default function RegisterView() {
    const initialValues = {
        name: '',
        email: '',
        handle: '',
        password: '',
        password_confirmation: ''
    }
    const { register, watch, reset, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
    const password = watch('password')
    const handleRegister = async (formData : RegisterForm) => {
        try {
            const {data} = await api.post(`/auth/register`, formData)
            toast.success(data)
            reset()
        } catch (error) {
            if(isAxiosError(error) && error.response){
               toast.error(error.response?.data.error)
            }
        }
    }
    return (
        <>
            <h1 className=" text-4xl text-white font-bold">Crear cuenta</h1>

                <form
                    onSubmit={handleSubmit(handleRegister)}
                    className="mt-10 space-y-6">

                    <div>
                        <label htmlFor="name" className="block text-white text-sm mb-1">
                            Nombre completo
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="Tu nombre"
                            {...register('name', {
                                required: "El nombre es obligatorio"
                            })}
                        />
                        {errors.name && <ErrorMessage triggerKey={Date.now()} >{errors.name.message}</ErrorMessage>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-white text-sm mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="tu@email.com"
                            {...register('email', {
                                required: "El email es obligatorio",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "E-mail no válido",
                                },
                            })}
                        />
                        {errors.email && <ErrorMessage triggerKey={Date.now()} >{errors.email.message}</ErrorMessage>}
                    </div>

                    <div>
                        <label htmlFor="handle" className="block text-white text-sm mb-1">
                            Nombre de usuario / Handle
                        </label>
                        <input
                            type="text"
                            id="handle"
                            className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="@usuario"
                            {...register("handle", {
                                required: "El Handle es obligatorio"
                            })}
                        />
                        {errors.handle && <ErrorMessage triggerKey={Date.now()} >{errors.handle.message}</ErrorMessage>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-white text-sm mb-1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="••••••••"
                            {...register('password', {
                                required: "La contraseña es obligatoria",
                                minLength: {
                                    value : 8,
                                    message: "La contraseña debe tener minimo 8 caracteres"
                                }
                            })}
                        />
                        {errors.password && <ErrorMessage triggerKey={Date.now()} >{errors.password.message}</ErrorMessage>}
                    </div>

                    <div>
                        <label htmlFor="password_confirmation" className="block text-white text-sm mb-1">
                            Repetir contraseña
                        </label>
                        <input
                            type="password"
                            id="password_confirmation"
                            className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="••••••••"
                            {...register('password_confirmation', {
                                required: "La contraseña es obligatoria",
                                validate: (value) => value === password || 'Las contraseñas no son iguales 🙃'
                            })}
                        />
                        {errors.password_confirmation && <ErrorMessage triggerKey={Date.now()} >{errors.password_confirmation.message}</ErrorMessage>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                        Crear cuenta
                    </button>
                </form>

            <nav className="mt-10">
                <Link
                    className="text-center text-white text-lg block"
                    to="/auth/login">
                    Ya tienes una cuenta? Inicia sesion aqui
                </Link>
            </nav>
        </>
    )
}

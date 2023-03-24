import React from 'react'
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../../network/api';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { chatContext } from '../../../store/ChatContext';
import { useContext } from 'react';

const schema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().min(8).required(),
}).required();

function Login({ }) {
    const navigate = useNavigate();
    const { account, setAccount } = useContext(chatContext)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = data => {

        api.add('/auth/login', data)
            .then(res => {
                setTimeout(() => {
                    navigate('confirm', { state: { webUserId: res._id } })
                }, 5000)
                toast.success('Successfully Login!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
            .catch(err => {
                console.log('Err', err);
                toast.error('Email or password invalid!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
        console.log(data)

    };

    const handleClick = () => {
        setAccount(true)
    }
    return (
        <>
            <ToastContainer />
            <div className='register'>
                <div className='register-area'>
                    <h1>Login</h1>
                    <form
                        className='register-form'
                        onSubmit={handleSubmit(onSubmit)} >
                        <div className='input-box'>
                            <input
                                type="text"
                                id='email'
                                name='email'
                                placeholder='email'{...register("email")} />
                            <p>{errors.email?.message}</p>
                        </div>
                        <div className='input-box'>
                            <input
                                type="password"
                                id='password'
                                name='password'
                                placeholder='password'
                                {...register("password")} />
                            <p>{errors.password?.message}</p>
                        </div>
                        <button className='submitbtn' type='submit'>Submit</button>
                        <div className='route'>
                            <p>Don't have an account?</p>
                            <span onClick={handleClick}>Register now</span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login

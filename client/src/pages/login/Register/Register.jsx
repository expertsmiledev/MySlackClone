import React, { useState, useContext } from 'react'
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authContext } from '../../../store/AuthContext';
import { chatContext } from '../../../store/ChatContext';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import "./style.css"
import { api } from '../../../network/api';

const schema = yup.object({
  username: yup.string().required().min(3),
  email: yup.string().required().email(),
  password: yup.string().min(8).required(),
  image: yup.mixed().test("file", "You need to provide a file", (value) => {
    if (value.length > 0) {
      return true;
    }
    return false;
  }),

}).required();

function Register() {
  const { account, setAccount } = useContext(chatContext)
  const [selectimage, setSelectİmage] = useState("")
  const { setUser } = useContext(authContext)
  const [registerUser, setRegisterUser] = useState({
    username: "",
    email: "",
    password: "",
    image: ""
  })
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = data => {
    api.add('/auth/register', registerUser)
      .then(res => {
        console.log(res)
        setTimeout(() => {
          setAccount(false)
        }, 5000)
        toast.success('Successfully Registered!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        localStorage.setItem("user", JSON.stringify(res))
      })
      .catch(err => {
        console.log(err.message);
        toast.error('This email is already registered', {
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
  };

  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    setRegisterUser({
      ...registerUser,
      [name]: value
    })
  }
  const handleİmage = (e) => {
    const reader = new FileReader()
    reader.onload = () => {
      setSelectİmage(reader.result)
      setRegisterUser({
        ...registerUser,
        image: reader.result
      })
    }
    reader.readAsDataURL(e.target.files[0])
    console.log("salam")
  }
  const handleClick = () => {
    setAccount(false)
  }
  return (
    <>
      <ToastContainer />
      <div className='register'>
        <div className='register-area'>
          <h1>Register</h1>
          <form
            className='register-form'
            onSubmit={handleSubmit(onSubmit)}>
            <div className='input-box'>
              <input
                type="text"
                id='name'
                name='username'
                placeholder='username'
                {...register("username", {
                  onChange: handleInput
                })} />
              <p>{errors.username?.message}</p>
            </div>
            <div className='input-box'>
              <input
                type="text"
                id='email'
                name='email'
                placeholder='email'
                {...register("email", {
                  onChange: handleInput
                })} />
              <p>{errors.email?.message}</p>
            </div>
            <div className='input-box'>
              <input
                type="password"
                id='password'
                name='password'
                placeholder='password'
                {...register("password", {
                  onChange: handleInput
                })} />
              <p>{errors.password?.message}</p>
            </div>
            <div className='input-box'>
              <div className='file-image'>
                <div className='image'>
                  {selectimage ? <img className='file-img' src={selectimage} alt="" /> : ""}
                </div>
                <label
                  className='choosenlabel'
                  htmlFor="image">
                  Choose İmage
                </label>
                <input
                  type="file"
                  id='image'
                  name='image'
                  onChange={handleİmage}
                  hidden
                  {...register("image", {
                    onChange: handleİmage
                  })} />
              </div>
              <p>{errors.image?.message}</p>
            </div>
            <button
              className='submitbtn'
              type='submit'>
              Submit
            </button>
            <div className='route'>
              <p>
                Do you already have an account?</p>
              <span onClick={handleClick}>Login now</span>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register

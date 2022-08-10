import React from 'react'
import {useState,useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {login, reset} from '../features/auth/authSlice'
import {useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'

function Login() {

    const navigate = useNavigate()


    const [formData, setFormData] = useState({
       
        email:'',
        password:'',
       
    })

    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)


    const {email, password} = formData

    const onChange = (e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit=(e)=>{
        e.preventDefault()

        const userData = {
            email,
            password
        }
        dispatch(login(userData))

      
    }

    
    useEffect (()=>{
       
        if (isError){
            toast.error('Invalid Credentials')
            
        }
        if (isSuccess || user){
                navigate('/')
        }
        dispatch(reset())
    },[isError,isSuccess,user,navigate,dispatch])



    if (isLoading){
        return <Spinner />
    }


  return (
    <>
    <section className="heading">
    <h1>
        <FaSignInAlt />Login
    </h1>
    <p>Please log in to get support</p>
    </section>
    <section className="form">
        <form onSubmit = {onSubmit}>
            
            <div className="form-group">
                <input type="email" className="form-control" id = 'email' value = {email} onChange = {onChange} placeholder = 'Enter Your Email' name = 'email' required/>
            </div>
            <div className="form-group">
                <input type="password" className="form-control" id = 'password' value = {password} onChange = {onChange} placeholder = 'Enter Your Password' name = 'password' required/>
            </div>
            <div className="form-group">
            <button className="btn btn-block">
                Submit
            </button>
            </div>
        </form>
    </section>
    </>
  )
}

export default Login
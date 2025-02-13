import React, { useContext, useState } from 'react' 
import { FormContext } from '../context/FormContext'
import { useNavigate } from 'react-router'


const Form = () => {

const [name, setName] = useState('')
const [email, setEmail] =useState('')
const [github, setGithub] = useState('')
const [errors, setErrors] = useState({})
const {data, setData} = useContext(FormContext)
const navigate = useNavigate()

const validate = () => {
    const newErrors = {};
    
    if (!name.trim()) {
        newErrors.name = 'Full Name is required';
    }

    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email)) {
        newErrors.email = 'Please enter a valid email address';
    }

    if (!github.trim()) {
        newErrors.github = 'GitHub Username is required';
    }

    return newErrors;
}

const handleSubmit = (e) =>{
    e.preventDefault()
    const Errors = validate();

    if (Object.keys(Errors).length === 0) {
      
        setData((prevdata) => [...prevdata, {name, email, github}])
        console.log(data)
        navigate('/ticket')
    } else {
 
        setErrors(Errors);
    }
}


    return (
       
            
            <form onSubmit={handleSubmit}>
                <label htmlFor="full-name"> Full Name </label>
                <input type="text" id='full-name' name='full-name' onChange={(e) => setName(e.target.value)} />
                {errors.name && <p className='error'> <object data="/images/icon-info.svg" type="image/svg+xml"></object>{errors.name}</p>}

                <label htmlFor="email">Email Address </label>
                <input type="email" placeholder='example@email.com' id='email' name='email' onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <p className='error'> <object data="/images/icon-info.svg" type="image/svg+xml"></object>{errors.email}</p>}

                <label htmlFor="github-account">GitHub Username</label>
                <input type="text" placeholder='@yourusername' id='github-account' name='github-account' onChange={(e) => setGithub(e.target.value)} />
                {errors.github && <p className='error'> <object data="/images/icon-info.svg" type="image/svg+xml"></object>{errors.github}</p>}

                <button type='submit' className='generator' > Generate My Ticket</button>
            </form>

       
    )
}

export default Form
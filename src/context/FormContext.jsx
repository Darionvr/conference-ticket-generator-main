import React, { createContext, useContext, useState } from 'react'


export const FormContext = createContext()

export const FormProvider = ({children}) => {

const [data, setData] = useState([])
const [avatar, setAvatar] = useState([])

  return (

    <FormContext.Provider value={{data, setData, avatar, setAvatar}}> 
        {children}
    </FormContext.Provider>
  )
}

export default FormProvider;

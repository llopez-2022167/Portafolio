'use strict' //Modo estricto

import User from './user.model.js'
import { encrypt, checkPassword} from './utils/validator.js'

export const test = (req, res)=>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const register = async(req, res)=>{
    try{
        //Capturar el formulario (body)
        let data = req.body
        console.log(data)
        //Encriptar la contraseña
        data.password = await encrypt(data.password)
        //Asignar el rol por defecto
        data.role = 'CLIENT'
        //Guardar la información en la BD
        let user = new User(data)
        await user.save()
        //Responder al usuario
        return res.send({message: `Registered successfully, can be logged with email use ${user.username}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering user', err: err})
    }
}


export const login = async(req, res)=>{
    try {
        //Capturar los datos (body)
        let{ username, password } = req.body

        //Validar que el usuario existe
        let user = await User.findOne({username}) //buscar un solo registro. username: 'bmmaroquin'

        //verificar que la contraseña coincida
        if (user && await checkPassword(password, user.password)){
            let loggedUser ={
                username: user.username,
                name:user.name,
                role: user.role
            }

            //Respnda al usuario
            return res.send({message: `Welcome, ${loggedUser.name}`, loggedUser})  
        }
        return res.status(404).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to login'})
    }    
}
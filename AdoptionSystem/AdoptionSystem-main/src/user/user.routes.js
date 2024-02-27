import express from 'express'
import { test, register, login } from './user.controller.js';

const api = express.Router();

api.get('/test', test)
api.post('/register', register)
api.post('/login', login)


export default api
import { getTemplate, saveAndRedirect, checkContext } from "../helpers/helper.js"
import { register, logout, login } from "../models/userModel.js"
import { removeUser } from "../helpers/storage.js"
import { getAllEvents } from "../models/eventsModel.js"

export function getLogin(context) {

    getTemplate('user/login.hbs', context)    
}


export function postLogin(context) { 

    console.log(context.params)
    login(context.params)
    .then(saveAndRedirect.bind(undefined, '#/home', context))
    .catch(console.log)
}

export function getRegister(context) {
    getTemplate('user/register.hbs', context)    
}
export function postRegister(context) {
    
    if(context.params.password !== context.params.rePassword){
        alert('Paswords dont match!')
        throw new Error('Password dont match!')
    }
    let data = {
        username: context.params.username,
        password: context.params.password
    }
    register(data)
    .then(saveAndRedirect.bind(undefined, '#/home', context))
    .catch(console.log)
}
export function logoutUser(context) {

    logout()
    .then(()=>{
        removeUser();
        context.redirect('#/home')
    })
}

export async function getProfile(context) {
    let newContext = checkContext(context);
    let events = await getAllEvents();

    console.log(events)
    let myEvents = events.filter((e) => e.organizer === newContext.username)
    newContext.events = myEvents;
    newContext.numberOfEvents = myEvents.length;
    getTemplate('user/profile.hbs', newContext)
}
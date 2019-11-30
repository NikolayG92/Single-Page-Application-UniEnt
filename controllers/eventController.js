import { getTemplate, checkContext } from "../helpers/helper.js"
import { getData } from "../helpers/storage.js";

import * as create from "../models/eventsModel.js"



export function getCreate(context) {

    let newContext = checkContext(context)
    getTemplate('events/create.hbs', newContext)  
}

export function postCreate(context) {
  
    const data = {
        ...context.params,
        peopleInterestedIn: 0,
        organizer: JSON.parse(getData('userInfo')).username
    };
    create.create(data)
    .then(()=>{
        context.redirect('#/home')
    })
    .catch(console.log)
}

export async function getDetails(context) {

    let newContext = checkContext(context);
    let event = await create.getEvent(context.params.id);

    Object.keys(event).forEach((e)=>{
        newContext[e] = event[e];
    });
 
    newContext.isOrganizer = newContext.username === event.organizer;
    getTemplate('events/eventsDetails.hbs', newContext)  


}

export async function getEdit(context) {
    let newContext = checkContext(context);
    let event = await create.getEvent(context.params.id);
    Object.keys(event).forEach((ev) => {
        newContext[ev] = event[ev];
    })
 
     getTemplate('events/editEvents.hbs', context)
}

export function postEdit(context) {

    let newContext = checkContext(context);
    let data = {
        ...context.params
    }

    delete data.id
    create.edit(context.params.id, data)
    .then(()=> {
        newContext.redirect(`#/details/${context.params.id}`);
    })
    .catch(console.error)
}

export function closeEvent(context) {
    
    create.close(context.params.id)
    .then(() => {
        context.redirect('#/home');
    });
}

export async function joinEvent(context) {
    let newContext = checkContext(context);
    let event = await create.getEvent(context.params.id);
    event.peopleInterestedIn++;
    Object.keys(event).forEach((ev) => {
        newContext[ev] = event[ev];
    })

    create.edit(context.params.id, event)
    .then((ev) => {
        newContext.redirect(`#/details/${context.params.id}`)
    })
    console.log(context)
}
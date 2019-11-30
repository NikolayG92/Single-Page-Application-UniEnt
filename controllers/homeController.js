import { getTemplate, checkContext } from "../helpers/helper.js";
import { getAllEvents } from "../models/eventsModel.js";

export async function getHome(context) {

    let newContext = checkContext(context);

    let events = await getAllEvents();

    newContext.events = events;

    getTemplate('home.hbs', newContext);
}
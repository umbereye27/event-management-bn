import Joi from 'joi';

export const userValidations = () => {
    return Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    });
};
export const eventsValidations = ()=>{
    return Joi.object({
        title: Joi.string().alphanum().min(3).max(30).required(),
        location: Joi.string().alphanum().min(3).max(30).required(),
        ticketAvailability : Joi.number().required(),
        date: Joi.date().required()
    });
}

export const bookingValidations = ()=>{

}
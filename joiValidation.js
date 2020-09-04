import Joi from 'joi';

const joiSchema = Joi.object({
    nom: Joi.string().min(3).required()
})

export {joiSchema};
import Joi from 'joi';

const createPetSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required().alphanum().max(50).min(4),
    species: Joi.string().required().min(4).max(20),
    carry: Joi.string().required().max(20),
    weight: Joi.number().required().max(50),
    date_of_birth: Joi.string().required().min(4).max(30),
  }),
});

export { createPetSchema };

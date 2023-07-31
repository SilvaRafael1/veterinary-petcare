import Joi from 'joi';

const updatePetSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().max(50).min(4),
    species: Joi.string().min(1).max(20),
    carry: Joi.string().max(20),
    weight: Joi.number().max(50),
    date_of_birth: Joi.string().min(4).max(30),
  }),
});

export { updatePetSchema };

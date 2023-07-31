import Joi from 'joi';

const updateTutorSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().max(50).min(4),
    password: Joi.string().min(6),
    phone: Joi.string().min(4).max(20),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    date_of_birth: Joi.string().min(4).max(30),
    zip_code: Joi.string().min(4).max(20),
  }),
});

export { updateTutorSchema };

import Joi from 'joi';

const createTutorSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required().max(50).min(4),
    password: Joi.string().required().min(6),
    phone: Joi.string().required().min(4).max(20),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    date_of_birth: Joi.string().required().min(4).max(30),
    zip_code: Joi.string().required().min(4).max(20),
  }),
});

export { createTutorSchema };

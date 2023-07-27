import Joi from 'joi';

const tutorSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().alphanum().max(50).min(4),
    password: Joi.string()
      .min(6)
      .pattern(/^[a-zA-Z0-9]{3,30}$/),
    phone: Joi.string().min(4).max(20),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    date_of_birth: Joi.string().min(4).max(30),
    zip_code: Joi.string().min(4).max(20),
  }),
});

export { tutorSchema };

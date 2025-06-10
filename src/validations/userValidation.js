import Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  email: Joi.string().email(),
}).or('name', 'email'); // at least one must be present

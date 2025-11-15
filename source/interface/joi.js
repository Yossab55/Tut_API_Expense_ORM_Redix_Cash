import joi from "joi";

const validationOptions = {
  abortEarly: false,
};
const Joi = {
  createObject: function createObject(schema) {
    return joi.object(schema);
  },
  string: function stringSchemaJoi() {
    return joi.string();
  },
  number: function numberSchemaJoi() {
    return joi.number();
  },
  boolean: function booleanSchemaJoi() {
    return joi.boolean();
  },
  date: function dateSchemaJoi() {
    return joi.date();
  },
  email: function emailSchemaJoi() {
    return joi.string().email();
  },
  arrayItems: function arrayItemsJoi(itemsSchema) {
    return joi.array().items(itemsSchema);
  },
  reference: function referenceJoi(column) {
    return joi.ref(column);
  },

  between: function betweenJoi(min = 8, max = 32, schema) {
    // if it's a an email or password or any schema you want
    if (schema) return schema.min(min).max(max);
    return joi.string().min(min).max(max);
  },

  required: function requiredJoi() {
    return joi.required();
  },
  //@ sync validation
  createValidator: function createValidator(joiSchema) {
    return function validator(payload) {
      return joiSchema.validate(payload, validationOptions);
    };
  },
  //@ async validation
  createValidatorAsync: function createValidatorAsync(joiSchema) {
    return async function validatorAsync(payload) {
      return await joiSchema.validateAsync(payload, validationOptions);
    };
  },
};
export { Joi };

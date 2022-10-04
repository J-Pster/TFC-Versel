import { ErrorRequestHandler } from 'express';
import { NotJoiStatus } from './errorTypes/NotJoi';
import { JoiStatus } from './errorTypes/Joi';

const errJoi : ErrorRequestHandler = (err, _req, res, next): void => {
  // Se for um erro Joi
  console.log('Bateu no De Joi!');
  console.table(err);
  
  if (!err.isJoi) return next(err);
  
  console.table(err.details);

  const status: number = JoiStatus[err.details[0].type] || 500;
  
  res.status(status).json({ message: err.message });
};
  
const errNotJoi : ErrorRequestHandler = (err, _req, res, _next): void => {
  console.log('Bateu no Sem Joi!');
  console.log('Erro Sem Joi Detectado!');
  console.table(err);
  console.log(err);
  
  const status: number = NotJoiStatus[err.code] || 500;
  
  res.status(status).json({ message: err.message });
};

export {
  errJoi,
  errNotJoi,
};
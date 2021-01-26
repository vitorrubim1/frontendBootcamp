import { ValidationError } from "yup"; // typagem pro erro

interface Errors {
  [key: string]: string; // como vou usar esse arquivo pra mais validações de erros, a chave do erro pode mudar, então eu crio [key: string] pra que seja dinâmico
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach((error) => {
    // .inner é aonde está os erros de fato
    if (error.path) {
      validationErrors[error.path] = error.message;
    }
  });

  return validationErrors;
}

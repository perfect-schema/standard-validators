
import baseValidationWrapper from './base';

import stringValidationWrapper from './primitives/string';


const typeMap = {
  [String]: stringValidationWrapper,

};



export default function validationWrapper(schema) {
  const { fields } = schema;


  // TODO

};

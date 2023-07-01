import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const reset = (newFormState = initialState) => {
    setValues(newFormState);
  };

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  const handleInputChangeAndCounter = (e, type) => {
    if (typeof e === 'number' && type !== undefined) {
      if (type === 'plus') {
        setValues({
          ...values,
          ['sAmount']: +values.sAmount + e
        });
      } else if (type === 'minus') {
        if (values.sAmount > 0) {
          setValues({
            ...values,
            ['sAmount']: +values.sAmount - e
          });
        }
      } else {
        setValues({
          ...values,
          ['sAmount']: 0
        });
      }
    } else {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleInput = (target, valuemod, target2, valuemod2, target3, valuemod3) => {
    setValues({
      ...values,
      [target.name]: valuemod,
      [target2.name]: valuemod2,
      [target3.name]: valuemod3,
    });
  };
  const handleInput2 = (target, valuemod) => {
    setValues({
      ...values,
      [target.name]: valuemod,
    });
  };
  return [values, handleInputChange, reset, handleInput, handleInput2, handleInputChangeAndCounter];
};

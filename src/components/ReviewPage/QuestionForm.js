import React from "react";
import { Box, Button, TextInput } from "grommet";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setBookingPerson } from "../../features/paymentSlice";

const QuestionForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(setBookingPerson(data));
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box direction="column" gap="medium">
        {/* register your input into the hook by invoking the "register" function */}
        <TextInput
          placeholder="Name"
          {...register("name", { required: true })}
        />
        {errors.name && <span>This field is required</span>}

        <TextInput
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>This field is required</span>}
        <TextInput placeholder="Phone" {...register("phone")} />
        {/* errors will return when field validation fails  */}

        <TextInput
          placeholder="Aesthetics"
          {...register("aesthetics", { required: true })}
        />
        {errors.aesthetics && <span>This field is required</span>}

        <Button primary label="Next: Payment Details" type="submit" />
      </Box>
    </form>
  );
};

export default QuestionForm;

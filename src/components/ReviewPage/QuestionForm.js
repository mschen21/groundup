import React from "react";
import { Box, Button, FormField, TextInput } from "grommet";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setBookingPerson } from "../../features/paymentSlice";

const QuestionForm = ({ bookingDetailsPerson }) => {
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
      <Box direction="column" gap="medium" fill="horizontal">
        {/* register your input into the hook by invoking the "register" function */}
        <FormField
          label={
            <Box align="center" alignContent="center">
              Name
            </Box>
          }
          required={{ indicator: true }}
          fill="horizontal"
          width="large"
        >
          <TextInput
            {...register("name", { required: true })}
            defaultValue={bookingDetailsPerson?.name}
          />
        </FormField>

        <FormField
          label={
            <Box align="center" alignContent="center">
              Email
            </Box>
          }
          required={{ indicator: true }}
        >
          <TextInput
            {...register("email", { required: true })}
            defaultValue={bookingDetailsPerson?.email}
          />
        </FormField>
        {errors.email && <span>This field is required</span>}

        <FormField
          label={
            <Box align="center" alignContent="center">
              Phone
            </Box>
          }
          required={{ indicator: true }}
        >
          <TextInput
            {...register("phone")}
            defaultValue={bookingDetailsPerson?.phone}
          />
        </FormField>

        <TextInput
          placeholder="Aesthetics"
          {...register("aesthetics", { required: true })}
          defaultValue={bookingDetailsPerson?.aesthetics}
        />
        {errors.aesthetics && <span>This field is required</span>}

        <Button primary label="Next: Payment Details" type="submit" />
      </Box>
    </form>
  );
};

export default QuestionForm;

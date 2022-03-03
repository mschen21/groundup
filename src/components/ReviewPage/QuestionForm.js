import React from "react";
import { Box, Button, FormField, TextArea, TextInput } from "grommet";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setBookingPerson } from "../../features/paymentSlice";

const QuestionForm = ({ bookingDetailsPerson, updateActiveIndex }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    updateActiveIndex();
    dispatch(setBookingPerson(data));
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box direction="column" gap="medium">
        {/* register your input into the hook by invoking the "register" function */}
        <FormField
          label={
            <Box align="center" alignContent="center">
              Name
            </Box>
          }
          required={{ indicator: true }}
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

        <FormField
          label={
            <Box align="center" alignContent="center">
              Tell us more!
            </Box>
          }
          required={{ indicator: true }}
        >
          <TextArea
            fill
            {...register("details")}
            defaultValue={bookingDetailsPerson?.details}
          />
        </FormField>
        {errors.details && <span>This field is required</span>}

        <Button primary label="Next: Payment Details" type="submit" />
      </Box>
    </form>
  );
};

export default QuestionForm;

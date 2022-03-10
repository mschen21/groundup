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
          label="Name"
          required={{ indicator: true }}
          error={errors.name && `This field is required`}
        >
          <TextInput
            {...register("name", { required: true })}
            defaultValue={bookingDetailsPerson?.name}
          />
        </FormField>

        <FormField
          label="Email"
          required={{ indicator: true }}
          error={errors.email && `This field is required`}
        >
          <TextInput
            {...register("email", { required: true })}
            defaultValue={bookingDetailsPerson?.email}
          />
        </FormField>

        <FormField label="Phone" required={{ indicator: true }}>
          <TextInput
            {...register("phone")}
            defaultValue={bookingDetailsPerson?.phone}
          />
        </FormField>

        <FormField
          label="Share who will be involved in the shoot and more details about you!
"
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

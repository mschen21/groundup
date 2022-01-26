export const createBooking = `
    mutation CreateBooking($input: CreateBookingInput!) {
        createBooking(input: $input) {
            bookingId
            bookingStatus
            customerEmail
            customerName
            customerPhone
            descriptionDetails
            emailStatus
            endTime
            id
            fees
            location
            price
            notes
            serviceName
            sk
            startTime
        }
    }
  

`;

export const createPaymentIntent = `
    mutation CreatePaymentIntent($amount: Float!) {
        createPaymentIntent(amount: $amount) {
            amount
            clientSecret
        }
    }
`;

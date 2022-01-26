export const getCompany = `
    query GetCompany($companyId: ID!) {
        getCompany(companyId: $companyId) {
            companyName
            createdAt
            createdBy
            id
            services {
                createdBy
                id
                maxPrice
                minPrice
                priceStrategy
                serviceName
                descriptionDetails
                sk
                status
                nextAvailability {
                    bookingId
                    startTime
                    serviceName
                    endTime
                    sk
                    status
                }
            }
        }
    }
`;

export const listAvailabilityByService = `
    query ListAvailabilityByService($endTime: String!, $limit: Int, $nextToken: String, $serviceId: ID!, $startTime: String!) {
        listAvailabilityByService(endTime: $endTime, serviceId: $serviceId, startTime: $startTime, limit: $limit, nextToken: $nextToken) {
            items {
                bookingId
                companyId
                currentPrice
                endTime
                id
                locations
                originalPrice
                serviceName
                sk
                startTime
                status
            }
            nextToken
        }
    }
`;

export const getBooking = `
    query GetBooking($bookingId: ID!, $bookingSk: ID, $companyId: ID) {
        getBooking(bookingId: $bookingId, bookingSk: $bookingSk, companyId: $companyId) {
            bookingId
            bookingStatus
            customerEmail
            customerName
            customerPhone
            descriptionDetails
            emailStatus
            endTime
            startTime
            sk
            serviceName
            price
            notes
            location
            id
            fees
        }
    }

`;

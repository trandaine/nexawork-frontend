export interface Customer {
    customerId: string;
    firstName: string;
    lastName: string;
    headline: string | null;
    summary: string | null;
    location: string | null;
    profilePictureUrl: string | null;
    backgroundPictureUrl: string | null;
    phoneNumber: string | null;
}

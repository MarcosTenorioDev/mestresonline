export interface IUser{
id:string,
externalId:string,
firstName:string,
lastName:string,
email:string,
phone:string,
role:string,
isPaid:string
subscriptionId:string
subscription: Subscription
}

export interface Subscription {
    id: string; // Unique identifier for the subscription
    userId: string; // Unique identifier for the user
    customerId: string; // Unique identifier for the customer
    billingEmail: string; // Email address for billing
    startDate: string; // ISO 8601 date string for the start date
    endDate: string; // ISO 8601 date string for the end date
    maxPostNumber: number; // Maximum number of posts allowed
    description: string; // Description of the subscription plan
    canAttachFile: boolean; // Whether file attachment is allowed
    canHaveManyProfiles: boolean; // Whether multiple profiles are allowed
}

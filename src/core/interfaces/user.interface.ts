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
    id: string;
    userId: string;
    customerId: string;
    billingEmail: string;
    startDate: string;
    endDate: string;
    maxPostNumber: number;
    description: string;
    canAttachFile: boolean;
    canHaveManyProfiles: boolean;
}

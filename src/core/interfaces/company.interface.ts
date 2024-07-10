export interface CompanyCreate {
    name: string;
    image: string
    description:string
}

export interface CompanyHomePage {
    id: string;
    name: string;
    description:string;
    image: string
    ownerId: string;
}
import { IOwner, IPost } from "./posts.interface";

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

export interface ICompany {
    id: string;
    name: string;
    ownerId: string;
    image: string;
    banner:string;
    description: string;
    owner: IOwner;
    posts: IPost[];
  }
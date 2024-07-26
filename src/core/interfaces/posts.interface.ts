import { IProducer } from "./producer.interface";

export interface IPost {
	id: string;
	content: string;
	publishedAt: string;
	authorId: string;
	companyId: string;
	imagePreview: string;
	title: string;
	contentPreview: string;
	isActive: boolean;
	author: IProducer;
	topics: {topic:{description:string, id:string}}[]
}

export interface IOwner {
	id: string;
	externalId: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string | null;
	role: string;
}

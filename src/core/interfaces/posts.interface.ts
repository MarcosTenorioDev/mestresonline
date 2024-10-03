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
	topics: { topic: { description: string; id: string } }[];
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

export type IParagraph = {
	type: "text" | "image";
	content: string;
};

type PostTopic = {
	id: string;
	description: string;
};

type PostAuthor = {
	id: string;
	email: string;
	name: string;
	imageProfile: string;
	office: string;
};

export type Post = {
	id: string;
	content: IParagraph[] | string;
	contentPreview: string;
	imagePreview: string;
	publishedAt: string;
	title: string;
	company: {
		name: string;
		publicCode: string;
	};
	author: PostAuthor;
	topics: PostTopic[];
};

export interface IRecommendationCard {
	id:string
	imagePreview: string;
	publishedAt:Date
	author: {
		imageProfile: string | null;
		name: string;
	};
	company: {
		name: string;
		publicCode: string;
	};
	title: string;
	contentPreview: string;
}

export interface IProducerCompany {
	id: string;
	name: string;
}

export interface IProducer {
	id: string;
	name: string;
	imageProfile: string;
	email: string;
	office: string | "";
	companyId?: string
}

export interface IProducerCreate {
	companyId: string;
	name: string;
	imageProfile: string | null;
	email: string;
	office: string | "";
}

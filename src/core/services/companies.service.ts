import { AxiosInterceptor } from "../interceptor/axios.interceptor";
import { CompanyCreate } from "@/core/interfaces/company.interface";

class CompaniesService {
	private axiosInterceptor: AxiosInterceptor = new AxiosInterceptor();
	private axios = this.axiosInterceptor.getAxiosInstance();

	constructor() {}

	async getCompanies() {
		const response = await this.axios.get(`${import.meta.env.VITE_API_DEV_URL}/companies`);
		return response.data;
	}

	async getCompanyById(id: string, externalId: string) {
		const response = await this.axios.get(`${import.meta.env.VITE_API_DEV_URL}/companies/${id}`, {
			params: { externalId }
		});
		return response.data;
	}

	async getAllTopicsByCompanyId(externalId: string, companyId: string) {
		const response = await this.axios.get(`${import.meta.env.VITE_API_DEV_URL}/companies/topics/${companyId}`, {
			params: { externalId }
		});
		return response.data;
	}

	async getAllProducersByCompanyId(companyId: string, externalId: string) {
		const response = await this.axios.get(`${import.meta.env.VITE_API_DEV_URL}/companies/producers/${companyId}`, {
			params: { externalId }
		});
		return response.data;
	}

	async createCompany(company: CompanyCreate) {
		const response = await this.axios.post(`${import.meta.env.VITE_API_DEV_URL}/companies`, company);
		return response.data;
	}

    /* AINDA NÃO EXISTE NO BACKEND */
	/* async updateCompany(id: string, company: Partial<CompanyCreate>) {
		const response = await this.axios.put(`${import.meta.env.VITE_API_DEV_URL}/companies/${id}`, company);
		return response.data;
	}

	async deleteCompany(id: string) {
		const response = await this.axios.delete(`${import.meta.env.VITE_API_DEV_URL}/companies/${id}`);
		return response.data;
	} */
}

export default CompaniesService;

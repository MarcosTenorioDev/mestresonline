import { AxiosInterceptor } from "../interceptor/axios.interceptor";
import { CompanyCreate, CompanyUpdate } from "@/core/interfaces/company.interface";

class CompaniesService {
	private axiosInterceptor: AxiosInterceptor = new AxiosInterceptor();
	private axios = this.axiosInterceptor.getAxiosInstance();

	constructor() {}

	async getCompanies() {
		const response = await this.axios.get(`${import.meta.env.VITE_API_DEV_URL}/companies`);
		return response.data;
	}

	async getCompanyById(id: string) {
		const response = await this.axios.get(`${import.meta.env.VITE_API_DEV_URL}/companies/${id}`);
		return response.data;
	}

	async getAllTopicsByCompanyId(companyId: string) {
		const response = await this.axios.get(`${import.meta.env.VITE_API_DEV_URL}/companies/topics/${companyId}`);
		return response.data;
	}

	async getAllProducersByCompanyId(companyId: string) {
		const response = await this.axios.get(`${import.meta.env.VITE_API_DEV_URL}/companies/producers/${companyId}`);
		return response.data;
	}

	async createCompany(company: CompanyCreate) {
		const response = await this.axios.post(`${import.meta.env.VITE_API_DEV_URL}/companies`, company);
		return response.data;
	}

    /* AINDA NÃO EXISTE NO BACKEND */
	async updateCompany(company: CompanyUpdate) {
		const response = await this.axios.put(`${import.meta.env.VITE_API_DEV_URL}/companies`, company);
		return response.data;
	}

	async updatePublicCode(payload:
		{publicCode:string, companyId:string}
	) {
		const response = await this.axios.put(`${import.meta.env.VITE_API_DEV_URL}/companies/publicCode`, payload);
		return response.data;
	}

	async isValidPublicCode(publicCode:string){
		const response = await this.axios.get(`${import.meta.env.VITE_API_DEV_URL}/companies/publicCode/isValid/${publicCode}`);
		return response.data;
	}

	async delete(companyId:string){
		const response = await this.axios.delete(`${import.meta.env.VITE_API_DEV_URL}/companies/${companyId}`);
		return response.data;
	}
	
	async getCompanyByName(name:string){
		const response = await this.axios.get(`${import.meta.env.VITE_API_DEV_URL}/companies/name/${name}`);
		return response.data;
	}
	/* async deleteCompany(id: string) {
		const response = await this.axios.delete(`${import.meta.env.VITE_API_DEV_URL}/companies/${id}`);
		return response.data;
	} */
}

export default CompaniesService;

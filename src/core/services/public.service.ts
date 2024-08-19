import { AxiosInterceptor } from "../interceptor/axios.interceptor";

class PublicService {
	private axiosInterceptor: AxiosInterceptor = new AxiosInterceptor();
	private axios = this.axiosInterceptor.getAxiosInstance();

	constructor() {}

    async getCompanyByPublicId(publicId:string){
        const response = await this.axios.get(`${import.meta.env.VITE_API_DEV_URL}/public/${publicId}`)
		return response.data
    }

	
}

export { PublicService };

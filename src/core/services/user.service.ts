import { AxiosInterceptor } from "../interceptor/axios.interceptor";

class UserService{
    private axiosInterceptor: AxiosInterceptor = new AxiosInterceptor();
	private axios = this.axiosInterceptor.getAxiosInstance();
    
    constructor(){}

    async findByToken(){
        const response = await this.axios.get(`${import.meta.env.VITE_API_DEV_URL}/users`);
		return response.data;
    }

}

export {UserService}
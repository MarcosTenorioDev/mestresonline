import { AxiosInterceptor } from "../interceptor/axios.interceptor";
import { ITopic, ITopicCreate } from "../interfaces/topic.interface";

class TopicService{
    private axiosInterceptor: AxiosInterceptor = new AxiosInterceptor();
	private axios = this.axiosInterceptor.getAxiosInstance();
    
    constructor(){}

    async createTopic(topic: ITopicCreate) {
		const response = await this.axios.post(`${import.meta.env.VITE_API_DEV_URL}/topics`, topic);
		return response.data;
	}

    async deleteTopicById(id:string){
        const response = await this.axios.delete(`${import.meta.env.VITE_API_DEV_URL}/topics/${id}`)
        return response.data
    }

    async updateTopic(topic: ITopic) {
		const response = await this.axios.put(`${import.meta.env.VITE_API_DEV_URL}/topics`, topic);
		return response.data;
	}

}

export {TopicService}
import { AxiosInterceptor } from "../interceptor/axios.interceptor";

class PublicService {
	private axiosInterceptor: AxiosInterceptor = new AxiosInterceptor();
	private axios = this.axiosInterceptor.getAxiosInstance();

	constructor() {}

    async getCompanyByPublicId(publicId:string){
        const response = await this.axios.get(`${import.meta.env.VITE_API_DEV_URL}/public/${publicId}`)
		return response.data
    }

	async getTopicsByPublicId(publicId:string){
		const response = await this.axios.get(`${import.meta.env.VITE_API_DEV_URL}/public/topics/${publicId}`)
		return response.data
	}

	async getPublicPostsByTopicId(publicId:string, topicId:string){
		const response = await this.axios.get(`${import.meta.env.VITE_API_DEV_URL}/public/${publicId}/posts/topic/${topicId}`)
		return response.data
	}

	async getPublicPostsById(publicId:string, postId:string){
		const response = await this.axios.get(`${import.meta.env.VITE_API_DEV_URL}/public/${publicId}/post/${postId}`)
		return response.data
	}

	async getRecomendations(postId:string){
		const response = await this.axios.get(`${import.meta.env.VITE_API_DEV_URL}/public/recommendations/${postId}`)
		return response.data
	}

	async getPostsByPublicId(publicId:string){
		const response = await this.axios.get(`${import.meta.env.VITE_API_DEV_URL}/public/posts/${publicId}`)
		return response.data
	}

	
}

export { PublicService };

import { AxiosInterceptor } from "../interceptor/axios.interceptor";

class PostService{
    private axiosInterceptor: AxiosInterceptor = new AxiosInterceptor();
	private axios = this.axiosInterceptor.getAxiosInstance();
    
    constructor(){}

    async createPost(post: any) {
		const response = await this.axios.post(`${import.meta.env.VITE_API_DEV_URL}/posts`, post);
		return response.data;
	}

	async uploadFile(file:FormData){
		const response = await this.axios.post(`${import.meta.env.VITE_API_DEV_URL}/posts/upload`, file);
		return response.data;
	}

	async getPostById(id:string){
		const response = await this.axios.get(`${import.meta.env.VITE_API_DEV_URL}/posts/${id}`)
		return response.data
	}

	async deletePostById(id:string){
        const response = await this.axios.delete(`${import.meta.env.VITE_API_DEV_URL}/posts/${id}`)
        return response.data
    }

	async updatePost(post: any) {
		const response = await this.axios.put(`${import.meta.env.VITE_API_DEV_URL}/posts`, post);
		return response.data;
	}
}

export {PostService}
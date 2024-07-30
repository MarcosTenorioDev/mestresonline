import { AxiosInterceptor } from "../interceptor/axios.interceptor";
import { IProducer, IProducerCreate } from "../interfaces/producer.interface";

class ProducerService {
	private axiosInterceptor: AxiosInterceptor = new AxiosInterceptor();
	private axios = this.axiosInterceptor.getAxiosInstance();

	constructor() {}

	async PostProducer(payload: IProducerCreate) {
		const response = await this.axios.post(
			`${import.meta.env.VITE_API_DEV_URL}/producers`,
			payload
		);
		return response.data;
	}
    async DeleteProducer(id: string) {
		const response = await this.axios.delete(
			`${import.meta.env.VITE_API_DEV_URL}/producers/${id}`
		);
		return response.data;
	}

	async UpdateProducer(producer:IProducer){
		const response = await this.axios.put(
			`${import.meta.env.VITE_API_DEV_URL}/producers`, producer
		);
		return response.data;
	}
}

export { ProducerService };

import { AxiosInstance } from "axios";
import appConnector from "../plugin/axios";

interface APIBase {
  create(data: any): Promise<any>;
  update(data: any): Promise<void>;
  delete(uid: string): Promise<void>;
  getOne(uid: string): Promise<any>;
  getMany(page: number, limit: number, sort?: string, search?: string): Promise<any>;
}

class AppRepository implements APIBase {
  static readonly RESOURCE_PATH = "/product";
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = appConnector;
  }
  async create(data: any): Promise<any> {
    const result = await this.apiClient.post(`${AppRepository.RESOURCE_PATH}`, data);
    return result.data;
  }
  async update(data: any): Promise<void> {
    await this.apiClient.put(`${AppRepository.RESOURCE_PATH}/${data.id}`, data);
  }
  async delete(uid: string): Promise<void> {
    await this.apiClient.delete(`${AppRepository.RESOURCE_PATH}/${uid}`);
  }
  async getOne(uid: string): Promise<any> {
    const result = await this.apiClient.get(`${AppRepository.RESOURCE_PATH}/${uid}`);
    return result.data;
  }
  async getMany(page: number, limit: number, sort?: string, search?: string): Promise<any> {
    const result = await this.apiClient.get(`${AppRepository.RESOURCE_PATH}`, {
      params: {
        offset: page,
        limit,
        sort,
        search,
      },
    });
    return result.data;
  }
}

const ProductRepository = new AppRepository();
export default ProductRepository;

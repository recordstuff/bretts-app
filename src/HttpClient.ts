import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios"

const headers: Readonly<Record<string, string | boolean>> = {
    "Accept": "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Credentials": true,
    "X-Requested-With": "XMLHttpRequest",
}

const tokenName: string = "accessToken"

class HttpBase {
    private _client: AxiosInstance | null = null

    public set token(value: string) {
        localStorage.setItem(tokenName, value);
    }

    public get token(): string {
        return localStorage.getItem(tokenName) ?? '';
    }


    protected get client(): AxiosInstance {
        return this._client ?? this.create()
    }

    private create(): AxiosInstance {
        this._client = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            headers,
            withCredentials: true,
        })

        this._client.interceptors.request.use(this.injectToken, (error) => Promise.reject(error));

        return this._client;
    }

    private injectToken(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
        const token = localStorage.getItem(tokenName);

        if (token && config?.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }
}

class HttpClient extends HttpBase {

    public async post<Body, Response>(url: string, body: Body): Promise<Response> {
        const response = await this.client.post<Response>(url, body)

        return response.data;
    }
}

export const httpClient = new HttpClient()
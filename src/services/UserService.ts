import axios, { AxiosInstance } from "axios";

interface SignInRequest {
  email: string;
  password: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  date_birth: string;
}

export default class UserService {
  axios: AxiosInstance;
  constructor() {
    this.axios = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    });
  }

  async login(requestBody: SignInRequest) {
    const { data } = await this.axios.post("/auth/login", requestBody);
    if (!data || !data.token) {
      throw new Error("Credentials invalid, please check email and password.");
    }
    localStorage.setItem("token", `Bearer ${data.token}`);
  }

  async create(requestBody: CreateUserRequest) {
    const body: CreateUserRequest = {
      ...requestBody,
      date_birth: requestBody.date_birth.split("/").reverse().join("-"),
    };
    await this.axios.post("/users", body);
  }

  async userAuthenticated() {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }
    const { status } = await this.axios.get("/home", {
      headers: { Authorization: token },
    });
    return status;
  }

  async logout() {
    await this.axios.get("/auth/logout");
    localStorage.removeItem("token");
  }
}

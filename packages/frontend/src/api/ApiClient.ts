import { APIException, ResponseObject, SignInResponse, UserDTO } from '../../../shared/front';


class ApiClient{
  /**
   * Sends a request to the server
   * @param method
   * @param endpoint
   * @param body
   * @param token
   *
   */
  private static async sendRequest<K extends string,V>(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    endpoint: string,
    body?: object,
    token?: string
  ): Promise<ResponseObject<K, V>> {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': token ? token : '',
      }
    }
    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
      options.body = JSON.stringify(body);
    }
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      // Throw an error with the status and status text
      const errorData = await response.json(); // Optionally parse the response body

      throw new APIException(
        response.status,
        errorData.code,
        errorData.message,
      );
    }
    return await response.json();
  }

  static Auth ={
    signIn: async (email: string, password: string): Promise<SignInResponse> => {
      const body = { email, password };
      const res = await ApiClient.sendRequest<"signIn",SignInResponse>('POST', '/api/auth/login', body);
      return res.signIn;
    },
    signUp: async (name:string, email: string, password: string): Promise<UserDTO> => {
      const body = {name, email, password };
      const res = await ApiClient.sendRequest<"signUp", UserDTO>('POST', '/api/auth/register', body);
      return res.signUp;
    },
  }

  static User = {
    getMe: async (token: string): Promise<UserDTO> => {
      const res = await ApiClient.sendRequest<"user", UserDTO>('GET', '/api/user/me', undefined, token);
      return res.user;
    }
  }
}

export default ApiClient;
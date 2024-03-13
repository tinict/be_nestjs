import axios from 'axios';

export class RequesterHelper {
  constructor() {
    //
  }
  /**
   * method post
   * @param url string
   * @param data any
   * @param config? any
   */
  public static async post<T>(
    url: string,
    data: any,
    config?: any,
  ): Promise<T | object> {
    let response;
    try {
      // method post
      response = await axios.post<T>(`${url}`, data, config);
      if (response?.status !== 200) {
        // if status != 200 then return it problem InternalServerProblem
        return {
          detail: `Could not post (error: ${response?.statusText})`,
        };
      }
      // If status = 200 then return response
      return response?.data;
    } catch (e) {
      return {
        status: e.response?.status,
        title: e.response?.statusText,
        detail: e,
      };
    }
  }

  /**
   * get
   * @param url string
   */
  public static async get<T>(url: string, config: any): Promise<T | object> {
    let response;
    try {
      // method get
      response = await axios.get<T>(`${url}`, config);
      if (response?.status !== 200) {
        // if status != 200 then return it problem InternalServerProblem
        return {
          detail: `Could not get (error: ${response.statusText})`,
        };
      }
      // If status = 200 then return response
      return response?.data;
    } catch (e) {
      return {
        status: response?.status,
        detail: e,
      };
    }
  }
}

import axios, { AxiosResponse } from "axios";
import { HttpProxyAgent } from 'http-proxy-agent';
import {HttpsProxyAgentOptions} from 'https-proxy-agent'


const DEFAULT_PER_PAGE = 30;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

namespace api {
    export async function getQueryTicker(tickerName: string) {
        
        try {
            const response: AxiosResponse  = await axios.get(`${API_BASE_URL}/query`, {
              params: {
                tickerName: tickerName
              }
            });
            
            return response.data;
          } catch (error) {
            console.error('Error fetching ticker data:', error);
            throw error;
          }
        }
        
}
export default api;

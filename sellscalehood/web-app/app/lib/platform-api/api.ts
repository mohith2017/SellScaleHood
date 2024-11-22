import axios, { AxiosResponse } from "axios";


namespace api {
    export async function getQueryTicker(tickerName: string) {
        
        try {
            console.log("Came here")
            const url = process.env.NEXT_PUBLIC_API_URL + "/query"
            console.log(url)
            const response: AxiosResponse = await axios.get(url, {
              params: {
                "tickerName": tickerName
              }
            })
            console.log(response)
            
            
            return response.data
          } catch (error) {
            console.error('Error fetching ticker data:', error);
            throw error;
          }
        }
        
}
export default api;

import {injectable} from "tsyringe";

@injectable()
class SearchService {
    public async search(query: string): Promise<any> {
        try {
            // Perform the actual search operation using Axios or a suitable HTTP client
            //const response = await axios.get(`https://example.com/search?query=${query}`);
            //const results = response.data;

            // You can process and format the results here
            // For simplicity, I'm returning the raw results
            return "search results here";
        } catch (error) {
            // Handle errors and provide proper error handling and logging
            console.error(error);
        }
    }
}

export default SearchService;

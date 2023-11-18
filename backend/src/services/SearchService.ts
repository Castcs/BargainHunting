import {injectable} from "tsyringe";
import {SearchHistory} from "../models/SearchHistory";

@injectable()
class SearchService {
    public async performSearch(userID: number, userQuery: string): Promise<SearchHistory> {
        // Insert search functionality here
        const resultName = 'short description of the product';
        const resultURL = 'URL link for the product';
        const resultPrice = 'price : $1.99';
        try {
            // replace the line below with returning the results from above search
            return await SearchHistory.createSearchEntry(userID, userQuery, resultName, resultURL, resultPrice);
        } catch (error: any) {
            throw new Error('Failed to create a search entry: ' + error.message);
        }
    }

    public async saveSearchEntry(userID: number, userQuery: string, resultName: string, resultURL: string, resultPrice: string): Promise<void> {
        try {
            await SearchHistory.createSearchEntry(userID, userQuery, resultName, resultURL, resultPrice);
        } catch (error: any) {
            throw new Error('Failed to create a search entry: ' + error.message);
        }
    }
    public async getSearchResultsByUserID(userID: number): Promise<SearchHistory[]> {
        try {
            return await SearchHistory.getSearchResultsByUserID(userID);
        } catch (error: any) {
            throw new Error('Failed to get search results: ' + error.message);
        }
    }
}

export default SearchService;

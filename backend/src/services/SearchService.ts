import {injectable} from "tsyringe";
import {SearchResult} from "../models/SearchResult";

@injectable()
class SearchService {
    public async createSearchEntry(userID: number, userQuery: string): Promise<SearchResult> {
        // Insert search functionality here

        // Then pass the pieces of the search result into the following method to store it in the DB and return a SearchResult object
        try {
            return await SearchResult.createSearchEntry(userID, userQuery, resultName, resultURL, resultPrice);
        } catch (error: any) {
            throw new Error('Failed to create a search entry: ' + error.message);
        }
    }

    public async getSearchResultsByUserID(userID: number): Promise<SearchResult[]> {
        try {
            return await SearchResult.getSearchResultsByUserID(userID);
        } catch (error: any) {
            throw new Error('Failed to get search results: ' + error.message);
        }
    }
}

export default SearchService;

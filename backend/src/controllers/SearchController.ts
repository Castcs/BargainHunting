import { Request, Response } from 'express';
import SearchService from '../services/SearchService';
import {inject, injectable} from "tsyringe";

@injectable()
export class SearchController {
    private searchService: SearchService;
    constructor(@inject('SearchService') searchService: SearchService) {
        this.searchService = searchService;
    }
    public async performSearch(req: Request, res: Response): Promise<void> {
        const { userID, query } = req.body; // Extract search query from request

        // Call the search service
        const results = await this.searchService.performSearch(userID, query);

        // Return search results to the client
        res.status(200).json(results);
    }

    public async saveResult(req: Request, res: Response): Promise<void> {
        const { userID, query, title, url, price } = req.body;

        await this.searchService.saveSearchEntry(userID, query, title, url, price);

        res.status(200);
    }

    public async getSearchResultsByUserID(req: Request, res: Response): Promise<void>  {
        const { userID } = req.body; // Extract search query from request
        const results = await this.searchService.getSearchResultsByUserID(userID);
        res.status(200).json(results);
    }
}

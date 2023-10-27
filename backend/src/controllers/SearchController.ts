import { Request, Response } from 'express';
import SearchService from '../services/SearchService';
import {inject, injectable} from "tsyringe";
import {Search} from "../models/SearchResults";
import UserService from "../services/UserService";

@injectable()
export class SearchController {
    private searchService: SearchService;
    constructor(@inject('SearchService') searchService: SearchService) {
        this.searchService = searchService;
    }
    public async performSearch(req: Request, res: Response): Promise<void> {
        const { query } = req.body; // Extract search query from request

        // Call the search service
        const results = await this.searchService.search(query);

        // Return search results to the client
        res.status(200).json(results);
    }
}

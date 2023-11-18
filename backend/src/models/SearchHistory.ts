import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class SearchHistory extends BaseEntity{
    @PrimaryGeneratedColumn()
        // @ts-ignore
    id: number;

    @Column()
        // @ts-ignore
    userID: number;

    @Column()
        // @ts-ignore
    userQuery: string;

    @Column()
        // @ts-ignore
    resultName: string;

    @Column()
        // @ts-ignore
    resultURL: string;

    @Column()
        // @ts-ignore
    resultPrice: string;

    // Add other properties as needed, such as search results
    static async getSearchResultsByUserID(userID: number): Promise<SearchHistory[]> {
        return await SearchHistory.createQueryBuilder("search")
            .where("search.userID = :userID", {userID})
            .getMany();
    }

    static async createSearchEntry(userID: number, userQuery: string, resultName: string, resultURL: string, resultPrice: string): Promise<SearchHistory> {
        const searchEntry = new SearchHistory();
        searchEntry.userID = userID;
        searchEntry.userQuery = userQuery;
        searchEntry.resultName = resultName;
        searchEntry.resultURL = resultURL;
        searchEntry.resultPrice = resultPrice;

        return searchEntry.save();
    }
}

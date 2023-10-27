import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Search extends BaseEntity{
    @PrimaryGeneratedColumn()
        // @ts-ignore
    id: number;


    @Column()
        // @ts-ignore
    query: string;

    // Add other properties as needed, such as search results
}

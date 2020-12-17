export class Tutorial {

    public id: string;
    public title: string;
    public description: string;
    public published: boolean;
    public clicks: number;

    constructor(
        title: string,
        description: string,
        published: boolean
    ) {
        this.title = title;
        this.description = description;
        this.published = published;
     }

}

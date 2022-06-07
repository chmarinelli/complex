import { http } from "@/core/api";
import DataSourceAPI from "../DataSourceAPI";
import { unionBy } from 'lodash'

export default class UserDataSource extends DataSourceAPI {
    constructor() {
        super();
    }

    nextPage = 1;
    lastTerm = null;

    async search(term, isLoadingMore = false) {
        this.hasMore = false;
        
        if (!isLoadingMore || this.lastTerm != term) this.nextPage = 1;
        
        if (!this.nextPage || (this.lastTerm == term && !isLoadingMore)) return;

        if (term && !term.trim()) return;
        
        this.lastTerm = term;
        await http.get('/users', {
            params: {
                search: term,
                page: this.nextPage,
                per_page: 5
            }
        }).then(response => {
            const data = response.data.map(x => ({...x, name: `${x.name} ~ ${x.username}`}))

            this.items = unionBy(this.items, data, "username");

            this.nextPage = +response.headers['x-next-page'];

            if (this.nextPage ) this.hasMore = true;
        })
    }
}
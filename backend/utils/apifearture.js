class ApiFeature {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            },
        } : {}
        this.query = this.query.find({...keyword});
        return this;
    }

    filter() { 
        const queryCoppy = {...this.queryStr};
        //remove fields category
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach(key => delete queryCoppy[key])
        let queryStr = JSON.stringify(queryCoppy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    pagination(resultPerPage){
        const curentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (curentPage - 1) ;

        this.query = this.query.limit(resultPerPage).skip(skip)

        return this;

    }


}

module.exports = ApiFeature
module.exports = function(curPage, totalCount, maxPageInSet, maxEntityInPage) {
    if (curPage && totalCount) {
        var paging_result = '';
        var maxPageInSet;
        var maxEntityInPage;
        var totalPage= Math.ceil(totalCount / maxEntityInPage),
            totalSet= Math.ceil(totalPage / maxPageInSet),
            curSet= Math.ceil(curPage / maxPageInSet),
            startPage= ((curSet - 1) * maxPageInSet) + 1,
            endPage= (startPage + maxPageInSet) - 1;

        return {
            totalPage: totalPage ,
            totalSet: totalSet,
            curSet: curSet,
            startPage: startPage,
            endPage: endPage
                    };
    }
}

var homeconfig = {
    pageSize: 9,
    pageIndex: 1
}

var searchController = {
    init: function () {
        searchController.registerEvent();
    },
    registerEvent: function () {
    },
    loadDataSelect: function () {
        var themes = getfilter('themes');
        var XType = $('#XType').val();
        //var XType = $('#testww').val();
        var Duration = $('#Durations').val();
        var Destination = $('#Destination').val();
        var MenuAlias = $('#MenuAlias').val();
        $.ajax({
            url: "/search-json",
            method: "POST",
            data: {
                XType: XType,
                Duration: Duration,
                MenuAlias: MenuAlias,
                themes: themes,
                Destination: Destination,
                page: homeconfig.pageIndex,
                pageSize: homeconfig.pageSize
            },
            dataType: 'json',
            success: function (response)
            {
                if (response.status) {
                    $("#loader").css("display", "none")
                    var data = response.list;
                    var listcount = response.total;
                    $("#counttour").html(listcount);
                    var html = '';
                    var template = $('#data-template').html();
                    $.each(data,
                        function (i, item) {
                            html += Mustache.render(template,
                                {
                                    TourId: item.TourId,
                                    Image: item.Image,
                                    TourName: item.TourName,
                                    NumberDay: item.NumberDay,
                                    Destination: item.Destination,
                                    DescriptionMin: item.DescriptionMin,
                                    MenuAlias: item.MenuAlias,
                                    TourAlias: item.TourAlias,
                                    PriceContact: item.PriceContact,
                                    PromotionalPrice: item.PromotionalPrice,
                                    ThemeName: item.ThemeName,
                                    //DateCreate: item.DateCreate,
                                    //ThemeId: item.ThemeId,
                                    MenuName: item.MenuName                             
                                });
                        });
                    $('#databin').html(html);

                    searchController.paging(response.total,
                        function () {
                            searchController.loadDataSelect();
                        });
                    searchController.registerEvent();
                }
            }
        });
    },
    loadSelect: function () {
        var XType = $('#XType').val();
        var Duration = $('#Duration').val();
        var MenuAlias = $('#MenuAlias').val();
        $.ajax({
            url: "/search-json",
            method: "POST",
            data: {
                XType: XType,
                Duration: Duration,
                MenuAlias: MenuAlias,
                page: homeconfig.pageIndex,
                pageSize: homeconfig.pageSize
            },
            dataType: 'json',
            success: function (response) {
                if (response.status) {
                    var data = response.list;
                    var listcount = response.total;
                    $("#counttour").html(listcount);
                }
            }
        });
    },
    paging: function (totalRow, callBack) {
        var totalPage = Math.ceil(totalRow / homeconfig.pageSize);
        $('#pagination').twbsPagination({
            totalPages: totalPage,
            first: "First",
            next: "Next",
            last: "End",
            prev: "Before",
            visiblePages: 2,
            onPageClick: function (event, page) {
                homeconfig.pageIndex = page;
                setTimeout(callBack, 10);
            }
        });
    }
}
searchController.init();
function getfilter(themes) {
    var filter = [];
    $('.' + themes + ':checked').each(function () {
        filter.push($(this).val());
    });
    return filter;
}
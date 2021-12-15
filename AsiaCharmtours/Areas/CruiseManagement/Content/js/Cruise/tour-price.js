var urlGetBaseTourPrice = '/api/tour-price/get-base-tour-price';
var urlGet = '/api/tour-price/get';
var urlDetail = '/api/tour-price/detail';
var urlPut = '/api/tour-price/put';

app.controller('controller', ['$scope', '$http', 'template', '$timeout', 'helper', 'validation', 'notify', function ($scope, $http, template, $timeout, helper, validation, notify) {
    $scope.filters = {
        _pageNumber: 1,
        _pageSize: 100,
        _keySearch: ''
    };
    $scope.gridOptions = {
        paginationPageSizes: [10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000],
        paginationPageSize: 100,
        useExternalPagination: true,
        exporterCsvFilename: 'file.csv',
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        exporterExcelFilename: 'file.xlsx',
        exporterExcelSheetName: 'Sheet1',
        enableFiltering: false,
        useExternalFiltering: false,
        columnDefs: [],
        rowHeight: 32,
        i18n: 'vi',
        showGridFooter: false,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.filters._pageNumber = newPage;
                $scope.filters._pageSize = pageSize;
                $scope.Get();
            });
        },
        exporterMenuCsv: true,
        enableGridMenu: true
    };
    $scope.gridOptions.columnDefs = [
        {
            displayName: "Tên tour",
            name: 'TourName',
            width: '*',
            minWidth: 200
        },
        {
            displayName: "Loại tour",
            name: 'TourType',
            width: '*',
            minWidth: 200
        },
        {
            displayName: "Loại phòng",
            name: 'Accommodations',
            width: '*',
            minWidth: 200
        },
        {
            displayName: "Thao tác",
            name: "#",
            width: 120,
            field: "#",
            cellTemplate: template.templateUpdate('TourId'),
            enableFiltering: false,
            enableSorting: false,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        }
    ];
    $scope.GetBaseTourPrice = function () {
        $http({
            url: urlGetBaseTourPrice,
            method: 'GET'
        }).then(function success(response) {
            notify.spinerHide();
            $scope.tourPriceBase = response.data;
            $scope.tourPriceRoot = response.data;
            $timeout(function () {
                for (var i = 0; i < $scope.tourPriceBase.EF_TourRoomType.length; i++) {
                    CKEDITOR.replace('Description_' + i);
                }
            }, 200);
        }, function error(response) {
            notify.error(response.data.Message);
        });
    };
    $scope.GetBaseTourPrice();
    $scope.Get = function () {
        notify.spinerShow();
        $http({
            url: urlGet,
            method: 'GET',
            params: $scope.filters
        }).then(function success(response) {
            notify.spinerHide();
            var data = response.data;
            data.tourPrices.forEach(x => {
                x.TourType = x.T2_TourRoomType.join(' , ');
                x.Accommodations = x.T2_TourTypeGroup.join(' , ');
            });
            $scope.gridOptions.data = data.tourPrices;
            $scope.gridOptions.totalItems = data.totalRecord;
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.Get();
    $scope.showDetail = function (_id) {
        $("#kUI_window").data("kendoWindow").maximize().open();
        notify.spinerShow();
        $scope.tourPriceBase = JSON.parse(JSON.stringify($scope.tourPriceRoot));
        $http({
            url: urlDetail,
            method: 'GET',
            params: {
                _tourId: _id
            }
        }).then(function success(response) {
            notify.spinerHide();
            var data = response.data;
            $scope.data = data.tourRoomTypePrices;
            $scope.filterFormTourPrice(_id, data.priceContact);
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.filterFormTourPrice = function (_tourId, _priceContact) {
        $scope.tourPriceBase.TourId = _tourId;
        $scope.tourPriceBase.PriceContact = _priceContact;
        helper.changeSwitchery($('#switch_status'), _priceContact);
        for (var i = 0; i < $scope.tourPriceBase.EF_TourRoomType.length; i++) {
            CKEDITOR.instances["Description_" + i].setData(' ');
        }
        $scope.data.forEach(x => {
            for (var i = 0; i < $scope.tourPriceBase.EF_TourRoomType.length; i++) {
                var roomType = $scope.tourPriceBase.EF_TourRoomType[i];
                if (roomType.TourRoomTypeId == x.TourRoomTypeId) {
                    roomType.Checked = true;
                    CKEDITOR.instances["Description_" + i].setData(x.Description);
                    for (var j = 0; j < roomType.EF_TourRoomTypePrice.length; j++) {
                        var tourPrice = roomType.EF_TourRoomTypePrice[j];
                        if (tourPrice.TourTypeGroupId == x.TourTypeGroupId) {
                            var tourTypeGroupExists = $scope.tourPriceBase.EF_TourTypeGroup.find(y => y.TourTypeGroupId == tourPrice.TourTypeGroupId);
                            tourTypeGroupExists.Checked = true;
                            tourPrice.PromotionalPrice = x.PromotionalPrice;
                            tourPrice.PriceInfant = x.PriceInfant;
                            tourPrice.PriceChild = x.PriceChild;
                            tourPrice.Price = x.Price;
                        }
                    }
                }
            }
        });
    };
    $scope.Put = function () {
        notify.spinerShow();
        $scope.tourPriceBase.PriceContact = $('#switch_status').is(':checked');
        for (var i = 0; i < $scope.tourPriceBase.EF_TourRoomType.length; i++) {
            $scope.tourPriceBase.EF_TourRoomType[i].Description = CKEDITOR.instances["Description_" + i].getData()
        }
        $http({
            url: urlPut,
            method: "POST",
            data: $scope.tourPriceBase
        }).then(function success(response) {
            notify.spinerHide();
            $scope.closeWindow();
            notify.success("Cập nhật thành công");
            $scope.Get();
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.closeWindow = function () {
        $("#kUI_window").data("kendoWindow").close();
    };
}]);
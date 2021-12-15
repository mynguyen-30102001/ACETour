var urlGetAllCruiseTour = '/api/cruisetour/get-all';
var urlGet = '/api/cruisejourney/get';
var urlDetail = '/api/cruisejourney/detail';
var urlPut = '/api/cruisejourney/put';

app.controller('controller', ['$scope', '$http', 'template', '$timeout', 'helper', 'validation', 'notify', function ($scope, $http, template, $timeout, helper, validation, notify) {
    $scope.filters = {
        _pageNumber: 1,
        _pageSize: 100,
        _keySearch: ''
    };
    $scope.currentTab = 1;
    $scope.CruiseTourTypeId = '';
    $scope.data = {};

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
            $scope.gridApi2 = gridApi;
            $scope.gridApi2.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
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
            displayName: "Tên tàu",
            name: 'CruiseName',
            width: '*',
            minWidth: 200
        },
        {
            displayName: "Điểm đến",
            name: 'Destination',
            width: '*',
            minWidth: 200,
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Ngày tạo",
            name: 'DateCreate',
            cellFilter: 'date: "dd/MM/yyyy HH:mm"',
            width: 150,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Trang thái cập nhật",
            name: 'StatusJourney',
            width: 150,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Thao tác",
            name: "#",
            width: 120,
            field: "#",
            cellTemplate: template.templateUpdate('CruiseId'),
            enableFiltering: false,
            enableSorting: false,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        }
    ];
    $scope.GetCruiseTours = function () {
        $http({
            url: urlGetAllCruiseTour,
            method: 'GET'
        }).then(function success(response) {
            $scope.cruiseTours = response.data;
        }, function error(response) {
            notify.error(response.data.Message);
        });
    };
    $scope.GetCruiseTours();
    $scope.Get = function () {
        notify.spinerShow();
        $http({
            url: urlGet,
            method: 'GET',
            params: $scope.filters
        }).then(function success(response) {
            notify.spinerHide();
            var data = response.data;
            $scope.gridOptions.data = data.cruises;
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
        $http({
            url: urlDetail,
            method: 'GET',
            params: {
                _cruiseId: _id
            }
        }).then(function success(response) {
            notify.spinerHide();
            var data = response.data;
            $scope.setDataDetail(data);
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.setDataDetail = function (data) {
        CKEDITOR.instances.Journey.setData('');
        $scope.CruiseTourTypeId = '';
        $scope.currentDetailCruise = null;
        $scope.data = data;
        $scope.cruiseTours.forEach(x => {
            if (data.CruiseJourneys.findIndex(y => y.CruiseTourType.CruiseTourTypeId == x.CruiseTourTypeId) >= 0) {
                x.Checked = true;
            }
            else
                x.Checked = false;
        });
    };
    $scope.closeWindow = function () {
        $("#kUI_window").data("kendoWindow").close();
    };
    $scope.Put = function () {
        notify.spinerShow();
        $http({
            url: urlPut,
            method: "POST",
            data: $scope.data
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

    $scope.chooseCruiseTour = function (item) {
        let indexCruiseTour = $scope.data.CruiseJourneys.findIndex(x => x.CruiseTourType.CruiseTourTypeId === item.CruiseTourTypeId);
        if (indexCruiseTour >= 0) {
            $scope.data.CruiseJourneys.splice(indexCruiseTour, 1);
        }
        else {
            var newItem = {
                CruiseTourType: item,
                CR_CruiseItineraries: []
            };
            $scope.data.CruiseJourneys.push(newItem);
        }
    };
    $scope.changeCruiseTour = function () {
        let indexCruiseTour = $scope.data.CruiseJourneys.findIndex(x => x.CruiseTourType.CruiseTourTypeId === $scope.CruiseTourTypeId);
        if (indexCruiseTour < 0)
            $scope.currentDetailCruise = null;
        else {
            $scope.currentDetailCruise = $scope.data.CruiseJourneys[indexCruiseTour];
            if ($scope.currentDetailCruise.CR_CruiseItineraries.length > 0) {
                let index = 0;
                $scope.currentDetailCruise.CR_CruiseItineraries.forEach(x => {
                    x._key = index++;
                });
                $scope.showDetailTab($scope.currentDetailCruise.CR_CruiseItineraries[0]);
            }
        }
    };
    // journey detail
    $scope.addTab = function () {
        if ($scope.currentDetailCruise == null || $("#newTitleTab").val() === '')
            return;
        var id = 0;
        for (var i = 0; i < $scope.currentDetailCruise.CR_CruiseItineraries.length; i++) {
            if (id <= $scope.currentDetailCruise.CR_CruiseItineraries[i]._key)
                id = $scope.currentDetailCruise.CR_CruiseItineraries[i]._key;
        }
        var newTab = {
            _key: id + 1,
            Title: $("#newTitleTab").val(),
            Content: '',
            Index: 0
        };
        $scope.currentDetailCruise.CR_CruiseItineraries.push(newTab);
        $("#newTitleTab").val("");
        if ($scope.currentDetailCruise.CR_CruiseItineraries.length === 1) {
            $scope.showDetailTab($scope.currentDetailCruise.CR_CruiseItineraries[0]);
        }
    };
    $scope.showDetailTab = function (tab) {
        $(".tour-tab-header").removeClass('uk-active');
        $("#tour-tab-header-" + tab._key).addClass('uk-active');
        $scope.currentTab = tab._key;
        $scope.bindingContentTabToEditor(tab.Content);
    };
    $scope.bindingContentTabToEditor = function (content) {
        $timeout(function () {
            CKEDITOR.instances.Journey.setData(content);
        }, 100);
    };
    $scope.saveTab = function () {
        var tab = $scope.currentDetailCruise.CR_CruiseItineraries.find(x => x._key === $scope.currentTab);
        if (tab != null)
            tab.Content = CKEDITOR.instances.Journey.getData();
    };
    $scope.removeTourTab = function (index) {
        if ($scope.currentDetailCruise.CR_CruiseItineraries.length > 1) {
            if (confirm("Bạn có chắc chắn muốn xóa tab này không?")) {
                $scope.currentDetailCruise.CR_CruiseItineraries.splice(index, 1);
                $scope.showDetailTab($scope.currentDetailCruise.CR_CruiseItineraries[0]);
            }
        }
    };
}]);
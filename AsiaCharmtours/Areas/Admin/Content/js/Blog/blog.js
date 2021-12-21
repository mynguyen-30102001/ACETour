//var urlGetMenuTourByLevel = '/api/menu/get-menu-article-by-level';
var urlGetAllMenu = '/api/menu/get-all-menu-blog';
var urlGetAuthor = '/api/blog/get-author';
var urlGet = '/api/blog/get';
var urlPost = '/api/blog/post';
var urlDetail = '/api/blog/detail';
var urlPut = '/api/blog/put';
var urlDelete = '/api/blog/delete';

app.controller('controller', ['$scope', '$http', 'template', 'validation', 'notify', 'helper', '$timeout', function ($scope, $http, template, validation, notify, helper, $timeout) {
    $scope.filters = {
        _pageNumber: 1,
        _pageSize: 100,
        _keySearch: '',
        _menuId: -1
    };
    $scope.filtersRelatedPost = {
        _pageNumber: 1,
        _pageSize: 100,
        _keySearch: '',
        _menuId: -1
    };
    $scope.filterMenu = {
        _menuParent1: '',
        _parentMenuId: ''
    };
    $scope.data = {};
    $scope.menus = [];
    $scope.author = [];
    $scope.isAdd = true;
    $scope.replaceOldData = false; // kiểm tra nếu tồn tại bài liên quan cũ thì cài đặt đã chọn trong bảng chọn bài viết (Có ảnh hưởng event selected)
    $scope.relatedPost = [];

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
            displayName: "Tiêu đề",
            name: 'Title',
            width: '*',
            minWidth: 200,
            pinnedLeft: true
        },
        {
            displayName: "Chuyên mục",
            name: 'MenuName',
            width: 200,
            headerCellClass: 'text-center-grid'
        },
        //{
        //    displayName: "Người viết",
        //    name: 'UserCreate',
        //    width: 150,
        //    headerCellClass: 'text-center-grid'
        //},
        {
            displayName: "Ngày cập nhật",
            name: 'DateUpdate',
            cellFilter: 'date: "dd/MM/yyyy"',
            width: 180,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Ngày đăng",
            name: 'DateCreate',
            cellFilter: 'date: "dd/MM/yyyy"',
            width: 180,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Thứ tự",
            name: 'Index',
            width: 120,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Trạng thái",
            name: 'Status',
            width: 150,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Thao tác",
            name: "#",
            width: 120,
            field: "#",
            cellTemplate: template.templateActionMethod('BlogId'),
            enableFiltering: false,
            enableSorting: false,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        }
    ];
    
    $scope.gridOptionsRelatedPost = {
        paginationPageSizes: [10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000],
        paginationPageSize: 100,
        useExternalPagination: true,
        enableFiltering: false,
        useExternalFiltering: false,
        columnDefs: [],
        rowHeight: 32,
        i18n: 'vi',
        showGridFooter: false,
        enableFullRowSelection: true,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                if (!$scope.replaceOldData) {
                    var indexExists = $scope.relatedPost.findIndex(x => x.BlogId == row.entity.BlogId);
                    if (indexExists < 0)
                        $scope.relatedPost.push(row.entity);
                    else
                        $scope.relatedPost.splice(indexExists, 1);
                }

            });
            $scope.gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                if (!$scope.replaceOldData) {
                    for (var i = 0; i < rows.length; i++) {
                        var indexExists = $scope.relatedPost.findIndex(x => x.BlogId == rows[i].entity.BlogId);
                        if (indexExists < 0)
                            $scope.relatedPost.push(rows[i].entity);
                        else
                            $scope.relatedPost.splice(indexExists, 1);
                    }
                }
            });
            $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.filtersRelatedPost._pageNumber = newPage;
                $scope.filtersRelatedPost._pageSize = pageSize;
                $scope.GetRelatedPost();
            });
        }
    };
    $scope.gridOptionsRelatedPost.columnDefs = [
        {
            displayName: "Tiêu đề",
            name: 'Title',
            width: '*',
            minWidth: 200
        },
        {
            displayName: "Chuyên mục",
            name: 'MenuName',
            width: '*',
            minWidth: 150
        },
        {
            displayName: "Ngày cập nhật",
            name: 'DateUpdate',
            cellFilter: 'date: "dd/MM/yyyy"',
            width: 150
        }
    ];
    $scope.Get = function () {
        notify.spinerShow();
        $http({
            url: urlGet,
            method: 'GET',
            params: $scope.filters
        }).then(function success(response) {
            notify.spinerHide();
            var data = response.data;
            $scope.gridOptions.data = data.blogs;
            $scope.gridOptions.totalItems = data.totalRecord;
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.Get();
    $scope.GetRelatedPost = function () {
        notify.spinerShow();
        $http({
            url: urlGet,
            method: 'GET',
            params: $scope.filtersRelatedPost
        }).then(function success(response) {
            notify.spinerHide();
            var data = response.data;
            $scope.gridOptionsRelatedPost.data = data.blogs;
            $scope.gridOptionsRelatedPost.totalItems = data.totalRecord;
            $scope.checkRelatedPostExist();
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.GetRelatedPost();
    $scope.GetAllMenu = function () {
        $http({
            url: urlGetAllMenu,
            method: 'GET'
        }).then(function success(response) {
            $scope.menus = response.data;
        }, function error(response) {
            //notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.GetAllMenu();
    $scope.GetAuthor = function () {
        $http({
            url: urlGetAuthor,
            method: 'GET'
        }).then(function success(response) {
            $scope.author = response.data;
        }, function error(response) {
            //notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.GetAuthor();
    $scope.showAdd = function () {
        $("#kUI_window").data("kendoWindow").maximize().open();
        $scope.data = {
            MainMenuId: '',
            Index: 0,
            AuthoId : '',
            Title: '',
            Alias: '',
            Description: '',
            Content: '',
            SelectRelatedPost: false,
            MetaTitle: '',
            MetaDescription: ''
        };
        helper.changeSwitchery($('#switch_status'), true);
        helper.changeRadio($('#relatepost'), true);
        $scope.relatedPost = [];
        CKEDITOR.instances.Description.setData('');
        CKEDITOR.instances.Content.setData('');
        $scope.isAdd = true;
        $("#Logo").val("");
        $("#img-logo").attr("src", "/FileDefault/img-default.gif");
        $("#Logo3").val("/FileDefault/img-default.gif");
        $("#img-logo3").attr("src", "/FileDefault/img-default.gif");
    };

    $scope.showDetail = function (_id) {
        $("#kUI_window").data("kendoWindow").maximize().open();
        $scope.isAdd = false;
        notify.spinerShow();
        $http({
            url: urlDetail,
            method: 'GET',
            params: {
                _blogId: _id
            }
        }).then(function success(response) {
            notify.spinerHide();
            var data = response.data;
            $scope.data = data.blog;
            $scope.relatedPost = data.relatedPosts;
            //$scope.filterMenu._menuParent1 = data._menuParent1;
            //$scope.menuForArea = data.menuForArea;
            $("#Logo").val($scope.data.Avatar);
            $("#img-logo").attr("src", $scope.data.Avatar);
            $("#Logo3").val($scope.data.Background);
            $("#img-logo3").attr("src", $scope.data.Background);
            CKEDITOR.instances.Description.setData($scope.data.Description);
            CKEDITOR.instances.Content.setData($scope.data.Content);
            helper.changeSwitchery($('#switch_status'), $scope.data.Status);
            if ($scope.data.SelectRelatedPost)
                helper.changeRadio($('#relatepost2'), true);
            else
                helper.changeRadio($('#relatepost'), true);
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.autoConvertAlias = function () {
        $scope.data.Alias = helper.ConvertToUnSign($scope.data.Title);
    };
    $scope.Post = function () {
        if (validation.checkRequired()) {
            notify.spinerShow();
            $scope.data.Avatar = $("#Logo").val();
            $scope.data.Background = $("#Logo3").val();
            $scope.data.Status = $('#switch_status').is(':checked');
            $scope.data.SelectRelatedPost = $('#relatepost2').is(':checked');
            $scope.data.Description = CKEDITOR.instances.Description.getData();
            $scope.data.Content = CKEDITOR.instances.Content.getData();
            $scope.data.BlogRelatedPosts = [];
            if ($scope.data.SelectRelatedPost) {
                for (var i = 0; i < $scope.relatedPost.length; i++)
                    $scope.data.BlogRelatedPosts.push({
                        BlogRelateId: $scope.relatedPost[i].BlogId
                    });
            }
            $http({
                url: urlPost,
                method: "POST",
                data: $scope.data
            }).then(function success(response) {
                notify.spinerHide();
                $scope.closeWindow();
                notify.success("Thêm mới thành công");
                $scope.Get();
            }, function error(response) {
                notify.spinerHide();
                notify.error(response.data.Message);
            });
        }
    };
    $scope.Put = function () {
        if (validation.checkRequired()) {
            notify.spinerShow();
            $scope.data.Avatar = $("#Logo").val();
            $scope.data.Background = $("#Logo3").val();
            $scope.data.Status = $('#switch_status').is(':checked');
            $scope.data.SelectRelatedPost = $('#relatepost2').is(':checked');
            $scope.data.Description = CKEDITOR.instances.Description.getData();
            $scope.data.Content = CKEDITOR.instances.Content.getData();
            $scope.data.BlogRelatedPosts = [];
            if ($scope.data.SelectRelatedPost) {
                for (var i = 0; i < $scope.relatedPost.length; i++)
                    $scope.data.BlogRelatedPosts.push({
                      BlogRelateId: $scope.relatedPost[i].BlogId
                    });
            }
            $http({
                url: urlPut,
                method: "POST",
                data: $scope.data
            }).then(function success(response) {
                notify.spinerHide();
                $scope.closeWindow();
                notify.success("Chỉnh sửa thành công");
                $scope.Get();
            }, function error(response) {
                notify.spinerHide();
                notify.error(response.data.Message);
            });
        }
    };
    $scope.confirmDelete = function (_id) {
        $scope.menuIdChoose = _id;
        UIkit.modal("#modalConfirm").show();
    };
    $scope.showRelatedPost = function () {
        $scope.checkRelatedPostExist();
        UIkit.modal("#modalRelatePost").show();
    };
     //kiểm tra bài viết liên quan đã chọn
    $scope.checkRelatedPostExist = function () {
        $timeout(function () {
            $scope.replaceOldData = true;
            $scope.gridApi.selection.clearSelectedRows();
            if ($scope.relatedPost.length > 0) {
                for (var i = 0; i < $scope.relatedPost.length; i++) {
                    var index = $scope.gridOptionsRelatedPost.data.findIndex(x => x.BlogId == $scope.relatedPost[i].BlogId);
                    if (index >= 0)
                        $scope.gridApi.selection.selectRow($scope.gridOptionsRelatedPost.data[index])
                }
            }
            $scope.replaceOldData = false;
        }, 100);
    };
    $scope.closeWindow = function () {
        $("#kUI_window").data("kendoWindow").close();
    };
    $scope.removeRelatedPost = function (index) {
        $scope.relatedPost.splice(index, 1);
    };
    $scope.Delete = function () {
        notify.spinerShow();
        $http({
            url: urlDelete,
            method: 'GET',
            params: {
                _blogId: $scope.menuIdChoose
            }
        }).then(function success(response) {
            notify.spinerHide();
            notify.success("Xóa thành công");
            $scope.Get();
            UIkit.modal("#modalConfirm").tryhide();
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };

    //$scope.GetMenuLevelTwo = function () {
    //    if ($scope.filterMenu._menuParent1 == '') {
    //        return;
    //    }
    //    notify.spinerShow();
    //    $http({
    //        url: urlGetMenuTourByLevel,
    //        method: 'GET',
    //        params: {
    //            _parentMenuId: $scope.filterMenu._menuParent1,
    //            _level: 2
    //        }
    //    }).then(function success(response) {
    //        notify.spinerHide();
    //        var data = response.data;
    //        $scope.menuForArea = data.menuResult;
    //    }, function error(response) {
    //        notify.spinerHide();
    //        notify.error(response.data.Message);
    //    });
    //};
}]);
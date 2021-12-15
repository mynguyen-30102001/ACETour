var urlPut = '/SaveConfirmBookTour';

app.controller('controller', ['$scope', '$http', 'validation', function ($scope, $http, validation) {
    $scope.data = {};
    $scope.getData = function () {
        $scope.priceRoom = $("#price_data").attr("price-room");
        $scope.priceAdult = $("#price_data").attr("price-adult");
        $scope.priceChild = $("#price_data").attr("price-child");
        $scope.priceInfant = $("#price_data").attr("price-infant");
        $scope.data = {
            journeyCode: $("#price_data").attr("journeycode"),
            tourBook: {
                Adult: 1,
                Child: 0,
                Infant: 0,
                AddRoom: 0,
                PriceRoom: $scope.priceRoom,
                FullName: '',
                Address: '',
                Phone: '',
                Email: '',
                Request: ''
            }
        };
        $scope.T_TourBookGuestAdult = [{
            TypeGuest: 'Nguời lớn',
            FullName: '',
            Sex: '',
            Dob: '',
            Nationality: 'Việt Nam',
            CMND: '',
            DateRange: '',
            IssuedBy: '',
            Phone: '',
            Email: '',
            TotalPrice: $scope.priceAdult
        }];
        $scope.T_TourBookGuestChild = [];
        $scope.T_TourBookGuestInfant = [];
    };
    $scope.getData();
    $scope.changeAdult = function () {
        if ($scope.data.tourBook.Adult > $scope.T_TourBookGuestAdult.length) {
            var spaceRange = $scope.data.tourBook.Adult - $scope.T_TourBookGuestAdult.length;
            for (var i = 0; i < spaceRange; i++) {
                $scope.T_TourBookGuestAdult.push({
                    TypeGuest: 'Nguời lớn',
                    FullName: '',
                    Sex: '',
                    Dob: '',
                    Nationality: 'Việt Nam',
                    CMND: '',
                    DateRange: '',
                    IssuedBy: '',
                    Phone: '',
                    Email: '',
                    TotalPrice: $scope.priceAdult
                });
            }
        }
        else {
            var startSplice = $scope.T_TourBookGuestAdult.length - $scope.data.tourBook.Adult;
            $scope.T_TourBookGuestAdult.splice($scope.data.tourBook.Adult, startSplice);
        }
    };
    $scope.changeChild = function () {
        if ($scope.data.tourBook.Child > $scope.T_TourBookGuestChild.length) {
            var spaceRange = $scope.data.tourBook.Child - $scope.T_TourBookGuestChild.length;
            for (var i = 0; i < spaceRange; i++) {
                $scope.T_TourBookGuestChild.push({
                    TypeGuest: 'Trẻ em',
                    FullName: '',
                    Sex: '',
                    Dob: '',
                    Nationality: 'Việt Nam',
                    CMND: '',
                    DateRange: '',
                    IssuedBy: '',
                    Phone: '',
                    Email: '',
                    TotalPrice: $scope.priceChild
                });
            }
        }
        else {
            var startSplice = $scope.T_TourBookGuestChild.length - $scope.data.tourBook.Child;
            $scope.T_TourBookGuestChild.splice($scope.data.tourBook.Child, startSplice);
        }
    };
    $scope.changeInfant = function () {
        if ($scope.data.tourBook.Infant > $scope.T_TourBookGuestInfant.length) {
            var spaceRange = $scope.data.tourBook.Infant - $scope.T_TourBookGuestInfant.length;
            for (var i = 0; i < spaceRange; i++) {
                $scope.T_TourBookGuestInfant.push({
                    TypeGuest: 'Sơ sinh',
                    FullName: '',
                    Sex: '',
                    Dob: '',
                    Nationality: 'Việt Nam',
                    CMND: '',
                    DateRange: '',
                    IssuedBy: '',
                    Phone: '',
                    Email: '',
                    TotalPrice: $scope.priceInfant
                });
            }
        }
        else {
            var startSplice = $scope.T_TourBookGuestInfant.length - $scope.data.tourBook.Infant;
            $scope.T_TourBookGuestInfant.splice($scope.data.tourBook.Infant, startSplice);
        }
    };
    $scope.Post = function () {
        if (!$('#chkboxConfirm').is(':checked') || !$('#chkboxConfirm2').is(':checked')) {
            alert('Vui lòng xác nhận và đồng ý các điều khoản để tiếp tục');
            return;
        }
        if (validation.checkRequired()) {
            $scope.data.tourBook.T_TourBookGuest = [];
            $scope.T_TourBookGuestAdult.forEach(x => $scope.data.tourBook.T_TourBookGuest.push(x));
            $scope.T_TourBookGuestChild.forEach(x => $scope.data.tourBook.T_TourBookGuest.push(x));
            $scope.T_TourBookGuestInfant.forEach(x => $scope.data.tourBook.T_TourBookGuest.push(x));
            $scope.data.tourBook.PriceRoom = $scope.priceRoom;
            $http({
                url: urlPut,
                method: "PUT",
                data: $scope.data
            }).then(function success(response) {
                location.href = response.data;
            }, function error(response) {
                alert("Thực hiện không thành công")
            });
        }
        else {
            alert('Vui lòng điền đầy đủ thông tin vào các trường được đánh dấu *');
        }
    };
    $scope.calTotal = function () {
        var total = $scope.priceAdult * $scope.T_TourBookGuestAdult.length +
            $scope.priceChild * $scope.T_TourBookGuestChild.length +
            $scope.priceInfant * $scope.T_TourBookGuestInfant.length +
            $scope.priceRoom * $scope.data.tourBook.AddRoom;
        $scope.totalPrice = total;
    };
}]);

jQuery(document).ready(function () {
    $('.btnV').click(function () {
        $('.btnV').addClass("tgHover");
        $(this).removeClass("tgHover");
        $('.tabbk').hide();
        var id = $(this).data("id");
        $("#" + id).show();
    });
});



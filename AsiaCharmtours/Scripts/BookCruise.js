$('.addHotel').click(function () {
    var firstPrice = $('.defaultPrice').text();
    var getId = $(this).data("id");
    var getPrice = $(this).data("price");
    var getName = $(this).data("name");

    var getAvail = CheckHotel(getId);

    if (getAvail === 0) {
        var tagService = '<tr class="getAll hotel-' + getId + '" data-id="' + getId + '"><td><div class="margin-left-20 border-dashed"><i class="fas fa-times clearHotel" data-id="' + getId + '"></i> <span class="hotelNameAdd">' + getName + '</span></div></td ><td align="center" class="none-style hidden-xs"><div class="border-dashed"><span class="quantityHotel">1</span></div></td><td class="">$ ' + getPrice + '</td><td align="right" class="text-price bgr-whiteSmoke price-Hotel" data-price="' + getPrice + '">$ <span class="total-priceHotel">' + getPrice + '</span></td></tr >';
    } else {
        var getQuantity = $('.hotel-' + getId + ' .quantityHotel').text();
        $('.hotel-' + getId + ' .quantityHotel').text(getQuantity * 1 + 1);
        $('.hotel-' + getId + ' .price-Hotel').html('$ <span class="total-priceHotel">'+ getPrice * (getQuantity * 1 + 1)+'</span>');
    }
    $('.extraSv').append(tagService);
    extraHotel();

    var total = getTotal(firstPrice);
    $('.finalTotal').text(total);
});

function CheckHotel(id) {
    var count = 0;
    $('.extraSv tr').each(function () {
        if (id === $(this).data("id")) {
            count++;
        }
    });
    return count;
}

function getTotal(price) {
    var total = price;

    $('.total-priceHotel').each(function () {
        var getTotal = $(this).text();
        total = total * 1 + parseInt(getTotal);
    });
    return total;
}

function extraHotel() {
    $('.extraHotel').empty();
    $('.getAll').each(function () {
        var quantity = $(this).find('.quantityHotel').text();
        var nameHotel = $(this).data("id");
        var addInputHotelName = '<input class="hiddenHotel" type="hidden" data-name="' + nameHotel + '" name="Hotel" value="' + nameHotel + '-' + quantity + '" />';
        $('.extraHotel').append(addInputHotelName);
    });
}


$('body').on("click", ".clearHotel", function () {

    var getId = $(this).data("id");
    $('.hotel-' + getId).remove();
    
    var firstPrice = $('.defaultPrice').text();
    var total = getTotal(firstPrice);
    $('.finalTotal').text(total);
    clearHiddenHotel(getId);
});


function clearHiddenHotel(getId) {
    $('.hiddenHotel').each(function () {
        var selectDom = $(this);
        var getName = selectDom.data("name");
        if (getId === getName) {
            selectDom.remove();
        }
    });
}


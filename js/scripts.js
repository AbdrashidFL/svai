$(function() {
    let selectedClass = "";
    $(".price-btns__item").click(function() {
        selectedClass = $(this).attr("data-price");
        $(this).siblings().removeClass("price-btns__item-active");
        $(this).addClass("price-btns__item-active");
        $(".price-list").fadeTo(300, 0);
        $(".price-list div").not("." + selectedClass).fadeOut();
        
        setTimeout(function() {
            $("." + selectedClass).fadeIn();
            $(".price-list").fadeTo(300, 1);
        }, 300);
    });
});
// price-filter
$('.reasons-step').on('click', function(event) {
    var elem = $(event.target).parents('.reasons-step');
    $(elem).find('.reasons-step').toggleClass('reasons-step__active');
    $(elem).find('.reasons-step__head').toggleClass('reasons-step__head-active');
    $(elem).find('.reasons-step__head-open').toggleClass('reasons-step__head-open-active');
    $(elem).find('.reasons-step__text').slideToggle();
});
// reasons-slider
$('.nav-menu').on("click", function(){
    $('.nav-list').toggleClass("nav-list__active");
});
// nav
$('.footer-nav__item-title').on('click', function(event) {
    var elem = $(event.target).parents('.footer-nav__item');
    $(elem).find('.footer-nav__item-list').toggleClass('footer-nav__item-list-active');
    $(elem).find('.footer-nav__item-title').toggleClass('footer-nav__item-title-active');
});
// footer
$(function() {
    let selectedClass = "";
    $(".price-btns__item").click(function(event) {
        selectedClass = $(this).attr("data-catalog");
        $(this).siblings().removeClass("price-btns__item-active");
        $(this).addClass("price-btns__item-active");
        $(".catalog-list__wrap").fadeTo(300, 0);
        $(".catalog-list__wrap .catalog-list__wrap-item").not("." + selectedClass).fadeOut();
        setTimeout(function() {
            $("." + selectedClass).fadeIn();
            $(".catalog-list__wrap").fadeTo(300, 1);
        }, 300);
    });
});
// catalog-filter

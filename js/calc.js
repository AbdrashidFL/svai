$(function () {
    function number_format(number, decimals, decPoint, thousandsSep) {
        decimals = decimals || 0;
        number = parseFloat(number);
        if (!decPoint || !thousandsSep) {
            decPoint = ".";
            thousandsSep = ",";
        }
        let roundedNumber = Math.round(Math.abs(number) * ("1e" + decimals)) + "";
        let numbersString = decimals ? roundedNumber.slice(0, decimals * -1) : roundedNumber;
        let decimalsString = decimals ? roundedNumber.slice(decimals * -1) : "";
        let formattedNumber = "";
        while (numbersString.length > 3) {
            formattedNumber += thousandsSep + numbersString.slice(-3);
            numbersString = numbersString.slice(0, -3);
        }
        return (number < 0 ? "-" : "") + numbersString + formattedNumber + (decimalsString ? decPoint + decimalsString : "");
    }
    function calculatedCount(type, floorCount, width, height) {
        let maxInterval = 0;
        if (floorCount === 1) {
            maxInterval = 3;
        }
        if (floorCount === 2) {
            maxInterval = 2.66666666666666666;
        }
        let wCount = Math.ceil(width / maxInterval);
        let wInterval = width / wCount;
        let wsCount = width / wInterval + 1;
        let hCount = Math.ceil(height / maxInterval);
        let hInterval = height / hCount;
        let hsCount = height / hInterval + 1;
        return wsCount * hsCount;
    }
    function updateResult() {
        let $selectBuildType = $(".calc-option__item-build"),
            $selectFloorCount = $(".calc-option__item-floor-count"),
            $selectWidth = $(".calc-option__item-width"),
            $selectHeight = $(".calc-option__item-height");
        if ($selectWidth.val() === "1" || $selectHeight.val() === "1") {
            return false;
        }
        let type = $selectBuildType.find("option:selected").data("categorie");
        let goods = $selectBuildType.data("goods"),
            types = $selectBuildType.data("types");
        let $resultCount = $(".calc-result__item-count"),
            $resultGoodType = $(".calc-result__itemt-good-type"),
            $resultInfo = $(".calc-result__item-info"),
            $resultSale = $(".calc-result__price-item-sale"),
            $resultPrice = $(".calc-result__price-item-price");
            $resultFloor = $(".calc-result__item-floor");
        let hasFloor = $selectBuildType.find("option:selected").data("has-floor") === 1;
        let floorCount = hasFloor === true ? Number($selectFloorCount.find("option:selected").data("type")) : 1;
        let count = calculatedCount(Number($selectBuildType.find("option:selected").data("type")), floorCount, Number($selectWidth.val()), Number($selectHeight.val()));
        $resultCount.text(`${count} Свай`);
        $resultGoodType.text(`Ø ${types[type]}`);
        var str00 = types[type];
        var r09 = str00.replace(/\D/g, "");
        $(".js-size-result-good-type-number").text(`${r09}`);
        let infoText = `${$selectBuildType.val()} ${$selectWidth.val()}x${$selectHeight.val()}`;
        if (hasFloor === true) {
            $resultFloor.text(`${$selectFloorCount.val()}`);
        }
        $resultInfo.text(infoText);
        let sale = goods[type][0]["prices"]["priceOld"] * count;
        if (sale !== 0) {
            $resultSale.text(`${number_format(sale, 0, ".", " ")}₽`);
        } else {
            $resultSale.text("");
        }
        let price = goods[type][0]["prices"]["price"] * count;
        if (price !== 0) {
            $resultPrice.text(`${number_format(price, 0, ".", " ")}₽`);
        } else {
            $resultPrice.text("");
        }
    }
    function initSizeSelector() {
        let $block = $(".calc-size__box");
        for (let i = 10; i >= 1; i--) {
            for (let j = 1; j <= 10; j++) {
                $block.append(`<div class="calc-size__item calc-size__box-ceil"data-row="${i}"data-col="${j}"></div>`);
            }
        }
        $(".calc-size__box-ceil").on("mouseenter", function () {
            let $ceil = $(this),
                currentRow = $ceil.data("row"),
                currentCol = $ceil.data("col");
            $(".calc-size__box-ceil").removeClass("calc-size__item-selected-mouse");
            for (let i = 1; i <= currentRow; i++) {
                for (let j = 1; j <= currentCol; j++) {
                    $(`.calc-size__box-ceil[data-row="${i}"][data-col="${j}"]`).addClass("calc-size__item-selected-mouse");
                }
            }
        });
        $(".calc-size__box-ceil").on("click", function () {
            let $ceil = $(this),
                selectWidth = $(".calc-option__item-width"),
                selectHeight = $(".calc-option__item-height"),
                currentRow = $ceil.data("row"),
                currentCol = $ceil.data("col");
            if (currentRow === 1 || currentCol === 1) {
                return false;
            }
            $(".calc-size__box-ceil").removeClass("calc-size__item-selected").removeClass("calc-size__item-selected-mouse");
            for (let i = 1; i <= currentRow; i++) {
                for (let j = 1; j <= currentCol; j++) {
                    $(`.calc-size__box-ceil[data-row="${i}"][data-col="${j}"]`).addClass("calc-size__item-selected");
                }
            }
            $ceil.addClass("calc-size__item-selected");
            selectHeight.val(currentRow).prop("selected", true);
            selectWidth.val(currentCol).prop("selected", true);
            updateResult();
        });
        $block.on("mouseleave", function () {
            $(".calc-size__box-ceil").removeClass("calc-size__item-selected-mouse");
        });
    }
    initSizeSelector();
    $('.calc-size__box-ceil[data-row="7"][data-col="7"]').trigger("click");
    $(".calc-option__item-width, .calc-option__item-height").on("change", function () {
        let $selectWidth = $(".calc-option__item-width"),
            $selectHeight = $(".calc-option__item-height"),
            selectWidthValue = Number($selectWidth.val()),
            selectHeightValue = Number($selectHeight.val());
        if (selectWidthValue === 1 || selectHeightValue === 1) {
            return false;
        }
        $(".calc-size__box-ceil").removeClass("calc-size__item-selected").removeClass("calc-size__item-selected");
        for (let i = 1; i <= selectWidthValue; i++) {
            for (let j = 1; j <= selectHeightValue; j++) {
                $(`.calc-size__box-ceil[data-row="${i}"][data-col="${j}"]`).addClass("calc-size__item-selected");
            }
        }
        $(`.calc-size__box-ceil[data-row="${selectWidthValue}"][data-col="${selectHeightValue}"]`).addClass("calc-size__item-selected");
    });
    $(".calc-option__item-floor-count, .calc-option__item-width, .calc-option__item-height").on("change", function () {
        updateResult();
    });
    $(".calc-option__item-build").on("change", function () {
        let $selectBuildType = $(this),
            $selectFloorCount = $(".calc-option__item-floor-count");
        if ($selectBuildType.find("option:selected").data("has-floor") === 1) {
            $selectFloorCount.prop("disabled", false);
        } else {
            $selectFloorCount.find('option[value="1 Этаж"]').prop("selected", "true");
            $selectFloorCount.prop("disabled", true);
        }
        updateResult();
    });
    $(".calc-result__btns-popup").on("click", function (e) {
        e.preventDefault();
        $(".calc-con").removeClass('calc-con__active');
        $(".js-size-calculator-result-block").addClass('calc-desc__active');
        $(".calc-form__close").show();
        $('.js-size-tab[index="0"]').addClass("active");
        $('.js-size-tab[index="0"]').show();
        let $selectBuildType = $(".calc-option__item-build");
        let categorie = $selectBuildType.find("option:selected").data("categorie");
        if (categorie == 156) {
            $(".js-size-info-157").hide();
            $(".js-size-info-156").show();
        }
        if (categorie == 157) {
            $(".js-size-info-156").hide();
            $(".js-size-info-157").show();
        }
        $(".js-size-calculator-result-block .js-size-tab:first").trigger("click");
    });
    $(".calc-form__close").on("click", function (e) {
        e.preventDefault();
        $(".js-size-calculator-result-block").removeClass('calc-desc__active');
        $(".calc-con").addClass('calc-con__active');
    });
    $(".js-size-tab").on("click", function () {
        let tab = $(this);
        $(".js-size-tab").removeClass("active");
        $('.js-tab-menu .js-size-tab[index="' + tab.attr("index") + '"]').addClass("active");
        $(".js-size-tab-block").hide();
        $('.js-size-tab-block[index="' + tab.attr("index") + '"]').show();
    });
    $(".calc-result__btns-item").on("click", function () {
        $(".calc-result__form").toggleClass('calc-result__form-active');
    });
});
// calc
var arbitraryValuesSliderA = document.getElementById('discount-quiz__step-quest-slider-horizontal-a');
var arbitraryValuesForSliderA = ['3 м', '4 м', '5 м', '6 м', '7 м', '8 м', '9 м', '10 м', '11 м', '12 м', '13 м', '14 м', '15 м', '16 м', '17 м', '18 м', '19 м', '20 м'];
var format = {
    to: function(value) {
        return arbitraryValuesForSliderA[Math.round(value)];
    },
    from: function (value) {
        return arbitraryValuesForSliderA.indexOf(value);
    }
};
let noUiSliderTargetA = noUiSlider.cssClasses.target += ' range-slider';
let noUiSliderCreateA = noUiSlider.create(arbitraryValuesSliderA, {
    start: ['3 м'],
    connect: 'lower',
    range: { min: 0, max: arbitraryValuesForSliderA.length - 1 },
    step: 1,
    tooltips: true,
    format: format,
    pips: { mode: 'steps', format: format, density: 50 },
});
// discount-q-2
var arbitraryValuesSliderB = document.getElementById('discount-quiz__step-quest-slider-horizontal-b');
var arbitraryValuesForSliderB = ['3 м', '4 м', '5 м', '6 м', '7 м', '8 м', '9 м', '10 м', '11 м', '12 м', '13 м', '14 м', '15 м', '16 м', '17 м', '18 м', '19 м', '20 м'];
var format = {
    to: function(value) {
        return arbitraryValuesForSliderB[Math.round(value)];
    },
    from: function (value) {
        return arbitraryValuesForSliderB.indexOf(value);
    }
};
let noUiSliderTargetB = noUiSlider.cssClasses.target += ' range-slider';
let noUiSliderCreateB = noUiSlider.create(arbitraryValuesSliderB, {
    start: ['3 м'],
    connect: 'lower',
    range: { min: 0, max: arbitraryValuesForSliderB.length - 1 },
    step: 1,
    tooltips: true,
    format: format,
    pips: { mode: 'steps', format: format, density: 50 },
});
// discount-q-3

let discountTotal = 0;
$('.discount-quiz__step-quest').each(function(indexInArray, valueOfElement) {
    let discountQuestionBlock = indexInArray + 1
    $(this).attr('data-q', discountQuestionBlock);
    discountTotal = discountTotal + 1;
});
let discountValid = {};
let discountQuestionNumber = 1;
let discountTotalLoad = 16.667;
let discountTotalLoadQuest = 1;
let discountGetAnswerText;
let discountTotalLoadQuestItem = document.getElementById('discount-quiz__total-num')

if(discountQuestionNumber===1){
    jQuery(document).on("keyup", 'input[name="discount-q-'+discountQuestionNumber+'"][type="text"]', function () {
        void 0 !== jQuery(this).val() && (jQuery(this).val().length > 0
        ? $('.discount-quiz__step-quest-point-btns-btn-next[name="discount-q-'+discountQuestionNumber+'"]').addClass('discount-quiz__step-quest-point-btns-btn-next-active')
        : $('.discount-quiz__step-quest-point-btns-btn-next[name="discount-q-'+discountQuestionNumber+'"]').removeClass('discount-quiz__step-quest-point-btns-btn-next-active'))
    });
}
$('.discount-quiz__step-quest-point-btns-btn-next, .discount-quiz__step input[type="radio"]').on("click", function(event) { 
    $('.discount-popup__quiz-btns-prev').addClass('discount-quiz__step-quest-point-btns-btn-prev-active');
    if (discountQuestionNumber < discountTotal) {
        discountTotalLoad = discountTotalLoad + 16.667;
        $('.discount-quiz__total-percent-load').css('width', discountTotalLoad+"%")
        discountTotalLoadQuest = discountTotalLoadQuest + 1;
        discountTotalLoadQuestItem.innerHTML = discountTotalLoadQuest;
        setTimeout(() => {
            if(discountQuestionNumber === 5){
                $('.discount-quiz__total').hide();
            }
            discountQuestionNumber++;
            if(discountQuestionNumber===4){
                $('.discount-quiz__step-quest-point-btns-btn-next[name="discount-q-'+discountQuestionNumber+'"]').removeClass('discount-quiz__step-quest-point-btns-btn-next-active');
                jQuery(document).on("keyup", 'input[name="discount-q-'+discountQuestionNumber+'"][type="text"]', function () {
                    void 0 !== jQuery(this).val() && (jQuery(this).val().length > 0
                    ? $('.discount-quiz__step-quest-point-btns-btn-next[name="discount-q-'+discountQuestionNumber+'"]').addClass('discount-quiz__step-quest-point-btns-btn-next-active')
                    : $('.discount-quiz__step-quest-point-btns-btn-next[name="discount-q-'+discountQuestionNumber+'"]').removeClass('discount-quiz__step-quest-point-btns-btn-next-active'))
                });
            }
            else if(discountQuestionNumber===5){
                $('.discount-quiz__step-quest-point-btns-btn-next[name="discount-q-'+discountQuestionNumber+'"]').removeClass('discount-quiz__step-quest-point-btns-btn-next-active');
                jQuery(document).on("keyup", 'input[name="discount-q-'+discountQuestionNumber+'"][type="text"]', function () {
                    void 0 !== jQuery(this).val() && (jQuery(this).val().length > 0
                    ? $('.discount-quiz__step-quest-point-btns-btn-next[name="discount-q-'+discountQuestionNumber+'"]').addClass('discount-quiz__step-quest-point-btns-btn-next-active')
                    : $('.discount-quiz__step-quest-point-btns-btn-next[name="discount-q-'+discountQuestionNumber+'"]').removeClass('discount-quiz__step-quest-point-btns-btn-next-active'))
                });
            }
            validNumber = discountQuestionNumber - 1
            discountValid['quiestion-' + validNumber] = true;
            if (discountValid['quiestion-' + discountQuestionNumber] == true) {
                $('.discount-popup__quiz-btns-next').removeClass('disabled');
            }
            $('.discount-quiz__step-quest.discount-quiz__step-quest-active').hide();
            $('.discount-quiz__step-quest.discount-quiz__step-quest-active').removeClass('discount-quiz__step-quest-active');
            $('.discount-quiz__step-quest.discount-quiz__step-quest-active').removeClass('discount-popup__quiz-steps-item-active');
            $('.discount-quiz__step-quest[data-q=' + discountQuestionNumber + ']').fadeIn('slow')
            $('.discount-quiz__step-quest[data-q=' + discountQuestionNumber + ']').addClass('discount-popup__quiz-quest-active');
            $('.discount-quiz__step-quest[data-q=' + discountQuestionNumber + ']').addClass('discount-quiz__step-quest-active');
        }, 500);
        console.log(discountValid)
    }
});
$('.discount-quiz__step-quest-point-btns-btn-prev').on("click", function() {
    discountTotalLoad = discountTotalLoad - 16.667;
    $('.discount-quiz__total-percent-load').css('width', discountTotalLoad+"%")
    discountTotalLoadQuest = discountTotalLoadQuest - 1;
    discountTotalLoadQuestItem.innerHTML = discountTotalLoadQuest;
    if (discountQuestionNumber > 2) {
        discountQuestionNumber--;
        if (discountValid['quiestion-' + discountQuestionNumber] == true) {
            $('.discount-popup__quiz-btns-prev').addClass('discount-quiz__step-quest-point-btns-btn-prev-active');
        }
        $('.discount-quiz__step-quest.discount-quiz__step-quest-active').hide();
        $('.discount-quiz__step-quest.discount-quiz__step-quest-active').removeClass('discount-quiz__step-quest-active');
        $('.discount-quiz__step-quest.discount-quiz__step-quest-active').removeClass('discount-popup__quiz-steps-item-active');
        $('.discount-quiz__step-quest[data-q=' + discountQuestionNumber + ']').fadeIn('slow')
        $('.discount-quiz__step-quest[data-q=' + discountQuestionNumber + ']').addClass('discount-popup__quiz-quest-active');
        $('.discount-quiz__step-quest[data-q=' + discountQuestionNumber + ']').addClass('discount-quiz__step-quest-active');
        if(discountQuestionNumber<5){
            $('.discount-popup__quiz-btns-next').css('display', 'block');
        }
    } 
    else if (discountQuestionNumber == 2) {
        discountQuestionNumber--;

        // $('.quiz-footer__next').removeClass('disabled');
        $('.discount-quiz__step-quest.discount-quiz__step-quest-active').hide();
        $('.discount-quiz__step-quest.discount-quiz__step-quest-active').removeClass('discount-quiz__step-quest-active');
        $('.discount-quiz__step-quest.discount-quiz__step-quest-active').removeClass('discount-popup__quiz-steps-item-active');
        $('.discount-quiz__step-quest[data-q=' + discountQuestionNumber + ']').fadeIn('slow')
        $('.discount-quiz__step-quest[data-q=' + discountQuestionNumber + ']').addClass('discount-popup__quiz-quest-active');
        $('.discount-quiz__step-quest[data-q=' + discountQuestionNumber + ']').addClass('discount-quiz__step-quest-active');
    }
});
// quiz
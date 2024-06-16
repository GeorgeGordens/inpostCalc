$(document).ready(function() {
    $('input[type=radio][name=dostawa]').change(function() {
        if ($(this).val() == 'dostPaczkomat') {
            $('#kosztXs').text('11,99 zł');
            $('#kosztA').text('16,99 zł');
            $('#kosztB').text('18,99 zł');
            $('#kosztC').text('20,99 zł');
            $('#kosztD').text('36,99 zł');
            $('#rozmD').prop('disabled', true);
            $('#uslWeekend').prop('disabled', false);

        }
        else if ($(this).val() == 'dostKurier') {
            $('#kosztXs').text('14,99 zł');
            $('#kosztA').text('19,99 zł');
            $('#kosztB').text('20,99 zł');
            $('#kosztC').text('25,99 zł');
            $('#kosztD').text('36,99 zł');
            $('#rozmD').prop('disabled', false);
            $('#uslWeekend').prop('disabled', true);
        }
    });
});

function makeCalc() {
    let costs = {
        dostPaczkomat: { rozmXs: 11.99, rozmA: 16.99, rozmB: 18.99, rozmC: 20.99, rozmD: null },
        dostKurier: { rozmXs: 14.99, rozmA: 19.99, rozmB: 20.99, rozmC: 25.99, rozmD: 36.99 }
    };

    let totalCost = 0;

    let dostawa = $('input[type=radio][name=dostawa]:checked').val();
    let rozmiar = $('input[type=radio][name=rozmiar]:checked').val();

    if (!dostawa) {
        console.log("Nie wybrano sposobu dostawy");
        return;
    }

    if (!rozmiar) {
        console.log("Nie wybrano rozmiaru");
        return;
    }

    let cost = costs[dostawa][rozmiar];

    if (cost !== null && typeof cost !== 'undefined') {
        totalCost += cost;
    }

    let uslOchrona = parseFloat($('input[type=radio][name=ochrona]:checked').val()) || 0;
    totalCost += uslOchrona;

    let uslPobranie = $('#uslPobranie').is(':checked') ? parseFloat($('#uslPobranie').val()) : 0;
    totalCost += uslPobranie;

    let uslWeekend = $('#uslWeekend').is(':checked') ? parseFloat($('#uslWeekend').val()) : 0;
    totalCost += uslWeekend;

    let uslPodjazd = parseFloat($('input[type=radio][name=podjazd]:checked').val()) || 0;
    totalCost += uslPodjazd;

    $('#calcResult').html('Koszt twojej paczki wyniesie ' + totalCost.toFixed(2) + ' zł');
};

$(document).ready(function() {
    $('input[type=radio][name=dostawa], input[type=radio][name=rozmiar], input[type=radio][name=ochrona], input[type=radio][name=podjazd], input[type=checkbox]').change(function() {
        makeCalc();
    });
});

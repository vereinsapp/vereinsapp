/**
 * @param {JQuery} $vorschau
 * @param {JQuery} $element
 */

function Liste_ElementVorschauAktualisieren($vorschau, $element) {
    let $letzter_sichtbarer_spacer;

    $.each($vorschau.children(".eigenschaft"), function () {
        const $eigenschaft = $(this);
        const $zugehoeriger_spacer = $eigenschaft.next();

        if (isEmptyString($eigenschaft.text())) {
            $eigenschaft.addClass("invisible");
            $zugehoeriger_spacer.addClass("invisible");
        } else {
            $eigenschaft.removeClass("invisible");
            $zugehoeriger_spacer.removeClass("invisible");
            $letzter_sichtbarer_spacer = $zugehoeriger_spacer;
        }
    });

    if (typeof $letzter_sichtbarer_spacer !== "undefined" && $letzter_sichtbarer_spacer.exists()) $letzter_sichtbarer_spacer.addClass("invisible");
}

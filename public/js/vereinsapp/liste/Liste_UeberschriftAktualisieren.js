/**
 * @param {JQuery} $ueberschrift
 * @param {JQuery} $liste
 */

function Liste_UeberschriftAktualisieren($ueberschrift, $liste) {
    if ($liste.length === 0) $ueberschrift.addClass("invisible");
    else $ueberschrift.removeClass("invisible");
}

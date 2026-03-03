/**
 * @param {JQuery} $ueberschrift
 * @param {JQuery} $liste
 */

function Liste_$UeberschriftAktualisieren($ueberschrift, $liste) {
    if ($liste.children().length === 0) $ueberschrift.addClass("invisible");
    else $ueberschrift.removeClass("invisible");
}

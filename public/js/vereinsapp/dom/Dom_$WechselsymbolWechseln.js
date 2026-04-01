/**
 * @param {JQuery} $wechselsymbol
 */

function Dom_$WechselsymbolWechseln($wechselsymbol) {
    const wechselsymbol = Util_WertBereinigtZurueck($wechselsymbol.attr("wechselsymbol"), undefined);

    $wechselsymbol
        .removeClass("bi-" + SYMBOLE[wechselsymbol[1]])
        .addClass("bi-" + SYMBOLE[wechselsymbol[0]])
        .attr("wechselsymbol", JsonStringifiedZurueck([wechselsymbol[1], wechselsymbol[0]]));
}

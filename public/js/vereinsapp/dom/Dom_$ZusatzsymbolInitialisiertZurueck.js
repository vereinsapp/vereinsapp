/**
 * @param {string} zusatzsymbol
 * @param {JQuery} $element
 */

function Dom_$ZusatzsymbolInitialisiertZurueck(zusatzsymbol, $element) {
    const $zusatzsymbol = ZUSATZSYMBOLE.$blanko_zusatzsymbol.clone().removeClass("blanko invisible").addClass("zusatzsymbol");

    $zusatzsymbol.attr("zusatzsymbol", zusatzsymbol);
    if ($zusatzsymbol.find(".bi").exists() && zusatzsymbol in SYMBOLE) $zusatzsymbol.find(".bi").addClass("bi-" + SYMBOLE[zusatzsymbol]);

    if (typeof ZUSATZSYMBOLE[zusatzsymbol].aktualisieren_aktion === "function")
        ZUSATZSYMBOLE[zusatzsymbol].aktualisieren_aktion($zusatzsymbol, $element);

    return $zusatzsymbol;
}

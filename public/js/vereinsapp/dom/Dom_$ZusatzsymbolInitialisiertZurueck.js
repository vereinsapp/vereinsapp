/**
 * @param {string} zusatzsymbol
 * @param {JQuery} $container
 */

function Dom_$ZusatzsymbolInitialisiertZurueck(zusatzsymbol, $container) {
    const $zusatzsymbol = ZUSATZSYMBOLE.$blanko_zusatzsymbol.clone().removeClass("blanko invisible").addClass("zusatzsymbol");

    $zusatzsymbol.attr("zusatzsymbol", zusatzsymbol);
    if ($zusatzsymbol.find(".bi").exists() && zusatzsymbol in SYMBOLE) $zusatzsymbol.find(".bi").addClass("bi-" + SYMBOLE[zusatzsymbol]);

    if (typeof ZUSATZSYMBOLE[zusatzsymbol].aktualisieren_aktion === "function")
        ZUSATZSYMBOLE[zusatzsymbol].aktualisieren_aktion($zusatzsymbol, $container);

    return $zusatzsymbol;
}

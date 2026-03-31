/**
 * @param {JQuery} $zusatzsymbole
 */

function Dom_$ZusatzsymboleAktualisieren($zusatzsymbole) {
    const zusatzsymbole = Util_WertBereinigtZurueck($zusatzsymbole.attr("zusatzsymbole"), new Array());
    const $element = $zusatzsymbole.closest(".element");

    // ZUSATZSYMBOLE IM DOM LÖSCHEN
    $zusatzsymbole.find(".zusatzsymbol").each(function () {
        const $zusatzsymbol = $(this);
        const zusatzsymbol = Util_WertBereinigtZurueck($zusatzsymbol.attr("zusatzsymbol"), undefined);
        if (!zusatzsymbole.includes(zusatzsymbol)) $zusatzsymbol.remove();
    });

    // ZUSATZSYMBOLE IM DOM ERGÄNZEN UND SORTIEREN
    $.each(zusatzsymbole, function (position, zusatzsymbol) {
        let $zusatzsymbol = $zusatzsymbole.find('.zusatzsymbol[zusatzsymbol="' + zusatzsymbol + '"]');
        if (!$zusatzsymbol.exists()) $zusatzsymbol = Dom_$ZusatzsymbolInitialisiertZurueck(zusatzsymbol, $element);
        else if (typeof ZUSATZSYMBOLE[zusatzsymbol].aktualisieren_aktion === "function")
            ZUSATZSYMBOLE[zusatzsymbol].aktualisieren_aktion($zusatzsymbol, $element);

        if (position === 0) $zusatzsymbol.appendTo($zusatzsymbole);
        else $zusatzsymbol.insertAfter($zusatzsymbole.find('.zusatzsymbol[zusatzsymbol="' + zusatzsymbole[position - 1] + '"]'));
    });
}

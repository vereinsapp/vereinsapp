/**
 * @param {JQuery} $werkzeuge
 * @param {Object} data
 */

function Dom_$WerkzeugeAktualisieren($werkzeuge, data) {
    const werkzeuge = Util_WertBereinigtZurueck($werkzeuge.attr("werkzeuge"), new Array());

    // WERKZEUGE IM DOM LÖSCHEN
    $werkzeuge.find(".werkzeug").each(function () {
        const $werkzeug = $(this);
        const werkzeug = Util_WertBereinigtZurueck($werkzeug.attr("werkzeug"), undefined);
        if (!werkzeuge.includes(werkzeug)) $werkzeug.remove();
    });

    // WERKZEUGE IM DOM ERGÄNZEN UND SORTIEREN
    $.each(werkzeuge, function (position, werkzeug) {
        let $werkzeug = $werkzeuge.find('.werkzeug[werkzeug="' + werkzeug + '"]');
        if (!$werkzeug.exists()) $werkzeug = Dom_$WerkzeugInitialisiertZurueck(werkzeug, data);
        else if (typeof WERKZEUGE[werkzeug].aktualisieren_aktion === "function") WERKZEUGE[werkzeug].aktualisieren_aktion($werkzeug);

        if (position === 0) $werkzeug.appendTo($werkzeuge);
        else $werkzeug.insertAfter($werkzeuge.find('.werkzeug[werkzeug="' + werkzeuge[position - 1] + '"]'));
    });
}

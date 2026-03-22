function Dom_$WerkzeugIn$UmgebungEinfuegen(werkzeuge, $umgebung, data) {
    // Obsolete Werkzeuge aus Umgebung entfernen
    $umgebung.find(".werkzeug").each(function () {
        const $werkzeug = $(this);
        const werkzeug = Util_WertBereinigtZurueck($werkzeug.attr("werkzeug"), undefined);
        if (!werkzeuge.includes(werkzeug)) $werkzeug.remove();
    });

    // Werkzeuge in Umgebung einfügen
    $.each(werkzeuge, function (position, werkzeug) {
        let $werkzeug = $umgebung.find('.werkzeug[werkzeug="' + werkzeug + '"]');
        if (!$werkzeug.exists()) $werkzeug = Dom_$WerkzeugInitialisiertZurueck(werkzeug, data);

        if (position === 0) $werkzeug.appendTo($umgebung);
        else $werkzeug.insertAfter($umgebung.find('.werkzeug[werkzeug="' + werkzeuge[position - 1] + '"]'));

        if (typeof WERKZEUGE[werkzeug].aktualisieren_aktion === "function") WERKZEUGE[werkzeug].aktualisieren_aktion($werkzeug);
    });
}

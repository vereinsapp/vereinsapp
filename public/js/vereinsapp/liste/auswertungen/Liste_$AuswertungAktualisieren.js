/**
 * @param {JQuery} $auswertung
 */

function Liste_$AuswertungAktualisieren($auswertung) {
    const auswertungen = Util_WertBereinigtZurueck($auswertung.attr("auswertungen"), undefined);
    const liste = Util_WertBereinigtZurueck($auswertung.attr("liste"), undefined);

    // ERGEBNIS NACH STATUS ERMITTELN
    const ergebnis_nach_status = new Array();
    $.each(Object.keys(VERKNUEPFUNGEN[auswertungen].status_erlaubt), function (position, status) {
        ergebnis_nach_status[status] = new Array();
    });
    ergebnis_nach_status[0] = Util_WertBereinigtZurueck($auswertung.attr(LISTEN[liste].element + "_ids"), new Array());
    const ergebnis_referenz_anzahl = ergebnis_nach_status[0].length;

    $.each(
        Util_WertBereinigtZurueck($auswertung.attr(VERKNUEPFUNGEN[auswertungen].verknuepfung + "_ids"), new Array()),
        function (position, auswertung_id) {
            ergebnis_nach_status[Liste_VariableRausZurueck("status", auswertung_id, auswertungen, undefined)].push(auswertung_id);
            ergebnis_nach_status[0] = ergebnis_nach_status[0].filter(
                (element_id) => element_id != Liste_VariableRausZurueck(LISTEN[liste].element + "_id", auswertung_id, auswertungen, undefined),
            );
        },
    );

    // ERGEBNIS_ANZAHL AKTUALISIEREN
    $auswertung.find(".ergebnis_anzahl").each(function () {
        const $ergebnis_anzahl = $(this);
        const status = Util_WertBereinigtZurueck($ergebnis_anzahl.attr("status"), undefined);

        const ergebnis_anzahl = ergebnis_nach_status[status].length;

        if ($ergebnis_anzahl.hasClass("progress"))
            $ergebnis_anzahl.attr("style", "width: " + (ergebnis_anzahl / ergebnis_referenz_anzahl) * 100 + "%");
        else $ergebnis_anzahl.text(ergebnis_anzahl);
    });

    // ERGEBNIS AKTUALISIEREN
    $auswertung.find(".ergebnis").each(function () {
        const $ergebnis = $(this);

        const filtern = { id: { inklusiv: new Array() } };
        $.each(ergebnis_nach_status[Util_WertBereinigtZurueck($ergebnis.attr("status"), undefined)], function (position, auswertung_id) {
            filtern.id.inklusiv.push(auswertung_id);
        });
        $ergebnis.attr("filtern", JsonStringifiedZurueck(filtern, new Object()));
    });

    // BESCHRIFTUNG AKTUALISIEREN
    const beschriftung = Util_WertBereinigtZurueck($auswertung.attr("beschriftung"), undefined);
    if (typeof beschriftung !== "undefined") $auswertung.find(".beschriftung").text(beschriftung);

    // BEINHALTETE LISTE AKTUALISIEREN
    $auswertung.find('.liste[liste="' + liste + '"]').each(function () {
        Liste_$ListeAktualisieren($(this));
    });
    $auswertung.find('.element[liste="' + liste + '"]').each(function () {
        Liste_$ElementAktualisieren($(this));
    });
}

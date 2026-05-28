/**
 * @param {JQuery} $auswertung
 */

function Liste_$AuswertungAktualisieren($auswertung) {
    const verknuepfungen = Util_WertBereinigtZurueck($auswertung.attr("verknuepfungen"), undefined);
    const liste = Util_WertBereinigtZurueck($auswertung.attr("liste"), undefined);

    // ERGEBNIS NACH STATUS ERMITTELN
    const ergebnis_nach_status = new Array();
    $.each(Object.keys(VERKNUEPFUNGEN[verknuepfungen].status_erlaubt), function (position, status) {
        ergebnis_nach_status[status] = new Array();
    });
    ergebnis_nach_status[0] = Util_WertBereinigtZurueck($auswertung.attr(LISTEN[liste].element + "_ids"), new Array());
    const ergebnis_referenz_anzahl = ergebnis_nach_status[0].length;

    $.each(
        Util_WertBereinigtZurueck($auswertung.attr(VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_ids"), new Array()),
        function (position, verknuepfung_id) {
            const status = Liste_VerknuepfungWertRausZurueck("status", verknuepfung_id, verknuepfungen, undefined);
            const element_id = Liste_VerknuepfungWertRausZurueck(LISTEN[liste].element + "_id", verknuepfung_id, verknuepfungen, undefined);
            ergebnis_nach_status[status].push(element_id);
            ergebnis_nach_status[0] = ergebnis_nach_status[0].filter((element_id_) => element_id_ != element_id);
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
        const status = Util_WertBereinigtZurueck($ergebnis.attr("status"), undefined);

        const filtern = { id: { inklusiv: new Array() } };
        $.each(ergebnis_nach_status[status], function (position, element_id) {
            filtern.id.inklusiv.push(element_id);
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

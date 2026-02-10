/**
 * @param {JQuery} $auswertung
 */

function Liste_$AuswertungAktualisieren($auswertung) {
    const auswertungen = Schnittstelle_VariableWertBereinigtZurueck($auswertung.attr("data-auswertungen"), undefined);
    const liste = Schnittstelle_VariableWertBereinigtZurueck($auswertung.attr("data-liste"), undefined);

    // ERGEBNIS NACH STATUS ERMITTELN
    const ergebnis_nach_status = new Array();
    $.each(Object.keys(VERKNUEPFUNGEN[auswertungen].status_erlaubt), function (position, status) {
        ergebnis_nach_status[status] = new Array();
    });
    ergebnis_nach_status[0] = Schnittstelle_VariableWertBereinigtZurueck($auswertung.attr("data-" + LISTEN[liste].element + "_ids"), new Array());
    const ergebnis_referenz_anzahl = ergebnis_nach_status[0].length;

    $.each(
        Schnittstelle_VariableWertBereinigtZurueck($auswertung.attr("data-" + LISTEN[auswertungen].element + "_ids"), new Array()),
        function (position, auswertung_id) {
            ergebnis_nach_status[Schnittstelle_VariableRausZurueck("status", auswertung_id, auswertungen, undefined)].push(auswertung_id);
            ergebnis_nach_status[0] = ergebnis_nach_status[0].filter(
                (element_id) =>
                    element_id != Schnittstelle_VariableRausZurueck(LISTEN[liste].element + "_id", auswertung_id, auswertungen, undefined),
            );
        },
    );

    // ERGEBNIS_ANZAHL AKTUALISIEREN
    $auswertung.find(".ergebnis_anzahl").each(function () {
        const $ergebnis_anzahl = $(this);
        const status = Schnittstelle_VariableWertBereinigtZurueck($ergebnis_anzahl.attr("data-status"), undefined);

        const ergebnis_anzahl = ergebnis_nach_status[status].length;

        if ($ergebnis_anzahl.hasClass("progress"))
            $ergebnis_anzahl.attr("style", "width: " + (ergebnis_anzahl / ergebnis_referenz_anzahl) * 100 + "%");
        else $ergebnis_anzahl.text(ergebnis_anzahl);
    });

    // ERGEBNIS AKTUALISIEREN
    $auswertung.find(".ergebnis").each(function () {
        const $ergebnis = $(this);

        const filtern = { id: { inklusiv: new Array() } };
        $.each(
            ergebnis_nach_status[Schnittstelle_VariableWertBereinigtZurueck($ergebnis.attr("data-status"), undefined)],
            function (position, auswertung_id) {
                filtern.id.inklusiv.push(auswertung_id);
            },
        );
        $ergebnis.attr("data-filtern", JsonStringifiedZurueck(filtern, new Object()));
    });

    // BESCHRIFTUNG AKTUALISIEREN
    const beschriftung = Schnittstelle_VariableWertBereinigtZurueck($auswertung.attr("data-beschriftung"), undefined);
    if (typeof beschriftung !== "undefined") $auswertung.find(".beschriftung").text(beschriftung);

    // BEINHALTETE LISTE AKTUALISIEREN
    $auswertung.find('.liste[data-liste="' + liste + '"], .liste[data-liste="' + auswertungen + '"]').each(function () {
        Liste_$ListeAktualisieren($(this));
    });
    $auswertung.find('.element[data-liste="' + liste + '"], .element[data-liste="' + auswertungen + '"]').each(function () {
        Liste_$ElementAktualisieren($(this));
    });
}

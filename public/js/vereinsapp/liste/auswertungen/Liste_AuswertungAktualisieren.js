function Liste_AuswertungAktualisieren($auswertung, auswertungen) {
    const beschriftung = $auswertung.attr("data-beschriftung");

    let status_auswahl = Schnittstelle_VariableWertBereinigtZurueck($auswertung.attr("data-status_auswahl"));
    if (typeof status_auswahl === "undefined") status_auswahl = new Object();

    const liste = $auswertung.attr("data-liste");
    let element_ids = Schnittstelle_VariableWertBereinigtZurueck($auswertung.attr("data-element_ids"));
    if (typeof element_ids === "undefined") element_ids = new Array();

    let auswertung_element_ids = Schnittstelle_VariableWertBereinigtZurueck($auswertung.attr("data-auswertung_element_ids"));
    if (typeof auswertung_element_ids === "undefined") auswertung_element_ids = new Array();

    const element_ids_nach_status = new Array();
    element_ids_nach_status[0] = arrayKopiertZurueck(element_ids);
    $.each(status_auswahl, function (status, beschriftung) {
        element_ids_nach_status[Number(status)] = new Array();
    });
    $.each(auswertung_element_ids, function (position, auswertung_element_id) {
        const status = LISTEN[auswertungen].tabelle[auswertung_element_id].status;
        const element_id = LISTEN[auswertungen].tabelle[auswertung_element_id][LISTEN[liste].element + "_id"];
        element_ids_nach_status[status].push(element_id);
        element_ids_nach_status[0] = element_ids_nach_status[0].filter((id) => id != element_id);
    });

    // BESCHRIFTUNG AKTUALISIEREN
    if (typeof beschriftung !== "undefined") $auswertung.find(".beschriftung").text(beschriftung);

    // ERGEBNIS_ANZAHL AKTUALISIEREN
    $auswertung.find(".ergebnis_anzahl").each(function () {
        const $ergebnis_anzahl = $(this);
        const status = $ergebnis_anzahl.attr("data-status");

        const ergebnis_anzahl = element_ids_nach_status[status].length;
        const ergebnis_referenz_anzahl = element_ids.length;

        if ($ergebnis_anzahl.hasClass("progress"))
            $ergebnis_anzahl.attr("style", "width: " + (ergebnis_anzahl / ergebnis_referenz_anzahl) * 100 + "%");
        else $ergebnis_anzahl.text(ergebnis_anzahl);
    });

    // ERGEBNIS AKTUALISIEREN
    $auswertung.find(".ergebnis").each(function () {
        const $ergebnis = $(this);
        const filtern = { id: { inklusiv: new Array() } };
        $.each(element_ids_nach_status[$ergebnis.attr("data-status")], function (position, element_id) {
            filtern.id.inklusiv.push(Number(element_id));
        });
        $ergebnis.attr("data-filtern", JsonStringifiedZurueck(filtern));
    });

    // BEINHALTETE LISTE AKTUALISIEREN
    $auswertung.find('.liste[data-liste="' + liste + '"]').each(function () {
        Liste_Aktualisieren($(this), liste);
    });
    $auswertung.find('.element[data-liste="' + liste + '"]').each(function () {
        Liste_ElementAktualisieren($(this), liste);
    });
}

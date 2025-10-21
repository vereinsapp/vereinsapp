function Liste_AuswertungAktualisieren($auswertung, auswertungen) {
    const beschriftung = $auswertung.attr("data-beschriftung");
    const status_auswahl = Schnittstelle_VariableWertBereinigtZurueck($auswertung.attr("data-status_auswahl"), new Object());
    const liste = Schnittstelle_VariableWertBereinigtZurueck($auswertung.attr("data-liste"), undefined);
    const element_ids = Schnittstelle_VariableWertBereinigtZurueck($auswertung.attr("data-element_ids"), new Array());
    const auswertung_element_ids = Schnittstelle_VariableWertBereinigtZurueck($auswertung.attr("data-auswertung_element_ids"), new Array());

    const element_ids_nach_status = new Array(new Array());
    $.each(element_ids, function (position, element_id) {
        element_ids_nach_status[0].push(element_id);
    });

    $.each(status_auswahl, function (status, beschriftung) {
        element_ids_nach_status[Number(status)] = new Array();
    });
    $.each(auswertung_element_ids, function (position, auswertung_element_id) {
        const status = Schnittstelle_VariableRausZurueck("status", auswertung_element_id, auswertungen);
        const element_id = Schnittstelle_VariableRausZurueck(LISTEN[liste].element + "_id", auswertung_element_id, auswertungen);
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

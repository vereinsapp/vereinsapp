function Liste_AuswertungAktualisieren($auswertung, auswertungen) {
    const auswertungen_instanz = $auswertung.attr("data-instanz");
    const liste = $auswertung.attr("data-liste");
    const gruppieren = $auswertung.attr("data-gruppieren");
    const wert = $auswertung.attr("data-wert");

    const alle_element_ids = new Array();
    const alle_element_ids_mit_status = new Object();
    function alleElementIdsSammeln(ergebnis_wert, alle_element_ids, alle_element_ids_mit_status) {
        $.each(ergebnis_wert, function (status, ergebnis_wert_status) {
            if (!(status in alle_element_ids_mit_status)) alle_element_ids_mit_status[status] = new Array();
            $.each(ergebnis_wert_status, function (position, element_id) {
                alle_element_ids.push(element_id);
                alle_element_ids_mit_status[status].push(element_id);
            });
        });
    }

    if ($auswertung.hasClass("zusammenfassung")) {
        $.each(LISTEN[auswertungen].instanz[auswertungen_instanz].auswertungen_ergebnis, function (wert, ergebnis_wert) {
            alleElementIdsSammeln(ergebnis_wert, alle_element_ids, alle_element_ids_mit_status);
        });
    } else
        alleElementIdsSammeln(
            LISTEN[auswertungen].instanz[auswertungen_instanz].auswertungen_ergebnis[wert],
            alle_element_ids,
            alle_element_ids_mit_status
        );

    // BESCHRIFTUNG AKTUALISIEREN
    if (typeof wert !== "undefined" && typeof gruppieren !== "undefined")
        $auswertung.find(".beschriftung").text(Liste_WertFormatiertZurueck(wert, gruppieren, liste));

    // ERGEBNIS_ANZAHL AKTUALISIEREN
    $auswertung.find(".ergebnis_anzahl").each(function () {
        const $ergebnis_anzahl = $(this);
        const status = $ergebnis_anzahl.attr("data-status");

        const ergebnis_anzahl = alle_element_ids_mit_status[status].length;
        const ergebnis_referenz_anzahl = alle_element_ids.length;

        if ($ergebnis_anzahl.hasClass("progress"))
            $ergebnis_anzahl.attr("style", "width: " + (ergebnis_anzahl / ergebnis_referenz_anzahl) * 100 + "%");
        else $ergebnis_anzahl.text(ergebnis_anzahl);
    });

    // ERGEBNIS AKTUALISIEREN
    $auswertung.find(".ergebnis").each(function () {
        const $ergebnis = $(this);
        const filtern = { id: { inklusiv: new Array() } };
        $.each(alle_element_ids_mit_status[$ergebnis.attr("data-status")], function (position, id) {
            filtern.id.inklusiv.push(Number(id));
        });
        $ergebnis.attr("data-filtern", JSON.stringify(filtern));
    });

    // BEINHALTETE LISTE AKTUALISIEREN
    $auswertung.find('.liste[data-liste="' + liste + '"]').each(function () {
        Liste_Aktualisieren($(this), liste);
    });
    $auswertung.find('.element[data-liste="' + liste + '"]').each(function () {
        Liste_ElementAktualisieren($(this), liste);
    });
}

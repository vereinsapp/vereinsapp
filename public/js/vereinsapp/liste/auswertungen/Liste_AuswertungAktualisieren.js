function Liste_AuswertungAktualisieren($auswertung, auswertungen) {
    const beschriftung = Schnittstelle_VariableWertBereinigtZurueck($auswertung.attr("data-beschriftung"), undefined);
    const liste = Schnittstelle_VariableWertBereinigtZurueck($auswertung.attr("data-liste"), undefined);
    const element_ids = Schnittstelle_VariableWertBereinigtZurueck($auswertung.attr("data-element_ids"), new Array());
    const auswertung_ids = Schnittstelle_VariableWertBereinigtZurueck($auswertung.attr("data-auswertung_ids"), new Array());

    const ergebnis_nach_status = new Array();
    $.each(Object.keys(VERKNUEPFUNGEN[auswertungen].auswahlmoeglichkeiten), function (position, status) {
        ergebnis_nach_status[status] = new Array();
    });

    $.each(element_ids, function (position, element_id) {
        ergebnis_nach_status[0].push(element_id);
    });

    $.each(auswertung_ids, function (position, auswertung_id) {
        const status = Schnittstelle_VariableRausZurueck("status", auswertung_id, auswertungen, undefined);
        const element_id = Schnittstelle_VariableRausZurueck(LISTEN[liste].element + "_id", auswertung_id, auswertungen, undefined);
        ergebnis_nach_status[status].push(auswertung_id);
        ergebnis_nach_status[0] = ergebnis_nach_status[0].filter((id) => id != element_id);
    });

    // BESCHRIFTUNG AKTUALISIEREN
    if (typeof beschriftung !== "undefined") $auswertung.find(".beschriftung").text(beschriftung);

    // ERGEBNIS_ANZAHL AKTUALISIEREN
    $auswertung.find(".ergebnis_anzahl").each(function () {
        const $ergebnis_anzahl = $(this);
        const status = Schnittstelle_VariableWertBereinigtZurueck($ergebnis_anzahl.attr("data-status"), undefined);

        const ergebnis_anzahl = ergebnis_nach_status[status].length;
        const ergebnis_referenz_anzahl = element_ids.length;

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
            }
        );
        $ergebnis.attr("data-filtern", JsonStringifiedZurueck(filtern, new Object()));
    });

    // BEINHALTETE LISTE AKTUALISIEREN
    $auswertung.find('.liste[data-liste="' + liste + '"], .liste[data-liste="' + auswertungen + '"]').each(function () {
        Liste_Aktualisieren($(this), $(this).attr("data-liste"));
    });
    $auswertung.find('.element[data-liste="' + liste + '"], .element[data-liste="' + auswertungen + '"]').each(function () {
        Liste_ElementAktualisieren($(this), $(this).attr("data-liste"));
    });
}

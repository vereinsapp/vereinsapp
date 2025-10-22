function Liste_AuswertungenAktualisieren($auswertungen, auswertungen) {
    const auswertungen_instanz = $auswertungen.attr("id");

    // LISTE DEFINIEREN
    const liste_data = Schnittstelle_VariableWertBereinigtZurueck($auswertungen.attr("data-liste"), new Object());
    const liste = liste_data.liste;

    // TABELLE FILTERN
    const liste_filtern_data = Schnittstelle_VariableWertBereinigtZurueck(liste_data.filtern, new Object());
    const liste_filtern_LocalStorage = LISTEN[liste].instanz[auswertungen_instanz].filtern;
    const liste_tabelle_gefiltert = Liste_TabelleGefiltertZurueck(
        LISTEN[liste].tabelle,
        Liste_FilternMitPrioKombiniertZurueck(liste_filtern_data, liste_filtern_LocalStorage, liste),
        liste
    );

    // GRUPPIEREN DEFINIEREN
    const gruppieren_data = liste_data.gruppieren;
    const gruppieren_LocalStorage = LISTEN[liste].instanz[auswertungen_instanz].gruppieren;
    let gruppieren;
    if (typeof gruppieren_LocalStorage !== "undefined") gruppieren = gruppieren_LocalStorage;
    else gruppieren = gruppieren_data;

    // ELEMENT_IDS DEFINIEREN
    const gruppieren_werte = new Array();
    const element_ids = new Array();
    const element_ids_nach_wert = new Object();
    $.each(liste_tabelle_gefiltert, function (position, element) {
        const element_id = element.id;
        const wert = element[gruppieren];
        if (!gruppieren_werte.includes(wert)) gruppieren_werte.push(wert);
        if (!element_ids.includes(element_id)) element_ids.push(element_id);
        if (!(wert in element_ids_nach_wert)) element_ids_nach_wert[wert] = new Array();
        element_ids_nach_wert[wert].push(element_id);
    });
    const gruppieren_werte_sortiert = gruppieren_werte.sort();

    // AUSWERTUNG_ELEMENT_IDS DEFINIEREN
    const auswertung_element_ids_nach_wert = new Object();
    const auswertung_element_ids = new Array();
    $.each(
        Schnittstelle_VariableRausZurueck(
            "zugeordnete_elemente_nach_liste",
            $auswertungen.attr("data-gegen_element_id"),
            $auswertungen.attr("data-gegen_liste"),
            { [auswertungen]: new Array() }
        )[auswertungen],
        function (position, auswertung_element) {
            const wert = Schnittstelle_VariableRausZurueck(gruppieren, auswertung_element[LISTEN[liste].element + "_id"], liste);
            if (!(wert in auswertung_element_ids_nach_wert)) auswertung_element_ids_nach_wert[wert] = new Array();
            auswertung_element_ids_nach_wert[wert].push(auswertung_element.id);
            auswertung_element_ids.push(auswertung_element.id);
        }
    );

    // AUSWERTUNGEN IM DOM LÖSCHEN
    $auswertungen.find(".auswertung").each(function () {
        const $auswertung = $(this);
        const wert = $auswertung.attr("data-wert");
        if (!gruppieren_werte_sortiert.includes(wert)) $auswertung.remove();
    });

    // AUSWERTUNGEN IM DOM ERGÄNZEN
    $.each(gruppieren_werte_sortiert, function (position, wert) {
        const $auswertung = $auswertungen.find('.auswertung[data-wert="' + wert + '"]');
        if (!$auswertung.exists()) {
            // Auswertung existiert noch nicht, also wird sie an der sortierten Position hinzugefügt
            const $neue_auswertung = LISTEN[auswertungen].instanz[auswertungen_instanz].$blanko_auswertung.clone().removeClass("blanko invisible");

            $neue_auswertung
                .attr("data-auswertungen", auswertungen)
                .attr("data-auswertung_element_ids", JsonStringifiedZurueck(auswertung_element_ids_nach_wert[wert]))
                .attr("data-wert", wert)
                .attr("data-liste", liste)
                .attr("data-element_ids", JsonStringifiedZurueck(element_ids_nach_wert[wert]))
                .attr("data-status_auswahl", $auswertungen.attr("data-status_auswahl"))
                .attr("data-beschriftung", Liste_WertFormatiertZurueck(wert, gruppieren, liste));

            const ziel_id = zufaelligeZeichenketteZurueck(8);
            $neue_auswertung.find('[data-bs-toggle="collapse"]').attr("data-bs-target", "#" + ziel_id);
            $neue_auswertung.find(".toggle_symbol").attr("data-bs-target", "#" + ziel_id);
            $neue_auswertung.find(".collapse").attr("id", ziel_id);

            if (position === 0) $neue_auswertung.appendTo($auswertungen);
            else $neue_auswertung.insertAfter($auswertungen.find('.auswertung[data-wert="' + gruppieren_werte_sortiert[position - 1] + '"]'));
        } else {
            // Auswertung existiert bereits, also wird sie nur einsortiert
            if (position === 0) $auswertung.appendTo($auswertungen);
            else $auswertung.insertAfter($auswertungen.find('.auswertung[data-wert="' + gruppieren_werte_sortiert[position - 1] + '"]'));
        }
    });

    // ZUSAMMENFASSUNG AKTUALISIEREN
    $(".auswertung.zusammenfassung[data-instanz='" + auswertungen_instanz + "']").each(function () {
        const $zusammenfassung = $(this);
        $zusammenfassung
            .attr("data-auswertungen", auswertungen)
            .attr("data-auswertung_element_ids", JsonStringifiedZurueck(auswertung_element_ids))
            .attr("data-liste", liste)
            .attr("data-element_ids", JsonStringifiedZurueck(element_ids))
            .attr("data-status_auswahl", $auswertungen.attr("data-status_auswahl"));
    });

    // ÜBERSCHRIFT AKTUALISIEREN
    $('.ueberschrift[data-instanz="' + auswertungen_instanz + '"]').each(function () {
        Liste_UeberschriftAktualisieren($(this), liste);
    });

    // WERKZEUG AKTUALISIEREN
    $('.werkzeug[data-instanz="' + auswertungen_instanz + '"]').each(function () {
        Liste_WerkzeugAktualisieren($(this), liste);
    });

    // LISTENSTATISTIK AKTUALISIEREN
    $('.listenstatistik[data-instanz="' + auswertungen_instanz + '"]').each(function () {
        Liste_ListenstatistikAktualisieren($(this), liste);
    });
}

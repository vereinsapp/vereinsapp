function Liste_AuswertungenAktualisieren($auswertungen, auswertungen) {
    const auswertungen_instanz = $auswertungen.attr("id");

    // LISTE DEFINIEREN
    // liste_data aus data
    let liste_data = $auswertungen.attr("data-liste");
    if (typeof liste_data !== "undefined") liste_data = Schnittstelle_VariableWertBereinigtZurueck(liste_data);
    else liste_data = new Object();
    // liste aus liste_data
    let liste = undefined;
    if ("liste" in liste_data) liste = liste_data.liste;

    // LISTE FILTERN
    // filtern aus liste_data
    let liste_filtern_data;
    if ("filtern" in liste_data) liste_filtern_data = Schnittstelle_VariableWertBereinigtZurueck(liste_data.filtern);
    else liste_filtern_data = new Object();
    // filtern aus LocalStorage
    const liste_filtern_LocalStorage = LISTEN[liste].instanz[auswertungen_instanz].filtern;
    // liste_filtern_data und liste_filtern_LocalStorage kombinieren und tabelle filtern
    const liste_tabelle_gefiltert = Liste_TabelleGefiltertZurueck(
        Liste_FilternMitPrioKombiniertZurueck(liste_filtern_data, liste_filtern_LocalStorage, liste),
        LISTEN[liste].tabelle,
        liste
    );

    // ELEMENT_IDS DEFINIEREN
    // gruppieren aus liste_data
    let gruppieren_data = undefined;
    if ("gruppieren" in liste_data) gruppieren_data = liste_data.gruppieren;
    // gruppieren aus LocalStorage
    const gruppieren_LocalStorage = LISTEN[liste].instanz[auswertungen_instanz].gruppieren;
    // gruppieren_data und gruppieren_LocalStorage kombinieren
    let gruppieren;
    if (typeof gruppieren_LocalStorage === "undefined") gruppieren = gruppieren_data;
    else gruppieren = gruppieren_LocalStorage;
    // element_ids gruppieren
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
    gruppieren_werte.sort();

    // AUSWERTUNG_ELEMENT_IDS DEFINIEREN
    // gegen_liste aus data
    let gegen_liste = undefined;
    const gegen_liste_data = $auswertungen.attr("data-gegen_liste");
    if (typeof gegen_liste_data !== "undefined") gegen_liste = gegen_liste_data;
    // gegen_element_id aus data
    let gegen_element_id = undefined;
    const gegen_element_id_data = $auswertungen.attr("data-gegen_element_id");
    if (typeof gegen_element_id_data !== "undefined") gegen_element_id = Number(gegen_element_id_data);
    // auswertung_element_ids aus zugeordnete_elemente_nach_liste
    let auswertung_element_ids = LISTEN[gegen_liste].tabelle[gegen_element_id].zugeordnete_elemente_nach_liste[auswertungen];
    if (typeof auswertung_element_ids === "undefined") auswertung_element_ids = new Array();
    // auswertung_element_ids gruppieren
    const auswertung_element_ids_nach_wert = new Object();
    $.each(auswertung_element_ids, function (position, auswertung_element_id) {
        const element_id = LISTEN[auswertungen].tabelle[auswertung_element_id][LISTEN[liste].element + "_id"];
        const element = LISTEN[liste].tabelle[element_id];
        const wert = element[gruppieren];
        if (!(wert in auswertung_element_ids_nach_wert)) auswertung_element_ids_nach_wert[wert] = new Array();
        auswertung_element_ids_nach_wert[wert].push(auswertung_element_id);
    });

    // AUSWERTUNGEN IM DOM LÖSCHEN
    $auswertungen.find(".auswertung").each(function () {
        const $auswertung = $(this);
        const wert = $auswertung.attr("data-wert");
        if (!gruppieren_werte.includes(wert)) $auswertung.remove();
    });

    // AUSWERTUNGEN IM DOM ERGÄNZEN
    $.each(gruppieren_werte, function (position, wert) {
        const $auswertung = $auswertungen.find('.auswertung[data-wert="' + wert + '"]');
        if (!$auswertung.exists()) {
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
            else $neue_auswertung.insertAfter($auswertungen.find('.auswertung[data-wert="' + gruppieren_werte[position - 1] + '"]'));
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
}

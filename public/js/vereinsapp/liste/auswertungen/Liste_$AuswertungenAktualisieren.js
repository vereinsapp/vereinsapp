/**
 * @param {JQuery} $auswertungen
 */

function Liste_$AuswertungenAktualisieren($auswertungen) {
    const auswertungen = Util_WertBereinigtZurueck($auswertungen.attr("auswertungen"), undefined);
    const instanz = Util_WertBereinigtZurueck($auswertungen.attr("id"), undefined);
    const liste = Util_WertBereinigtZurueck($auswertungen.attr("liste"), undefined);
    const $auswertungen_auswertungen = $auswertungen.find(".auswertungen_auswertungen");
    const $meta = $auswertungen.find(".meta");

    // GRUPPIEREN DEFINIEREN
    const gruppieren_data = Util_WertBereinigtZurueck($auswertungen.attr("gruppieren"), undefined);
    const gruppieren_LocalStorage = LISTEN[liste].instanz[instanz].gruppieren;
    const gruppieren = Liste_GruppierenManipuliertZurueck(gruppieren_data, gruppieren_LocalStorage, liste);

    // TABELLE FILTERN
    const filtern_data = Util_WertBereinigtZurueck($auswertungen.attr("filtern"), new Object());
    const filtern_LocalStorage = LISTEN[liste].instanz[instanz].filtern;
    const tabelle_gefiltert = Liste_TabelleGefiltertZurueck(
        LISTEN[liste].tabelle,
        Liste_FilternManipuliertZurueck(filtern_data, filtern_LocalStorage, liste),
        liste,
    );

    // GRUPPIEREN_WERTE UND ELEMENT_IDS DEFINIEREN
    const gruppieren_werte = new Array();
    const element_ids = new Array();
    const element_ids_nach_wert = new Object();
    $.each(tabelle_gefiltert, function (position, element) {
        const element_id = element.id;
        const wert = element[gruppieren];
        if (!gruppieren_werte.includes(wert)) gruppieren_werte.push(wert);
        if (!element_ids.includes(element_id)) element_ids.push(element_id);
        if (!(wert in element_ids_nach_wert)) element_ids_nach_wert[wert] = [element_id];
        else element_ids_nach_wert[wert].push(element_id);
    });
    const gruppieren_werte_sortiert = gruppieren_werte.sort();

    // AUSWERTUNG_IDS DEFINIEREN
    const verknuepfte_listen = VERKNUEPFUNGEN[auswertungen].verknuepfte_listen;
    let andere_verknuepfte_liste = liste;
    $.each(verknuepfte_listen, function (position, verknuepfte_liste) {
        if (verknuepfte_liste !== liste) andere_verknuepfte_liste = verknuepfte_liste;
        else {
            /* nächster Schleifendurchlauf */
        }
    });
    const andere_verknuepfte_element_id = Util_WertBereinigtZurueck($auswertungen.attr(LISTEN[andere_verknuepfte_liste].element + "_id"), undefined);

    const auswertung_ids = new Array();
    const auswertung_ids_nach_wert = new Object();
    $.each(
        Liste_VariableRausZurueck(
            "zugeordnete_" + LISTEN[auswertungen].element + "_ids",
            andere_verknuepfte_element_id,
            andere_verknuepfte_liste,
            new Array(),
        ),
        function (position, auswertung_id) {
            const element_id = Liste_VariableRausZurueck(LISTEN[liste].element + "_id", auswertung_id, auswertungen, undefined);
            const wert = Liste_VariableRausZurueck(gruppieren, element_id, liste, undefined);
            if (element_ids.includes(element_id)) {
                if (!auswertung_ids.includes(auswertung_id)) auswertung_ids.push(auswertung_id);
                if (!(wert in auswertung_ids_nach_wert)) auswertung_ids_nach_wert[wert] = [auswertung_id];
                else auswertung_ids_nach_wert[wert].push(auswertung_id);
            } else {
                /* auswertung_id existiert zwar, aber zugehörige element_id wird garnicht berücksichtigt */
            }
        },
    );

    // AUSWERTUNGEN IM DOM LÖSCHEN
    $auswertungen_auswertungen.find(".auswertung").each(function () {
        const $auswertung = $(this);
        const wert = $auswertung.attr("wert");
        if (!gruppieren_werte_sortiert.includes(wert)) $auswertung.remove();
    });

    // AUSWERTUNGEN IM DOM ERGÄNZEN
    gruppieren_werte_sortiert.push(null); // für die Zusammenfassung
    $.each(gruppieren_werte_sortiert, function (position, wert) {
        let $auswertung = $auswertungen_auswertungen.find('.auswertung[wert="' + wert + '"]');
        if (!$auswertung.exists()) $auswertung = LISTEN[auswertungen].instanz[instanz].$blanko_auswertung.clone().removeClass("blanko invisible");

        $auswertung.attr("auswertungen", auswertungen).attr("liste", liste);

        if (wert !== null) {
            // Auswertung ist Standard
            $auswertung
                .attr(LISTEN[auswertungen].element + "_ids", JsonStringifiedZurueck(auswertung_ids_nach_wert[wert], new Array()))
                .attr("wert", wert)
                .attr(LISTEN[liste].element + "_ids", JsonStringifiedZurueck(element_ids_nach_wert[wert], new Array()))
                .attr("beschriftung", Liste_WertNachEigenschaftFormatiertZurueck(wert, gruppieren, liste));

            $auswertung.find(".collapse").attr("id", zufaelligeZeichenketteZurueck(8));
            $auswertung.find('[data-bs-toggle="collapse"]').attr("data-bs-target", "#" + $auswertung.find(".collapse").attr("id"));
            Dom_$Quelle$ZielVerknuepfen($auswertung.find(".wechselsymbol.bi-" + SYMBOLE.collapse_oeffnen), $auswertung.find(".collapse"));
        } else {
            // Auswertung ist Zusammenfassung
            $auswertung
                .attr(LISTEN[auswertungen].element + "_ids", JsonStringifiedZurueck(auswertung_ids, new Array()))
                // .attr("wert", wert)
                // .attr(LISTEN[liste].element + "_ids", JsonStringifiedZurueck(element_ids, new Array()))
                .attr("beschriftung", "Gesamt");

            $auswertung.find(".auswertung_progress").remove();
            $auswertung.find(".collapse").remove();
            $auswertung.find('[data-bs-toggle="collapse"]').removeAttr("data-bs-toggle").removeAttr("role");
            $auswertung.find(".wechselsymbol." + SYMBOLE.collapse_oeffnen).remove();
        }

        if (position === 0) $auswertung.appendTo($auswertungen_auswertungen);
        else $auswertung.insertAfter($auswertungen_auswertungen.find('.auswertung[wert="' + gruppieren_werte_sortiert[position - 1] + '"]'));
    });

    // META AKTUALISIEREN
    $meta.each(function () {
        const $meta = $(this);

        // Überschrift aktualisieren
        $meta.find(".ueberschrift").each(function () {
            const $ueberschrift = $(this);

            if (isEmptyString($ueberschrift.text())) $ueberschrift.addClass("invisible");
            else $ueberschrift.removeClass("invisible");
        });

        // Werkzeuge aktualisieren
        $meta.find(".werkzeuge").each(function () {
            const $werkzeuge = $(this);

            Dom_$WerkzeugeAktualisieren($werkzeuge, {
                liste: liste,
                instanz: instanz,
            });

            if ($werkzeuge.find(".werkzeug").length === 0) $werkzeuge.addClass("invisible");
            else $werkzeuge.removeClass("invisible");
        });

        // Listenstatisik aktualisieren
        $meta.find(".listenstatistik_todo").each(function () {
            $(this)
                .find(".listenstatistik")
                .each(function () {
                    Liste_$ListenstatistikAktualisieren($(this), $liste);
                });
        });

        if (
            ($meta.find(".ueberschrift").length === 0 || $meta.find(".ueberschrift").hasClass("invisible")) &&
            ($meta.find(".werkzeuge").length === 0 || $meta.find(".werkzeuge").hasClass("invisible")) &&
            ($meta.find(".listenstatistik_todo").length === 0 || $meta.find(".listenstatistik_todo").hasClass("invisible"))
        )
            $meta.addClass("invisible");
        else $meta.removeClass("invisible");
    });

    // LISTE AUSBLENDEN
    if (
        $auswertungen_auswertungen.find(".auswertung").length <= 1 &&
        ($meta.find(".werkzeuge").length === 0 || $meta.find(".werkzeuge").hasClass("invisible")) &&
        ($meta.find(".listenstatistik_todo").length === 0 || $meta.find(".listenstatistik_todo").hasClass("invisible"))
    )
        $auswertungen.addClass("invisible");
    else $auswertungen.removeClass("invisible");
}

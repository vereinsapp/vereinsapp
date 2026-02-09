/**
 * @param {JQuery} $zusatzsymbol
 * @param {JQuery} $element
 */

function Liste_Element$ZusatzsymbolAktualisieren($zusatzsymbol, $element) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($element.attr("data-liste"), undefined);
    const element_id = Schnittstelle_VariableWertBereinigtZurueck($element.attr("data-" + LISTEN[liste].element + "_id"), undefined);
    const zusatzsymbol = Schnittstelle_VariableWertBereinigtZurueck($zusatzsymbol.attr("data-zusatzsymbol"), undefined);

    $zusatzsymbol.find('[data-bs-toggle="popover"]').popover("hide");
    $zusatzsymbol.empty();

    switch (zusatzsymbol) {
        // Zusatzsymbol für Geburtstag
        case "geburtstag":
            const geburtstag = Schnittstelle_VariableRausZurueck("geburtstag", element_id, liste, undefined);
            if (typeof geburtstag !== "undefined" && geburtstag <= DATETIME.now() && DATETIME.now() <= geburtstag.plus({ days: 1 }))
                $zusatzsymbol.html('<i class="bi bi-' + SYMBOLE["geburtstag"]["bootstrap"] + ' text-primary"></i>');
            break;

        // Zusatzsymbol für Kategorie
        case "kategorie":
            const kategorie = Schnittstelle_VariableRausZurueck("kategorie", element_id, liste, undefined);
            if (
                liste in VORGEGEBENE_WERTE &&
                "kategorie" in VORGEGEBENE_WERTE[liste] &&
                kategorie in VORGEGEBENE_WERTE[liste]["kategorie"] &&
                "symbol" in VORGEGEBENE_WERTE[liste]["kategorie"][kategorie]
            )
                $zusatzsymbol.html(VORGEGEBENE_WERTE[liste]["kategorie"][kategorie]["symbol"]);
            break;

        // Zusatzsymbol für Datei
        case "datei":
            const datei = Schnittstelle_VariableWertBereinigtZurueck($element.attr("data-datei"), undefined);
            const punkt = datei.lastIndexOf(".");
            const typ = datei.slice(punkt + 1);
            $zusatzsymbol.html('<i class="bi bi-' + SYMBOLE[typ]["bootstrap"] + ' text-primary"></i>');
            break;

        // Zusatzsymbol für Ändern-Werkzeug
        case "aendern":
            $zusatzsymbol.html(
                '<i class="bi bi-' +
                    SYMBOLE["aendern"]["bootstrap"] +
                    " btn_" +
                    LISTEN[liste].element +
                    '_aendern formular_oeffnen text-primary" data-liste="' +
                    liste +
                    '" data-' +
                    LISTEN[liste].element +
                    '_id="' +
                    element_id +
                    '" data-title="' +
                    Liste_ElementBeschriftungZurueck(element_id, liste) +
                    ' ändern" role="button"></i>',
            );
            break;

        // Zusatzsymbol für Duplizieren-Werkzeug
        case "duplizieren":
            $zusatzsymbol.html(
                '<i class="bi bi-' +
                    SYMBOLE["duplizieren"]["bootstrap"] +
                    " btn_" +
                    LISTEN[liste].element +
                    '_duplizieren formular_oeffnen text-primary" data-liste="' +
                    liste +
                    '" data-' +
                    LISTEN[liste].element +
                    '_id="' +
                    element_id +
                    '" data-title="' +
                    Liste_ElementBeschriftungZurueck(element_id, liste) +
                    ' duplizieren" role="button"></i>',
            );
            break;

        // Zusatzsymbol für Löschen-Werkzeug
        case "loeschen":
            $zusatzsymbol.html(
                '<i class="bi bi-' +
                    SYMBOLE["loeschen"]["bootstrap"] +
                    ' btn_element_loeschen bestaetigung_einfordern text-danger" data-liste="' +
                    liste +
                    '" data-' +
                    LISTEN[liste].element +
                    '_id="' +
                    element_id +
                    '" data-title="' +
                    Liste_ElementBeschriftungZurueck(element_id, liste) +
                    ' löschen" role="button"></i>',
            );
            break;

        // Zusatzsymbol für Bemerkung bei Rückmeldung
        case "bemerkung":
            const bemerkung = Schnittstelle_VariableRausZurueck("bemerkung", element_id, liste, null);
            if (bemerkung !== null)
                $zusatzsymbol
                    .removeClass("invisible")
                    .html(
                        '<i class="bi bi-' +
                            SYMBOLE["bemerkung"]["bootstrap"] +
                            ' text-primary" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="focus" tabindex="0" data-bs-placement="right" data-bs-content="' +
                            bemerkung +
                            '" role="button"></i>',
                    );
            else $zusatzsymbol.addClass("invisible").html("");

            [...$zusatzsymbol.find('[data-bs-toggle="popover"]')].map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl));
            break;

        // Zusatzsymbol für Termine-Rückmeldung
        case "vergebene_rechte":
        case "aufgaben_zuordnungen_termine":
        case "termine_rueckmeldungen":
        case "termine_anwesenheiten":
        case "strafkatalog_zugewiesene_strafen":
        case "notenbank_setliste":
            const verknuepfungen = zusatzsymbol;
            const verknuepfte_listen = VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen;
            const verknuepfte_element_ids = new Object();
            $.each(verknuepfte_listen, function (position, verknuepfte_liste) {
                const verknuepfte_element_id = Schnittstelle_VariableWertBereinigtZurueck(
                    $element.attr("data-" + LISTEN[verknuepfte_liste].element + "_id"),
                    undefined,
                );
                if (typeof verknuepfte_element_id !== "undefined")
                    verknuepfte_element_ids[LISTEN[verknuepfte_liste].element + "_id"] = verknuepfte_element_id;
            });
            verknuepfte_element_ids[LISTEN[liste].element + "_id"] = element_id;

            let verknuepfung_id = undefined;
            $.each(
                Schnittstelle_VariableRausZurueck(
                    "zugeordnete_" + LISTEN[verknuepfungen].element + "_ids",
                    verknuepfte_element_ids[LISTEN[verknuepfte_listen[0]].element + "_id"],
                    verknuepfte_listen[0],
                    new Array(),
                ),
                function (position, zugeordnete_verknuepfung_id) {
                    if (
                        Schnittstelle_VariableRausZurueck(
                            LISTEN[verknuepfte_listen[1]].element + "_id",
                            zugeordnete_verknuepfung_id,
                            verknuepfungen,
                            undefined,
                        ) === verknuepfte_element_ids[LISTEN[verknuepfte_listen[1]].element + "_id"]
                    )
                        verknuepfung_id = zugeordnete_verknuepfung_id;
                },
            );

            let verknuepfung_status = Schnittstelle_VariableRausZurueck("status", verknuepfung_id, verknuepfungen, 0);
            if (verknuepfung_status > 0 && !(verknuepfung_status in VERKNUEPFUNGEN[verknuepfungen].auswahlmoeglichkeiten)) verknuepfung_status = 1;

            if (typeof verknuepfung_status !== "undefined")
                $zusatzsymbol.html(
                    '<span class="text-' +
                        VERKNUEPFUNGEN[verknuepfungen].auswahlmoeglichkeiten[verknuepfung_status].farbe +
                        '">' +
                        VERKNUEPFUNGEN[verknuepfungen].auswahlmoeglichkeiten[verknuepfung_status].aktiv +
                        "</span>",
                );

            break;
    }
}

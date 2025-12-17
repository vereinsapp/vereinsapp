/**
 * @param {JQuery} $zusatzsymbol
 * @param {JQuery} $element
 */

function Liste_ElementZusatzsymbolAktualisieren($zusatzsymbol, $element) {
    const liste = $element.attr("data-liste");
    const element_id = Number($element.attr("data-element_id"));
    const gegen_element_id = Schnittstelle_VariableWertBereinigtZurueck($element.attr("data-gegen_element_id"), undefined);
    const gegen_liste = Schnittstelle_VariableWertBereinigtZurueck($element.attr("data-gegen_liste"), undefined);
    const zusatzsymbol = $zusatzsymbol.attr("data-zusatzsymbol");

    $zusatzsymbol.find('[data-bs-toggle="popover"]').popover("hide");
    $zusatzsymbol.empty();

    switch (zusatzsymbol) {
        // Zusatzsymbol für Geburtstag
        case "geburtstag":
            const geburtstag = Schnittstelle_VariableRausZurueck("geburtstag", element_id, liste, undefined);
            if (typeof geburtstag !== "undefined" && geburtstag <= DATETIME.now() && DATETIME.now() <= geburtstag.plus({ days: 1 }))
                $zusatzsymbol.html('<i class="bi bi-' + SYMBOLE["geburtstag"]["bootstrap"] + ' text-primary"></i>');
            break;

        // Zusatzsymbol für offen_erledigt_markieren
        case "offen_erledigt_markieren":
            $zusatzsymbol.html('<i class="bi bi-' + SYMBOLE["offen_erledigt_markieren"]["bootstrap"] + ' text-primary"></i>');
            break;

        // Zusatzsymbol für offen_erledigt
        case "offen_erledigt":
            let offen_erledigt;
            if (Schnittstelle_VariableRausZurueck("erledigt", element_id, liste, null) !== null) offen_erledigt = "erledigt";
            else offen_erledigt = "offen";

            $zusatzsymbol.html(
                '<i class="bi bi-' +
                    SYMBOLE[offen_erledigt]["bootstrap"] +
                    ' btn_kassenbucheintrag_offen_erledigt_markieren bestaetigung_einfordern text-primary" data-' +
                    LISTEN[liste].element +
                    "_id=" +
                    element_id +
                    ' data-title="Kassenbucheintrag als offen/erledigt markieren" role="button"></i>'
            );
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
            const datei = $element.attr("data-datei");
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
                    '" data-element_id="' +
                    element_id +
                    '" data-title="' +
                    Liste_ElementBeschriftungZurueck(element_id, liste) +
                    ' ändern" role="button"></i>'
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
                    '" data-element_id="' +
                    element_id +
                    '" data-title="' +
                    Liste_ElementBeschriftungZurueck(element_id, liste) +
                    ' duplizieren" role="button"></i>'
            );
            break;

        // Zusatzsymbol für Löschen-Werkzeug
        case "loeschen":
            $zusatzsymbol.html(
                '<i class="bi bi-' +
                    SYMBOLE["loeschen"]["bootstrap"] +
                    ' btn_element_loeschen bestaetigung_einfordern text-danger" data-liste="' +
                    liste +
                    '" data-element_id="' +
                    element_id +
                    '" data-title="' +
                    Liste_ElementBeschriftungZurueck(element_id, liste) +
                    ' löschen" role="button"></i>'
            );
            break;

        // Zusatzsymbol für Bemerkung bei Rückmeldung
        case "bemerkung":
            let bemerkung;

            if ($element.parents(".auswertungen[data-auswertungen]").exists()) {
                const verknuepfungen = $element.closest(".auswertungen[data-auswertungen]").attr("data-auswertungen");

                let verknuepfung_id = undefined;
                $.each(
                    Schnittstelle_VariableRausZurueck("zugeordnete_" + LISTEN[verknuepfungen].element + "_ids", element_id, liste, new Array()),
                    function (position, zugeordnete_verknuepfung_id) {
                        if (
                            Schnittstelle_VariableRausZurueck(
                                LISTEN[gegen_liste].element + "_id",
                                zugeordnete_verknuepfung_id,
                                verknuepfungen,
                                undefined
                            ) === gegen_element_id
                        )
                            verknuepfung_id = zugeordnete_verknuepfung_id;
                    }
                );

                bemerkung = Schnittstelle_VariableRausZurueck("bemerkung", verknuepfung_id, verknuepfungen, null);
            } else bemerkung = Schnittstelle_VariableRausZurueck("bemerkung", element_id, liste, null);

            if (bemerkung !== null)
                $zusatzsymbol.html(
                    '<i class="bi bi-' +
                        SYMBOLE["bemerkung"]["bootstrap"] +
                        ' stretched-link-unwirksam text-primary" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="focus" tabindex="0" data-bs-placement="right" data-bs-content="' +
                        bemerkung +
                        '" role="button"></i>'
                );

            [...$zusatzsymbol.find('[data-bs-toggle="popover"]')].map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl));
            break;

        // Zusatzsymbol für Termine-Rückmeldung
        case "vergebene_rechte":
        case "termine_anwesenheiten":
        case "termine_rueckmeldungen":
            const verknuepfungen = zusatzsymbol;

            let verknuepfung_id = undefined;
            $.each(
                Schnittstelle_VariableRausZurueck("zugeordnete_" + LISTEN[verknuepfungen].element + "_ids", element_id, liste, new Array()),
                function (position, zugeordnete_verknuepfung_id) {
                    if (
                        Schnittstelle_VariableRausZurueck(
                            LISTEN[gegen_liste].element + "_id",
                            zugeordnete_verknuepfung_id,
                            verknuepfungen,
                            undefined
                        ) === gegen_element_id
                    )
                        verknuepfung_id = zugeordnete_verknuepfung_id;
                }
            );

            const verknuepfung_status = Schnittstelle_VariableRausZurueck("status", verknuepfung_id, verknuepfungen, 0);

            if (typeof verknuepfung_status !== "undefined")
                $zusatzsymbol.html(
                    '<span class="text-' +
                        VERKNUEPFUNGEN[verknuepfungen].auswahlmoeglichkeiten[verknuepfung_status].farbe +
                        '">' +
                        VERKNUEPFUNGEN[verknuepfungen].auswahlmoeglichkeiten[verknuepfung_status].aktiv +
                        "</span>"
                );

            break;
    }
}

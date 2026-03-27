/**
 * @param {JQuery} $zusatzsymbol
 * @param {JQuery} $element
 */

function Liste_Element$ZusatzsymbolAktualisieren($zusatzsymbol, $element) {
    const liste = Util_WertBereinigtZurueck($element.attr("liste"), undefined);
    const element_id = Util_WertBereinigtZurueck($element.attr(LISTEN[liste].element + "_id"), undefined);
    const zusatzsymbol = Util_WertBereinigtZurueck($zusatzsymbol.attr("zusatzsymbol"), undefined);

    $zusatzsymbol.find('[data-bs-toggle="popover"]').popover("hide");
    $zusatzsymbol.empty();

    switch (zusatzsymbol) {
        // Zusatzsymbol für Geburtstag
        case "geburtstag":
            const geburtstag = Liste_VariableRausZurueck("geburtstag", element_id, liste, undefined);
            if (typeof geburtstag !== "undefined" && geburtstag <= DATETIME.now() && DATETIME.now() <= geburtstag.plus({ days: 1 }))
                $zusatzsymbol.html('<i class="bi bi-' + ICONS.geburtstag + ' text-primary"></i>');
            break;

        // Zusatzsymbol für Kategorie
        case "kategorie":
            const kategorie = Liste_VariableRausZurueck("kategorie", element_id, liste, undefined);
            if (
                liste in VORGEGEBENE_WERTE &&
                "kategorie" in VORGEGEBENE_WERTE[liste] &&
                kategorie in VORGEGEBENE_WERTE[liste]["kategorie"] &&
                "symbol" in VORGEGEBENE_WERTE[liste]["kategorie"][kategorie]
            )
                $zusatzsymbol.html(VORGEGEBENE_WERTE[liste]["kategorie"][kategorie].symbol);
            break;

        // Zusatzsymbol für Bemerkung bei Rückmeldung
        case "bemerkung":
            const bemerkung = Liste_VariableRausZurueck("bemerkung", element_id, liste, null);
            if (bemerkung !== null)
                $zusatzsymbol
                    .removeClass("invisible")
                    .html(
                        '<i class="bi bi-' +
                            ICONS.bemerkung +
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
                const verknuepfte_element_id = Util_WertBereinigtZurueck($element.attr(LISTEN[verknuepfte_liste].element + "_id"), undefined);
                if (typeof verknuepfte_element_id !== "undefined")
                    verknuepfte_element_ids[LISTEN[verknuepfte_liste].element + "_id"] = verknuepfte_element_id;
            });
            verknuepfte_element_ids[LISTEN[liste].element + "_id"] = element_id;

            let verknuepfung_id = undefined;
            $.each(
                Liste_VariableRausZurueck(
                    "zugeordnete_" + LISTEN[verknuepfungen].element + "_ids",
                    verknuepfte_element_ids[LISTEN[verknuepfte_listen[0]].element + "_id"],
                    verknuepfte_listen[0],
                    new Array(),
                ),
                function (position, zugeordnete_verknuepfung_id) {
                    if (
                        Liste_VariableRausZurueck(
                            LISTEN[verknuepfte_listen[1]].element + "_id",
                            zugeordnete_verknuepfung_id,
                            verknuepfungen,
                            undefined,
                        ) === verknuepfte_element_ids[LISTEN[verknuepfte_listen[1]].element + "_id"]
                    )
                        verknuepfung_id = zugeordnete_verknuepfung_id;
                },
            );

            let verknuepfung_status = Liste_VariableRausZurueck("status", verknuepfung_id, verknuepfungen, 0);
            if (verknuepfung_status > 0 && !(verknuepfung_status in VERKNUEPFUNGEN[verknuepfungen].status_erlaubt)) verknuepfung_status = 1;

            if (typeof verknuepfung_status !== "undefined")
                $zusatzsymbol.html(
                    '<span class="text-' +
                        VERKNUEPFUNGEN[verknuepfungen].status_erlaubt[verknuepfung_status].farbe +
                        '">' +
                        VERKNUEPFUNGEN[verknuepfungen].status_erlaubt[verknuepfung_status].aktiv +
                        "</span>",
                );

            break;
    }
}

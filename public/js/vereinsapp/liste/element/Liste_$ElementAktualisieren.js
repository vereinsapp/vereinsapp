/**
 * @param {JQuery} $element
 */

function Liste_$ElementAktualisieren($element) {
    const liste = Util_WertBereinigtZurueck($element.attr("liste"), undefined);
    const element_id = Util_WertBereinigtZurueck($element.attr(LISTEN[liste].element + "_id"), undefined);

    // BEARBEITEN_MODUS DEFINIEREN
    const $liste = $element.closest('.liste[liste="' + liste + '"][id]');
    const bearbeiten_modus = !$liste.exists() || LISTEN[liste].instanz[Util_WertBereinigtZurueck($liste.attr("id"), undefined)].bearbeiten_modus;

    // ELEMENT-BESCHRIFTUNG AKTUALISIEREN
    $element.find(".element_beschriftung").text(Liste_ElementBeschriftungErweitertZurueck(element_id, liste));

    // VORSCHAU AKTUALISIEREN
    $element.find(".vorschau").each(function () {
        const $vorschau = $(this);

        $.each(Util_WertBereinigtZurueck($vorschau.attr("vorschau"), new Array()), function (position, eigenschaft) {
            if (position === 0) $vorschau.empty();
            else $vorschau.append(Dom_$SpacerInitialisiertZurueck());

            const bisherige_vorschau = $vorschau.html();
            $vorschau.html(
                bisherige_vorschau +
                    Liste_WertNachEigenschaftFormatiertZurueck(
                        Liste_ElementWertRausZurueck(eigenschaft, element_id, liste, undefined),
                        eigenschaft,
                        liste,
                    ),
            );
        });

        if (isEmptyString($vorschau.text())) $vorschau.addClass("invisible");
        else $vorschau.removeClass("invisible");
    });

    // EIGENSCHAFTEN AKTUALISIEREN
    $element.find(".eigenschaft").each(function () {
        const $eigenschaft = $(this);
        const eigenschaft = Util_WertBereinigtZurueck($eigenschaft.attr("eigenschaft"), undefined);

        $eigenschaft.text(
            Liste_WertNachEigenschaftFormatiertZurueck(Liste_ElementWertRausZurueck(eigenschaft, element_id, liste, undefined), eigenschaft, liste),
        );
    });

    // LINK AKTUALISIEREN
    $element.find("a.stretched-link").each(function () {
        Liste_Element$LinkAktualisieren($(this), $element);
    });

    // WERKZEUGE AKTUALISIEREN
    $element.find(".werkzeuge").each(function () {
        const $werkzeuge = $(this);

        Dom_$WerkzeugeAktualisieren($werkzeuge, {
            liste: liste,
            [LISTEN[liste].element + "_id"]: element_id,
        });

        if ($werkzeuge.find(".werkzeug").length === 0 || !bearbeiten_modus) $werkzeuge.addClass("invisible");
        else $werkzeuge.removeClass("invisible");
    });

    // ZUSATZSYMBOLE AKTUALISIEREN
    $element.find(".zusatzsymbole").each(function () {
        const $zusatzsymbole = $(this);

        Dom_$ZusatzsymboleAktualisieren($zusatzsymbole, $element);

        if ($zusatzsymbole.find(".zusatzsymbol").length === 0) $zusatzsymbole.addClass("invisible");
        else $zusatzsymbole.removeClass("invisible");
    });

    // VERKNUEPFUNGEN AKTUALISIEREN
    $.each(VERKNUEPFUNGEN, function (verknuepfungen) {
        if (VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen.includes(liste)) {
            // ANDERE_VERKNUEPFTE_LISTE DEFINIEREN
            let andere_verknuepfte_liste = liste;
            $.each(VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen, function (position, verknuepfte_liste) {
                if (verknuepfte_liste !== liste) andere_verknuepfte_liste = verknuepfte_liste;
                else {
                    /* nächster Schleifendurchlauf */
                }
            });

            // ANDERE_VERKNUEPFTE_ELEMENT_ID DEFINIEREN
            const andere_verknuepfte_element_id = Util_WertBereinigtZurueck(
                $element.attr(LISTEN[andere_verknuepfte_liste].element + "_id"),
                undefined,
            );

            // VERKNUEPFUNG_ID DEFINIEREN
            let verknuepfung_id = undefined;
            $.each(
                Liste_VerknuepfungIdsNachListeZurueck(element_id, liste, verknuepfungen, new Array()),
                function (position, verknuepfung_id_nach_liste) {
                    if (
                        Liste_VerknuepfungWertRausZurueck(
                            LISTEN[andere_verknuepfte_liste].element + "_id",
                            verknuepfung_id_nach_liste,
                            verknuepfungen,
                            undefined,
                        ) === andere_verknuepfte_element_id
                    )
                        verknuepfung_id = verknuepfung_id_nach_liste;
                },
            );

            // VERKUEPFUNG_ERSTELLEN AKTUALISIEREN
            $element.find(".verknuepfung_erstellen[verknuepfungen='" + verknuepfungen + "']").each(function () {
                const $verknuepfung_erstellen = $(this);

                $verknuepfung_erstellen
                    .attr(LISTEN[liste].element + "_id", element_id)
                    .attr(LISTEN[andere_verknuepfte_liste].element + "_id", andere_verknuepfte_element_id)
                    .attr(VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id", verknuepfung_id);

                if ($element.hasClass("disabled")) $verknuepfung_erstellen.addClass("disabled");
                else $verknuepfung_erstellen.removeClass("disabled");

                Liste_$VerknuepfungErstellenAktualisieren($verknuepfung_erstellen);
            });

            // VERKNUEPFUNG_BEMERKUNG_SYMBOL AKTUALISIEREN
            $element.find(".verknuepfung_bemerkung_symbol[verknuepfungen='" + verknuepfungen + "']").each(function () {
                const $verknuepfung_bemerkung_symbol = $(this);

                $verknuepfung_bemerkung_symbol
                    .attr(VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id", verknuepfung_id)
                    .empty()
                    .append(Dom_$ZusatzsymbolInitialisiertZurueck("bemerkung", $verknuepfung_bemerkung_symbol));
            });

            // VERKNUEPFUNG_STATUS_WERT AKTUALISIEREN
            $element
                .find(".verknuepfung_status_wert[verknuepfungen='" + verknuepfungen + "']")
                .text(Liste_VerknuepfungWertRausZurueck("status", verknuepfung_id, verknuepfungen, 0));

            // VERKNUEPFUNG_STATUS_SYMBOL AKTUALISIEREN
            $element.find(".verknuepfung_status_symbol[verknuepfungen='" + verknuepfungen + "']").each(function () {
                const $verknuepfung_status_symbol = $(this);

                let status = Liste_VerknuepfungWertRausZurueck("status", verknuepfung_id, verknuepfungen, 0);
                if (status > 0 && !(status in VERKNUEPFUNGEN[verknuepfungen].status_erlaubt)) status = 1;

                $.each(VERKNUEPFUNGEN[verknuepfungen].status_erlaubt, function (status) {
                    $verknuepfung_status_symbol.removeClass("text-" + VERKNUEPFUNGEN[verknuepfungen].status_erlaubt[status].farbe);
                });

                $verknuepfung_status_symbol
                    .addClass("text-" + VERKNUEPFUNGEN[verknuepfungen].status_erlaubt[status].farbe)
                    .html(VERKNUEPFUNGEN[verknuepfungen].status_erlaubt[status].aktiv);
            });

            // VERKNUEPFUNG_WERKZEUGE AKTUALISIEREN
            $element.find(".verknuepfung_werkzeuge[verknuepfungen='" + verknuepfungen + "']").each(function () {
                const $verknuepfung_werkzeuge = $(this);

                Dom_$WerkzeugeAktualisieren($verknuepfung_werkzeuge, {
                    verknuepfungen: verknuepfungen,
                    [VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id"]: verknuepfung_id,
                });

                if ($verknuepfung_werkzeuge.find(".werkzeug").length === 0 || !bearbeiten_modus) $verknuepfung_werkzeuge.addClass("invisible");
                else $verknuepfung_werkzeuge.removeClass("invisible");
            });
        }
    });

    // NAVIGATION AKTUALISIEREN
    $('.element_navigation[liste="' + liste + '"][' + LISTEN[liste].element + '_id="' + element_id + '"]').each(function () {
        Liste_Element$NavigationAktualisieren($(this), $element);
    });

    // ACTION UND ROLE DEFINIEREN
    if ($element.find("a.stretched-link").exists() || $element.find("label.werkzeug").exists() || $element.find("label[for]").exists()) {
        if ($element.hasClass("list-group-item")) {
            $element.attr("role", "button").addClass("list-group-item-action").removeClass("element-action");
            $element.find(".card").removeAttr("role").removeClass("element-action");
        }
        if ($element.find(".card").exists()) {
            $element.removeAttr("role").removeClass("list-group-item-action").removeClass("element-action");
            $element.find(".card").attr("role", "button").addClass("element-action");
        } else {
            $element.attr("role", "button").removeClass("list-group-item-action").addClass("element-action");
            $element.find(".card").removeAttr("role").removeClass("element-action");
        }

        $element.find("label").attr("role", "button");
    } else {
        $element.removeClass("list-group-item-action").removeClass("element-action").removeAttr("role");
        $element.find(".card").removeAttr("role").removeClass("element-action");
        $element.find("label").removeAttr("role", "button");
    }
}

/**
 * @param {JQuery} $verknuepfungen
 * @param {JQuery} $element
 */

function Liste_$VerknuepfungenAktualisieren($verknuepfungen, $element) {
    const $verknuepfung_moeglich = $verknuepfungen.find(".verknuepfung_moeglich");
    const $verknuepfung_nicht_moeglich = $verknuepfungen.find(".verknuepfung_nicht_moeglich");
    const verknuepfungen = Util_WertBereinigtZurueck($verknuepfungen.attr("verknuepfungen"), undefined);

    // VERKNUEPFTE LISTEN DEFINIEREN
    const verknuepfte_listen = VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen;

    // VERKNUEPFTE ELEMENT_ID DEFINIEREN
    const verknuepfte_element_id = new Object();
    $.each(verknuepfte_listen, function (position, verknuepfte_liste) {
        verknuepfte_element_id[LISTEN[verknuepfte_liste].element + "_id"] = Util_WertBereinigtZurueck(
            $element.attr(LISTEN[verknuepfte_liste].element + "_id"),
            undefined,
        );
    });

    if (
        !("verknuepfung_moeglich_eingeladen" in VERKNUEPFUNGEN[verknuepfungen]) ||
        (VERKNUEPFUNGEN[verknuepfungen].verknuepfung_moeglich_eingeladen.liste === verknuepfte_listen[0] &&
            VERKNUEPFUNGEN[verknuepfungen].verknuepfung_moeglich_eingeladen.eigenschaft in EIGENSCHAFTEN[verknuepfte_listen[0]] &&
            Liste_ElementWertRausZurueck(
                VERKNUEPFUNGEN[verknuepfungen].verknuepfung_moeglich_eingeladen.eigenschaft,
                verknuepfte_element_id[LISTEN[verknuepfte_listen[0]].element + "_id"],
                verknuepfte_listen[0],
                new Array(),
            ).includes(verknuepfte_element_id[LISTEN[verknuepfte_listen[1]].element + "_id"])) ||
        (VERKNUEPFUNGEN[verknuepfungen].verknuepfung_moeglich_eingeladen.liste === verknuepfte_listen[1] &&
            VERKNUEPFUNGEN[verknuepfungen].verknuepfung_moeglich_eingeladen.eigenschaft in EIGENSCHAFTEN[verknuepfte_listen[1]] &&
            Liste_ElementWertRausZurueck(
                VERKNUEPFUNGEN[verknuepfungen].verknuepfung_moeglich_eingeladen.eigenschaft,
                verknuepfte_element_id[LISTEN[verknuepfte_listen[1]].element + "_id"],
                verknuepfte_listen[1],
                new Array(),
            ).includes(verknuepfte_element_id[LISTEN[verknuepfte_listen[0]].element + "_id"]))
    ) {
        /* Verknüpfung ist für das Element möglich */
        $verknuepfung_moeglich.removeClass("invisible");
        $verknuepfung_nicht_moeglich.addClass("invisible");

        let verknuepfung_id = undefined;
        $.each(
            VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste[verknuepfte_listen[0]][
                verknuepfte_element_id[LISTEN[verknuepfte_listen[0]].element + "_id"]
            ],
            function (position, verknuepfung_id_nach_liste) {
                if (
                    Liste_VerknuepfungWertRausZurueck(
                        LISTEN[verknuepfte_listen[1]].element + "_id",
                        verknuepfung_id_nach_liste,
                        verknuepfungen,
                        undefined,
                    ) === verknuepfte_element_id[LISTEN[verknuepfte_listen[1]].element + "_id"]
                )
                    verknuepfung_id = verknuepfung_id_nach_liste;
            },
        );

        const verknuepfung_status = Liste_VerknuepfungWertRausZurueck("status", verknuepfung_id, verknuepfungen, 0);

        // Zugehöriges Label bearbeiten
        const $zugehoeriges_label = $verknuepfungen.siblings("label");
        $zugehoeriges_label.addClass("form-check-label").attr("for", zufaelligeZeichenketteZurueck(8));

        // Zugehöriges Werkzeug bearbeiten
        $verknuepfungen.find('.werkzeug[werkzeug="' + VERKNUEPFUNGEN[verknuepfungen].verknuepfung + '_erstellen"]').each(function () {
            const $werkzeug = $(this);
            if (VERKNUEPFUNGEN[verknuepfungen].typ === "janein_auswahl") {
                $werkzeug
                    .attr(LISTEN[verknuepfte_listen[0]].element + "_id", verknuepfte_element_id[LISTEN[verknuepfte_listen[0]].element + "_id"])
                    .attr(LISTEN[verknuepfte_listen[1]].element + "_id", verknuepfte_element_id[LISTEN[verknuepfte_listen[1]].element + "_id"])
                    .attr("verknuepfungen", verknuepfungen);

                $werkzeug.prop("checked", verknuepfung_status > 0).attr("id", $zugehoeriges_label.attr("for"));
            } else if (VERKNUEPFUNGEN[verknuepfungen].typ === "status_auswahl") {
                const status = Util_WertBereinigtZurueck($werkzeug.attr("status"), undefined);

                $werkzeug
                    .attr(LISTEN[verknuepfte_listen[0]].element + "_id", verknuepfte_element_id[LISTEN[verknuepfte_listen[0]].element + "_id"])
                    .attr(LISTEN[verknuepfte_listen[1]].element + "_id", verknuepfte_element_id[LISTEN[verknuepfte_listen[1]].element + "_id"])
                    .attr("verknuepfungen", verknuepfungen);

                if (status === verknuepfung_status) {
                    $werkzeug
                        .removeClass("btn-outline-" + VERKNUEPFUNGEN[verknuepfungen].status_erlaubt[status].farbe)
                        .addClass("btn-" + VERKNUEPFUNGEN[verknuepfungen].status_erlaubt[status].farbe)
                        .prop("disabled", true);
                    $werkzeug.find(".beschriftung").html(VERKNUEPFUNGEN[verknuepfungen].status_erlaubt[status].passiv);
                } else {
                    $werkzeug
                        .addClass("btn-outline-" + VERKNUEPFUNGEN[verknuepfungen].status_erlaubt[status].farbe)
                        .removeClass("btn-" + VERKNUEPFUNGEN[verknuepfungen].status_erlaubt[status].farbe)
                        .prop("disabled", false);
                    $werkzeug.find(".beschriftung").html(VERKNUEPFUNGEN[verknuepfungen].status_erlaubt[status].aktiv);
                }
            }
        });

        // Zugehöriges Bemerkung-ändern-Werkzeug bearbeiten
        $verknuepfungen.find('.werkzeug[werkzeug="verknuepfung_bemerkung_aendern"]').each(function () {
            const $werkzeug = $(this);

            $.each(VERKNUEPFUNGEN[verknuepfungen].status_erlaubt, function (status) {
                $werkzeug
                    .removeClass("btn-" + VERKNUEPFUNGEN[verknuepfungen].status_erlaubt[status].farbe)
                    .removeClass("btn-outline-" + VERKNUEPFUNGEN[verknuepfungen].status_erlaubt[status].farbe);
            });
            $werkzeug.removeClass("btn-outline-primary");

            if (typeof verknuepfung_id !== "undefined") {
                if (typeof verknuepfung_status !== "undefined") {
                    if (Liste_VerknuepfungWertRausZurueck("bemerkung", verknuepfung_id, verknuepfungen, null) !== null)
                        $werkzeug.addClass("btn-" + VERKNUEPFUNGEN[verknuepfungen].status_erlaubt[verknuepfung_status].farbe);
                    else $werkzeug.addClass("btn-outline-" + VERKNUEPFUNGEN[verknuepfungen].status_erlaubt[verknuepfung_status].farbe);
                } else $werkzeug.addClass("btn-outline-primary");

                $werkzeug.removeClass("invisible").attr(VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id", verknuepfung_id);
            } else
                $werkzeug
                    .addClass("btn-outline-primary")
                    .addClass("invisible")
                    .removeAttr(VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id");
        });

        if (
            /* Element ist nicht disabled */
            !$element.hasClass("disabled") &&
            /* Frist ist nicht definiert oder Frist für Verknüpfung ist nicht abgelaufen */
            (!("verknuepfung_moeglich_frist" in VERKNUEPFUNGEN[verknuepfungen]) ||
                (VERKNUEPFUNGEN[verknuepfungen].verknuepfung_moeglich_frist.liste === verknuepfte_listen[0] &&
                    VERKNUEPFUNGEN[verknuepfungen].verknuepfung_moeglich_frist.eigenschaft in EIGENSCHAFTEN[verknuepfte_listen[0]] &&
                    !(
                        Liste_ElementWertRausZurueck(
                            VERKNUEPFUNGEN[verknuepfungen].verknuepfung_moeglich_frist.eigenschaft,
                            verknuepfte_element_id[LISTEN[verknuepfte_listen[0]].element + "_id"],
                            verknuepfte_listen[0],
                            undefined,
                        ) < DATETIME.now().plus({ seconds: VERKNUEPFUNGEN[verknuepfungen].verknuepfung_moeglich_frist.frist })
                    )) ||
                (VERKNUEPFUNGEN[verknuepfungen].verknuepfung_moeglich_frist.liste === verknuepfte_listen[1] &&
                    VERKNUEPFUNGEN[verknuepfungen].verknuepfung_moeglich_frist.eigenschaft in EIGENSCHAFTEN[verknuepfte_listen[1]] &&
                    !(
                        Liste_ElementWertRausZurueck(
                            VERKNUEPFUNGEN[verknuepfungen].verknuepfung_moeglich_frist.eigenschaft,
                            verknuepfte_element_id[LISTEN[verknuepfte_listen[1]].element + "_id"],
                            verknuepfte_listen[1],
                            undefined,
                        ) < DATETIME.now().plus({ seconds: VERKNUEPFUNGEN[verknuepfungen].verknuepfung_moeglich_frist.frist })
                    )))
        ) {
        } else {
            $verknuepfungen.find(".werkzeug").prop("disabled", true);
        }
    } else {
        /* Verknüpfung ist für das Element nicht möglich */
        $verknuepfung_moeglich.addClass("invisible");
        $verknuepfung_nicht_moeglich.removeClass("invisible");

        if (verknuepfte_listen.includes("mitglieder") && verknuepfte_element_id.mitglied_id === ICH_ID) {
            /* Verknüpfung ist für dich nicht möglich */
            $verknuepfung_nicht_moeglich.text(VERKNUEPFUNGEN[verknuepfungen].verknuepfung_nicht_moeglich.keine_verknuepfung_fuer_dich_moeglich);
        } else if (verknuepfte_listen.includes("mitglieder") && verknuepfte_element_id.mitglied_id !== ICH_ID) {
            /* Verknüpfung ist für das Mitglied nicht möglich */
            $verknuepfung_nicht_moeglich.text(VERKNUEPFUNGEN[verknuepfungen].verknuepfung_nicht_moeglich.keine_verknuepfung_fuer_mitglied_moeglich);
        } else {
            /* Verknüpfung ist nicht möglich */
            $verknuepfung_nicht_moeglich.text(VERKNUEPFUNGEN[verknuepfungen].verknuepfung_nicht_moeglich.keine_verknuepfung_moeglich);
        }
    }
}

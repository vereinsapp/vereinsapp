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

    // VERKNUEPFUNG-ID DEFINIEREN
    let verknuepfung_id = undefined;
    $.each(
        Liste_VerknuepfungIdsNachListeZurueck(
            verknuepfte_element_id[LISTEN[verknuepfte_listen[0]].element + "_id"],
            verknuepfte_listen[0],
            verknuepfungen,
            new Array(),
        ),
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

    // VERKNUEPFUNG-STATUS DEFINIEREN
    const verknuepfung_status = Liste_VerknuepfungWertRausZurueck("status", verknuepfung_id, verknuepfungen, 0);

    // ZUGEHÖRIGES LABEL BEARBEITEN
    const $zugehoeriges_label = $verknuepfungen.siblings("label");
    $zugehoeriges_label.addClass("form-check-label").attr("for", zufaelligeZeichenketteZurueck(8));

    // ZUGEHÖRIGES WERKZEUG BEARBEITEN
    $verknuepfungen.find('.werkzeug[werkzeug="' + VERKNUEPFUNGEN[verknuepfungen].verknuepfung + '_erstellen"]').each(function () {
        const $werkzeug = $(this);
        let disabled_typspezifisch = false;

        $werkzeug
            .attr(LISTEN[verknuepfte_listen[0]].element + "_id", verknuepfte_element_id[LISTEN[verknuepfte_listen[0]].element + "_id"])
            .attr(LISTEN[verknuepfte_listen[1]].element + "_id", verknuepfte_element_id[LISTEN[verknuepfte_listen[1]].element + "_id"]);

        if (VERKNUEPFUNGEN[verknuepfungen].typ === "janein_auswahl")
            $werkzeug.prop("checked", verknuepfung_status > 0).attr("id", $zugehoeriges_label.attr("for"));
        else if (VERKNUEPFUNGEN[verknuepfungen].typ === "status_auswahl") {
            const status = Util_WertBereinigtZurueck($werkzeug.attr("status"), undefined);

            if (status === verknuepfung_status) {
                $werkzeug
                    .removeClass("btn-outline-" + VERKNUEPFUNGEN[verknuepfungen].status_erlaubt[status].farbe)
                    .addClass("btn-" + VERKNUEPFUNGEN[verknuepfungen].status_erlaubt[status].farbe);
                $werkzeug.find(".beschriftung").html(VERKNUEPFUNGEN[verknuepfungen].status_erlaubt[status].passiv);
                disabled_typspezifisch = true;
            } else {
                $werkzeug
                    .addClass("btn-outline-" + VERKNUEPFUNGEN[verknuepfungen].status_erlaubt[status].farbe)
                    .removeClass("btn-" + VERKNUEPFUNGEN[verknuepfungen].status_erlaubt[status].farbe);
                $werkzeug.find(".beschriftung").html(VERKNUEPFUNGEN[verknuepfungen].status_erlaubt[status].aktiv);
            }
        }

        if (
            $element.hasClass("disabled") ||
            (typeof VERKNUEPFUNGEN[verknuepfungen].verknuepfung_nicht_moeglich_frist === "function" &&
                VERKNUEPFUNGEN[verknuepfungen].verknuepfung_nicht_moeglich_frist($verknuepfungen, $element)) ||
            disabled_typspezifisch
        )
            $werkzeug.prop("disabled", true);
        else $werkzeug.prop("disabled", false);
    });

    // ZUGEHÖRIGES BEMERKUNG-AENDERN-WERKZEUG BEARBEITEN
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

        if (
            $element.hasClass("disabled") ||
            (typeof VERKNUEPFUNGEN[verknuepfungen].verknuepfung_nicht_moeglich_frist === "function" &&
                VERKNUEPFUNGEN[verknuepfungen].verknuepfung_nicht_moeglich_frist($verknuepfungen, $element))
        )
            $werkzeug.prop("disabled", true);
        else $werkzeug.prop("disabled", false);
    });

    // VERKNUEPFUNG NICHT MÖGLICH
    if (
        typeof VERKNUEPFUNGEN[verknuepfungen].verknuepfung_nicht_moeglich_eigenschaft === "function" &&
        VERKNUEPFUNGEN[verknuepfungen].verknuepfung_nicht_moeglich_eigenschaft($verknuepfungen, $element)
    ) {
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
    } else {
        /* Verknüpfung ist für das Element möglich */
        $verknuepfung_moeglich.removeClass("invisible");
        $verknuepfung_nicht_moeglich.addClass("invisible");
    }
}

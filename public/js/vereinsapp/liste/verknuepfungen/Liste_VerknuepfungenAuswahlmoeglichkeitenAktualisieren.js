/**
 * @param {JQuery} $verknuepfungen_auswahlmoeglichkeiten
 * @param {string} liste
 * @param {number} element_id
 * @param {string} gegen_liste
 * @param {number} gegen_element_id
 * @param {string} verknuepfungen
 */

function Liste_VerknuepfungenAuswahlmoeglichkeitenAktualisieren(
    $verknuepfungen_auswahlmoeglichkeiten,
    liste,
    element_id,
    gegen_liste,
    gegen_element_id,
    verknuepfungen
) {
    const $verknuepfung_moeglich = $verknuepfungen_auswahlmoeglichkeiten.find(".verknuepfung_moeglich");
    const $verknuepfung_nicht_moeglich = $verknuepfungen_auswahlmoeglichkeiten.find(".verknuepfung_nicht_moeglich");

    if (
        Schnittstelle_VariableRausZurueck(
            VERKNUEPFUNGEN[verknuepfungen].verknuepfung_moeglich_id.eigenschaft,
            element_id,
            VERKNUEPFUNGEN[verknuepfungen].verknuepfung_moeglich_id.liste,
            new Array()
        ).includes(gegen_element_id) ||
        Schnittstelle_VariableRausZurueck(
            VERKNUEPFUNGEN[verknuepfungen].verknuepfung_moeglich_id.eigenschaft,
            gegen_element_id,
            VERKNUEPFUNGEN[verknuepfungen].verknuepfung_moeglich_id.liste,
            new Array()
        ).includes(element_id)
    ) {
        /* Verknüpfung ist für das Element möglich */
        $verknuepfung_moeglich.removeClass("invisible");
        $verknuepfung_nicht_moeglich.addClass("invisible");

        let verknuepfung_id = undefined;
        $.each(
            Schnittstelle_VariableRausZurueck("zugeordnete_" + LISTEN[verknuepfungen].element + "_ids", element_id, liste, new Array()),
            function (position, zugeordnete_verknuepfung_id) {
                if (
                    Schnittstelle_VariableRausZurueck(LISTEN[gegen_liste].element + "_id", zugeordnete_verknuepfung_id, verknuepfungen, undefined) ===
                    gegen_element_id
                )
                    verknuepfung_id = zugeordnete_verknuepfung_id;
            }
        );

        const verknuepfung_status = Schnittstelle_VariableRausZurueck("status", verknuepfung_id, verknuepfungen, undefined);

        $verknuepfungen_auswahlmoeglichkeiten.find(".btn_verknuepfung_erstellen").each(function () {
            const $btn_verknuepfung_erstellen = $(this);
            const status = Schnittstelle_VariableWertBereinigtZurueck($btn_verknuepfung_erstellen.attr("data-status"), undefined);

            $btn_verknuepfung_erstellen
                .attr("data-liste", liste)
                .attr("data-element_id", element_id)
                .attr("data-gegen_liste", gegen_liste)
                .attr("data-gegen_element_id", gegen_element_id)
                .attr("data-verknuepfungen", verknuepfungen);

            if (status === verknuepfung_status) {
                $btn_verknuepfung_erstellen
                    .removeClass("btn-outline-" + VERKNUEPFUNGEN[verknuepfungen].auswahlmoeglichkeiten[status].farbe)
                    .addClass("btn-" + VERKNUEPFUNGEN[verknuepfungen].auswahlmoeglichkeiten[status].farbe)
                    .prop("disabled", true);
                $btn_verknuepfung_erstellen.find(".beschriftung").html(VERKNUEPFUNGEN[verknuepfungen].auswahlmoeglichkeiten[status].passiv);
            } else {
                $btn_verknuepfung_erstellen
                    .addClass("btn-outline-" + VERKNUEPFUNGEN[verknuepfungen].auswahlmoeglichkeiten[status].farbe)
                    .removeClass("btn-" + VERKNUEPFUNGEN[verknuepfungen].auswahlmoeglichkeiten[status].farbe)
                    .prop("disabled", false);
                $btn_verknuepfung_erstellen.find(".beschriftung").html(VERKNUEPFUNGEN[verknuepfungen].auswahlmoeglichkeiten[status].aktiv);
            }
        });

        $verknuepfungen_auswahlmoeglichkeiten.find(".btn_verknuepfung_bemerkung_aendern").each(function () {
            const $btn_verknuepfung_bemerkung_aendern = $(this);

            $btn_verknuepfung_bemerkung_aendern.removeClass("btn-outline-primary");
            $.each(VERKNUEPFUNGEN[verknuepfungen].auswahlmoeglichkeiten, function (status) {
                $btn_verknuepfung_bemerkung_aendern
                    .removeClass("btn-outline-" + VERKNUEPFUNGEN[verknuepfungen].auswahlmoeglichkeiten[status].farbe)
                    .removeClass("btn-" + VERKNUEPFUNGEN[verknuepfungen].auswahlmoeglichkeiten[status].farbe);
            });

            if (typeof verknuepfung_id !== "undefined") {
                if (typeof verknuepfung_status !== "undefined") {
                    if (Schnittstelle_VariableRausZurueck("bemerkung", verknuepfung_id, verknuepfungen, null) !== null)
                        $btn_verknuepfung_bemerkung_aendern.addClass(
                            "btn-" + VERKNUEPFUNGEN[verknuepfungen].auswahlmoeglichkeiten[verknuepfung_status].farbe
                        );
                    else
                        $btn_verknuepfung_bemerkung_aendern.addClass(
                            "btn-outline-" + VERKNUEPFUNGEN[verknuepfungen].auswahlmoeglichkeiten[verknuepfung_status].farbe
                        );
                } else {
                    $btn_verknuepfung_bemerkung_aendern.addClass("btn-outline-primary");
                }
                $btn_verknuepfung_bemerkung_aendern.removeClass("invisible").attr("data-element_id", verknuepfung_id);
            } else $btn_verknuepfung_bemerkung_aendern.addClass("btn-outline-primary").addClass("invisible").removeAttr("data-element_id");
        });

        if (
            Schnittstelle_VariableRausZurueck(
                VERKNUEPFUNGEN[verknuepfungen].verknuepfung_moeglich_frist.eigenschaft,
                gegen_element_id,
                gegen_liste,
                undefined
            ) < DATETIME.now().plus({ seconds: VERKNUEPFUNGEN[verknuepfungen]["frist"] })
        ) {
            /* Frist für Verknüpfung ist abgelaufen */
            $verknuepfungen_auswahlmoeglichkeiten.find(".btn_verknuepfung_erstellen").prop("disabled", true);
            $btn_verknuepfung_bemerkung_aendern.prop("disabled", true);
        }
    } else {
        /* Verknüpfung ist für das Element nicht möglich */
        $verknuepfung_moeglich.addClass("invisible");
        $verknuepfung_nicht_moeglich.removeClass("invisible");

        if (liste === "mitglieder") {
            /* Verknüpfung ist für dich oder für das Mitglied nicht möglich */

            if (element_id === Number(ICH["id"])) {
                /* Verknüpfung ist für dich nicht möglich */
                $verknuepfung_nicht_moeglich.text(VERKNUEPFUNGEN[verknuepfungen].verknuepfung_nicht_moeglich.keine_verknuepfung_fuer_dich_moeglich);
            } else {
                /* Verknüpfung ist für das Mitglied nicht möglich */
                $verknuepfung_nicht_moeglich.text(
                    VERKNUEPFUNGEN[verknuepfungen].verknuepfung_nicht_moeglich.keine_verknuepfung_fuer_mitglied_moeglich
                );
            }
        } else if (gegen_liste === "mitglieder") {
            /* Verknüpfung ist für dich oder für das Mitglied nicht möglich */

            if (gegen_element_id === Number(ICH["id"])) {
                /* Verknüpfung ist für dich nicht möglich */
                $verknuepfung_nicht_moeglich.text(VERKNUEPFUNGEN[verknuepfungen].verknuepfung_nicht_moeglich.keine_verknuepfung_fuer_dich_moeglich);
            } else {
                /* Verknüpfung ist für das Mitglied nicht möglich */
                $verknuepfung_nicht_moeglich.text(
                    VERKNUEPFUNGEN[verknuepfungen].verknuepfung_nicht_moeglich.keine_verknuepfung_fuer_mitglied_moeglich
                );
            }
        } else {
            /* Verknüpfung ist nicht möglich */
            $verknuepfung_nicht_moeglich.text(VERKNUEPFUNGEN[verknuepfungen].verknuepfung_nicht_moeglich.keine_verknuepfung_moeglich);
        }
    }
}

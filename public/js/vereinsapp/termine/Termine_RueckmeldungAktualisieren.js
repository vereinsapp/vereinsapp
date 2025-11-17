/**
 * @param {JQuery} $rueckmeldung
 */

function Termine_RueckmeldungAktualisieren($rueckmeldung) {
    const $rueckmeldung_moeglich = $rueckmeldung.find(".rueckmeldung_moeglich");
    const $keine_rueckmeldung_moeglich = $rueckmeldung.find(".keine_rueckmeldung_moeglich");
    const $du_bist_nicht_eingeladen = $rueckmeldung.find(".du_bist_nicht_eingeladen");
    const $mitglied_ist_nicht_eingeladen = $rueckmeldung.find(".mitglied_ist_nicht_eingeladen");

    const termin_id = Schnittstelle_VariableWertBereinigtZurueck(
        $rueckmeldung.closest('.element[data-liste="termine"][data-element_id]').attr("data-element_id"),
        undefined
    );
    if (typeof termin_id !== "undefined") {
        /* Rueckmeldung passiert im Kontext eines Termin-Elements */
        $keine_rueckmeldung_moeglich.addClass("invisible");

        const mitglied_id = Schnittstelle_VariableWertBereinigtZurueck($rueckmeldung.attr("data-mitglied_id"), undefined);
        if (Schnittstelle_VariableRausZurueck("mitglieder_ids_eingeladen", termin_id, "termine", undefined).includes(mitglied_id)) {
            /* Mitglied ist eingeladen */
            $rueckmeldung_moeglich.removeClass("invisible");
            $du_bist_nicht_eingeladen.addClass("invisible");
            $mitglied_ist_nicht_eingeladen.addClass("invisible");

            let rueckmeldung_id_;
            $.each(
                Schnittstelle_VariableRausZurueck("zugeordnete_element_ids_nach_liste", termin_id, "termine", {
                    termine_rueckmeldungen: new Array(),
                }).termine_rueckmeldungen,
                function (position, rueckmeldung_id) {
                    if (Schnittstelle_VariableRausZurueck("mitglied_id", rueckmeldung_id, "termine_rueckmeldungen", undefined) === mitglied_id)
                        rueckmeldung_id_ = rueckmeldung_id;
                }
            );
            const rueckmeldung_id = rueckmeldung_id_;
            const bemerkung = Schnittstelle_VariableRausZurueck("bemerkung", rueckmeldung_id, "termine_rueckmeldungen", null);

            $rueckmeldung.find(".btn_rueckmeldung_erstellen").each(function () {
                const $btn_rueckmeldung_erstellen = $(this);
                const $btn_rueckmeldung_bemerkung_aendern = $btn_rueckmeldung_erstellen.siblings(".btn_rueckmeldung_bemerkung_aendern");
                const status = Schnittstelle_VariableWertBereinigtZurueck($btn_rueckmeldung_erstellen.attr("data-status"), undefined);

                if (Schnittstelle_VariableRausZurueck("status", rueckmeldung_id, "termine_rueckmeldungen", undefined) === status) {
                    $btn_rueckmeldung_erstellen
                        .removeAttr("data-mitglied_id", mitglied_id)
                        .removeAttr("data-termin_id", termin_id)
                        .removeClass("btn-outline-" + TERMINE_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[status].farbe)
                        .addClass("btn-" + TERMINE_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[status].farbe)
                        .text(TERMINE_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[status].passiv)
                        .prop("disabled", true);

                    $btn_rueckmeldung_bemerkung_aendern
                        .attr("data-element_id", rueckmeldung_id)
                        .removeClass("btn-outline-" + TERMINE_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[1].farbe)
                        .removeClass("btn-outline-" + TERMINE_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[2].farbe)
                        .removeClass("btn-" + TERMINE_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[1].farbe)
                        .removeClass("btn-" + TERMINE_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[2].farbe);
                    if (bemerkung !== null)
                        $btn_rueckmeldung_bemerkung_aendern.addClass("btn-" + TERMINE_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[status].farbe);
                    else $btn_rueckmeldung_bemerkung_aendern.addClass("btn-outline-" + TERMINE_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[status].farbe);
                } else {
                    $btn_rueckmeldung_erstellen
                        .attr("data-mitglied_id", mitglied_id)
                        .attr("data-termin_id", termin_id)
                        .addClass("btn-outline-" + TERMINE_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[status].farbe)
                        .removeClass("btn-" + TERMINE_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[status].farbe)
                        .text(TERMINE_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[status].aktiv)
                        .prop("disabled", false);
                }

                if (
                    Schnittstelle_VariableRausZurueck("start", termin_id, "termine", undefined) <
                    DATETIME.now().plus({ seconds: TERMINE_RUECKMELDUNG_FRIST })
                ) {
                    $btn_rueckmeldung_erstellen.prop("disabled", true);
                    $btn_rueckmeldung_bemerkung_aendern.prop("disabled", true);
                }
            });
        } else {
            /* Mitglied ist nicht eingeladen */
            $rueckmeldung_moeglich.addClass("invisible");

            if (mitglied_id === Number(ICH["id"])) {
                $du_bist_nicht_eingeladen.removeClass("invisible");
                $mitglied_ist_nicht_eingeladen.addClass("invisible");
            } else {
                $du_bist_nicht_eingeladen.addClass("invisible");
                $mitglied_ist_nicht_eingeladen
                    .removeClass("invisible")
                    .find(".beschriftung")
                    .text(Liste_ElementBeschriftungZurueck(mitglied_id, "mitglieder"));
            }
        }
    } else {
        /* Rueckmeldung passiert nicht im Kontext eines Termin-Elements */
        $rueckmeldung_moeglich.addClass("invisible");
        $keine_rueckmeldung_moeglich.removeClass("invisible");
        $du_bist_nicht_eingeladen.addClass("invisible");
        $mitglied_ist_nicht_eingeladen.addClass("invisible");
    }
}

/**
 * @param {JQuery} $rueckmeldung
 */

function Aufgaben_RueckmeldungAktualisieren($rueckmeldung) {
    const $rueckmeldung_moeglich = $rueckmeldung.find(".rueckmeldung_moeglich");
    const $keine_rueckmeldung_moeglich = $rueckmeldung.find(".keine_rueckmeldung_moeglich");
    const $du_bist_nicht_eingeladen = $rueckmeldung.find(".du_bist_nicht_eingeladen");
    const $mitglied_ist_nicht_eingeladen = $rueckmeldung.find(".mitglied_ist_nicht_eingeladen");

    const aufgabe_id = Schnittstelle_VariableWertBereinigtZurueck(
        $rueckmeldung.closest('.element[data-liste="aufgaben"][data-element_id]').attr("data-element_id"),
        undefined
    );
    if (typeof aufgabe_id !== "undefined") {
        /* Rueckmeldung passiert im Kontext eines Aufgabe-Elements */
        $keine_rueckmeldung_moeglich.addClass("invisible");

        const mitglied_id = Schnittstelle_VariableWertBereinigtZurueck($rueckmeldung.attr("data-mitglied_id"), undefined);
        if (Schnittstelle_VariableRausZurueck("mitglieder_ids_eingeladen", aufgabe_id, "aufgaben", undefined).includes(mitglied_id)) {
            /* Mitglied ist eingeladen */
            $rueckmeldung_moeglich.removeClass("invisible");
            $du_bist_nicht_eingeladen.addClass("invisible");
            $mitglied_ist_nicht_eingeladen.addClass("invisible");

            let rueckmeldung_id;
            $.each(
                Schnittstelle_VariableRausZurueck("zugeordnete_aufgaben_rueckmeldung_ids", aufgabe_id, "aufgaben", new Array()),
                function (position, zugeordnete_rueckmeldung_id) {
                    if (
                        Schnittstelle_VariableRausZurueck("mitglied_id", zugeordnete_rueckmeldung_id, "aufgaben_rueckmeldungen", undefined) ===
                        mitglied_id
                    )
                        rueckmeldung_id = zugeordnete_rueckmeldung_id;
                }
            );
            const bemerkung = Schnittstelle_VariableRausZurueck("bemerkung", rueckmeldung_id, "aufgaben_rueckmeldungen", null);

            $rueckmeldung.find(".btn_aufgaben_rueckmeldung_erstellen").each(function () {
                const $btn_rueckmeldung_erstellen = $(this);
                const $btn_rueckmeldung_bemerkung_aendern = $btn_rueckmeldung_erstellen.siblings(".btn_rueckmeldung_bemerkung_aendern");
                const status = Schnittstelle_VariableWertBereinigtZurueck($btn_rueckmeldung_erstellen.attr("data-status"), undefined);

                if (Schnittstelle_VariableRausZurueck("status", rueckmeldung_id, "aufgaben_rueckmeldungen", undefined) === status) {
                    $btn_rueckmeldung_erstellen
                        .removeAttr("data-mitglied_id", mitglied_id)
                        .removeAttr("data-aufgabe_id", aufgabe_id)
                        .removeClass("btn-outline-" + AUFGABEN_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[status].farbe)
                        .addClass("btn-" + AUFGABEN_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[status].farbe)
                        .html(AUFGABEN_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[status].passiv)
                        .prop("disabled", true);

                    $btn_rueckmeldung_bemerkung_aendern
                        .attr("data-element_id", rueckmeldung_id)
                        .removeClass("btn-outline-" + AUFGABEN_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[1].farbe)
                        .removeClass("btn-outline-" + AUFGABEN_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[2].farbe)
                        .removeClass("btn-" + AUFGABEN_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[1].farbe)
                        .removeClass("btn-" + AUFGABEN_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[2].farbe);
                    if (bemerkung !== null)
                        $btn_rueckmeldung_bemerkung_aendern.addClass("btn-" + AUFGABEN_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[status].farbe);
                    else $btn_rueckmeldung_bemerkung_aendern.addClass("btn-outline-" + AUFGABEN_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[status].farbe);
                } else {
                    $btn_rueckmeldung_erstellen
                        .attr("data-mitglied_id", mitglied_id)
                        .attr("data-aufgabe_id", aufgabe_id)
                        .addClass("btn-outline-" + AUFGABEN_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[status].farbe)
                        .removeClass("btn-" + AUFGABEN_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[status].farbe)
                        .html(AUFGABEN_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[status].aktiv)
                        .prop("disabled", false);
                }

                if (
                    Schnittstelle_VariableRausZurueck("start", aufgabe_id, "aufgaben", undefined) <
                    DATETIME.now().plus({ seconds: AUFGABEN_RUECKMELDUNG_FRIST })
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
        /* Rueckmeldung passiert nicht im Kontext eines Aufgabe-Elements */
        $rueckmeldung_moeglich.addClass("invisible");
        $keine_rueckmeldung_moeglich.removeClass("invisible");
        $du_bist_nicht_eingeladen.addClass("invisible");
        $mitglied_ist_nicht_eingeladen.addClass("invisible");
    }
}

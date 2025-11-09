/**
 * @param {JQuery} $rueckmeldung
 */

function Termine_RueckmeldungAktualisieren($rueckmeldung) {
    const termin_id = Schnittstelle_VariableWertBereinigtZurueck(
        $rueckmeldung.closest('.element[data-liste="termine"]').attr("data-element_id"),
        undefined
    );

    if (typeof termin_id !== "undefined") {
        const $rueckmeldung_nicht_eingeladen = $rueckmeldung.siblings(".rueckmeldung_nicht_eingeladen").first();
        const $btn_rueckmeldung_detaillieren = $rueckmeldung.find(".btn_rueckmeldung_detaillieren");

        const attribute = new Array();
        attribute[1] = { farbe: "success", aktiv: "ZUSAGEN", passiv: "ZUGESAGT" };
        attribute[2] = { farbe: "danger", aktiv: "ABSAGEN", passiv: "ABGESAGT" };

        if (Schnittstelle_VariableRausZurueck("ich_eingeladen_janein", termin_id, "termine", undefined)) {
            $rueckmeldung.removeClass("invisible");
            $rueckmeldung_nicht_eingeladen.addClass("invisible");

            $rueckmeldung.find(".btn_rueckmeldung_erstellen").each(function () {
                const $btn_rueckmeldung_erstellen = $(this);
                const mitglied_id = Schnittstelle_VariableWertBereinigtZurueck($btn_rueckmeldung_erstellen.attr("data-mitglied_id"), undefined);
                const status = Schnittstelle_VariableWertBereinigtZurueck($btn_rueckmeldung_erstellen.attr("data-status"), undefined);
                const rueckmeldung_id = Schnittstelle_VariableWertBereinigtZurueck(
                    $btn_rueckmeldung_erstellen.attr("data-element_id"),
                    Liste_ElementIdZurueck(
                        [
                            { liste: "termine", element_id: termin_id },
                            { liste: "mitglieder", element_id: mitglied_id },
                        ],
                        "rueckmeldungen"
                    )
                );
                const bemerkung = Schnittstelle_VariableRausZurueck("bemerkung", rueckmeldung_id, "rueckmeldungen", null);

                $btn_rueckmeldung_erstellen.attr("data-termin_id", termin_id);

                if (Schnittstelle_VariableRausZurueck("status", rueckmeldung_id, "rueckmeldungen", undefined) === status) {
                    $btn_rueckmeldung_erstellen
                        .removeClass("btn-outline-" + attribute[status].farbe)
                        .addClass("btn-" + attribute[status].farbe)
                        .text(attribute[status].passiv)
                        .prop("disabled", true);

                    $btn_rueckmeldung_detaillieren
                        .attr("data-element_id", rueckmeldung_id)
                        .removeClass("btn-outline-success")
                        .removeClass("btn-outline-danger")
                        .removeClass("btn-success")
                        .removeClass("btn-danger");

                    if (bemerkung !== null) $btn_rueckmeldung_detaillieren.addClass("btn-" + attribute[status].farbe);
                    else $btn_rueckmeldung_detaillieren.addClass("btn-outline-" + attribute[status].farbe);
                } else {
                    $btn_rueckmeldung_erstellen
                        .removeClass("btn-" + attribute[status].farbe)
                        .addClass("btn-outline-" + attribute[status].farbe)
                        .text(attribute[status].aktiv)
                        .prop("disabled", false);
                }

                if (
                    Schnittstelle_VariableRausZurueck("start", termin_id, "termine", undefined) <
                    DATETIME.now().plus({ seconds: TERMINE_RUECKMELDUNG_FRIST })
                ) {
                    $btn_rueckmeldung_erstellen.prop("disabled", true);
                    $btn_rueckmeldung_detaillieren.prop("disabled", true);
                }
            });
        } else {
            $rueckmeldung.addClass("invisible");
            $rueckmeldung_nicht_eingeladen.removeClass("invisible");
        }
    }
}

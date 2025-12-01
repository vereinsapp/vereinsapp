/**
 * @param {boolean} formular_oeffnen
 * @param {Object} dom
 * @param {Object} data
 * @param {string} title
 * @param {number} rueckmeldung_id
 */

function Aufgaben_RueckmeldungErstellen(formular_oeffnen, dom, data, title, rueckmeldung_id) {
    if (formular_oeffnen) {
        const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "rueckmeldung_basiseigenschaften");
        Schnittstelle_DomModalOeffnen($neues_modal);
        Liste_ElementFormularInitialisieren($neues_modal.find(".formular"), "erstellen", rueckmeldung_id, "aufgaben_rueckmeldungen");
    } else {
        const ajax_dom = dom;
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
        if (!("bemerkung" in ajax_data) || isEmptyString(ajax_data.bemerkung)) ajax_data.bemerkung = null;

        Schnittstelle_AjaxInDieSchlange(
            "aufgaben/ajax_rueckmeldung_speichern",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                // bereits vorhandene identische Rückmeldungen werden gelöscht
                $.each(
                    Schnittstelle_VariableRausZurueck("zugeordnete_aufgaben_rueckmeldung_ids", AJAX.data.aufgabe_id, "aufgaben", new Array()),
                    function (position, zugeordnete_rueckmeldung_id) {
                        if (
                            Schnittstelle_VariableRausZurueck("mitglied_id", zugeordnete_rueckmeldung_id, "aufgaben_rueckmeldungen", undefined) ===
                            AJAX.data.mitglied_id
                        )
                            Schnittstelle_VariableLoeschen(rueckmeldung_id, "aufgaben_rueckmeldungen");
                    }
                );

                // eine neue Rückmeldung wird hinzugefügt
                if (AJAX.data.status > 0) {
                    if (typeof AJAX.antwort.rueckmeldung_id !== "undefined") AJAX.data.id = Number(AJAX.antwort.rueckmeldung_id);
                    else AJAX.data.id = LISTEN["aufgaben_rueckmeldungen"].tabelle.length + 1;
                    const rueckmeldung_id = AJAX.data.id;

                    $.each(AJAX.data, function (eigenschaft, wert) {
                        if (eigenschaft != "ajax_id" && eigenschaft != CSRF_NAME)
                            Schnittstelle_VariableRein(wert, eigenschaft, rueckmeldung_id, "aufgaben_rueckmeldungen");
                    });
                }

                Schnittstelle_EventVariableUpdLocalstorage("aufgaben_rueckmeldungen");
                Schnittstelle_EventLocalstorageUpdVariable("aufgaben_rueckmeldungen");
                Schnittstelle_VariableElementZuordnen("aufgaben_rueckmeldungen");
                // Schnittstelle_VariableElementErgaenzen("aufgaben_rueckmeldungen");
                Schnittstelle_EventVariableUpdDom("aufgaben_rueckmeldungen");

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) {
                    Schnittstelle_DomModalSchliessen(AJAX.dom.$modal);
                    Schnittstelle_DomToastFeuern(
                        Liste_ElementBeschriftungZurueck(rueckmeldung_id, "aufgaben_rueckmeldungen") + " wurde erfolgreich erstellt."
                    );
                }
                if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists())
                    Aufgaben_RueckmeldungAktualisieren(AJAX.dom.$btn_ausloesend.closest("[data-liste='aufgaben_rueckmeldungen']"));
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                else if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_ElementFormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
            }
        );
    }
}

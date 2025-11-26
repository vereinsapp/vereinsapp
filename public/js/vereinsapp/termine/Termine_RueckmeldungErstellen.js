/**
 * @param {boolean} formular_oeffnen
 * @param {Object} dom
 * @param {Object} data
 * @param {string} title
 * @param {number} rueckmeldung_id
 */

function Termine_RueckmeldungErstellen(formular_oeffnen, dom, data, title, rueckmeldung_id) {
    if (formular_oeffnen) {
        const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "rueckmeldung_basiseigenschaften");
        Schnittstelle_DomModalOeffnen($neues_modal);
        Liste_ElementFormularInitialisieren($neues_modal.find(".formular"), "erstellen", rueckmeldung_id, "termine_rueckmeldungen");
    } else {
        Schnittstelle_BtnWartenStart(dom.$btn_ausloesend);

        const ajax_dom = dom;
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
        if (!("bemerkung" in ajax_data) || isEmptyString(ajax_data.bemerkung)) ajax_data.bemerkung = null;

        Schnittstelle_AjaxInDieSchlange(
            "termine/ajax_rueckmeldung_speichern",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                // bereits vorhandene identische Rückmeldungen werden gelöscht
                $.each(
                    Schnittstelle_VariableRausZurueck("zugeordnete_termine_rueckmeldung_ids", AJAX.data.termin_id, "termine", new Array()),
                    function (position, zugeordnete_rueckmeldung_id) {
                        if (
                            Schnittstelle_VariableRausZurueck("mitglied_id", zugeordnete_rueckmeldung_id, "termine_rueckmeldungen", undefined) ===
                            AJAX.data.mitglied_id
                        )
                            Schnittstelle_VariableLoeschen(rueckmeldung_id, "termine_rueckmeldungen");
                    }
                );

                // eine neue Rückmeldung wird hinzugefügt
                if (AJAX.data.status > 0) {
                    if (typeof AJAX.antwort.rueckmeldung_id !== "undefined") AJAX.data.id = Number(AJAX.antwort.rueckmeldung_id);
                    else AJAX.data.id = LISTEN["termine_rueckmeldungen"].tabelle.length + 1;
                    const rueckmeldung_id = AJAX.data.id;

                    $.each(AJAX.data, function (eigenschaft, wert) {
                        if (eigenschaft != "ajax_id" && eigenschaft != CSRF_NAME)
                            Schnittstelle_VariableRein(wert, eigenschaft, rueckmeldung_id, "termine_rueckmeldungen");
                    });
                }

                Schnittstelle_EventVariableUpdLocalstorage("termine_rueckmeldungen");
                Schnittstelle_EventLocalstorageUpdVariable("termine_rueckmeldungen");
                Schnittstelle_VariableElementZuordnen("termine_rueckmeldungen");
                // Schnittstelle_VariableElementErgaenzen("termine_rueckmeldungen");
                Schnittstelle_EventVariableUpdDom("termine_rueckmeldungen");

                if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists())
                    Schnittstelle_BtnWartenEnde(AJAX.dom.$btn_ausloesend);
                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) {
                    Schnittstelle_DomModalSchliessen(AJAX.dom.$modal);
                    Schnittstelle_DomToastFeuern(
                        Liste_ElementBeschriftungZurueck(rueckmeldung_id, "termine_rueckmeldungen") + " wurde erfolgreich erstellt."
                    );
                }
                if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists())
                    Termine_RueckmeldungAktualisieren(AJAX.dom.$btn_ausloesend.closest("[data-liste='termine_rueckmeldungen']"));
            },
            function (AJAX) {
                if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists())
                    Schnittstelle_BtnWartenEnde(AJAX.dom.$btn_ausloesend);
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                else if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_ElementFormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
            }
        );
    }
}

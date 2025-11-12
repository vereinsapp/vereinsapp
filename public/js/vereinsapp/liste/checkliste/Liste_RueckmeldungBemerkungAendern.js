/**
 * @param {boolean} formular_oeffnen
 * @param {Object} dom
 * @param {Object} data
 * @param {number} element_id
 * @param {string} liste
 */

function Liste_RueckmeldungBemerkungAendern(formular_oeffnen, dom, data, element_id, liste) {
    if (formular_oeffnen) {
        const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(undefined, "BEMERKUNG");
        $neues_modal.find(".btn_rueckmeldung_bemerkung_aendern").attr("data-liste", liste).attr("data-element_id", element_id);
        Schnittstelle_DomModalOeffnen($neues_modal);
        Liste_ElementFormularInitialisieren($neues_modal.find(".formular"), undefined, element_id, liste);
    } else {
        if (!dom.$btn_ausloesend.hasClass("element")) Schnittstelle_BtnWartenStart(dom.$btn_ausloesend);

        const ajax_dom = dom;

        if (!("bemerkung" in data)) data.bemerkung = Schnittstelle_VariableRausZurueck("bemerkung", element_id, liste, null);
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
        ajax_data.id = element_id;
        ajax_data.liste = liste;
        if (isEmptyString(ajax_data.bemerkung)) ajax_data.bemerkung = null;

        Schnittstelle_AjaxInDieSchlange(
            LISTEN[liste].controller + "/ajax_rueckmeldung_bemerkung_aendern",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                const element_id = AJAX.data.id;
                const liste = AJAX.data.liste;
                Schnittstelle_VariableRein(AJAX.data.bemerkung, "bemerkung", element_id, liste);

                Schnittstelle_EventVariableUpdLocalstorage(liste);
                Schnittstelle_EventLocalstorageUpdVariable(liste);
                Schnittstelle_VariableElementZuordnen(liste);
                Schnittstelle_VariableElementErgaenzen(liste);
                Schnittstelle_EventVariableUpdDom(liste);

                if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists() && !dom.$btn_ausloesend.hasClass("element"))
                    Schnittstelle_BtnWartenEnde(AJAX.dom.$btn_ausloesend);
                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) {
                    Schnittstelle_DomModalSchliessen(AJAX.dom.$modal);
                    Schnittstelle_DomToastFeuern("Bemerkung wurde erfolgreich geändert.");
                }
            },
            function (AJAX) {
                if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists() && !dom.$btn_ausloesend.hasClass("element"))
                    Schnittstelle_BtnWartenEnde(AJAX.dom.$btn_ausloesend);
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                else if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_ElementFormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
                Schnittstelle_DomToastFeuern("Bemerkung konnte nicht geändert werden.", "danger");
            }
        );
    }
}

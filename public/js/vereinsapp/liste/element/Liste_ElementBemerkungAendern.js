/**
 * @param {boolean} formular_oeffnen
 * @param {Object} dom
 * @param {Object} data
 * @param {number} element_id
 * @param {string} liste
 */

function Liste_ElementBemerkungAendern(formular_oeffnen, dom, data, ziel_id, element_id, liste) {
    if (formular_oeffnen) {
        const $ziel = dom.$ausloesend.closest(".element");
        const ziel_id = zufaelligeZeichenketteZurueck(8);
        if ($ziel.exists()) $ziel.attr("id", ziel_id);
        // data.ziel_id = ziel_id;

        const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(undefined, "BEMERKUNG");
        $neues_modal
            .find(".btn_element_bemerkung_aendern")
            .attr("data-liste", liste)
            .attr("data-element_id", element_id)
            .attr("data-ziel_id", ziel_id);
        Schnittstelle_DomModalOeffnen($neues_modal);
        Liste_ElementFormularInitialisieren($neues_modal.find(".formular"), undefined, element_id, liste);
    } else {
        if ($("#" + ziel_id).exists()) dom.$ziel = $("#" + ziel_id);
        const ajax_dom = dom;

        if (!("bemerkung" in data)) data.bemerkung = Schnittstelle_VariableRausZurueck("bemerkung", element_id, liste, null);
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
        ajax_data.id = element_id;
        ajax_data.liste = liste;
        if (isEmptyString(ajax_data.bemerkung)) ajax_data.bemerkung = null;

        Schnittstelle_AjaxInDieSchlange(
            LISTEN[liste].controller + "/ajax_" + LISTEN[liste].element + "_bemerkung_aendern",
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

                if ("dom" in AJAX && "$ziel" in AJAX.dom && AJAX.dom.$ziel.exists() && liste !== AJAX.dom.$ziel.attr("data-liste"))
                    Liste_ElementAktualisieren(AJAX.dom.$ziel, AJAX.dom.$ziel.attr("data-liste"));

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) {
                    Schnittstelle_DomModalSchliessen(AJAX.dom.$modal);
                    Schnittstelle_DomToastFeuern("Bemerkung wurde erfolgreich geändert.");
                }
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                else if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_ElementFormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
                Schnittstelle_DomToastFeuern("Bemerkung konnte nicht geändert werden.", "danger");
            }
        );
    }
}

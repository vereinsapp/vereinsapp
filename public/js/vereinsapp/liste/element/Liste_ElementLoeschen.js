/**
 * @param {boolean} bestaetigung_einfordern
 * @param {Object} dom
 * @param {Object} data
 * @param {string} title
 * @param {string} liste
 */

function Liste_ElementLoeschen(bestaetigung_einfordern, dom, data, title, liste) {
    data.liste = liste;

    if (bestaetigung_einfordern)
        Schnittstelle_DomBestaetigungEinfordern(
            Liste_ElementTextMitBeschriftungErsetztZurueck("Willst du wirklich {" + liste + "} löschen?", {
                [LISTEN[liste].element + "_id"]: data[LISTEN[liste].element + "_id"],
            }),
            title,
            "btn_element_loeschen",
            data,
            "danger",
        );
    else {
        const ajax_dom = dom;
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());

        Schnittstelle_AjaxInDieSchlange(
            LISTEN[liste].controller + "/ajax_" + LISTEN[liste].element + "_loeschen",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                const liste = AJAX.data.liste;
                const element_id = AJAX.data[LISTEN[liste].element + "_id"];
                const toast_text = Liste_ElementTextMitBeschriftungErsetztZurueck("{" + liste + "} wurde gelöscht.", {
                    [LISTEN[liste].element + "_id"]: element_id,
                }); // Toast-Text zwischenspeichern, bevor Element gelöscht wird

                Schnittstelle_VariableLoeschen(element_id, liste);

                if ("dbdata" in AJAX.antwort && isArray(AJAX.antwort.dbdata))
                    $.each(AJAX.antwort.dbdata, function (position, element) {
                        if ("id" in element)
                            $.each(element, function (eigenschaft, wert) {
                                Schnittstelle_VariableRein(wert, eigenschaft, Number(element.id), liste);
                            });
                    });

                const weiterleiten = AJAX.data.weiterleiten;
                if (typeof weiterleiten !== "undefined") $(location).attr("href", SITE_URL + weiterleiten);
                else {
                    Schnittstelle_EventVariableUpdLocalstorage(liste);
                    Schnittstelle_EventLocalstorageUpdVariable(liste);
                    Schnittstelle_VariableElementZuordnen(liste);
                    Schnittstelle_VariableElementErgaenzen(liste);
                    Schnittstelle_EventVariableUpdDom(liste);

                    if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) Schnittstelle_Dom$ModalSchliessen(AJAX.dom.$modal);
                    Schnittstelle_DomToastFeuern(toast_text, "danger");
                }
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                Schnittstelle_DomToastFeuern(
                    Liste_ElementTextMitBeschriftungErsetztZurueck("{" + AJAX.data.liste + "} konnte nicht gelöscht werden.", {
                        [LISTEN[AJAX.data.liste].element + "_id"]: AJAX.data[LISTEN[AJAX.data.liste].element + "_id"],
                    }),
                );
            },
        );
    }
}

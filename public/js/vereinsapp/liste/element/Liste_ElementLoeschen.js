/**
 * @param {boolean} bestaetigt
 * @param {boolean} weiterleiten
 * @param {Object} dom
 * @param {string} modal_title
 * @param {Number} element_id
 * @param {string} liste
 */

function Liste_ElementLoeschen(bestaetigt, weiterleiten, dom, modal_title, element_id, liste) {
    if (!bestaetigt) {
        let werkzeug;
        if (typeof weiterleiten !== "undefined" && weiterleiten) werkzeug = "element_loeschen_weiterleiten";
        else werkzeug = "element_loeschen";

        Dom_BestaetigungEinfordern(
            Liste_ElementTextMitBeschriftungErsetztZurueck(TEXTE.element1_loeschen.bestaetigung, {
                element1: { liste: liste, [LISTEN[liste].element + "_id"]: element_id },
            }),
            modal_title,
            werkzeug,
            { weiterleiten: weiterleiten, liste: liste, [LISTEN[liste].element + "_id"]: element_id },
        );
    } else {
        const ajax_dom = dom;
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(new Object(), new Object());
        ajax_data.weiterleiten = weiterleiten;
        ajax_data[LISTEN[liste].element + "_id"] = element_id;
        ajax_data.liste = liste;

        Ajax_InDieSchlange(
            LISTEN[liste].controller + "/ajax_" + LISTEN[liste].element + "_loeschen",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                const liste = AJAX.data.liste;
                const element_id = AJAX.data[LISTEN[liste].element + "_id"];
                const toast_text = Liste_ElementTextMitBeschriftungErsetztZurueck(TEXTE.element1_loeschen.erfolg, {
                    element1: {
                        liste: liste,
                        [LISTEN[liste].element + "_id"]: element_id,
                    },
                }); // Toast-Text zwischenspeichern, bevor Element gelöscht wird

                Schnittstelle_VariableLoeschen(element_id, liste);

                if ("dbdata" in AJAX.antwort && isArray(AJAX.antwort.dbdata))
                    $.each(AJAX.antwort.dbdata, function (position, element) {
                        if ("id" in element)
                            $.each(element, function (eigenschaft, wert) {
                                Schnittstelle_VariableRein(wert, eigenschaft, Number(element.id), liste);
                            });
                    });

                Schnittstelle_EventVariableUpdLocalstorage(liste);
                Schnittstelle_EventLocalstorageUpdVariable(liste);
                Liste_VerknuepfungenZuordnen(liste);
                Schnittstelle_VariableElementErgaenzen(liste);
                Schnittstelle_EventVariableUpdDom(liste);

                const weiterleiten = AJAX.data.weiterleiten;
                if (typeof weiterleiten !== "undefined" && weiterleiten) $(location).attr("href", SITE_URL + AKTIVER_CONTROLLER);
                else {
                    if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) Dom_$ModalSchliessen(AJAX.dom.$modal);
                    Dom_ToastFeuern(toast_text, "danger");
                }
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Dom_ToastFeuern(AJAX.antwort.validation, "danger");
                Dom_ToastFeuern(
                    Liste_ElementTextMitBeschriftungErsetztZurueck(TEXTE.element1_loeschen.fehler, {
                        element1: {
                            liste: liste,
                            [LISTEN[liste].element + "_id"]: data[LISTEN[liste].element + "_id"],
                        },
                    }),
                );
            },
        );
    }
}

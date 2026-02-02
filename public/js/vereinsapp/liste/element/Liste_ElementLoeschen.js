function Liste_ElementLoeschen(bestaetigung_einfordern, dom, data, title, element_id, liste) {
    if (bestaetigung_einfordern)
        Schnittstelle_DomBestaetigungEinfordern(
            "Willst du wirklich " + Liste_ElementBeschriftungZurueck(element_id, liste) + " löschen?",
            title,
            "btn_element_loeschen",
            { liste: liste, [LISTEN[liste].element + "_id"]: element_id, weiterleiten: data.weiterleiten },
            "danger",
        );
    else {
        const ajax_dom = dom;
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
        ajax_data[LISTEN[liste].element + "_id"] = element_id;
        ajax_data.liste = liste;

        Schnittstelle_AjaxInDieSchlange(
            LISTEN[liste].controller + "/ajax_" + LISTEN[liste].element + "_loeschen",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                const liste = AJAX.data.liste;
                const element_id = AJAX.data[LISTEN[liste].element + "_id"];
                const beschriftung = Liste_ElementBeschriftungZurueck(element_id, liste); // Beschriftung speichern, bevor Element gelöscht wird

                Schnittstelle_VariableLoeschen(element_id, liste);

                const weiterleiten = AJAX.data.weiterleiten;
                if (typeof weiterleiten !== "undefined") $(location).attr("href", SITE_URL + weiterleiten);
                else {
                    Schnittstelle_EventVariableUpdDom(liste);

                    if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) Schnittstelle_Dom$ModalSchliessen(AJAX.dom.$modal);
                    Schnittstelle_DomToastFeuern(beschriftung + " wurde gelöscht.", "danger");
                }
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                Schnittstelle_DomToastFeuern(
                    Liste_ElementBeschriftungZurueck(AJAX.data[LISTEN[AJAX.data.liste].element + "_id"], AJAX.data.liste) +
                        " konnte nicht gelöscht werden.",
                    "danger",
                );
            },
        );
    }
}

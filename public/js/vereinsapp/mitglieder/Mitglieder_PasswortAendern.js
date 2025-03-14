function Mitglieder_PasswortAendern(dom, data, mitglied_id) {
    if (typeof mitglied_id !== "undefined") mitglied_id = Number(mitglied_id);

    if (!dom.$btn_ausloesend.hasClass("element")) Schnittstelle_BtnWartenStart(dom.$btn_ausloesend);

    const ajax_dom = dom;
    const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data);
    ajax_data.id = mitglied_id;

    Schnittstelle_AjaxInDieSchlange(
        "mitglieder/ajax_mitglied_passwort_aendern",
        ajax_data,
        ajax_dom,
        function (AJAX) {
            if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists()) AJAX.dom.$formular.find(".eingabe").val("");
            if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists() && !dom.$btn_ausloesend.hasClass("element"))
                Schnittstelle_BtnWartenEnde(AJAX.dom.$btn_ausloesend);
            Schnittstelle_DomToastFeuern("Du hast erfolgreich das Passwort geändert.");
        },
        function (AJAX) {
            if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists() && !dom.$btn_ausloesend.hasClass("element"))
                Schnittstelle_BtnWartenEnde(AJAX.dom.$btn_ausloesend);
            if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
            else if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                Liste_ElementFormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
        }
    );
}

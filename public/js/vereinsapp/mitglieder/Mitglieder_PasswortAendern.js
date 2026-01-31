function Mitglieder_PasswortAendern(dom, data, mitglied_id) {
    if (typeof mitglied_id !== "undefined") mitglied_id = Number(mitglied_id);

    const ajax_dom = dom;
    const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
    ajax_data.mitglied_id = mitglied_id;

    Schnittstelle_AjaxInDieSchlange(
        "mitglieder/ajax_mitglied_passwort_aendern",
        ajax_data,
        ajax_dom,
        function (AJAX) {
            if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists()) AJAX.dom.$formular.find(".eingabe").val("");
            Schnittstelle_DomToastFeuern("Du hast erfolgreich das Passwort geändert.");
        },
        function (AJAX) {
            if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
            else if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                Liste_ElementFormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
        },
    );
}

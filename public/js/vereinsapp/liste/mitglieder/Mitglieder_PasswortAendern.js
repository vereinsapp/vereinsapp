function Mitglieder_PasswortAendern(dom, data, mitglied_id) {
    if (typeof mitglied_id !== "undefined") mitglied_id = Number(mitglied_id);

    const ajax_dom = dom;
    const ajax_data = Util_WertBereinigtZurueck(data, new Object());
    ajax_data.mitglied_id = mitglied_id;

    Ajax_InDieSchlange(
        "mitglieder/ajax_mitglied_passwort_aendern",
        ajax_data,
        ajax_dom,
        function (AJAX) {
            if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists()) AJAX.dom.$formular.find(".eingabe").val("");
            Dom_ToastFeuern(Liste_ElementBeschriftungErsetztZurueck(WERKZEUGE.passwort_aendern.beschriftung.erfolg, new Object()));
        },
        function (AJAX) {
            if (isString(AJAX.antwort.validation)) Dom_ToastFeuern(AJAX.antwort.validation, "danger");
            else if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                Liste_Element$FormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
        },
    );
}

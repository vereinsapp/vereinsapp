function Mitglieder_PasswortFestlegen(dom, data, mitglied_id) {
    if (typeof mitglied_id !== "undefined") mitglied_id = Number(mitglied_id);

    const ajax_dom = dom;
    const ajax_data = Liste_WertBereinigtZurueck(data, new Object());
    ajax_data.mitglied_id = mitglied_id;

    Ajax_InDieSchlange(
        "mitglieder/ajax_mitglied_passwort_festlegen",
        ajax_data,
        ajax_dom,
        function (AJAX) {
            if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) Dom_$ModalSchliessen(AJAX.dom.$modal);
            Dom_ToastFeuern("Du hast erfolgreich ein neues Passwort festgelegt.");
        },
        function (AJAX) {
            if (isString(AJAX.antwort.validation)) Dom_ToastFeuern(AJAX.antwort.validation, "danger");
            else if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                Liste_Element$FormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
        },
    );
}

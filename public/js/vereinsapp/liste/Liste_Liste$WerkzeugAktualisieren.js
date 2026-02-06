/**
 * @param {JQuery} $werkzeug
 * @param {JQuery} $liste
 */

function Liste_Liste$WerkzeugAktualisieren($werkzeug, $liste) {
    switch ($werkzeug.attr("data-werkzeug")) {
        case "filtern_manip":
            FILTERN.$filtern_manip_aktualisieren_aktion($werkzeug);
            break;

        case "sortieren_manip":
            SORTIEREN.$sortieren_manip_aktualisieren_aktion($werkzeug);
            break;

        case "gruppieren_manip":
            GRUPPIEREN.$gruppieren_manip_aktualisieren_aktion($werkzeug);
            break;
        case "mitglied_erstellen":
        case "aufgabe_erstellen":
        case "aufgabe_zuordnen":
        case "termin_erstellen":
        case "strafe_erstellen":
        case "kassenbucheintrag_erstellen":
        case "titel_erstellen":
        case "titel_zuordnen":
            break;
    }
}

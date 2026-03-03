LISTEN.strafkatalog.element_erstellen_data_vervollstaendigen_aktion = function (data) {
    data = Util_WertBereinigtZurueck(data, new Object());

    if (!("bemerkung" in data) || isEmptyString(data.bemerkung)) data.bemerkung = null;

    return data;
};

LISTEN.strafkatalog.element_aendern_data_vervollstaendigen_aktion = function (data, strafe_id) {
    if (!("titel" in data)) data.titel = Liste_VariableRausZurueck("titel", strafe_id, "strafkatalog", undefined);
    if (!("wert" in data)) data.wert = Liste_VariableRausZurueck("wert", strafe_id, "strafkatalog", undefined);
    if (!("kategorie" in data)) data.kategorie = Liste_VariableRausZurueck("kategorie", strafe_id, "strafkatalog", undefined);
    if (!("bemerkung" in data)) data.bemerkung = Liste_VariableRausZurueck("bemerkung", strafe_id, "strafkatalog", null);

    data = Util_WertBereinigtZurueck(data, new Object());

    if (isEmptyString(data.bemerkung)) data.bemerkung = null;
    return data;
};

WERKZEUGE.strafe_erstellen.aktualisieren_aktion = WERKZEUGE_ERSTELLEN_AKTUALISIEREN_AKTION;

function Strafkatalog_Init() {
    // STRAFE ERSTELLEN / DUPLIZIEREN
    $(document).on("click", '.werkzeug[werkzeug="strafe_erstellen"], .werkzeug[werkzeug="strafe_duplizieren"]', function () {
        Liste_ElementErstellen(
            $(this).hasClass("data_vollstaendig"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Util_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            Util_WertBereinigtZurueck($(this).attr("strafe_id"), undefined),
            "strafkatalog",
        );
    });

    // STRAFE ÄNDERN
    $(document).on("click", '.werkzeug[werkzeug="strafe_aendern"]', function () {
        Liste_ElementAendern(
            $(this).hasClass("data_vollstaendig"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Util_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            Util_WertBereinigtZurueck($(this).attr("strafe_id"), undefined),
            "strafkatalog",
        );
    });

    // STRAFEN ZUWEISEN (MODAL) ÖFFNEN
    $(document).on("click", '.werkzeug[werkzeug="strafen_zuweisen"]', function () {
        Liste_VerknuepfungenModalOeffnen(
            "strafen_zuweisen_modal",
            "strafen_zuweisen",
            Util_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            {
                strafe_id: Util_WertBereinigtZurueck($(this).attr("strafe_id"), undefined),
                mitglied_id: Util_WertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
            },
            "strafkatalog_zugewiesene_strafen",
        );
    });

    // ZUGEWIESENE STRAFE ERSTELLEN
    $(document).on("click", '.werkzeug[werkzeug="strafkatalog_zugewiesene_strafe_erstellen"]', function () {
        Liste_VerknuepfungErstellen(
            $(this).hasClass("bestaetigt"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal") },
            {
                strafe_id: Util_WertBereinigtZurueck($(this).attr("strafe_id"), undefined),
                mitglied_id: Util_WertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
                status: 1,
            },
            Util_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            "strafkatalog_zugewiesene_strafen",
        );
    });
}

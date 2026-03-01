WERKZEUGE.strafe_erstellen.aktualisieren_aktion = WERKZEUGE_ERSTELLEN_AKTUALISIEREN_AKTION;

function Strafkatalog_Init() {
    // STRAFE ERSTELLEN / DUPLIZIEREN
    $(document).on("click", '.werkzeug[data-werkzeug="strafe_erstellen"], .werkzeug[data-werkzeug="strafe_duplizieren"]', function () {
        Strafkatalog_StrafeErstellen(
            $(this).hasClass("data_vollstaendig"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-modal_title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-strafe_id"), undefined),
        );
    });

    // STRAFE ÄNDERN
    $(document).on("click", '.werkzeug[data-werkzeug="strafe_aendern"]', function () {
        Strafkatalog_StrafeAendern(
            $(this).hasClass("data_vollstaendig"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-modal_title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-strafe_id"), undefined),
        );
    });

    // STRAFEN ZUWEISEN (MODAL) ÖFFNEN
    $(document).on("click", '.werkzeug[data-werkzeug="strafen_zuweisen"]', function () {
        Liste_VerknuepfungenModalOeffnen(
            "strafen_zuweisen_modal",
            "strafen_zuweisen",
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-modal_title"), undefined),
            {
                strafe_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-strafe_id"), undefined),
                mitglied_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
            },
            "strafkatalog_zugewiesene_strafen",
        );
    });

    // ZUGEWIESENE STRAFE ERSTELLEN
    $(document).on("click", '.werkzeug[data-werkzeug="strafkatalog_zugewiesene_strafe_erstellen"]', function () {
        Liste_VerknuepfungErstellen(
            $(this).hasClass("bestaetigt"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal") },
            {
                strafe_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-strafe_id"), undefined),
                mitglied_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
                status: 1,
            },
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-modal_title"), undefined),
            "strafkatalog_zugewiesene_strafen",
        );
    });
}

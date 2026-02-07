ELEMENTE.kassenbucheintrag.ergaenzen_aktion = function (kassenbucheintrag) {
    if (kassenbucheintrag.erledigt !== null) kassenbucheintrag.erledigt_janein = true;
    else kassenbucheintrag.erledigt_janein = false;

    kassenbucheintrag.mitglied =
        Schnittstelle_VariableRausZurueck("vorname", kassenbucheintrag.mitglied_id, "mitglieder", undefined) +
        " " +
        Schnittstelle_VariableRausZurueck("nachname", kassenbucheintrag.mitglied_id, "mitglieder", undefined);
};

WERKZEUGE.strafe_erstellen.aktualisieren_aktion = WERKZEUGE_ERSTELLEN_AKTUALISIEREN_AKTION;
WERKZEUGE.kassenbucheintrag_erstellen.aktualisieren_aktion = WERKZEUGE_ERSTELLEN_AKTUALISIEREN_AKTION;

function Strafkatalog_Init() {
    // STRAFE ERSTELLEN
    $(document).on("click", ".btn_strafe_erstellen", function () {
        Strafkatalog_StrafeErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            undefined,
        );
    });

    // STRAFE ÄNDERN
    $(document).on("click", ".btn_strafe_aendern", function () {
        Strafkatalog_StrafeAendern(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-strafe_id"), undefined),
        );
    });

    // STRAFE DUPLIZIEREN
    $(document).on("click", ".btn_strafe_duplizieren", function () {
        Strafkatalog_StrafeErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-strafe_id"), undefined),
        );
    });

    // STRAFE ZUWEISEN
    $(document).on("click", ".btn_strafe_zuweisen", function () {
        Strafkatalog_StrafeZuweisen(
            $(this).hasClass("auswahl_einfordern"),
            $(this).hasClass("bestaetigung_einfordern"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal") },
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-strafe_id"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-liste"), undefined),
        );
    });

    // KASSENBUCHEINTRAG ERSTELLEN
    $(document).on("click", ".btn_kassenbucheintrag_erstellen", function () {
        Strafkatalog_KassenbucheintragErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            undefined,
        );
    });

    // KASSENBUCHEINTRAG ÄNDERN
    $(document).on("click", ".btn_kassenbucheintrag_aendern", function () {
        Strafkatalog_KassenbucheintragAendern(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-kassenbucheintrag_id"), undefined),
        );
    });

    // KASSENBUCHEINTRAG DUPLIZIEREN
    $(document).on("click", ".btn_kassenbucheintrag_duplizieren", function () {
        Strafkatalog_KassenbucheintragErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-kassenbucheintrag_id"), undefined),
        );
    });

    // KASSENBUCHEINTRAG ALS OFEN/ERLEDIGT MARKIEREN
    $(document).on("click", ".btn_kassenbucheintrag_offen_erledigt_markieren", function () {
        Strafkatalog_KassenbucheintragOffenErledigtMarkieren(
            $(this).hasClass("bestaetigung_einfordern"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal") },
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-kassenbucheintrag_id"), undefined),
        );
    });

    // OFFENE KASSENBUCHEINTRÄGE VERWALTEN (MODAL) ÖFFNEN
    $(document).on("click", ".btn_offene_kassenbucheintraege_verwalten", function () {
        Strafkatalog_OffeneKassenbucheintraegeVerwalten(
            "offene_kassenbucheintraege_verwalten_modal",
            "offene_kassenbucheintraege_verwalten",
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
        );
    });
}

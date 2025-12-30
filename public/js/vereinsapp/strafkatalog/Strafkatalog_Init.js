ELEMENTE.kassenbucheintrag.ergaenzen_aktion = function (kassenbucheintrag) {
    if (kassenbucheintrag.erledigt !== null) kassenbucheintrag.erledigt_janein = true;
    else kassenbucheintrag.erledigt_janein = false;
};

ELEMENTE.kassenbucheintrag.ergaenzen_aktion = function (kassenbucheintrag) {
    if ("mitglied_id" in kassenbucheintrag)
        kassenbucheintrag.mitglied =
            Schnittstelle_VariableRausZurueck("vorname", kassenbucheintrag.mitglied_id, "mitglieder", undefined) +
            " " +
            Schnittstelle_VariableRausZurueck("nachname", kassenbucheintrag.mitglied_id, "mitglieder", undefined);
};

function Strafkatalog_Init() {
    // STRAFE ERSTELLEN
    $(document).on("click", ".btn_strafe_erstellen", function () {
        Strafkatalog_StrafeErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            undefined
        );
    });

    // STRAFE ÄNDERN
    $(document).on("click", ".btn_strafe_aendern", function () {
        Strafkatalog_StrafeAendern(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // STRAFE DUPLIZIEREN
    $(document).on("click", ".btn_strafe_duplizieren", function () {
        Strafkatalog_StrafeErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // STRAFE ZUWEISEN
    $(document).on("click", ".btn_strafe_zuweisen", function () {
        Strafkatalog_StrafeZuweisen(
            $(this).hasClass("auswahl_einfordern"),
            $(this).hasClass("bestaetigung_einfordern"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal") },
            { gegen_liste: $(this).attr("data-gegen_liste"), gegen_element_id: $(this).attr("data-gegen_element_id") },
            $(this).attr("data-title"),
            $(this).attr("data-element_id"),
            $(this).attr("data-liste")
        );
    });

    // KASSENBUCHEINTRAG ERSTELLEN
    $(document).on("click", ".btn_kassenbucheintrag_erstellen", function () {
        Strafkatalog_KassenbucheintragErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            undefined
        );
    });

    // KASSENBUCHEINTRAG ÄNDERN
    $(document).on("click", ".btn_kassenbucheintrag_aendern", function () {
        Strafkatalog_KassenbucheintragAendern(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // KASSENBUCHEINTRAG DUPLIZIEREN
    $(document).on("click", ".btn_kassenbucheintrag_duplizieren", function () {
        Strafkatalog_KassenbucheintragErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // KASSENBUCHEINTRAG ALS OFEN/ERLEDIGT MARKIEREN
    $(document).on("click", ".btn_kassenbucheintrag_offen_erledigt_markieren", function () {
        Strafkatalog_KassenbucheintragOffenErledigtMarkieren(
            $(this).hasClass("bestaetigung_einfordern"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal") },
            $(this).attr("data-title"),
            $(this).attr("data-kassenbucheintrag_id")
        );
    });

    // OFFENE KASSENBUCHEINTRÄGE VERWALTEN (MODAL) ÖFFNEN
    $(document).on("click", ".btn_offene_kassenbucheintraege_verwalten", function () {
        Strafkatalog_OffeneKassenbucheintraegeVerwalten(
            "offene_kassenbucheintraege_verwalten_modal",
            "offene_kassenbucheintraege_verwalten",
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-element_id"), undefined)
        );
    });
}

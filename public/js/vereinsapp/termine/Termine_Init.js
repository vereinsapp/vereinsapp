ELEMENTE.termin.ergaenzen_aktion = function (termin) {
    if ("rueckmeldungen" in LISTEN) {
        termin["ich_rueckmeldung_id"] = Liste_ElementIdZurueck(
            [
                { liste: "termine", element_id: Number(termin["id"]) },
                { liste: "mitglieder", element_id: Number(ICH["id"]) },
            ],
            "rueckmeldungen"
        );
        if (typeof termin["ich_rueckmeldung_id"] === "undefined") termin["ich_rueckgemeldet"] = false;
        else termin["ich_rueckgemeldet"] = true;
    }

    termin["ich_eingeladen"] = false;
    if ("filtern_mitglieder" in termin) termin["filtern_mitglieder"] = Schnittstelle_VariableObjektBereinigtZurueck(termin["filtern_mitglieder"]);
    else termin["filtern_mitglieder"] = new Object();
    let termin_kategorie_filtern_mitglieder;
    if (termin["kategorie"] in TERMINE_KATEGORIE_FILTERN_MITGLIEDER)
        termin_kategorie_filtern_mitglieder = Schnittstelle_VariableObjektBereinigtZurueck(TERMINE_KATEGORIE_FILTERN_MITGLIEDER[termin["kategorie"]]);
    else termin_kategorie_filtern_mitglieder = new Object();
    $.each(
        Liste_TabelleGefiltertZurueck(
            Liste_FilternMitPrioKombiniertZurueck(termin_kategorie_filtern_mitglieder, termin["filtern_mitglieder"], "mitglieder"),
            LISTEN.mitglieder.tabelle,
            "mitglieder"
        ),
        function () {
            if (this["id"] == ICH["id"]) termin["ich_eingeladen"] = true;
            return;
        }
    );
};

function Termine_Init() {
    EVENT_VARIABLE_UPD_DOM_MODULE["rueckmeldungen"] = [
        function () {
            // FORMULAR MEINE RÜCKMELDUNG EIN-/AUSBLENDEN
            $(".rueckmeldung_eingeladen").each(function () {
                Termine_RueckmeldungEinAusblenden($(this));
            });

            // RÜCKMELDUNG AKTUALISIEREN
            $(".zusagen, .absagen").each(function () {
                Termine_RueckmeldungAktualisieren($(this));
            });
        },
    ];

    // TERMIN ERSTELLEN
    $(document).on("click", ".btn_termin_erstellen", function () {
        Termine_TerminErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $btn_ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            undefined
        );
    });

    // TERMIN ÄNDERN
    $(document).on("click", ".btn_termin_aendern", function () {
        Termine_TerminAendern(
            $(this).hasClass("formular_oeffnen"),
            { $btn_ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // TERMIN DUPLIZIEREN
    $(document).on("click", ".btn_termin_duplizieren", function () {
        Termine_TerminErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $btn_ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // TERMIN LÖSCHEN
    $(document).on("click", ".btn_termin_loeschen", function () {
        Liste_ElementLoeschen(
            $(this).hasClass("bestaetigung_einfordern"),
            { $btn_ausloesend: $(this), $modal: $(this).closest(".modal") },
            { weiterleiten: $(this).attr("data-weiterleiten") },
            $(this).attr("data-title"),
            $(this).attr("data-element_id"),
            "termine"
        );
    });

    // TERMINE ALS CSV-DATEI EXPORTIEREN
    $(document).on("click", ".btn_termine_csv_export", function () {
        Liste_CsvExport(
            $(this).hasClass("bestaetigung_einfordern"),
            { $btn_ausloesend: $(this), $modal: $(this).closest(".modal") },
            $(this).attr("data-title"),
            $(this).attr("data-instanz"),
            "termine"
        );
    });

    // RÜCKMELDUNG ERSTELLEN
    $(document).on("click", ".btn_rueckmeldung_erstellen", function () {
        Termine_RueckmeldungErstellen(
            false,
            { $btn_ausloesend: $(this) },
            {
                termin_id: JSON.parse($(this).attr("data-werte")).termin_id,
                mitglied_id: JSON.parse($(this).attr("data-werte")).mitglied_id,
                status: JSON.parse($(this).attr("data-werte")).status,
                bemerkung: "",
            },
            $(this).attr("data-title"),
            undefined
        );
    });

    // RÜCKMELDUNG ÄNDERN
    $(document).on("click", ".btn_rueckmeldung_aendern", function () {
        Termine_RueckmeldungAendern(
            false,
            { $btn_ausloesend: $(this) },
            {
                status: JSON.parse($(this).attr("data-werte")).status,
                bemerkung: "",
            },
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // RÜCKMELDUNG DETAILLIEREN
    $(document).on("click", ".btn_rueckmeldung_detaillieren", function () {
        Termine_RueckmeldungDetaillieren(
            $(this).hasClass("formular_oeffnen"),
            { $btn_ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // RÜCKMELDUNG LÖSCHEN
    $(document).on("click", ".btn_rueckmeldung_loeschen", function () {
        Liste_ElementLoeschen(
            $(this).hasClass("bestaetigung_einfordern"),
            { $btn_ausloesend: $(this), $modal: $(this).closest(".modal") },
            { weiterleiten: $(this).attr("data-weiterleiten") },
            $(this).attr("data-title"),
            $(this).attr("data-element_id"),
            "rueckmeldungen"
        );
    });

    // ANWESENHEITEN DOKUMENTIEREN (MODAL) ÖFFNEN
    $(document).on("click", ".btn_anwesenheiten_dokumentieren", function () {
        const liste = $(this).attr("data-liste");
        const element_id = $(this).attr("data-element_id");
        const title = $(this).attr("data-title");

        let gegen_liste = $(this).attr("data-gegen_liste");
        if (typeof gegen_liste === "undefined" && liste == "termine") gegen_liste = "mitglieder";
        else if (typeof gegen_liste === "undefined" && liste == "mitglieder") gegen_liste = "termine";

        const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, liste + "_anwesenheiten_dokumentieren");
        $neues_modal.find("#anwesenheiten_dokumentieren.liste").attr("data-gegen_liste", liste).attr("data-gegen_element_id", element_id);
        Schnittstelle_DomModalOeffnen($neues_modal);
        Schnittstelle_EventAusfuehren(Schnittstelle_EventVariableUpdDom, { liste: gegen_liste });
    });
}

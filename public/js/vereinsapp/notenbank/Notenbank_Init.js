ELEMENTE.notenbank_setlisteneintrag.zuordnen_aktion = function (setlisteneintrag) {
    const setlisteneintrag_id = setlisteneintrag.id;

    if ("notenbank" in LISTEN) {
        const titel_id = Schnittstelle_VariableRausZurueck("titel_id", setlisteneintrag_id, "notenbank_setliste", undefined);

        if (typeof titel_id !== "undefined") {
            const titel = LISTEN.notenbank.tabelle[titel_id];

            if (typeof titel !== "undefined") {
                if (!("zugeordnete_notenbank_setlisteneintrag_ids" in titel))
                    LISTEN.notenbank.tabelle[titel_id].zugeordnete_notenbank_setlisteneintrag_ids = [setlisteneintrag_id];
                else if (!titel.zugeordnete_notenbank_setlisteneintrag_ids.includes(setlisteneintrag_id))
                    LISTEN.notenbank.tabelle[titel_id].zugeordnete_notenbank_setlisteneintrag_ids.push(setlisteneintrag_id);
            }
        }
    }

    if ("termine" in LISTEN) {
        const termin_id = Schnittstelle_VariableRausZurueck("termin_id", setlisteneintrag_id, "notenbank_setliste", undefined);

        if (typeof termin_id !== "undefined") {
            const termin = LISTEN.termine.tabelle[termin_id];

            if (typeof termin !== "undefined") {
                if (!("zugeordnete_notenbank_setlisteneintrag_ids" in termin))
                    LISTEN.termine.tabelle[termin_id].zugeordnete_notenbank_setlisteneintrag_ids = [setlisteneintrag_id];
                else if (!termin.zugeordnete_notenbank_setlisteneintrag_ids.includes(setlisteneintrag_id))
                    LISTEN.termine.tabelle[termin_id].zugeordnete_notenbank_setlisteneintrag_ids.push(setlisteneintrag_id);
            }
        }
    }

    if ("notenbank" in LISTEN && "termine" in LISTEN) {
        const titel_id = Schnittstelle_VariableRausZurueck("titel_id", setlisteneintrag_id, "notenbank_setliste", undefined);
        const termin_id = Schnittstelle_VariableRausZurueck("termin_id", setlisteneintrag_id, "notenbank_setliste", undefined);

        if (typeof titel_id !== "undefined" && typeof termin_id !== "undefined") {
            const titel = LISTEN.notenbank.tabelle[titel_id];
            const termin = LISTEN.termine.tabelle[termin_id];

            if (typeof titel !== "undefined") {
                if (!("zugeordnete_termin_ids_via_notenbank_setliste" in titel))
                    LISTEN.notenbank.tabelle[titel_id].zugeordnete_termin_ids_via_notenbank_setliste = [termin_id];
                else if (!titel.zugeordnete_termin_ids_via_notenbank_setliste.includes(termin_id))
                    LISTEN.notenbank.tabelle[titel_id].zugeordnete_termin_ids_via_notenbank_setliste.push(termin_id);
            }

            if (typeof termin !== "undefined") {
                if (!("zugeordnete_titel_ids_via_notenbank_setliste" in termin))
                    LISTEN.termine.tabelle[termin_id].zugeordnete_titel_ids_via_notenbank_setliste = [titel_id];
                else if (!termin.zugeordnete_titel_ids_via_notenbank_setliste.includes(titel_id))
                    LISTEN.termine.tabelle[termin_id].zugeordnete_titel_ids_via_notenbank_setliste.push(titel_id);
            }
        }
    }
};

ELEMENTE.titel.ergaenzen_aktion = function (titel) {
    titel["anzahl_noten"] = 0;
    $.each(NOTENBANK_ERLAUBTE_DATEITYPEN_NOTEN, function (index, typ) {
        titel["anzahl_noten"] += Liste_VerzeichnisAnzahlZurueck(titel["verzeichnis"], typ);
    });

    titel["anzahl_audio"] = 0;
    $.each(NOTENBANK_ERLAUBTE_DATEITYPEN_AUDIO, function (index, typ) {
        titel["anzahl_audio"] += Liste_VerzeichnisAnzahlZurueck(titel["verzeichnis"], typ);
    });

    titel["anzahl_verzeichnis"] = Liste_VerzeichnisAnzahlZurueck(titel["verzeichnis"]);
};

function Notenbank_Init() {
    // TITEL ERSTELLEN
    $(document).on("click", ".btn_titel_erstellen", function () {
        Notenbank_TitelErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            undefined
        );
    });

    // TITEL ÄNDERN
    $(document).on("click", ".btn_titel_aendern", function () {
        Notenbank_TitelAendern(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // TITEL DUPLIZIEREN
    $(document).on("click", ".btn_titel_duplizieren", function () {
        Notenbank_TitelErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // SETLISTE VERWALTEN (MODAL) ÖFFNEN
    $(document).on("click", ".btn_setliste_verwalten", function () {
        Liste_VerknuepfungenModalOeffnen(
            "setliste_verwalten_modal",
            "setliste_verwalten",
            $(this).attr("data-title"),
            $(this).attr("data-element_id"),
            "termine"
        );
    });

    // SETLISTE VERWALTEN
    $(document).on("change", '.chk_verknuepfung_erstellen[data-verknuepfungen="notenbank_setliste"]', function () {
        Liste_VerknuepfungErstellen(
            { $ausloesend: $(this) },
            {
                verknuepfungen: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-verknuepfungen"), undefined),
                liste: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-liste"), undefined),
                element_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-element_id"), undefined),
                gegen_liste: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-gegen_liste"), undefined),
                gegen_element_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-gegen_element_id"), undefined),
                status: Number($(this).is(":checked")),
                // bemerkung: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-bemerkung"), null),
            }
        );
    });
}

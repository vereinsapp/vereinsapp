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

ELEMENTE.notenbank_setlisteneintrag.ergaenzen_aktion = function (setlisteneintrag) {
    if ("titel_id" in setlisteneintrag)
        setlisteneintrag.titel_titel = Schnittstelle_VariableRausZurueck("titel", setlisteneintrag.titel_id, "notenbank", undefined);
    if ("titel_id" in setlisteneintrag)
        setlisteneintrag.titel_titel_nr = Schnittstelle_VariableRausZurueck("titel_nr", setlisteneintrag.titel_id, "notenbank", undefined);
    if ("titel_id" in setlisteneintrag)
        setlisteneintrag.titel_kategorie = Schnittstelle_VariableRausZurueck("kategorie", setlisteneintrag.titel_id, "notenbank", undefined);
    if ("titel_id" in setlisteneintrag)
        setlisteneintrag.titel_komponist = Schnittstelle_VariableRausZurueck("komponist", setlisteneintrag.titel_id, "notenbank", undefined);
    if ("titel_id" in setlisteneintrag)
        setlisteneintrag.titel_anzahl_noten = Schnittstelle_VariableRausZurueck("anzahl_noten", setlisteneintrag.titel_id, "notenbank", undefined);
    if ("titel_id" in setlisteneintrag)
        setlisteneintrag.titel_anzahl_audio = Schnittstelle_VariableRausZurueck("anzahl_audio", setlisteneintrag.titel_id, "notenbank", undefined);
    if ("titel_id" in setlisteneintrag)
        setlisteneintrag.titel_anzahl_verzeichnis = Schnittstelle_VariableRausZurueck(
            "anzahl_verzeichnis",
            setlisteneintrag.titel_id,
            "notenbank",
            undefined,
        );
    if ("termin_id" in setlisteneintrag)
        setlisteneintrag.termin_start = Schnittstelle_VariableRausZurueck("start", setlisteneintrag.termin_id, "termine", undefined);
    if ("termin_id" in setlisteneintrag)
        setlisteneintrag.termin_titel = Schnittstelle_VariableRausZurueck("titel", setlisteneintrag.termin_id, "termine", undefined);
};

WERKZEUGE.titel_erstellen.aktualisieren_aktion = WERKZEUGE_ERSTELLEN_AKTUALISIEREN_AKTION;
WERKZEUGE.setliste_verwalten.aktualisieren_aktion = WERKZEUGE_ERSTELLEN_AKTUALISIEREN_AKTION;

function Notenbank_Init() {
    // TITEL ERSTELLEN
    $(document).on("click", ".btn_titel_erstellen", function () {
        Notenbank_TitelErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            undefined,
        );
    });

    // TITEL ÄNDERN
    $(document).on("click", ".btn_titel_aendern", function () {
        Notenbank_TitelAendern(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-titel_id"), undefined),
        );
    });

    // TITEL DUPLIZIEREN
    $(document).on("click", ".btn_titel_duplizieren", function () {
        Notenbank_TitelErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-titel_id"), undefined),
        );
    });

    // SETLISTE VERWALTEN (MODAL) ÖFFNEN
    $(document).on("click", ".btn_setliste_verwalten", function () {
        Liste_VerknuepfungenModalOeffnen(
            "setliste_verwalten_modal",
            "setliste_verwalten",
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            {
                titel_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-titel_id"), undefined),
                termin_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-termin_id"), undefined),
            },
            "notenbank_setliste",
        );
    });

    // SETLISTE VERWALTEN
    $(document).on("change", '.chk_verknuepfung_erstellen[data-verknuepfungen="notenbank_setliste"]', function () {
        Liste_VerknuepfungErstellen(
            { $ausloesend: $(this) },
            {
                titel_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-titel_id"), undefined),
                termin_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-termin_id"), undefined),
                status: Number($(this).is(":checked")),
            },
            "notenbank_setliste",
        );
    });

    $('.sortable[data-liste="notenbank_setliste"]').on("sortupdate update", function (event, ui) {
        Liste_VerknuepfungStatusAendern(
            { $ausloesend: ui.item },
            ui.item.index() + 1,
            ui.item.attr("data-notenbank_setlisteneintrag_id"),
            "notenbank_setliste",
        );
    });
}

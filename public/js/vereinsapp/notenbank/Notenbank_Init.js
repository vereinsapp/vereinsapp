LISTEN.notenbank.element_ergaenzen_aktion = function (titel) {
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

LISTEN.notenbank_setliste.element_ergaenzen_aktion = function (setlisteneintrag) {
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
    // TITEL ERSTELLEN / DUPLIZIEREN
    $(document).on("click", '.werkzeug[werkzeug="titel_erstellen"], .werkzeug[werkzeug="titel_duplizieren"]', function () {
        Notenbank_TitelErstellen(
            $(this).hasClass("data_vollstaendig"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("modal_title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("titel_id"), undefined),
        );
    });

    // TITEL ÄNDERN
    $(document).on("click", '.werkzeug[werkzeug="titel_aendern"]', function () {
        Notenbank_TitelAendern(
            $(this).hasClass("data_vollstaendig"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("modal_title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("titel_id"), undefined),
        );
    });

    // SETLISTE VERWALTEN (MODAL) ÖFFNEN
    $(document).on("click", '.werkzeug[werkzeug="setliste_verwalten"]', function () {
        Liste_VerknuepfungenModalOeffnen(
            "setliste_verwalten_modal",
            "setliste_verwalten",
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("modal_title"), undefined),
            {
                titel_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("titel_id"), undefined),
                termin_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("termin_id"), undefined),
            },
            "notenbank_setliste",
        );
    });

    // SETLISTE VERWALTEN
    $(document).on("click", '.werkzeug[werkzeug="notenbank_setlisteneintrag_erstellen"]', function () {
        Liste_VerknuepfungErstellen(
            $(this).hasClass("bestaetigt"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal") },
            {
                titel_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("titel_id"), undefined),
                termin_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("termin_id"), undefined),
                status: 1,
            },
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("modal_title"), undefined),
            "notenbank_setliste",
        );
    });

    $('.sortable[liste="notenbank_setliste"]').on("sortupdate update", function (event, ui) {
        Liste_VerknuepfungStatusAendern(
            { $werkzeug: ui.item },
            ui.item.index() + 1,
            ui.item.attr("notenbank_setlisteneintrag_id"),
            "notenbank_setliste",
        );
    });
}

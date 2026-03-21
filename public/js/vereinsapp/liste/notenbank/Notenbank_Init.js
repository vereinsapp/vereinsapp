LISTEN.notenbank.element_erstellen_data_vervollstaendigen_aktion = function (data) {
    data = Util_WertBereinigtZurueck(data, new Object());

    if (!("komponist" in data) || isEmptyString(data.komponist)) data.komponist = null;
    if (!("bemerkung" in data) || isEmptyString(data.bemerkung)) data.bemerkung = null;

    return data;
};

LISTEN.notenbank.element_aendern_data_vervollstaendigen_aktion = function (data, titel_id) {
    if (!("titel" in data)) data.titel = Liste_VariableRausZurueck("titel", titel_id, "notenbank", undefined);
    if (!("titel_nr" in data)) data.titel_nr = Liste_VariableRausZurueck("titel_nr", titel_id, "notenbank", undefined);
    if (!("kategorie" in data)) data.kategorie = Liste_VariableRausZurueck("kategorie", titel_id, "notenbank", undefined);
    if (!("komponist" in data)) data.komponist = Liste_VariableRausZurueck("komponist", titel_id, "notenbank", null);
    if (!("bemerkung" in data)) data.bemerkung = Liste_VariableRausZurueck("bemerkung", titel_id, "notenbank", null);

    data = Util_WertBereinigtZurueck(data, new Object());

    if (isEmptyString(data.komponist)) data.komponist = null;
    if (isEmptyString(data.bemerkung)) data.bemerkung = null;

    return data;
};

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
        setlisteneintrag.titel_titel = Liste_VariableRausZurueck("titel", setlisteneintrag.titel_id, "notenbank", undefined);
    if ("titel_id" in setlisteneintrag)
        setlisteneintrag.titel_titel_nr = Liste_VariableRausZurueck("titel_nr", setlisteneintrag.titel_id, "notenbank", undefined);
    if ("titel_id" in setlisteneintrag)
        setlisteneintrag.titel_kategorie = Liste_VariableRausZurueck("kategorie", setlisteneintrag.titel_id, "notenbank", undefined);
    if ("titel_id" in setlisteneintrag)
        setlisteneintrag.titel_komponist = Liste_VariableRausZurueck("komponist", setlisteneintrag.titel_id, "notenbank", undefined);
    if ("titel_id" in setlisteneintrag)
        setlisteneintrag.titel_anzahl_noten = Liste_VariableRausZurueck("anzahl_noten", setlisteneintrag.titel_id, "notenbank", undefined);
    if ("titel_id" in setlisteneintrag)
        setlisteneintrag.titel_anzahl_audio = Liste_VariableRausZurueck("anzahl_audio", setlisteneintrag.titel_id, "notenbank", undefined);
    if ("titel_id" in setlisteneintrag)
        setlisteneintrag.titel_anzahl_verzeichnis = Liste_VariableRausZurueck(
            "anzahl_verzeichnis",
            setlisteneintrag.titel_id,
            "notenbank",
            undefined,
        );
    if ("termin_id" in setlisteneintrag)
        setlisteneintrag.termin_start = Liste_VariableRausZurueck("start", setlisteneintrag.termin_id, "termine", undefined);
    if ("termin_id" in setlisteneintrag)
        setlisteneintrag.termin_titel = Liste_VariableRausZurueck("titel", setlisteneintrag.termin_id, "termine", undefined);
};

WERKZEUGE.setliste_verwalten.aktualisieren_aktion = WERKZEUGE.element_erstellen.aktualisieren_aktion;

function Notenbank_Init() {
    // SETLISTE VERWALTEN (MODAL) ÖFFNEN
    $(document).on("click", '.werkzeug[werkzeug="setliste_verwalten"]', function () {
        Liste_VerknuepfungenModalOeffnen(
            "setliste_verwalten_modal",
            "setliste_verwalten",
            Util_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            {
                titel_id: Util_WertBereinigtZurueck($(this).attr("titel_id"), undefined),
                termin_id: Util_WertBereinigtZurueck($(this).attr("termin_id"), undefined),
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
                titel_id: Util_WertBereinigtZurueck($(this).closest(".element").attr("titel_id"), undefined),
                termin_id: Util_WertBereinigtZurueck($(this).closest(".element").attr("termin_id"), undefined),
                status: 1,
            },
            Util_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
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

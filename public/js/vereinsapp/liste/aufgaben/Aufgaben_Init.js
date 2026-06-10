LISTEN.aufgaben.element_erstellen_data_vervollstaendigen_aktion = function (data) {
    data = Util_WertBereinigtZurueck(data, new Object());

    if (!("max_anzahl_mitglieder" in data) || isEmptyString(data.max_anzahl_mitglieder)) data.max_anzahl_mitglieder = null;
    if (!("bemerkung" in data) || isEmptyString(data.bemerkung)) data.bemerkung = null;

    return data;
};

LISTEN.aufgaben.element_aendern_data_vervollstaendigen_aktion = function (data, aufgabe_id) {
    if (!("titel" in data)) data.titel = Liste_ElementWertRausZurueck("titel", aufgabe_id, "aufgaben", undefined);
    if (!("max_anzahl_mitglieder" in data))
        data.max_anzahl_mitglieder = Liste_ElementWertRausZurueck("max_anzahl_mitglieder", aufgabe_id, "aufgaben", null);
    if (!("bemerkung" in data)) data.bemerkung = Liste_ElementWertRausZurueck("bemerkung", aufgabe_id, "aufgaben", null);

    data = Util_WertBereinigtZurueck(data, new Object());

    if (isEmptyString(data.max_anzahl_mitglieder)) data.max_anzahl_mitglieder = null;
    if (isEmptyString(data.bemerkung)) data.bemerkung = null;

    return data;
};

WERKZEUGE.termine_aufgaben_zuordnen.aktualisieren_aktion = WERKZEUGE.element_erstellen.aktualisieren_aktion;

ZUSATZSYMBOLE.aufgaben_rueckmeldungen = new Object();
ZUSATZSYMBOLE.aufgaben_rueckmeldungen.aktualisieren_aktion = ZUSATZSYMBOLE_VERKNUEPFUNGEN_AKTUALISIEREN_AKTION;

ZUSATZSYMBOLE.aufgaben_zuordnungen_termine = new Object();
ZUSATZSYMBOLE.aufgaben_zuordnungen_termine.aktualisieren_aktion = ZUSATZSYMBOLE_VERKNUEPFUNGEN_AKTUALISIEREN_AKTION;

function Aufgaben_Init() {
    // RUECKMELDUNGEN VERWALTEN (MODAL) ÖFFNEN
    $(document).on("click", '.werkzeug[werkzeug="aufgaben_rueckmeldungen_verwalten"]', function () {
        Liste_VerknuepfungenModalOeffnen(
            "aufgaben_rueckmeldungen_verwalten_modal",
            "aufgaben_rueckmeldungen_verwalten",
            Util_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            {
                aufgabe_id: Util_WertBereinigtZurueck($(this).attr("aufgabe_id"), undefined),
                mitglied_id: Util_WertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
            },
            "aufgaben_rueckmeldungen",
        );
    });

    // RÜCKMELDUNG ERSTELLEN
    $(document).on("click", '.werkzeug[werkzeug="aufgaben_rueckmeldung_erstellen"]', function () {
        Liste_VerknuepfungErstellen(
            $(this).hasClass("bestaetigt"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $element: $(this).closest(".element") },
            {
                aufgabe_id: Util_WertBereinigtZurueck($(this).attr("aufgabe_id"), undefined),
                mitglied_id: Util_WertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
                status: Util_WertBereinigtZurueck($(this).attr("status"), undefined),
            },
            Util_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            "aufgaben_rueckmeldungen",
        );
    });

    // TERMINE AUFGABEN ZUORDNEN (MODAL) ÖFFNEN
    $(document).on("click", '.werkzeug[werkzeug="termine_aufgaben_zuordnen"]', function () {
        Liste_VerknuepfungenModalOeffnen(
            "termine_aufgaben_zuordnen_modal",
            "termine_aufgaben_zuordnen",
            Util_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            {
                aufgabe_id: Util_WertBereinigtZurueck($(this).attr("aufgabe_id"), undefined),
                termin_id: Util_WertBereinigtZurueck($(this).attr("termin_id"), undefined),
            },
            "aufgaben_zuordnungen_termine",
        );
    });

    // TERMINE AUFGABEN ZUORDNEN
    $(document).on("change", '.werkzeug[werkzeug="aufgaben_zuordnung_termine_erstellen"]', function () {
        Liste_VerknuepfungErstellen(
            $(this).hasClass("bestaetigt"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $element: $(this).closest(".element") },
            {
                aufgabe_id: Util_WertBereinigtZurueck($(this).attr("aufgabe_id"), undefined),
                termin_id: Util_WertBereinigtZurueck($(this).attr("termin_id"), undefined),
                status: Number($(this).is(":checked")),
            },
            Util_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            "aufgaben_zuordnungen_termine",
        );
    });
}

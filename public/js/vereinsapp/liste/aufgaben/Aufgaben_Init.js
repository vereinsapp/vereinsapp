LISTEN.aufgaben.element_erstellen_data_vervollstaendigen_aktion = function (data) {
    data = Liste_WertBereinigtZurueck(data, new Object());

    if (!("max_anzahl_mitglieder" in data) || isEmptyString(data.max_anzahl_mitglieder)) data.max_anzahl_mitglieder = null;
    if (!("bemerkung" in data) || isEmptyString(data.bemerkung)) data.bemerkung = null;

    return data;
};

LISTEN.aufgaben.element_aendern_data_vervollstaendigen_aktion = function (data, aufgabe_id) {
    if (!("titel" in data)) data.titel = Liste_VariableRausZurueck("titel", aufgabe_id, "aufgaben", undefined);
    if (!("max_anzahl_mitglieder" in data))
        data.max_anzahl_mitglieder = Liste_VariableRausZurueck("max_anzahl_mitglieder", aufgabe_id, "aufgaben", null);
    if (!("bemerkung" in data)) data.bemerkung = Liste_VariableRausZurueck("bemerkung", aufgabe_id, "aufgaben", null);

    data = Liste_WertBereinigtZurueck(data, new Object());

    if (isEmptyString(data.max_anzahl_mitglieder)) data.max_anzahl_mitglieder = null;
    if (isEmptyString(data.bemerkung)) data.bemerkung = null;

    return data;
};

LISTEN.aufgaben_rueckmeldungen.element_ergaenzen_aktion = function (rueckmeldung) {
    if ("aufgabe_id" in rueckmeldung) rueckmeldung.aufgabe_titel = Liste_VariableRausZurueck("titel", rueckmeldung.aufgabe_id, "aufgaben", undefined);
    if ("mitglied_id" in rueckmeldung)
        rueckmeldung.mitglied_vorname = Liste_VariableRausZurueck("vorname", rueckmeldung.mitglied_id, "mitglieder", undefined);
    if ("mitglied_id" in rueckmeldung)
        rueckmeldung.mitglied_nachname = Liste_VariableRausZurueck("nachname", rueckmeldung.mitglied_id, "mitglieder", undefined);
};

LISTEN.aufgaben_zuordnungen_termine.element_ergaenzen_aktion = function (zuordnung) {
    if ("aufgabe_id" in zuordnung) zuordnung.aufgabe_titel = Liste_VariableRausZurueck("titel", zuordnung.aufgabe_id, "aufgaben", undefined);
    if ("aufgabe_id" in zuordnung)
        zuordnung.aufgabe_max_anzahl_mitglieder = Liste_VariableRausZurueck("max_anzahl_mitglieder", zuordnung.aufgabe_id, "aufgaben", undefined);
    if ("termin_id" in zuordnung) zuordnung.termin_titel = Liste_VariableRausZurueck("titel", zuordnung.termin_id, "termine", undefined);
    if ("termin_id" in zuordnung) zuordnung.termin_start = Liste_VariableRausZurueck("start", zuordnung.termin_id, "termine", undefined);
    if ("termin_id" in zuordnung) zuordnung.termin_ort = Liste_VariableRausZurueck("ort", zuordnung.termin_id, "termine", undefined);
    if ("termin_id" in zuordnung) zuordnung.termin_kategorie = Liste_VariableRausZurueck("kategorie", zuordnung.termin_id, "termine", undefined);
};

WERKZEUGE.aufgabe_erstellen.aktualisieren_aktion = WERKZEUGE_ERSTELLEN_AKTUALISIEREN_AKTION;
WERKZEUGE.termine_aufgaben_zuordnen.aktualisieren_aktion = WERKZEUGE_ERSTELLEN_AKTUALISIEREN_AKTION;

function Aufgaben_Init() {
    // AUFGABE ERSTELLEN / DUPLIZIEREN
    $(document).on("click", '.werkzeug[werkzeug="aufgabe_erstellen"], .werkzeug[werkzeug="aufgabe_duplizieren"]', function () {
        Liste_ElementErstellen(
            $(this).hasClass("data_vollstaendig"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Liste_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            Liste_WertBereinigtZurueck($(this).attr("aufgabe_id"), undefined),
            "aufgaben",
        );
    });

    // AUFGABE ÄNDERN
    $(document).on("click", '.werkzeug[werkzeug="aufgabe_aendern"]', function () {
        Liste_ElementAendern(
            $(this).hasClass("data_vollstaendig"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Liste_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            Liste_WertBereinigtZurueck($(this).attr("aufgabe_id"), undefined),
            "aufgaben",
        );
    });

    // RUECKMELDUNGEN VERWALTEN (MODAL) ÖFFNEN
    $(document).on("click", '.werkzeug[werkzeug="aufgaben_rueckmeldungen_verwalten"]', function () {
        Liste_VerknuepfungenModalOeffnen(
            "aufgaben_rueckmeldungen_verwalten_modal",
            "aufgaben_rueckmeldungen_verwalten",
            Liste_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            {
                aufgabe_id: Liste_WertBereinigtZurueck($(this).attr("aufgabe_id"), undefined),
                mitglied_id: Liste_WertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
            },
            "aufgaben_rueckmeldungen",
        );
    });

    // RÜCKMELDUNG ERSTELLEN
    $(document).on("click", '.werkzeug[werkzeug="aufgaben_rueckmeldung_erstellen"]', function () {
        Liste_VerknuepfungErstellen(
            $(this).hasClass("bestaetigt"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal") },
            {
                aufgabe_id: Liste_WertBereinigtZurueck($(this).attr("aufgabe_id"), undefined),
                mitglied_id: Liste_WertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
                status: Liste_WertBereinigtZurueck($(this).attr("status"), undefined),
            },
            Liste_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            "aufgaben_rueckmeldungen",
        );
    });

    // TERMINE AUFGABEN ZUORDNEN (MODAL) ÖFFNEN
    $(document).on("click", '.werkzeug[werkzeug="termine_aufgaben_zuordnen"]', function () {
        Liste_VerknuepfungenModalOeffnen(
            "termine_aufgaben_zuordnen_modal",
            "termine_aufgaben_zuordnen",
            Liste_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            {
                aufgabe_id: Liste_WertBereinigtZurueck($(this).attr("aufgabe_id"), undefined),
                termin_id: Liste_WertBereinigtZurueck($(this).attr("termin_id"), undefined),
            },
            "aufgaben_zuordnungen_termine",
        );
    });

    // TERMINE AUFGABEN ZUORDNEN
    $(document).on("change", '.werkzeug[werkzeug="aufgaben_zuordnung_termine_erstellen"]', function () {
        Liste_VerknuepfungErstellen(
            $(this).hasClass("bestaetigt"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal") },
            {
                aufgabe_id: Liste_WertBereinigtZurueck($(this).attr("aufgabe_id"), undefined),
                termin_id: Liste_WertBereinigtZurueck($(this).attr("termin_id"), undefined),
                status: Number($(this).is(":checked")),
            },
            Liste_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            "aufgaben_zuordnungen_termine",
        );
    });
}

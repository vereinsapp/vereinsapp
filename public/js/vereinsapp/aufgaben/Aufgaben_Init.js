LISTEN.aufgaben_rueckmeldungen.element_ergaenzen_aktion = function (rueckmeldung) {
    if ("aufgabe_id" in rueckmeldung)
        rueckmeldung.aufgabe_titel = Schnittstelle_VariableRausZurueck("titel", rueckmeldung.aufgabe_id, "aufgaben", undefined);
    if ("mitglied_id" in rueckmeldung)
        rueckmeldung.mitglied_vorname = Schnittstelle_VariableRausZurueck("vorname", rueckmeldung.mitglied_id, "mitglieder", undefined);
    if ("mitglied_id" in rueckmeldung)
        rueckmeldung.mitglied_nachname = Schnittstelle_VariableRausZurueck("nachname", rueckmeldung.mitglied_id, "mitglieder", undefined);
};

LISTEN.aufgaben_zuordnungen_termine.element_ergaenzen_aktion = function (zuordnung) {
    if ("aufgabe_id" in zuordnung) zuordnung.aufgabe_titel = Schnittstelle_VariableRausZurueck("titel", zuordnung.aufgabe_id, "aufgaben", undefined);
    if ("aufgabe_id" in zuordnung)
        zuordnung.aufgabe_max_anzahl_mitglieder = Schnittstelle_VariableRausZurueck(
            "max_anzahl_mitglieder",
            zuordnung.aufgabe_id,
            "aufgaben",
            undefined,
        );
    if ("termin_id" in zuordnung) zuordnung.termin_titel = Schnittstelle_VariableRausZurueck("titel", zuordnung.termin_id, "termine", undefined);
    if ("termin_id" in zuordnung) zuordnung.termin_start = Schnittstelle_VariableRausZurueck("start", zuordnung.termin_id, "termine", undefined);
    if ("termin_id" in zuordnung) zuordnung.termin_ort = Schnittstelle_VariableRausZurueck("ort", zuordnung.termin_id, "termine", undefined);
    if ("termin_id" in zuordnung)
        zuordnung.termin_kategorie = Schnittstelle_VariableRausZurueck("kategorie", zuordnung.termin_id, "termine", undefined);
};

WERKZEUGE.aufgabe_erstellen.aktualisieren_aktion = WERKZEUGE_ERSTELLEN_AKTUALISIEREN_AKTION;
WERKZEUGE.termine_aufgaben_zuordnen.aktualisieren_aktion = WERKZEUGE_ERSTELLEN_AKTUALISIEREN_AKTION;

function Aufgaben_Init() {
    // AUFGABE ERSTELLEN / DUPLIZIEREN
    $(document).on("click", '.werkzeug[data-werkzeug="aufgabe_erstellen"], .werkzeug[data-werkzeug="aufgabe_duplizieren"]', function () {
        Aufgaben_AufgabeErstellen(
            $(this).hasClass("data_vollstaendig"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-modal_title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-aufgabe_id"), undefined),
        );
    });

    // AUFGABE ÄNDERN
    $(document).on("click", '.werkzeug[data-werkzeug="aufgabe_aendern"]', function () {
        Aufgaben_AufgabeAendern(
            $(this).hasClass("data_vollstaendig"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-modal_title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-aufgabe_id"), undefined),
        );
    });

    // RUECKMELDUNGEN VERWALTEN (MODAL) ÖFFNEN
    $(document).on("click", '.werkzeug[data-werkzeug="aufgaben_rueckmeldungen_verwalten"]', function () {
        Liste_VerknuepfungenModalOeffnen(
            "aufgaben_rueckmeldungen_verwalten_modal",
            "aufgaben_rueckmeldungen_verwalten",
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-modal_title"), undefined),
            {
                aufgabe_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-aufgabe_id"), undefined),
                mitglied_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
            },
            "aufgaben_rueckmeldungen",
        );
    });

    // RÜCKMELDUNG ERSTELLEN
    $(document).on("click", '.werkzeug[data-werkzeug="aufgaben_rueckmeldung_erstellen"]', function () {
        Liste_VerknuepfungErstellen(
            $(this).hasClass("bestaetigt"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal") },
            {
                aufgabe_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-aufgabe_id"), undefined),
                mitglied_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
                status: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-status"), undefined),
            },
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-modal_title"), undefined),
            "aufgaben_rueckmeldungen",
        );
    });

    // TERMINE AUFGABEN ZUORDNEN (MODAL) ÖFFNEN
    $(document).on("click", '.werkzeug[data-werkzeug="termine_aufgaben_zuordnen"]', function () {
        Liste_VerknuepfungenModalOeffnen(
            "termine_aufgaben_zuordnen_modal",
            "termine_aufgaben_zuordnen",
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-modal_title"), undefined),
            {
                aufgabe_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-aufgabe_id"), undefined),
                termin_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-termin_id"), undefined),
            },
            "aufgaben_zuordnungen_termine",
        );
    });

    // TERMINE AUFGABEN ZUORDNEN
    $(document).on("change", '.werkzeug[data-werkzeug="aufgaben_zuordnung_termine_erstellen"]', function () {
        Liste_VerknuepfungErstellen(
            $(this).hasClass("bestaetigt"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal") },
            {
                aufgabe_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-aufgabe_id"), undefined),
                termin_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-termin_id"), undefined),
                status: Number($(this).is(":checked")),
            },
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-modal_title"), undefined),
            "aufgaben_zuordnungen_termine",
        );
    });
}

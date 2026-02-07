ELEMENTE.aufgaben_rueckmeldung.zuordnen_aktion = function (rueckmeldung) {
    const rueckmeldung_id = rueckmeldung.id;

    if ("aufgaben" in LISTEN) {
        const aufgabe_id = Schnittstelle_VariableRausZurueck("aufgabe_id", rueckmeldung_id, "aufgaben_rueckmeldungen", undefined);

        if (typeof aufgabe_id !== "undefined") {
            const aufgabe = LISTEN.aufgaben.tabelle[aufgabe_id];

            if (typeof aufgabe !== "undefined") {
                if (!("zugeordnete_aufgaben_rueckmeldung_ids" in aufgabe))
                    LISTEN.aufgaben.tabelle[aufgabe_id].zugeordnete_aufgaben_rueckmeldung_ids = [rueckmeldung_id];
                else if (!aufgabe.zugeordnete_aufgaben_rueckmeldung_ids.includes(rueckmeldung_id))
                    LISTEN.aufgaben.tabelle[aufgabe_id].zugeordnete_aufgaben_rueckmeldung_ids.push(rueckmeldung_id);
            }
        }
    }

    if ("mitglieder" in LISTEN) {
        const mitglied_id = Schnittstelle_VariableRausZurueck("mitglied_id", rueckmeldung_id, "aufgaben_rueckmeldungen", undefined);

        if (typeof mitglied_id !== "undefined") {
            const mitglied = LISTEN.mitglieder.tabelle[mitglied_id];

            if (typeof mitglied !== "undefined") {
                if (!("zugeordnete_aufgaben_rueckmeldung_ids" in mitglied))
                    LISTEN.mitglieder.tabelle[mitglied_id].zugeordnete_aufgaben_rueckmeldung_ids = [rueckmeldung_id];
                else if (!mitglied.zugeordnete_aufgaben_rueckmeldung_ids.includes(rueckmeldung_id))
                    LISTEN.mitglieder.tabelle[mitglied_id].zugeordnete_aufgaben_rueckmeldung_ids.push(rueckmeldung_id);
            }
        }
    }
};

ELEMENTE.aufgaben_zuordnung_termine.zuordnen_aktion = function (zuordnung) {
    const zuordnung_id = zuordnung.id;

    if ("aufgaben" in LISTEN) {
        const aufgabe_id = Schnittstelle_VariableRausZurueck("aufgabe_id", zuordnung_id, "aufgaben_zuordnungen_termine", undefined);

        if (typeof aufgabe_id !== "undefined") {
            const aufgabe = LISTEN.aufgaben.tabelle[aufgabe_id];

            if (typeof aufgabe !== "undefined") {
                if (!("zugeordnete_aufgaben_zuordnung_termine_ids" in aufgabe))
                    LISTEN.aufgaben.tabelle[aufgabe_id].zugeordnete_aufgaben_zuordnung_termine_ids = [zuordnung_id];
                else if (!aufgabe.zugeordnete_aufgaben_zuordnung_termine_ids.includes(zuordnung_id))
                    LISTEN.aufgaben.tabelle[aufgabe_id].zugeordnete_aufgaben_zuordnung_termine_ids.push(zuordnung_id);
            }
        }
    }

    if ("termine" in LISTEN) {
        const termin_id = Schnittstelle_VariableRausZurueck("termin_id", zuordnung_id, "aufgaben_zuordnungen_termine", undefined);

        if (typeof termin_id !== "undefined") {
            const termin = LISTEN.termine.tabelle[termin_id];

            if (typeof termin !== "undefined") {
                if (!("zugeordnete_aufgaben_zuordnung_termine_ids" in termin))
                    LISTEN.termine.tabelle[termin_id].zugeordnete_aufgaben_zuordnung_termine_ids = [zuordnung_id];
                else if (!termin.zugeordnete_aufgaben_zuordnung_termine_ids.includes(zuordnung_id))
                    LISTEN.termine.tabelle[termin_id].zugeordnete_aufgaben_zuordnung_termine_ids.push(zuordnung_id);
            }
        }
    }
};

ELEMENTE.aufgaben_rueckmeldung.ergaenzen_aktion = function (rueckmeldung) {
    if ("aufgabe_id" in rueckmeldung)
        rueckmeldung.aufgabe_titel = Schnittstelle_VariableRausZurueck("titel", rueckmeldung.aufgabe_id, "aufgaben", undefined);
    if ("mitglied_id" in rueckmeldung)
        rueckmeldung.mitglied_vorname = Schnittstelle_VariableRausZurueck("vorname", rueckmeldung.mitglied_id, "mitglieder", undefined);
    if ("mitglied_id" in rueckmeldung)
        rueckmeldung.mitglied_nachname = Schnittstelle_VariableRausZurueck("nachname", rueckmeldung.mitglied_id, "mitglieder", undefined);
};

ELEMENTE.aufgaben_zuordnung_termine.ergaenzen_aktion = function (zuordnung) {
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
WERKZEUGE.aufgabe_zuordnen.aktualisieren_aktion = WERKZEUGE_ERSTELLEN_AKTUALISIEREN_AKTION;

function Aufgaben_Init() {
    // AUFGABE ERSTELLEN
    $(document).on("click", ".btn_aufgabe_erstellen", function () {
        Aufgaben_AufgabeErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            undefined,
        );
    });

    // AUFGABE ÄNDERN
    $(document).on("click", ".btn_aufgabe_aendern", function () {
        Aufgaben_AufgabeAendern(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-aufgabe_id"), undefined),
        );
    });

    // AUFGABE DUPLIZIEREN
    $(document).on("click", ".btn_aufgabe_duplizieren", function () {
        Aufgaben_AufgabeErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-aufgabe_id"), undefined),
        );
    });

    // RUECKMELDUNGEN VERWALTEN (MODAL) ÖFFNEN
    $(document).on("click", ".btn_aufgaben_rueckmeldungen_verwalten", function () {
        Liste_VerknuepfungenModalOeffnen(
            "aufgaben_rueckmeldungen_verwalten_modal",
            "aufgaben_rueckmeldungen_verwalten",
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            {
                aufgabe_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-aufgabe_id"), undefined),
                mitglied_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
            },
            "aufgaben_rueckmeldungen",
        );
    });

    // RÜCKMELDUNG ERSTELLEN
    $(document).on("click", '.btn_verknuepfung_erstellen[data-verknuepfungen="aufgaben_rueckmeldungen"]', function () {
        Liste_VerknuepfungErstellen(
            { $ausloesend: $(this) },
            {
                aufgabe_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-aufgabe_id"), undefined),
                mitglied_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
                status: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-status"), undefined),
            },
            "aufgaben_rueckmeldungen",
        );
    });

    // TERMINE AUFGABEN ZUORDNEN (MODAL) ÖFFNEN
    $(document).on("click", ".btn_termine_aufgaben_zuordnen", function () {
        Liste_VerknuepfungenModalOeffnen(
            "termine_aufgaben_zuordnen_modal",
            "termine_aufgaben_zuordnen",
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            {
                aufgabe_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-aufgabe_id"), undefined),
                termin_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-termin_id"), undefined),
            },
            "aufgaben_zuordnungen_termine",
        );
    });

    // TERMINE AUFGABEN ZUORDNEN
    $(document).on("change", '.chk_verknuepfung_erstellen[data-verknuepfungen="aufgaben_zuordnungen_termine"]', function () {
        Liste_VerknuepfungErstellen(
            { $ausloesend: $(this) },
            {
                aufgabe_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-aufgabe_id"), undefined),
                termin_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-termin_id"), undefined),
                status: Number($(this).is(":checked")),
            },
            "aufgaben_zuordnungen_termine",
        );
    });
}

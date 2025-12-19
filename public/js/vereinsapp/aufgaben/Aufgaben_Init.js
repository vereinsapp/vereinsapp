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

ELEMENTE.aufgaben_zuordnung_termine.zuordnen_aktion = function (zuordnung_termine) {
    const zuordnung_termine_id = zuordnung_termine.id;

    if ("aufgaben" in LISTEN) {
        const aufgabe_id = Schnittstelle_VariableRausZurueck("aufgabe_id", zuordnung_termine_id, "aufgaben_zuordnungen_termine", undefined);

        if (typeof aufgabe_id !== "undefined") {
            const aufgabe = LISTEN.aufgaben.tabelle[aufgabe_id];

            if (typeof aufgabe !== "undefined") {
                if (!("zugeordnete_aufgaben_zuordnung_termine_ids" in aufgabe))
                    LISTEN.aufgaben.tabelle[aufgabe_id].zugeordnete_aufgaben_zuordnung_termine_ids = [zuordnung_termine_id];
                else if (!aufgabe.zugeordnete_aufgaben_zuordnung_termine_ids.includes(zuordnung_termine_id))
                    LISTEN.aufgaben.tabelle[aufgabe_id].zugeordnete_aufgaben_zuordnung_termine_ids.push(zuordnung_termine_id);
            }
        }
    }

    if ("termine" in LISTEN) {
        const termin_id = Schnittstelle_VariableRausZurueck("termin_id", zuordnung_termine_id, "aufgaben_zuordnungen_termine", undefined);

        if (typeof termin_id !== "undefined") {
            const termin = LISTEN.termine.tabelle[termin_id];

            if (typeof termin !== "undefined") {
                if (!("zugeordnete_aufgaben_zuordnung_termine_ids" in termin))
                    LISTEN.termine.tabelle[termin_id].zugeordnete_aufgaben_zuordnung_termine_ids = [zuordnung_termine_id];
                else if (!termin.zugeordnete_aufgaben_zuordnung_termine_ids.includes(zuordnung_termine_id))
                    LISTEN.termine.tabelle[termin_id].zugeordnete_aufgaben_zuordnung_termine_ids.push(zuordnung_termine_id);
            }
        }
    }
};

function Aufgaben_Init() {
    // AUFGABE ERSTELLEN
    $(document).on("click", ".btn_aufgabe_erstellen", function () {
        Aufgaben_AufgabeErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            undefined
        );
    });

    // AUFGABE ÄNDERN
    $(document).on("click", ".btn_aufgabe_aendern", function () {
        Aufgaben_AufgabeAendern(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // AUFGABE DUPLIZIEREN
    $(document).on("click", ".btn_aufgabe_duplizieren", function () {
        Aufgaben_AufgabeErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // RUECKMELDUNGEN VERWALTEN (MODAL) ÖFFNEN
    $(document).on("click", ".btn_aufgaben_rueckmeldungen_verwalten", function () {
        Liste_VerknuepfungenModalOeffnen(
            "aufgaben_rueckmeldungen_verwalten_modal",
            "aufgaben_rueckmeldungen_verwalten",
            $(this).attr("data-title"),
            $(this).attr("data-element_id"),
            $(this).attr("data-liste")
        );
    });

    // ZUORDNUNGEN TERMINE (MODAL) ÖFFNEN
    $(document).on("click", ".btn_aufgaben_termine_zuordnen", function () {
        Liste_VerknuepfungenModalOeffnen(
            "aufgaben_termine_zuordnen_modal",
            "aufgaben_termine_zuordnen",
            $(this).attr("data-title"),
            $(this).attr("data-element_id"),
            $(this).attr("data-liste")
        );
    });

    // ZUORDNUNGEN AUFGABEN (MODAL) ÖFFNEN
    $(document).on("click", ".btn_termine_aufgaben_zuordnen", function () {
        Liste_VerknuepfungenModalOeffnen(
            "termine_aufgaben_zuordnen_modal",
            "termine_aufgaben_zuordnen",
            $(this).attr("data-title"),
            $(this).attr("data-element_id"),
            $(this).attr("data-liste")
        );
    });

    // ZUGEORDNETE AUFGABEN ANZEIGEN
    $(document).on("click", ".btn_aufgaben_anzeigen", function () {
        Aufgaben_ZugeordneteAufgabenAnzeigen($(this).attr("data-title"));
    });
}

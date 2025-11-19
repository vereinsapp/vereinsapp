ELEMENTE.aufgaben_rueckmeldung.zuordnen_aktion = function (rueckmeldung) {
    const rueckmeldung_id = rueckmeldung.id;

    if ("aufgaben" in LISTEN) {
        const aufgabe_id = Schnittstelle_VariableRausZurueck("aufgabe_id", rueckmeldung_id, "aufgaben_rueckmeldungen", undefined);

        if (typeof aufgabe_id !== "undefined") {
            const aufgabe = LISTEN.aufgaben.tabelle[aufgabe_id];

            if (typeof aufgabe !== "undefined") {
                if (!("zugeordnete_element_ids_nach_liste" in aufgabe)) aufgabe.zugeordnete_element_ids_nach_liste = new Object();
                const zugeordnete_element_ids_nach_liste = aufgabe.zugeordnete_element_ids_nach_liste;

                if (!("aufgaben_rueckmeldungen" in zugeordnete_element_ids_nach_liste))
                    zugeordnete_element_ids_nach_liste.aufgaben_rueckmeldungen = new Array();
                const zugeordnete_element_ids = zugeordnete_element_ids_nach_liste.aufgaben_rueckmeldungen;
                if (!zugeordnete_element_ids.includes(rueckmeldung_id))
                    LISTEN.aufgaben.tabelle[aufgabe_id].zugeordnete_element_ids_nach_liste.aufgaben_rueckmeldungen.push(rueckmeldung_id);
            }
        }
    }

    if ("mitglieder" in LISTEN) {
        const mitglied_id = Schnittstelle_VariableRausZurueck("mitglied_id", rueckmeldung_id, "aufgaben_rueckmeldungen", undefined);

        if (typeof mitglied_id !== "undefined") {
            const mitglied = LISTEN.mitglieder.tabelle[mitglied_id];

            if (typeof mitglied !== "undefined") {
                if (!("zugeordnete_element_ids_nach_liste" in mitglied)) mitglied.zugeordnete_element_ids_nach_liste = new Object();
                const zugeordnete_element_ids_nach_liste = mitglied.zugeordnete_element_ids_nach_liste;

                if (!("aufgaben_rueckmeldungen" in zugeordnete_element_ids_nach_liste))
                    zugeordnete_element_ids_nach_liste.aufgaben_rueckmeldungen = new Array();
                const zugeordnete_element_ids = zugeordnete_element_ids_nach_liste.aufgaben_rueckmeldungen;
                if (!zugeordnete_element_ids.includes(rueckmeldung_id))
                    LISTEN.mitglieder.tabelle[mitglied_id].zugeordnete_element_ids_nach_liste.aufgaben_rueckmeldungen.push(rueckmeldung_id);
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
                if (!("zugeordnete_element_ids_nach_liste" in aufgabe)) aufgabe.zugeordnete_element_ids_nach_liste = new Object();
                const zugeordnete_element_ids_nach_liste = aufgabe.zugeordnete_element_ids_nach_liste;

                if (!("aufgaben_zuordnungen_termine" in zugeordnete_element_ids_nach_liste))
                    zugeordnete_element_ids_nach_liste.aufgaben_zuordnungen_termine = new Array();
                const zugeordnete_element_ids = zugeordnete_element_ids_nach_liste.aufgaben_zuordnungen_termine;
                if (!zugeordnete_element_ids.includes(zuordnung_termine_id))
                    LISTEN.aufgaben.tabelle[aufgabe_id].zugeordnete_element_ids_nach_liste.aufgaben_zuordnungen_termine.push(zuordnung_termine_id);
            }
        }
    }

    if ("mitglieder" in LISTEN) {
        const mitglied_id = Schnittstelle_VariableRausZurueck("mitglied_id", zuordnung_termine_id, "aufgaben_zuordnungen_termine", undefined);

        if (typeof mitglied_id !== "undefined") {
            const mitglied = LISTEN.mitglieder.tabelle[mitglied_id];

            if (typeof mitglied !== "undefined") {
                if (!("zugeordnete_element_ids_nach_liste" in mitglied)) mitglied.zugeordnete_element_ids_nach_liste = new Object();
                const zugeordnete_element_ids_nach_liste = mitglied.zugeordnete_element_ids_nach_liste;

                if (!("aufgaben_zuordnungen_termine" in zugeordnete_element_ids_nach_liste))
                    zugeordnete_element_ids_nach_liste.aufgaben_zuordnungen_termine = new Array();
                const zugeordnete_element_ids = zugeordnete_element_ids_nach_liste.aufgaben_zuordnungen_termine;
                if (!zugeordnete_element_ids.includes(zuordnung_termine_id))
                    LISTEN.mitglieder.tabelle[mitglied_id].zugeordnete_element_ids_nach_liste.aufgaben_zuordnungen_termine.push(zuordnung_termine_id);
            }
        }
    }
};

ELEMENTE.aufgabe.ergaenzen_aktion = function (aufgabe) {
};

function Aufgaben_Init() {
    EVENT_VARIABLE_UPD_DOM_NACH_LISTE["aufgaben_rueckmeldungen"] = [
        function () {
            // RÜCKMELDUNG AKTUALISIEREN
            $("[data-liste='aufgaben_rueckmeldungen']").each(function () {
                Aufgaben_RueckmeldungAktualisieren($(this));
            });
        },
    ];

    // AUFGABE ERSTELLEN
    $(document).on("click", ".btn_aufgabe_erstellen", function () {
        Aufgaben_AufgabeErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $btn_ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            undefined
        );
    });

    // AUFGABE ÄNDERN
    $(document).on("click", ".btn_aufgabe_aendern", function () {
        Aufgaben_AufgabeAendern(
            $(this).hasClass("formular_oeffnen"),
            { $btn_ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // AUFGABE DUPLIZIEREN
    $(document).on("click", ".btn_aufgabe_duplizieren", function () {
        Aufgaben_AufgabeErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $btn_ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // RÜCKMELDUNG ERSTELLEN
    $(document).on("click", ".btn_rueckmeldung_erstellen", function () {
        Aufgaben_RueckmeldungErstellen(
            false,
            { $btn_ausloesend: $(this) },
            {
                aufgabe_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-aufgabe_id"), undefined),
                mitglied_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
                status: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-status"), undefined),
                bemerkung: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-bemerkung"), null),
            },
            undefined
        );
    });

    // AUFGABEN_ZUORDNUNGEN_TERMINE ZUORDNEN (MODAL) ÖFFNEN
    $(document).on("click", ".btn_aufgaben_zuordnungen_termine_zuordnen", function () {
        const liste = $(this).attr("data-liste");
        const element_id = $(this).attr("data-element_id");
        const title = $(this).attr("data-title");

        let gegen_liste = $(this).attr("data-gegen_liste");
        if (typeof gegen_liste === "undefined" && liste == "aufgaben") gegen_liste = "mitglieder";
        else if (typeof gegen_liste === "undefined" && liste == "mitglieder") gegen_liste = "aufgaben";

        const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, liste + "_aufgaben_zuordnungen_termine_zuordnen");
        $neues_modal.find("#aufgaben_zuordnungen_termine_zuordnen.liste").attr("data-gegen_liste", liste).attr("data-gegen_element_id", element_id);
        Schnittstelle_DomModalOeffnen($neues_modal);
        Schnittstelle_EventVariableUpdDom(gegen_liste);
    });

    // ZUGEORDNETE AUFGABEN ANZEIGEN
    $(document).on("click", ".btn_zugeordnete_aufgaben_anzeigen", function () {
        Aufgaben_ZugeordneteAufgabenAnzeigen($(this).attr("data-title"));
    });
}

ELEMENTE.termin.ergaenzen_aktion = function (termin) {
    if ("rueckmeldungen" in LISTEN) {
        termin["ich_rueckmeldung_id"] = Liste_ElementIdZurueck(
            [
                { liste: "termine", element_id: Number(termin["id"]) },
                { liste: "mitglieder", element_id: Number(ICH["id"]) },
            ],
            "rueckmeldungen"
        );
        if (typeof termin["ich_rueckmeldung_id"] !== "undefined") termin["ich_rueckgemeldet_janein"] = true;
        else termin["ich_rueckgemeldet_janein"] = false;
    }

    termin["ich_eingeladen_janein"] = false;
    termin["filtern_mitglieder"] = Schnittstelle_VariableWertBereinigtZurueck(termin["filtern_mitglieder"], new Object());
    const termin_kategorie_filtern_mitglieder = Schnittstelle_VariableWertBereinigtZurueck(
        TERMINE_KATEGORIE_FILTERN_MITGLIEDER[termin["kategorie"]],
        new Object()
    );
    $.each(
        Liste_TabelleGefiltertZurueck(
            LISTEN.mitglieder.tabelle,
            Liste_FilternMitPrioKombiniertZurueck(termin_kategorie_filtern_mitglieder, termin["filtern_mitglieder"], "mitglieder"),
            "mitglieder"
        ),
        function () {
            if (this["id"] == ICH["id"]) termin["ich_eingeladen_janein"] = true;
            return;
        }
    );
};

ELEMENTE.rueckmeldung.zuordnen_aktion = function (rueckmeldung) {
    const rueckmeldung_id = rueckmeldung.id;

    if ("termine" in LISTEN) {
        const termin_id = Schnittstelle_VariableRausZurueck("termin_id", rueckmeldung_id, "rueckmeldungen", undefined);

        if (typeof termin_id !== "undefined") {
            const termin = LISTEN.termine.tabelle[termin_id];

            if (typeof termin !== "undefined") {
                if (!("zugeordnete_element_ids_nach_liste" in termin)) termin.zugeordnete_element_ids_nach_liste = new Object();
                const zugeordnete_element_ids_nach_liste = termin.zugeordnete_element_ids_nach_liste;

                if (!("rueckmeldungen" in zugeordnete_element_ids_nach_liste)) zugeordnete_element_ids_nach_liste.rueckmeldungen = new Array();
                const zugeordnete_element_ids = zugeordnete_element_ids_nach_liste.rueckmeldungen;
                if (!zugeordnete_element_ids.includes(rueckmeldung_id))
                    LISTEN.termine.tabelle[termin_id].zugeordnete_element_ids_nach_liste.rueckmeldungen.push(rueckmeldung_id);
            }
        }
    }

    if ("mitglieder" in LISTEN) {
        const mitglied_id = Schnittstelle_VariableRausZurueck("mitglied_id", rueckmeldung_id, "rueckmeldungen", undefined);

        if (typeof mitglied_id !== "undefined") {
            const mitglied = LISTEN.mitglieder.tabelle[mitglied_id];

            if (typeof mitglied !== "undefined") {
                if (!("zugeordnete_element_ids_nach_liste" in mitglied)) mitglied.zugeordnete_element_ids_nach_liste = new Object();
                const zugeordnete_element_ids_nach_liste = mitglied.zugeordnete_element_ids_nach_liste;

                if (!("rueckmeldungen" in zugeordnete_element_ids_nach_liste)) zugeordnete_element_ids_nach_liste.rueckmeldungen = new Array();
                const zugeordnete_element_ids = zugeordnete_element_ids_nach_liste.rueckmeldungen;
                if (!zugeordnete_element_ids.includes(rueckmeldung_id))
                    LISTEN.mitglieder.tabelle[mitglied_id].zugeordnete_element_ids_nach_liste.rueckmeldungen.push(rueckmeldung_id);
            }
        }
    }
};

ELEMENTE.anwesenheit.zuordnen_aktion = function (anwesenheit) {
    const anwesenheit_id = anwesenheit.id;

    if ("termine" in LISTEN) {
        const termin_id = Schnittstelle_VariableRausZurueck("termin_id", anwesenheit_id, "anwesenheiten", undefined);

        if (typeof termin_id !== "undefined") {
            const termin = LISTEN.termine.tabelle[termin_id];

            if (typeof termin !== "undefined") {
                if (!("zugeordnete_element_ids_nach_liste" in termin)) termin.zugeordnete_element_ids_nach_liste = new Object();
                const zugeordnete_element_ids_nach_liste = termin.zugeordnete_element_ids_nach_liste;

                if (!("anwesenheiten" in zugeordnete_element_ids_nach_liste)) zugeordnete_element_ids_nach_liste.anwesenheiten = new Array();
                const zugeordnete_element_ids = zugeordnete_element_ids_nach_liste.anwesenheiten;
                if (!zugeordnete_element_ids.includes(anwesenheit_id))
                    LISTEN.termine.tabelle[termin_id].zugeordnete_element_ids_nach_liste.anwesenheiten.push(anwesenheit_id);
            }
        }
    }

    if ("mitglieder" in LISTEN) {
        const mitglied_id = Schnittstelle_VariableRausZurueck("mitglied_id", anwesenheit_id, "anwesenheiten", undefined);

        if (typeof mitglied_id !== "undefined") {
            const mitglied = LISTEN.mitglieder.tabelle[mitglied_id];

            if (typeof mitglied !== "undefined") {
                if (!("zugeordnete_element_ids_nach_liste" in mitglied)) mitglied.zugeordnete_element_ids_nach_liste = new Object();
                const zugeordnete_element_ids_nach_liste = mitglied.zugeordnete_element_ids_nach_liste;

                if (!("anwesenheiten" in zugeordnete_element_ids_nach_liste)) zugeordnete_element_ids_nach_liste.anwesenheiten = new Array();
                const zugeordnete_element_ids = zugeordnete_element_ids_nach_liste.anwesenheiten;
                if (!zugeordnete_element_ids.includes(anwesenheit_id))
                    LISTEN.mitglieder.tabelle[mitglied_id].zugeordnete_element_ids_nach_liste.anwesenheiten.push(anwesenheit_id);
            }
        }
    }
};

EIGENSCHAFTEN.termine.kategorie.change_aktion = function ($kategorie) {
    const $filtern_mitglieder = $kategorie.closest(".formular").find('.eingabe[data-eingabe="filtern_mitglieder"]');
    if ($kategorie.val() in TERMINE_KATEGORIE_FILTERN_MITGLIEDER) {
        const filtern_prio_niedrig = Schnittstelle_VariableWertBereinigtZurueck(TERMINE_KATEGORIE_FILTERN_MITGLIEDER[$kategorie.val()], new Object());
        const filtern_prio_hoch = new Object();
        $.each(Object.keys(filtern_prio_niedrig), function (position, eigenschaft) {
            if ("termine" in FILTERBARE_EIGENSCHAFTEN && FILTERBARE_EIGENSCHAFTEN.termine.includes(eigenschaft))
                filtern_prio_hoch[eigenschaft] = filtern_prio_niedrig[eigenschaft];
        });

        $filtern_mitglieder
            .attr("data-filtern_prio_niedrig", JsonStringifiedZurueck(filtern_prio_niedrig, new Object()))
            .val(JsonStringifiedZurueck(filtern_prio_hoch, new Object()));
    } else $filtern_mitglieder.removeAttr("data-filtern_prio_niedrig").val("");
};

function Termine_Init() {
    EVENT_VARIABLE_UPD_DOM_VOR_ENDE["rueckmeldungen"] = [
        function () {
            // FORMULAR MEINE RÜCKMELDUNG EIN-/AUSBLENDEN
            $(".rueckmeldung_eingeladen").each(function () {
                Termine_RueckmeldungEinAusblenden($(this));
            });

            // RÜCKMELDUNG AKTUALISIEREN
            $(".zusagen, .absagen").each(function () {
                Termine_RueckmeldungAktualisieren($(this));
            });
        },
    ];

    // TERMIN ERSTELLEN
    $(document).on("click", ".btn_termin_erstellen", function () {
        Termine_TerminErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $btn_ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            undefined
        );
    });

    // TERMIN ÄNDERN
    $(document).on("click", ".btn_termin_aendern", function () {
        Termine_TerminAendern(
            $(this).hasClass("formular_oeffnen"),
            { $btn_ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // TERMIN DUPLIZIEREN
    $(document).on("click", ".btn_termin_duplizieren", function () {
        Termine_TerminErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $btn_ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // TERMIN LÖSCHEN
    $(document).on("click", ".btn_termin_loeschen", function () {
        Liste_ElementLoeschen(
            $(this).hasClass("bestaetigung_einfordern"),
            { $btn_ausloesend: $(this), $modal: $(this).closest(".modal") },
            { weiterleiten: $(this).attr("data-weiterleiten") },
            $(this).attr("data-title"),
            $(this).attr("data-element_id"),
            "termine"
        );
    });

    // RÜCKMELDUNG ERSTELLEN
    $(document).on("click", ".btn_rueckmeldung_erstellen", function () {
        Termine_RueckmeldungErstellen(
            false,
            { $btn_ausloesend: $(this) },
            {
                termin_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-werte"), { termin_id: undefined }).termin_id,
                mitglied_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-werte"), { mitglied_id: undefined }).mitglied_id,
                status: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-werte"), { status: undefined }).status,
                bemerkung: "",
            },
            $(this).attr("data-title"),
            undefined
        );
    });

    // RÜCKMELDUNG ÄNDERN
    $(document).on("click", ".btn_rueckmeldung_aendern", function () {
        Termine_RueckmeldungAendern(
            false,
            { $btn_ausloesend: $(this) },
            {
                status: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-werte"), { status: undefined }).status,
                bemerkung: "",
            },
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // RÜCKMELDUNG DETAILLIEREN
    $(document).on("click", ".btn_rueckmeldung_detaillieren", function () {
        Termine_RueckmeldungDetaillieren(
            $(this).hasClass("formular_oeffnen"),
            { $btn_ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // RÜCKMELDUNG LÖSCHEN
    $(document).on("click", ".btn_rueckmeldung_loeschen", function () {
        Liste_ElementLoeschen(
            $(this).hasClass("bestaetigung_einfordern"),
            { $btn_ausloesend: $(this), $modal: $(this).closest(".modal") },
            { weiterleiten: $(this).attr("data-weiterleiten") },
            $(this).attr("data-title"),
            $(this).attr("data-element_id"),
            "rueckmeldungen"
        );
    });

    // ANWESENHEITEN DOKUMENTIEREN (MODAL) ÖFFNEN
    $(document).on("click", ".btn_anwesenheiten_dokumentieren", function () {
        const liste = $(this).attr("data-liste");
        const element_id = $(this).attr("data-element_id");
        const title = $(this).attr("data-title");

        let gegen_liste = $(this).attr("data-gegen_liste");
        if (typeof gegen_liste === "undefined" && liste == "termine") gegen_liste = "mitglieder";
        else if (typeof gegen_liste === "undefined" && liste == "mitglieder") gegen_liste = "termine";

        const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, liste + "_anwesenheiten_dokumentieren");
        $neues_modal.find("#anwesenheiten_dokumentieren.liste").attr("data-gegen_liste", liste).attr("data-gegen_element_id", element_id);
        Schnittstelle_DomModalOeffnen($neues_modal);
        Schnittstelle_EventVariableUpdDom(gegen_liste);
    });
}

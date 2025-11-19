ELEMENTE.termin.ergaenzen_aktion = function (termin) {
    termin["mitglieder_ids_eingeladen"] = new Array();
    $.each(
        Liste_TabelleGefiltertZurueck(
            LISTEN.mitglieder.tabelle,
            Liste_FilternMitPrioKombiniertZurueck(
                Schnittstelle_VariableWertBereinigtZurueck(TERMINE_KATEGORIE_FILTERN_MITGLIEDER[termin["kategorie"]], new Object()),
                termin["filtern_mitglieder"],
                "mitglieder"
            ),
            "mitglieder"
        ),
        function () {
            termin["mitglieder_ids_eingeladen"].push(this["id"]);
        }
    );
    termin["ich_eingeladen_janein"] = termin["mitglieder_ids_eingeladen"].includes(Number(ICH["id"]));

    termin["ich_rueckgemeldet_janein"] = false;
    if ("zugeordnete_element_ids_nach_liste" in termin && "termine_rueckmeldungen" in termin["zugeordnete_element_ids_nach_liste"])
        $.each(termin["zugeordnete_element_ids_nach_liste"].termine_rueckmeldungen, function (position, rueckmeldung_id) {
            if (Schnittstelle_VariableRausZurueck("mitglied_id", rueckmeldung_id, "termine_rueckmeldungen", undefined) == Number(ICH["id"])) {
                termin["ich_rueckgemeldet_janein"] = true;
                return false;
            }
        });
};

ELEMENTE.termine_rueckmeldung.zuordnen_aktion = function (rueckmeldung) {
    const rueckmeldung_id = rueckmeldung.id;

    if ("termine" in LISTEN) {
        const termin_id = Schnittstelle_VariableRausZurueck("termin_id", rueckmeldung_id, "termine_rueckmeldungen", undefined);

        if (typeof termin_id !== "undefined") {
            const termin = LISTEN.termine.tabelle[termin_id];

            if (typeof termin !== "undefined") {
                if (!("zugeordnete_element_ids_nach_liste" in termin)) termin.zugeordnete_element_ids_nach_liste = new Object();
                const zugeordnete_element_ids_nach_liste = termin.zugeordnete_element_ids_nach_liste;

                if (!("termine_rueckmeldungen" in zugeordnete_element_ids_nach_liste))
                    zugeordnete_element_ids_nach_liste.termine_rueckmeldungen = new Array();
                const zugeordnete_element_ids = zugeordnete_element_ids_nach_liste.termine_rueckmeldungen;
                if (!zugeordnete_element_ids.includes(rueckmeldung_id))
                    LISTEN.termine.tabelle[termin_id].zugeordnete_element_ids_nach_liste.termine_rueckmeldungen.push(rueckmeldung_id);
            }
        }
    }

    if ("mitglieder" in LISTEN) {
        const mitglied_id = Schnittstelle_VariableRausZurueck("mitglied_id", rueckmeldung_id, "termine_rueckmeldungen", undefined);

        if (typeof mitglied_id !== "undefined") {
            const mitglied = LISTEN.mitglieder.tabelle[mitglied_id];

            if (typeof mitglied !== "undefined") {
                if (!("zugeordnete_element_ids_nach_liste" in mitglied)) mitglied.zugeordnete_element_ids_nach_liste = new Object();
                const zugeordnete_element_ids_nach_liste = mitglied.zugeordnete_element_ids_nach_liste;

                if (!("termine_rueckmeldungen" in zugeordnete_element_ids_nach_liste))
                    zugeordnete_element_ids_nach_liste.termine_rueckmeldungen = new Array();
                const zugeordnete_element_ids = zugeordnete_element_ids_nach_liste.termine_rueckmeldungen;
                if (!zugeordnete_element_ids.includes(rueckmeldung_id))
                    LISTEN.mitglieder.tabelle[mitglied_id].zugeordnete_element_ids_nach_liste.termine_rueckmeldungen.push(rueckmeldung_id);
            }
        }
    }
};

ELEMENTE.termine_anwesenheit.zuordnen_aktion = function (anwesenheit) {
    const anwesenheit_id = anwesenheit.id;

    if ("termine" in LISTEN) {
        const termin_id = Schnittstelle_VariableRausZurueck("termin_id", anwesenheit_id, "termine_anwesenheiten", undefined);

        if (typeof termin_id !== "undefined") {
            const termin = LISTEN.termine.tabelle[termin_id];

            if (typeof termin !== "undefined") {
                if (!("zugeordnete_element_ids_nach_liste" in termin)) termin.zugeordnete_element_ids_nach_liste = new Object();
                const zugeordnete_element_ids_nach_liste = termin.zugeordnete_element_ids_nach_liste;

                if (!("termine_anwesenheiten" in zugeordnete_element_ids_nach_liste))
                    zugeordnete_element_ids_nach_liste.termine_anwesenheiten = new Array();
                const zugeordnete_element_ids = zugeordnete_element_ids_nach_liste.termine_anwesenheiten;
                if (!zugeordnete_element_ids.includes(anwesenheit_id))
                    LISTEN.termine.tabelle[termin_id].zugeordnete_element_ids_nach_liste.termine_anwesenheiten.push(anwesenheit_id);
            }
        }
    }

    if ("mitglieder" in LISTEN) {
        const mitglied_id = Schnittstelle_VariableRausZurueck("mitglied_id", anwesenheit_id, "termine_anwesenheiten", undefined);

        if (typeof mitglied_id !== "undefined") {
            const mitglied = LISTEN.mitglieder.tabelle[mitglied_id];

            if (typeof mitglied !== "undefined") {
                if (!("zugeordnete_element_ids_nach_liste" in mitglied)) mitglied.zugeordnete_element_ids_nach_liste = new Object();
                const zugeordnete_element_ids_nach_liste = mitglied.zugeordnete_element_ids_nach_liste;

                if (!("termine_anwesenheiten" in zugeordnete_element_ids_nach_liste))
                    zugeordnete_element_ids_nach_liste.termine_anwesenheiten = new Array();
                const zugeordnete_element_ids = zugeordnete_element_ids_nach_liste.termine_anwesenheiten;
                if (!zugeordnete_element_ids.includes(anwesenheit_id))
                    LISTEN.mitglieder.tabelle[mitglied_id].zugeordnete_element_ids_nach_liste.termine_anwesenheiten.push(anwesenheit_id);
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
    EVENT_VARIABLE_UPD_DOM_NACH_LISTE["termine_rueckmeldungen"] = [
        function () {
            // RÜCKMELDUNG AKTUALISIEREN
            $("[data-liste='termine_rueckmeldungen']").each(function () {
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

    // RÜCKMELDUNG ERSTELLEN
    $(document).on("click", ".btn_rueckmeldung_erstellen", function () {
        Termine_RueckmeldungErstellen(
            false,
            { $btn_ausloesend: $(this) },
            {
                termin_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-termin_id"), undefined),
                mitglied_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
                status: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-status"), undefined),
                bemerkung: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-bemerkung"), null),
            },
            undefined
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

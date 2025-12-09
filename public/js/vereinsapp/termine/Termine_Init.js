ELEMENTE.termine_rueckmeldung.zuordnen_aktion = function (rueckmeldung) {
    const rueckmeldung_id = rueckmeldung.id;

    if ("termine" in LISTEN) {
        const termin_id = Schnittstelle_VariableRausZurueck("termin_id", rueckmeldung_id, "termine_rueckmeldungen", undefined);

        if (typeof termin_id !== "undefined") {
            const termin = LISTEN.termine.tabelle[termin_id];

            if (typeof termin !== "undefined") {
                if (!("zugeordnete_termine_rueckmeldung_ids" in termin))
                    LISTEN.termine.tabelle[termin_id].zugeordnete_termine_rueckmeldung_ids = [rueckmeldung_id];
                else if (!termin.zugeordnete_termine_rueckmeldung_ids.includes(rueckmeldung_id))
                    LISTEN.termine.tabelle[termin_id].zugeordnete_termine_rueckmeldung_ids.push(rueckmeldung_id);
            }
        }
    }

    if ("mitglieder" in LISTEN) {
        const mitglied_id = Schnittstelle_VariableRausZurueck("mitglied_id", rueckmeldung_id, "termine_rueckmeldungen", undefined);

        if (typeof mitglied_id !== "undefined") {
            const mitglied = LISTEN.mitglieder.tabelle[mitglied_id];

            if (typeof mitglied !== "undefined") {
                if (!("zugeordnete_termine_rueckmeldung_ids" in mitglied))
                    LISTEN.mitglieder.tabelle[mitglied_id].zugeordnete_termine_rueckmeldung_ids = [rueckmeldung_id];
                else if (!mitglied.zugeordnete_termine_rueckmeldung_ids.includes(rueckmeldung_id))
                    LISTEN.mitglieder.tabelle[mitglied_id].zugeordnete_termine_rueckmeldung_ids.push(rueckmeldung_id);
            }
        }
    }
};

ELEMENTE.termine_anwesenheit.zuordnen_aktion = function (zuordnung_termine) {
    const zuordnung_termine_id = zuordnung_termine.id;

    if ("termine" in LISTEN) {
        const termin_id = Schnittstelle_VariableRausZurueck("termin_id", zuordnung_termine_id, "termine_anwesenheiten", undefined);

        if (typeof termin_id !== "undefined") {
            const termin = LISTEN.termine.tabelle[termin_id];

            if (typeof termin !== "undefined") {
                if (!("zugeordnete_termine_anwesenheit_ids" in termin))
                    LISTEN.termine.tabelle[termin_id].zugeordnete_termine_anwesenheit_ids = [zuordnung_termine_id];
                else if (!termin.zugeordnete_termine_anwesenheit_ids.includes(zuordnung_termine_id))
                    LISTEN.termine.tabelle[termin_id].zugeordnete_termine_anwesenheit_ids.push(zuordnung_termine_id);
            }
        }
    }

    if ("mitglieder" in LISTEN) {
        const mitglied_id = Schnittstelle_VariableRausZurueck("mitglied_id", zuordnung_termine_id, "termine_anwesenheiten", undefined);

        if (typeof mitglied_id !== "undefined") {
            const mitglied = LISTEN.mitglieder.tabelle[mitglied_id];

            if (typeof mitglied !== "undefined") {
                if (!("zugeordnete_termine_anwesenheit_ids" in mitglied))
                    LISTEN.mitglieder.tabelle[mitglied_id].zugeordnete_termine_anwesenheit_ids = [zuordnung_termine_id];
                else if (!mitglied.zugeordnete_termine_anwesenheit_ids.includes(zuordnung_termine_id))
                    LISTEN.mitglieder.tabelle[mitglied_id].zugeordnete_termine_anwesenheit_ids.push(zuordnung_termine_id);
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

ELEMENTE.termin.ergaenzen_aktion = function (termin) {
    termin.mitglied_ids_eingeladen = new Array();
    $.each(
        Liste_TabelleGefiltertZurueck(
            LISTEN.mitglieder.tabelle,
            Liste_FilternMitPrioKombiniertZurueck(
                Schnittstelle_VariableWertBereinigtZurueck(TERMINE_KATEGORIE_FILTERN_MITGLIEDER[termin.kategorie], new Object()),
                termin.filtern_mitglieder,
                "mitglieder"
            ),
            "mitglieder"
        ),
        function () {
            termin.mitglied_ids_eingeladen.push(this.id);
        }
    );
    termin.ich_eingeladen_janein = termin.mitglied_ids_eingeladen.includes(Number(ICH.id));

    termin.ich_rueckgemeldet_janein = false;
    if ("zugeordnete_termine_rueckmeldung_ids" in termin)
        $.each(termin.zugeordnete_termine_rueckmeldung_ids, function (position, rueckmeldung_id) {
            if (Schnittstelle_VariableRausZurueck("mitglied_id", rueckmeldung_id, "termine_rueckmeldungen", undefined) == Number(ICH.id)) {
                termin.ich_rueckgemeldet_janein = true;
                return false;
            }
        });
};

function Termine_Init() {
    // TERMIN ERSTELLEN
    $(document).on("click", ".btn_termin_erstellen", function () {
        Termine_TerminErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            undefined
        );
    });

    // TERMIN ÄNDERN
    $(document).on("click", ".btn_termin_aendern", function () {
        Termine_TerminAendern(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // TERMIN DUPLIZIEREN
    $(document).on("click", ".btn_termin_duplizieren", function () {
        Termine_TerminErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // RUECKMELDUNGEN VERWALTEN (MODAL) ÖFFNEN
    $(document).on("click", ".btn_termine_rueckmeldungen_verwalten", function () {
        Liste_VerknuepfungenModalOeffnen(
            "termine_rueckmeldungen_verwalten_modal",
            "termine_rueckmeldungen_verwalten",
            $(this).attr("data-title"),
            $(this).attr("data-element_id"),
            $(this).attr("data-liste")
        );
    });

    // ANWESENHEITEN DOKUMENTIEREN (MODAL) ÖFFNEN
    $(document).on("click", ".btn_termine_anwesenheiten_dokumentieren", function () {
        Liste_VerknuepfungenModalOeffnen(
            "termine_anwesenheiten_dokumentieren_modal",
            "termine_anwesenheiten_dokumentieren",
            $(this).attr("data-title"),
            $(this).attr("data-element_id"),
            $(this).attr("data-liste")
        );
    });
}

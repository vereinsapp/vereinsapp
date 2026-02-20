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

ELEMENTE.termine_anwesenheit.zuordnen_aktion = function (anwesenheit) {
    const anwesenheit_id = anwesenheit.id;

    if ("termine" in LISTEN) {
        const termin_id = Schnittstelle_VariableRausZurueck("termin_id", anwesenheit_id, "termine_anwesenheiten", undefined);

        if (typeof termin_id !== "undefined") {
            const termin = LISTEN.termine.tabelle[termin_id];

            if (typeof termin !== "undefined") {
                if (!("zugeordnete_termine_anwesenheit_ids" in termin))
                    LISTEN.termine.tabelle[termin_id].zugeordnete_termine_anwesenheit_ids = [anwesenheit_id];
                else if (!termin.zugeordnete_termine_anwesenheit_ids.includes(anwesenheit_id))
                    LISTEN.termine.tabelle[termin_id].zugeordnete_termine_anwesenheit_ids.push(anwesenheit_id);
            }
        }
    }

    if ("mitglieder" in LISTEN) {
        const mitglied_id = Schnittstelle_VariableRausZurueck("mitglied_id", anwesenheit_id, "termine_anwesenheiten", undefined);

        if (typeof mitglied_id !== "undefined") {
            const mitglied = LISTEN.mitglieder.tabelle[mitglied_id];

            if (typeof mitglied !== "undefined") {
                if (!("zugeordnete_termine_anwesenheit_ids" in mitglied))
                    LISTEN.mitglieder.tabelle[mitglied_id].zugeordnete_termine_anwesenheit_ids = [anwesenheit_id];
                else if (!mitglied.zugeordnete_termine_anwesenheit_ids.includes(anwesenheit_id))
                    LISTEN.mitglieder.tabelle[mitglied_id].zugeordnete_termine_anwesenheit_ids.push(anwesenheit_id);
            }
        }
    }
};

EIGENSCHAFTEN.termine.kategorie.change_aktion = function ($kategorie) {
    const $filtern_mitglieder = $kategorie.closest(".formular").find('.eingabe[data-eingabe="filtern_mitglieder"]');
    if ($kategorie.val() in TERMINE_KATEGORIE_FILTERN_MITGLIEDER) {
        const filtern_basis = Schnittstelle_VariableWertBereinigtZurueck(TERMINE_KATEGORIE_FILTERN_MITGLIEDER[$kategorie.val()], new Object());
        const filtern_manip = new Object();
        $.each(Object.keys(filtern_basis), function (position, eigenschaft) {
            if ("termine" in FILTERBARE_EIGENSCHAFTEN && FILTERBARE_EIGENSCHAFTEN.termine.includes(eigenschaft))
                filtern_manip[eigenschaft] = filtern_basis[eigenschaft];
        });

        $filtern_mitglieder
            .attr("data-filtern_basis", JsonStringifiedZurueck(filtern_basis, new Object()))
            .val(JsonStringifiedZurueck(filtern_manip, new Object()));
    } else $filtern_mitglieder.removeAttr("data-filtern_basis").val("");
};

ELEMENTE.termin.ergaenzen_aktion = function (termin) {
    termin.mitglied_ids_eingeladen = new Array();
    $.each(
        Liste_TabelleGefiltertZurueck(
            LISTEN.mitglieder.tabelle,
            Liste_FilternManipuliertZurueck(
                Schnittstelle_VariableWertBereinigtZurueck(TERMINE_KATEGORIE_FILTERN_MITGLIEDER[termin.kategorie], new Object()),
                termin.filtern_mitglieder,
                "mitglieder",
            ),
            "mitglieder",
        ),
        function () {
            termin.mitglied_ids_eingeladen.push(this.id);
        },
    );
    termin.ich_eingeladen_janein = termin.mitglied_ids_eingeladen.includes(ICH_ID);

    termin.ich_rueckgemeldet_janein = false;
    if ("zugeordnete_termine_rueckmeldung_ids" in termin)
        $.each(termin.zugeordnete_termine_rueckmeldung_ids, function (position, rueckmeldung_id) {
            if (Schnittstelle_VariableRausZurueck("mitglied_id", rueckmeldung_id, "termine_rueckmeldungen", undefined) == ICH_ID) {
                termin.ich_rueckgemeldet_janein = true;
                return false;
            }
        });
};

ELEMENTE.termine_rueckmeldung.ergaenzen_aktion = function (rueckmeldung) {
    if ("termin_id" in rueckmeldung)
        rueckmeldung.termin_start = Schnittstelle_VariableRausZurueck("start", rueckmeldung.termin_id, "termine", undefined);
    if ("termin_id" in rueckmeldung)
        rueckmeldung.termin_titel = Schnittstelle_VariableRausZurueck("titel", rueckmeldung.termin_id, "termine", undefined);
    if ("mitglied_id" in rueckmeldung)
        rueckmeldung.mitglied_vorname = Schnittstelle_VariableRausZurueck("vorname", rueckmeldung.mitglied_id, "mitglieder", undefined);
    if ("mitglied_id" in rueckmeldung)
        rueckmeldung.mitglied_nachname = Schnittstelle_VariableRausZurueck("nachname", rueckmeldung.mitglied_id, "mitglieder", undefined);
};

ELEMENTE.termine_anwesenheit.ergaenzen_aktion = function (anwesenheit) {
    if ("termin_id" in anwesenheit)
        anwesenheit.termin_start = Schnittstelle_VariableRausZurueck("start", anwesenheit.termin_id, "termine", undefined);
    if ("termin_id" in anwesenheit)
        anwesenheit.termin_titel = Schnittstelle_VariableRausZurueck("titel", anwesenheit.termin_id, "termine", undefined);
    if ("mitglied_id" in anwesenheit)
        anwesenheit.mitglied_vorname = Schnittstelle_VariableRausZurueck("vorname", anwesenheit.mitglied_id, "mitglieder", undefined);
    if ("mitglied_id" in anwesenheit)
        anwesenheit.mitglied_nachname = Schnittstelle_VariableRausZurueck("nachname", anwesenheit.mitglied_id, "mitglieder", undefined);
};

WERKZEUGE.termin_erstellen.aktualisieren_aktion = WERKZEUGE_ERSTELLEN_AKTUALISIEREN_AKTION;

function Termine_Init() {
    // TERMIN ERSTELLEN / DUPLIZIEREN
    $(document).on("click", ".btn_termin_erstellen", function () {
        Termine_TerminErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-termin_id"), undefined),
        );
    });

    // TERMIN ÄNDERN
    $(document).on("click", ".btn_termin_aendern", function () {
        Termine_TerminAendern(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-termin_id"), undefined),
        );
    });

    // RÜCKMELDUNGEN VERWALTEN (MODAL) ÖFFNEN
    $(document).on("click", ".btn_termine_rueckmeldungen_verwalten", function () {
        Liste_VerknuepfungenModalOeffnen(
            "termine_rueckmeldungen_verwalten_modal",
            "termine_rueckmeldungen_verwalten",
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            {
                mitglied_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
                termin_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-termin_id"), undefined),
            },
            "termine_rueckmeldungen",
        );
    });

    // RÜCKMELDUNG ERSTELLEN
    $(document).on("click", '.btn_verknuepfung_erstellen[data-verknuepfungen="termine_rueckmeldungen"]', function () {
        Liste_VerknuepfungErstellen(
            $(this).hasClass("bestaetigung_einfordern"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal") },
            {
                termin_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-termin_id"), undefined),
                mitglied_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
                status: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-status"), undefined),
            },
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            "termine_rueckmeldungen",
        );
    });

    // ANWESENHEITEN DOKUMENTIEREN (MODAL) ÖFFNEN
    $(document).on("click", ".btn_termine_anwesenheiten_dokumentieren", function () {
        Liste_VerknuepfungenModalOeffnen(
            "termine_anwesenheiten_dokumentieren_modal",
            "termine_anwesenheiten_dokumentieren",
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            {
                mitglied_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
                termin_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-termin_id"), undefined),
            },
            "termine_anwesenheiten",
        );
    });

    // ANWESENHEIT ÄNDERN
    $(document).on("change", '.chk_verknuepfung_erstellen[data-verknuepfungen="termine_anwesenheiten"]', function () {
        Liste_VerknuepfungErstellen(
            $(this).hasClass("bestaetigung_einfordern"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal") },
            {
                termin_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-termin_id"), undefined),
                mitglied_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
                status: Number($(this).is(":checked")),
            },
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            "termine_anwesenheiten",
        );
    });
}

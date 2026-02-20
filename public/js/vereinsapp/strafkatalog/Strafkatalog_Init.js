ELEMENTE.strafkatalog_zugewiesene_strafe.zuordnen_aktion = function (zugewiesene_strafe) {
    const zugewiesene_strafe_id = zugewiesene_strafe.id;

    if ("strafkatalog" in LISTEN) {
        const strafe_id = Schnittstelle_VariableRausZurueck("strafe_id", zugewiesene_strafe_id, "strafkatalog_zugewiesene_strafen", undefined);

        if (typeof strafe_id !== "undefined") {
            const strafe = LISTEN.strafkatalog.tabelle[strafe_id];

            if (typeof strafe !== "undefined") {
                if (!("zugeordnete_strafkatalog_zugewiesene_strafe_ids" in strafe))
                    LISTEN.strafkatalog.tabelle[strafe_id].zugeordnete_strafkatalog_zugewiesene_strafe_ids = [zugewiesene_strafe_id];
                else if (!strafe.zugeordnete_strafkatalog_zugewiesene_strafe_ids.includes(zugewiesene_strafe_id))
                    LISTEN.strafkatalog.tabelle[strafe_id].zugeordnete_strafkatalog_zugewiesene_strafe_ids.push(zugewiesene_strafe_id);
            }
        }
    }

    if ("mitglieder" in LISTEN) {
        const mitglied_id = Schnittstelle_VariableRausZurueck("mitglied_id", zugewiesene_strafe_id, "strafkatalog_zugewiesene_strafen", undefined);

        if (typeof mitglied_id !== "undefined") {
            const mitglied = LISTEN.mitglieder.tabelle[mitglied_id];

            if (typeof mitglied !== "undefined") {
                if (!("zugeordnete_strafkatalog_zugewiesene_strafe_ids" in mitglied))
                    LISTEN.mitglieder.tabelle[mitglied_id].zugeordnete_strafkatalog_zugewiesene_strafe_ids = [zugewiesene_strafe_id];
                else if (!mitglied.zugeordnete_strafkatalog_zugewiesene_strafe_ids.includes(zugewiesene_strafe_id))
                    LISTEN.mitglieder.tabelle[mitglied_id].zugeordnete_strafkatalog_zugewiesene_strafe_ids.push(zugewiesene_strafe_id);
            }
        }
    }
};

WERKZEUGE.strafe_erstellen.aktualisieren_aktion = WERKZEUGE_ERSTELLEN_AKTUALISIEREN_AKTION;

function Strafkatalog_Init() {
    // STRAFE ERSTELLEN / DUPLIZIEREN
    $(document).on("click", ".btn_strafe_erstellen", function () {
        Strafkatalog_StrafeErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-strafe_id"), undefined),
        );
    });

    // STRAFE ÄNDERN
    $(document).on("click", ".btn_strafe_aendern", function () {
        Strafkatalog_StrafeAendern(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-strafe_id"), undefined),
        );
    });

    // STRAFEN ZUWEISEN (MODAL) ÖFFNEN
    $(document).on("click", ".btn_strafen_zuweisen", function () {
        Liste_VerknuepfungenModalOeffnen(
            "strafen_zuweisen_modal",
            "strafen_zuweisen",
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            {
                strafe_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-strafe_id"), undefined),
                mitglied_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
            },
            "strafkatalog_zugewiesene_strafen",
        );
    });

    // ZUGEWIESENE STRAFE ERSTELLEN
    $(document).on("click", '.btn_verknuepfung_erstellen[data-verknuepfungen="strafkatalog_zugewiesene_strafen"]', function () {
        Liste_VerknuepfungErstellen(
            $(this).hasClass("bestaetigung_einfordern"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal") },
            {
                strafe_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-strafe_id"), undefined),
                mitglied_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
                status: 1,
            },
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title"), undefined),
            "strafkatalog_zugewiesene_strafen",
        );
    });
}

function Strafkatalog_StrafeZuweisen(auswahl_einfordern, bestaetigung_einfordern, dom, title, strafe_id, mitglied_id) {
    if (auswahl_einfordern) {
        const $neues_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(title, "strafe_zuweisen_modal");
        const liste = Schnittstelle_VariableWertBereinigtZurueck(
            $neues_modal.find("#strafe_zuweisen.liste[data-liste]").attr("data-liste"),
            undefined,
        );
        LISTEN[liste].instanz.strafe_zuweisen.$blanko_element
            .attr("data-title", title)
            .attr("data-strafe_id", strafe_id)
            .attr("data-mitglied_id", mitglied_id);

        Schnittstelle_Dom$ModalOeffnen($neues_modal);
        Schnittstelle_EventVariableUpdDom(liste);
    } else if (bestaetigung_einfordern)
        Schnittstelle_DomBestaetigungEinfordern(
            "Willst du wirklich " +
                Liste_ElementBeschriftungZurueck(mitglied_id, "mitglieder") +
                " die Strafe " +
                Liste_ElementBeschriftungZurueck(strafe_id, "strafkatalog") +
                " zuweisen?",
            title,
            "btn_strafe_zuweisen",
            { strafe_id: strafe_id, mitglied_id: mitglied_id },
        );
    else
        Strafkatalog_KassenbucheintragErstellen(false, dom, {
            titel: Schnittstelle_VariableRausZurueck("titel", strafe_id, "strafkatalog", undefined),
            wert: Schnittstelle_VariableRausZurueck("wert", strafe_id, "strafkatalog", undefined),
            mitglied_id: mitglied_id,
            erledigt: null,
            bemerkung: "Strafe",
        });
}

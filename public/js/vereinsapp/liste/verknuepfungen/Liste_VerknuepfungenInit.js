function Liste_VerknuepfungenInit() {
    // CHECK ÄNDERN
    $(document).on("change", ".check", function () {
        Liste_VerknuepfungErstellen(
            { $ausloesend: $(this).parents().first() },
            {
                liste: $(this).closest(".element").attr("data-liste"),
                element_id: $(this).val(),
                gegen_liste: $(this).closest(".element").attr("data-gegen_liste"),
                gegen_element_id: $(this).closest(".element").attr("data-gegen_element_id"),
                verknuepfungen: $(this).attr("data-verknuepfungen"),
                status: Number($(this).is(":checked")),
            }
        );
    });

    // ALLE CHECKS ANWÄHLEN
    $(document).on("click", ".btn_alle_checks_anwaehlen", function () {
        if ($(this).hasClass("bestaetigung_einfordern"))
            Schnittstelle_DomBestaetigungEinfordern("Willst du wirklich alle Checks anwählen?", "Alle Checks anwählen", "btn_alle_checks_anwaehlen", {
                instanz: $(this).attr("data-instanz"),
            });
        else {
            const $modal = $(this).closest(".modal");
            if ($modal.exists()) Schnittstelle_DomModalSchliessen($modal);
            $(".liste[id='" + $(this).attr("data-instanz") + "']")
                .find(".check:not(:checked)")
                .trigger("click");
        }
    });

    // ALLE CHECKS ABWÄHLEN
    $(document).on("click", ".btn_alle_checks_abwaehlen", function () {
        if ($(this).hasClass("bestaetigung_einfordern"))
            Schnittstelle_DomBestaetigungEinfordern("Willst du wirklich alle Checks abwählen?", "Alle Checks abwählen", "btn_alle_checks_abwaehlen", {
                instanz: $(this).attr("data-instanz"),
            });
        else {
            const $modal = $(this).closest(".modal");
            if ($modal.exists()) Schnittstelle_DomModalSchliessen($modal);
            $('.liste[id="' + $(this).attr("data-instanz") + '"]')
                .find(".check:checked")
                .trigger("click");
        }
    });
}

/**
 * @param {JQuery} $werkzeug
 * @param {JQuery} $liste
 */

function Liste_Liste$WerkzeugAktualisieren($werkzeug, $liste) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($liste.attr("data-liste"), undefined);
    const instanz = Schnittstelle_VariableWertBereinigtZurueck($liste.attr("id"), undefined);

    let batch_hinzu = false;
    if ($werkzeug.hasClass("btn_filtern_manip")) {
        const filtern_basis = Schnittstelle_VariableWertBereinigtZurueck($liste.attr("data-filtern"), new Object());
        const filtern_manip = LISTEN[liste].instanz[instanz].filtern;

        $werkzeug
            .attr("data-filtern_basis", JsonStringifiedZurueck(filtern_basis, new Object()))
            .val(JsonStringifiedZurueck(filtern_manip, new Object()));

        batch_hinzu = false;
        $.each(Object.keys(filtern_manip), function (position, eigenschaft) {
            if (Object.keys(filtern_manip[eigenschaft]).length > 0) batch_hinzu = true;
        });
    } else if ($werkzeug.hasClass("btn_sortieren_manip")) {
        const sortieren_basis = Schnittstelle_VariableWertBereinigtZurueck($liste.attr("data-sortieren"), undefined);
        const sortieren_manip = LISTEN[liste].instanz[instanz].sortieren;

        $werkzeug
            .attr("data-sortieren_basis", JsonStringifiedZurueck(sortieren_basis, undefined))
            .val(JsonStringifiedZurueck(sortieren_manip, undefined));

        if (typeof sortieren_manip !== "undefined" && Object.keys(sortieren_manip).length > 0) batch_hinzu = true;
        else batch_hinzu = false;
    } else if ($werkzeug.hasClass("btn_gruppieren_manip")) {
        const gruppieren_basis = Schnittstelle_VariableWertBereinigtZurueck($liste.attr("data-gruppieren"), undefined);
        const gruppieren_manip = LISTEN[liste].instanz[instanz].gruppieren;

        $werkzeug
            .attr("data-gruppieren_basis", JsonStringifiedZurueck(gruppieren_basis, undefined))
            .val(JsonStringifiedZurueck(gruppieren_manip, undefined));

        if (typeof gruppieren_manip !== "undefined") batch_hinzu = true;
        else batch_hinzu = false;
    }

    if (batch_hinzu)
        $werkzeug
            .addClass("position-relative")
            .append('<span class="position-absolute bottom-0 end-0 translate-middle p-1 bg-danger border border-danger rounded-circle">');
    else $werkzeug.removeClass("position-relative").find("span.position-absolute").remove();
}

/**
 * @param {Object} filtern_basis
 * @param {Object} filtern_manip
 * @param {string} liste
 */

function Liste_FilternManipuliertZurueck(filtern_basis, filtern_manip, liste) {
    if (
        (typeof filtern_basis === "undefined" || isEmptyString(filtern_basis) || Object.keys(filtern_basis).length === 0) &&
        isObject(filtern_manip) &&
        Object.keys(filtern_manip).length > 0
    )
        return filtern_manip;
    else if (
        (typeof filtern_manip === "undefined" || isEmptyString(filtern_manip) || Object.keys(filtern_manip).length === 0) &&
        isObject(filtern_basis) &&
        Object.keys(filtern_basis).length > 0
    )
        return filtern_basis;
    else {
        const filtern_kombiniert = new Object();

        $.each(Object.keys(filtern_basis).concat(Object.keys(filtern_manip)), function (schluessel, eigenschaft) {
            filtern_kombiniert[eigenschaft] = new Object();
            switch (EIGENSCHAFTEN[liste][eigenschaft].typ) {
                case "text":
                    // (noch) nicht möglich
                    break;
                case "zahl":
                case "zeitpunkt":
                    $.each(["start", "ende"], function (position, filtern_klasse) {
                        if (eigenschaft in filtern_manip && filtern_klasse in filtern_manip[eigenschaft])
                            filtern_kombiniert[eigenschaft][filtern_klasse] = filtern_manip[eigenschaft][filtern_klasse];
                        else if (eigenschaft in filtern_basis && filtern_klasse in filtern_basis[eigenschaft])
                            filtern_kombiniert[eigenschaft][filtern_klasse] = filtern_basis[eigenschaft][filtern_klasse];
                    });
                    break;
                case "janein":
                case "vorgegebene_werte":
                case "element_id":
                case "element_ids":
                    $.each(["inklusiv", "exklusiv"], function (position, filtern_klasse) {
                        if (eigenschaft in filtern_manip) {
                            if (filtern_klasse in filtern_manip[eigenschaft])
                                filtern_kombiniert[eigenschaft][filtern_klasse] = filtern_manip[eigenschaft][filtern_klasse];
                        } else if (eigenschaft in filtern_basis) {
                            if (filtern_klasse in filtern_basis[eigenschaft])
                                filtern_kombiniert[eigenschaft][filtern_klasse] = filtern_basis[eigenschaft][filtern_klasse];
                        }
                    });
                    break;
            }
        });

        return filtern_kombiniert;
    }
}

function Liste_ElementIdZurueck(such_array, liste) {
    let element_id = undefined;

    $.each(LISTEN[liste].tabelle, function () {
        const element = this;
        if ("id" in element)
            if (
                element[LISTEN[such_array[0].liste].element + "_id"] == Number(such_array[0].element_id) &&
                element[LISTEN[such_array[1].liste].element + "_id"] == Number(such_array[1].element_id)
            ) {
                element_id = element.id;
                return false;
            }
    });

    return element_id;
}

function JsonStringifiedZurueck(wert) {
    return JSON.stringify(wert, (key, value) => {
        return value instanceof DateTime ? value.toSQL() : value;
    });
}

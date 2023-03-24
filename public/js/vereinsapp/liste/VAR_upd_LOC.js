// LOC VON VAR AKTUALISIEREN
function VAR_upd_LOC( liste ) { const LISTE = LISTEN[ liste ];

    const LOC_tabelle = new Array(); $.each( LISTE.tabelle, function() { const element = this; if( 'id' in element ) {
        if( 'alter' in element ) delete element['alter'];
        if( 'alter_geburtstag' in element ) delete element['alter_geburtstag'];
        if( 'geburtstag' in element ) delete element['geburtstag'];
        if( 'abwesend' in element ) delete element['abwesend'];
        if( 'ich_rueckmeldung_id' in element ) delete element['ich_rueckmeldung_id'];
        $.each( element, function( eigenschaft, wert ) {
            if( wert && !Number.isNaN( Number(wert) ) && typeof wert !== 'boolean' ) element[ eigenschaft ] = Number(wert);
            if( typeof EIGENSCHAFTEN[ LISTE.controller ][ liste ][ eigenschaft ] !== 'undefined' && EIGENSCHAFTEN[ LISTE.controller ][ liste ][ eigenschaft ]['typ'] == 'zeitpunkt' ) element[ eigenschaft ] = wert.toFormat( SQL_DATETIME );
        } );
        LOC_tabelle.push( element );
    } } ); localStorage.setItem( 'vereinsapp_'+liste+'_tabelle', JSON.stringify( LOC_tabelle ) );

    localStorage.setItem( 'vereinsapp_'+liste+'_sortieren', JSON.stringify( LISTE.sortieren ) );

    const LOC_filtern = new Array(); if( LISTE.filtern.length >= 1 ) LOC_filtern.push( LISTE.filtern[0] );
    function VAR_upd_LOC_filtern( filtern, liste ) { const LISTE = LISTEN[ liste ];
        $.each( filtern, function( index, knoten ) {
            if( 'verknuepfung' in knoten ) VAR_upd_LOC_filtern( knoten.filtern, liste );
            else if( 'operator' in knoten ) { const eigenschaft = knoten.eigenschaft; let wert = knoten.wert;
                if( typeof EIGENSCHAFTEN[ LISTE.controller ][ liste ][ eigenschaft ] !== 'undefined' && EIGENSCHAFTEN[ LISTE.controller ][ liste ][ eigenschaft ]['typ'] == 'zeitpunkt' ) knoten.wert = wert.toFormat( SQL_DATETIME );
            }
        } );
    } VAR_upd_LOC_filtern( LOC_filtern, liste ); localStorage.setItem( 'vereinsapp_'+liste+'_filtern', JSON.stringify( LOC_filtern ) );

}
$(document).on( 'VAR_upd_LOC', function( event, prio_liste ) {
    // const todo = Object.keys( LISTEN ); // if( prio_liste in LISTEN ) {
    //     todo[0] = prio_liste;
    //     $.each( Object.keys( LISTEN ), function( index, liste) { todo[ index + 1 ] = liste; } );
    // }
    // $.each( todo, function( prio, liste ) { const LISTE = LISTEN[ liste ]; const LOC = new Array();
    $.each( LISTEN, function( liste, LISTE ) { VAR_upd_LOC( liste ) } );
    $(document).trigger( 'LOC_upd_VAR', [ prio_liste ] );
} );
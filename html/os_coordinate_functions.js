/////////////////////////////////////////////////////////////
//
//      Convert between UK East,North and UK NGRs
//
/////////////////////////////////////////////////////////////

//      UK Ordnance Survey 100km grid square designations
var grid100 =       [
    "SV", "SW", "SX", "SY", "SZ", "TV", "TW",
    "SQ", "SR", "SS", "ST", "SU", "TQ", "TR",
    "SL", "SM", "SN", "SO", "SP", "TL", "TM",
    "SF", "SG", "SH", "SJ", "SK", "TF", "TG",
    "SA", "SB", "SC", "SD", "SE", "TA", "TB",
    "NV", "NW", "NX", "NY", "NZ", "OV", "OW",
    "NQ", "NR", "NS", "NT", "NU", "OQ", "OR",
    "NL", "NM", "NN", "NO", "NP", "OL", "OM",
    "NF", "NG", "NH", "NJ", "NK", "OF", "OG",
    "NA", "NB", "NC", "ND", "NE", "OA", "OB",
    "HV", "HW", "HX", "HY", "HZ", "JV", "JW",
    "HQ", "HR", "HS", "HT", "HU", "JQ", "JR",
    "HL", "HM", "HN", "HO", "HP", "JL", "JM"
];

//      Convert Easting, Northing to 100km Grid Reference
function ENToGridRef( anEast, aNorth ) {
    var     result = null;
    with( Math )
    result = grid100[ floor(anEast/100000) + 7*floor(aNorth/100000) ] + floor( (anEast%100000) / 100 ).pad(3) +  floor( (aNorth%100000) / 100 ).pad(3);
    return result;
}

//      Convert 100km Grid Reference to Easting, Northing
function GridRefToEN( aGridRef ) {
    var     easting         = null;
    var     northing        = null;
    var     result          = null;
    switch( aGridRef ? aGridRef.length : 0 ) {
    case 4:         easting = parseInt( aGridRef.substr(2,1), 10 )*10000;
        northing = parseInt( aGridRef.substr(3,1), 10 )*10000;
        break;

    case 6:         easting = parseInt( aGridRef.substr(2,2), 10 )*1000;
        northing = parseInt( aGridRef.substr(4,2), 10 )*1000;
        break;

    case 8:         easting = parseInt( aGridRef.substr(2,3), 10 )*100;
        northing = parseInt( aGridRef.substr(5,3), 10 )*100;
        break;

    case 10:        easting = parseInt( aGridRef.substr(2,4), 10 )*10;
        northing = parseInt( aGridRef.substr(6,4), 10 )*10;
        break;

    case 12:        easting = parseInt( aGridRef.substr(2,5), 10 );
        northing = parseInt( aGridRef.substr(7,5), 10 );
        break;
    }
    if( easting!= null ) {
        for( var i = 0, I = grid100.length; (i < I) && !result; i++ ) {
            if( aGridRef.substr(0, 2).toUpperCase() == grid100[i] ) {
                easting += (i % 7)*100000;
                northing += Math.floor(i / 7)*100000;
                result = new ol.LonLat( easting, northing );
            }
        }
    }
    return result;
}

Number.prototype.pad = function( width ) {
    var sign    = "";
    var result  = "" + this + "";
    if( (result[0] == '+') || (result[0] == '-') ) {
        sign    = result[0];
        result  = result.substr( 1 );
    }
    while( (result.indexOf(".") >= 0 ? result.indexOf(".") : result.length) < width )
        result = "0" + result;
    return sign + result;
};
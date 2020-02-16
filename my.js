var map;
var info = [];
var visbility = false;
var mk3, mk4, mk5;

window.onload = function () {
    var center = new L.latLng(28.549948, 77.268241);/*WGS location object*/
    var pt1 = new L.latLng(28.549948, 77.268241);/*WGS location object*/
    var pt2 = new L.latLng(28.552232, 77.268941);/*WGS location object*/
    var pt3 = new L.latLng(28.551748, 77.269022);/*WGS location object*/
    var pt4 = new L.latLng(28.551738, 77.270164);/*WGS location object*/
    var pt5 = new L.latLng(28.548602, 77.271546);/*WGS location object*/
    var pt6 = new L.latLng(28.554603, 77.268305);/*WGS location object*/
    map = new MapmyIndia.Map('map', {center: center, zoomControl: true, hybrid: true, zoom: 17});
    /*
     1. Create a MapmyIndia Map by simply calling new MapmyIndia.Map() and passing it a html div id, all other parameters are optional...
     2. All leaflet mapping functions can be called simply by using "L" object.
     3. In future, MapmyIndia may extend the customised/forked Leaflet object to enhance mapping functionality for developers, 
        which will be clearly documented in the MapmyIndia API documentation section.
     */

    /***map-events***/
    map.on("dblclick", function (e) {
        var title = "Sample Text Marker!";
        var m = addMarker(e.latlng, '', title);
        m.bindPopup(title).openPopup();
        // var event_div = document.getElementById("event-log");
        // event_div.innerHTML = "New marker created! <br>" + event_div.innerHTML;
    });

    /***content for custom info window***/
    var cont = "<div><h2 style=\"font: bold 16px arial helvetica\">Info</h2>" +
            "<p style=\"font: italic 14px/20px times\">This content is made of custom styled elements.</p>" +
            "<p style=\"font: 12px/14px Verdana\;padding-top: 10px;text-indent: 30px\">" +
            "The heading level 2 has custom set style, and so does the previous paragraph.<br>" +
            "But guess what, this paragraph also has custom style.</p>" +
            "<p style=\"font: 12px/14px Courier;padding-top: 15px;text-indent: 15px;max-width: 200px\"></p>" +
            "<p>This paragraph uses default content style, as you can see.</p>" +
            "<p><a href=\"http://maps.mapmyindia.com\">MapmyIndia Maps</a></p></div>";

    var mk1 = addMarker(pt1, '', "Marker1").addTo(map);
    var mk2 = addMarker(pt2, '', "Marker2").addTo(map);
    mk3 = addMarker(pt3, '', "Marker3").addTo(map);
    mk4 = addMarker(pt4, '', "Marker4").addTo(map);
    mk5 = addMarker(pt5, '', "Marker5").addTo(map);

    var position = mk1.getLatLng();
    /***bind popup with marker***/
    mk1.bindPopup("<div class='info-div'>Village: getVillage <br> Mobile coverage: <br> </div>");
    mk2.bindPopup("<div class='info-div'>Village: getVillage <br> Mobile coverage: <br> </div>");
    mk3.bindPopup("<div class='info-div'>Village: getVillage <br> Mobile coverage: <br> </div>");
    mk4.bindPopup("<div class='info-div'>Village: getVillage <br> Mobile coverage: <br> <div>")
    mapmyindia_fancy_info_window();
};
function addMarker(position, icon, title) {
    /*** position must be instance of L.LatLng ***/
    var event_div = document.getElementById("event-log");
    if (icon == '') {
        /***Marker with a default icon and optional parameter draggable, title***/
        var mk = new L.Marker(position, {draggable: true, title: title});
    } else {
        /***Marker with a custom icon and optional parameter draggable, title***/
        var mk = new L.Marker(position, {icon: icon, draggable: true, title: title});
    }
    /*Add the marker to the map*/
    map.addLayer(mk);
    /**Marker events**/
    mk.on("click", function (e) {
        event_div.innerHTML = "Marker clicked <br>" + event_div.innerHTML;
    });
    mk.on("dragend", function (e) {
        event_div.innerHTML = "Marker dragged <br>" + event_div.innerHTML;
    });
    return mk;
}
function mapmyindia_show_info_window() {
    /*Bind popup with marker*/
    mk4.openPopup();
}
function content() {
    return "<div style=\"padding:15px;font-size:12px;width:250px;\">This is example of multiple info window with diffrent arrow position!.</div>";
}
var create_content = function (tittle, content) {
    var h = new Array();
    h.push("<div>");
    h.push("<div class=\"header\">");
    h.push("<span>");
    h.push(tittle);
    h.push("</span> ");

    h.push("</div>");
    h.push("<div class=\"info_css\">");
    h.push(content);
    h.push("</div>");
    h.push("</div>");
    return h.join("");
};
var mapmyindia_fancy_info_window = function () {
    var content = create_content("getVillage()", "Mobile coverage:");
    /*bind popup with marker*/
    mk5.bindPopup(content);
};
var mapmyindia_open_fancy_info_window = function () {
    mk5.openPopup();
}
var mapmyindia_custom_info_window = function () {
    mk3.openPopup();
}
var mapmyindia_hide_info_window = function () {
    map.closePopup();
}

// setting boundaries 

var geoParams =
{
    AccessToken     :   'xxxx-xxxxx-xxxxxxxx-xxxxxx-xxxx',
    GeoBoundType    :   'stt_nme',
    GeoBound    :   ['haryana'],
    Attribute       :   't_p',
    Query       :   '>10000',
    Style       :   
        {
            Label   :    true,
            LabelColor  :   '13592e',
            LabelSize   :   10,
            FillColor   :   'ffe0aa',
            BorderColor  :   '13592e',
            BorderWidth  :   2,
            Opacity :   0.5
        }
};

var GeoDataLayer = geoAnalytics.getPanchayat(geoParams); // for panchayat layer

map.addLayer(GeoDataLayer);

geoAnalytics.setBounds('pincode',geoParams,map); // for pincode layer
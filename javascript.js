// var mapOptions = {
//     center: [10.0279603,105.7664918],
//     zoom: 10
// };

// var map = new L.map('map', mapOptions);
// var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
// map.addLayer(layer);

// //Tạo marker mặc định
// // var marker = L.marker([10.0279603, 105.7664918])
// // marker. addTo(map);

// //Tạo marker thứ hai với tiêu đề
// // var marker1 = L.marker([10.0279603, 105.7664918], {title: "Đại học Cần Thơ"}).addTo(map);

// // Tạo một biểu tượng tùy chỉnh
// var customIcon = L.icon({
//     iconUrl: 'imgs/icon.png',  // Thay đổi đường dẫn tới biểu tượng tùy chỉnh của bạn
//     iconSize: [25, 25],  // Kích thước của biểu tượng
//     iconAnchor: [19, 38],  // Điểm neo của biểu tượng
//     popupAnchor: [0, -38]  // Điểm neo của popup
// });

// // Tạo marker và sử dụng biểu tượng tùy chỉnh
// var marker = L.marker([10.0279603, 105.7664918], {icon: customIcon}).addTo(map);

// //thêm popup
// // var popupContent = "<div style='width:200px;'><h3>Khu II Đại học Cần Thơ</h3><p>Đây là một ví dụ về thông tin địa điểm.</p></div>";
// // marker.bindPopup(popupContent);


// var customPopup = "<div>Khu II Đại học Cần Thơ</div>";
// var customOptions = {
//     'maxWidth': '500',
//     'className': 'custom custom-popup'
// };

// // Gắn popup window với marker và sử dụng customOptions để áp dụng CSS
// marker.bindPopup(customPopup, customOptions);

// var popupContent = "<div class='popup-content'>" +
//                       "<h3>Khu II, Đại học Cần Thơ</h3>" +
//                       "<img src='imgs/CTU.jpg' alt='Khu II, Đại học Cần Thơ'>" +
//                    "</div>";
// marker.bindPopup(popupContent, customOptions);

////////////////////////////////////////////////////////////////////////////////////////

// Tạo bản đồ
var map = L.map('map').setView([10.0279603, 105.7664918], 10);

// Thêm lớp hiển thị bản đồ
var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);

// // Mảng chứa vị trí của 4 khu thuộc Đại học Cần Thơ
// var locations = [
//     { name: "Khu I", address: "Đường 30/4", coordinates: [10.029186, 105.768426] },
//     { name: "Khu II", address: "Đường 3/2", coordinates: [10.028445, 105.763620] },
//     { name: "Khu III", address: "Đường Lý Tự Trọng", coordinates: [10.026544, 105.763389] },
//     { name: "Khu Hòa An", address: "Hậu Giang", coordinates: [9.782553, 105.768892] }
// ];
// // Duyệt qua mảng vị trí và tạo marker tương ứng
// locations.forEach(function(location) {
//     var marker = L.marker(location.coordinates).addTo(map);
//     marker.bindPopup("<b>" + location.name + "</b><br>" + location.address).openPopup();
//     // Loại bỏ marker khỏi bản đồ
//     //map.removeLayer(marker);
// });

// vị trí người dùng
// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//         var latitude = position.coords.latitude;
//         var longitude = position.coords.longitude;

//         // Tạo marker biểu diễn vị trí hiện tại của người dùng
//         var userMarker = L.marker([latitude, longitude]).addTo(map);
//         userMarker.bindPopup("Vị trí của bạn").openPopup();

//         // Di chuyển bản đồ đến vị trí hiện tại của người dùng
//         map.setView([latitude, longitude], 15);
//     });
// } else {
//     console.log("Trình duyệt của bạn không hỗ trợ xác định vị trí.");
// }


var geocoder = L.Control.Geocoder.nominatim();
var control = L.Control.geocoder({
				geocoder: geocoder
				}).addTo(map);


                map.on('click', function(e) {
                    geocoder.reverse(e.latlng, map.options.crs.scale(map.getZoom()), function(results) {
                        var r = results[0];
                        if (r) {
                            if (marker) {
                                marker.setLatLng(r.center).setPopupContent(r.html || r.name).openPopup();
                            } else {
                                marker = L.marker(r.center).bindPopup(r.name).addTo(map).openPopup();
                            }
                        }
                    });
                });               

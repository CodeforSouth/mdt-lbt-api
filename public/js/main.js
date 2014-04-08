angular.module('app', [])
    .factory('Zip2LatLng', ['$http', function($http){
        var results = {},
            _url = 'http://api.zippopotam.us/us/';

        results.getInfo = function(zip){
            return $http.get(_url + zip.toString());
        };

        return results;
    }])
    .controller('MainCtrl', ['$scope', '$http', '$window', function($scope, $http, $window){
        $window.map = L.map('map', { center: [ 25.8013413,-80.202423 ], zoom: 13 }),
        // good looking map
        tiles = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
        // B&W map
        //tiles = L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png');
        //tiles = L.tileLayer('http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png');

        $window.map.addLayer(tiles);

        $http.get('/geoview')
            .success(function(data){
                $scope.zipcodes = data;
                angular.forEach($scope.zipcodes.data, function(value, key){
                    //console.log(value.latitude, value.longitude );
                    //console.log(value.zip, value.latlon);
                    var marker = L.marker([ value.latitude, value.longitude ]);
                    $window.map.addLayer(marker);
                    marker.bindPopup('<a href="http://lbt.miamicode.org/receipt/' + value.Receipt_Number + '">Go to Receipt '+ value.Receipt_Number +'</a>');
                    //marker.openPopup();
                });
                /*
                $window.map.setZoom(7);
                $window.map.panTo(new L.LatLng(25.8013413,-80.202423));
                */
            })
            .error(function(err){
                console.log(err);
            });
    }]);

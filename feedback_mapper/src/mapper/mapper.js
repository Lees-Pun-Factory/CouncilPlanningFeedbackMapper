import React from "react";

export default class Mapper extends React.component {
  componentDidMount() {
      debug();
  }
  
  render() {
    return null;
  }
  
}


function init_mapper(center_address)
{
  // Instantiate a map and platform object:
  var platform = new H.service.Platform({
      'app_id': 'Py4nJGy7bGw8NA7l2Edt',
      'app_code': 'eMb3kkCHVIkUvYXZNgpeYg'
  });
  // Retrieve the target element for the map
  var targetElement = document.getElementById('mapContainer');
  
  // Get default map types from the platform object:
  var defaultLayers = platform.createDefaultLayers();
  
  // Instantiate the map:
  var map = new H.Map(
    targetElement,
    defaultLayers.normal.map,
    {
      zoom: 14,
      // Set the center at the input latitutde and longitutde
      center: {lat: 0, lng: 0}
    });

  // Create a Group object to hold the markers on the map
  var group = new H.map.Group();
  map.addObject(group);
  
  // Update the center of the map (asynchronously)
  var geocodingParams = {
    searchText: center_address
  };

  // Define a callback function
  var onResult = function(result) {
    var locations = result.Response.View[0].Result,
      position,
      marker;
    
    position = {
      lat: locations[0].Location.DisplayPosition.Latitude,
      lng: locations[0].Location.DisplayPosition.Longitude
    };

    map.setCenter(position);
    };

  // Get an instance of the geocoding service:
  var geocoder = platform.getGeocodingService();
  
  // Call the geocode method with the geocoding parameters,
  // the callback and an error callback function (called if a
  // communication error occurs):
  geocoder.geocode(geocodingParams, onResult, function(e) {
    alert(e);
  });

  // Return the platform and map
  return [platform, map, group];
}

function plot_address(baseParams, address)
{
  // Create the parameters for the geocoding request:
  var geocodingParams = {
      searchText: address
    };

  var platform = baseParams[0];
  var map = baseParams[1];
  var group = baseParams[2];
  
  // Define a callback function to process the geocoding response:
  var onResult = function(result) {
    var locations = result.Response.View[0].Result,
      position,
      marker;
    // Add a marker for each location found
    for (i = 0;  i < locations.length; i++) {
      position = {
        lat: locations[i].Location.DisplayPosition.Latitude,
        lng: locations[i].Location.DisplayPosition.Longitude
      };
      marker = new H.map.Marker(position);
      group.addObject(marker);
    }
  };
  
  // Get an instance of the geocoding service:
  var geocoder = platform.getGeocodingService();
  
  // Call the geocode method with the geocoding parameters,
  // the callback and an error callback function (called if a
  // communication error occurs):
  geocoder.geocode(geocodingParams, onResult, function(e) {
    alert(e);
  });
}

function plot_addresses(baseParams, addresses)
{
  for(var i = 0; i < addresses.length; i++)
  {
    plot_address(baseParams, address[i]);
  }

  var platform = baseParams[0];
  var map = baseParams[1];
  var group = baseParams[2];

  // Now convert these points to a clustering layer
  var dataPoints = [];
  group.forEach(function(item) {
    dataPoints.append(new H.clustering.DataPoint(item.latitude, item.longitude));
  });
  //TODO CONTINUE HERE
}

function plot_map(center_address, addresses)
{
  var baseParams = init_mapper(center_address);

  plot_addresses(baseParams, addresses);
}

//DEBUG
function debug()
{
  var baseParams = init_mapper("13 South Bailey, Durham, UK");

  plot_address(baseParams, "22 Mavin Street, Durham, UK");
}

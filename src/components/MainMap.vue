<template>
  <div id="map" style="height: 85vh" />
  <Teleport v-if="popupContainer" :to="popupContainer">
    <PopupForm
      :marker-position="markerPosition"
      @form-submit="handleFormSubmit"
    />
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from "vue";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";

import icon from "@/helpers/icon.png";
import markerShadow from "@/helpers/marker-shadow.png";
import { generateSACoordinates } from "@/helpers/generateSACoordinatess";
const map = ref(null);

const popupContainer = ref(null);
const markerPosition = ref(null);

// South Africa's bounds
const SA_BOUNDS = {
  northEast: [-22.1265, 32.8908], // [lat, lng] of northeast corner
  southWest: [-34.8393, 16.47], // [lat, lng] of southwest corner
};

// Some padding to ensure we see all of SA comfortably
const PADDING = 0.5; // degrees

onMounted(async () => {
  const coordinates = generateSACoordinates(300);

  const myIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 30],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: markerShadow,
    shadowSize: [60, 30],
    shadowAnchor: [22, 94],
  });

  // Create LatLngBounds object with padding
  const bounds = L.latLngBounds([
    [SA_BOUNDS.southWest[0] - PADDING, SA_BOUNDS.southWest[1] - PADDING],
    [SA_BOUNDS.northEast[0] + PADDING, SA_BOUNDS.northEast[1] + PADDING],
  ]);

  map.value = L.map("map", {
    maxBounds: bounds,
    maxZoom: 15,
    minZoom: 5,
    zoomControl: true,
    zoom: 1,
    zoomAnimation: false,
    fadeAnimation: true,
    markerZoomAnimation: true,
  }).fitBounds(bounds);

  // Add zoom level display to map
  L.control
    .scale({
      position: "bottomright",
      imperial: false,
      metric: true,
      // showZoomLevel: true,
    })
    .addTo(map.value);
  map.value.zoomControl.setPosition("bottomright");

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map.value);

  const markers = L.markerClusterGroup();

  coordinates.forEach((element, index) => {
    const each_marker = new L.marker([element.latitude, element.longitude], {
      icon: myIcon,
    }).bindPopup(
      `<strong> Concise Data Regarding this Point </strong> <br> More detailed data and input forms can go in modals or side-panels. Point ID: ${index}`
    );
    markers.addLayer(each_marker);
  });

  map.value.addLayer(markers);
});
</script>

<style>
.leaflet-top {
  z-index: 1000 !important;
}
</style>

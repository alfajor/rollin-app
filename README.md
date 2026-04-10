# Rollin' App

A simple web app for BJJ academy reference.

This currently features a basic map view and search that pulls in test data from a local JSON file. The dataset will eventually reflect many more BJJ schools - starting in the US and expanding into other locales.

The map makes use of Leaflet, which relies on a GeoJSON data format. All data entries inside `test-data.json` must adhere to this format.

Eventually, it would be great if data were sourced from a dedicated API service. This is another work in progress project.
Other features and functionality will continue to be added.

# Use

`npm run dev` and we're off.

# Contributing 

Academy JSON contributions are most needed. Building a dataset of BJJ schools throughout the U.S and globally is a huge lift. Any contributions to this are welcome.

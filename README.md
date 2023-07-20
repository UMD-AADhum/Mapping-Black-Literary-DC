# Mapping Black Literary DC
A repository of pages & elements developed for keondra bills freemyn's Mapping Black Literary DC project, as part of the tASP22 cycle at AADHum.

# libraries
* masonry-grid
* bootstrap-5
* papa-parse json/csv converter
* leaflet.js

# design elements
* wmata map

# design notes

## data
* Site uses PapaParse library to convert Google Sheets CSV into JSON, script then pushes JSON data to geoJSON collection for Leaflet
* Data is currently stored in a google sheet that keondra manages
* Can confirm that new data automatically pushes from sheet–I selected “automatically republish when changes are made” when initially publishing the Google Sheet as CSV

## index.html
* Design reference: https://www.artforum.com/uploads/upload.001/id27303/coversmall_1064x.jpg
* Text will likely be an artist statement/reflection of keondra’s experience living and working in Black literary spaces in DC (so a reflection on the project’s content, less on the project itself), but I’m unsure what the annotations will be
  * Each annotation links to map page
* Current build is an image (text document saved as .png) with hyperlinked text overlaid
  * Image is currently not mobile responsive
  * Annotations are currently positioned according to the container window, so they move on mobile as well

## map.html
* map
  * Popup content has been name & address in previous iterations – this element worked in earlier demo versions when the data format wasn’t coming from an external source, but I can’t figure out how to populate popup content from a geoJSON.
* map cards
  * Map cards are meant to mimic a Tumblr endless scroll grid
  * Card filter by category is needed so users can sort through cards & not be overwhelmed by all of the information present

## team.html
* Very basic/functional design that matches the rest of the site/cribbed from Squarespace 
* Page currently lists keondra, Liz, and Sarah as project team, with project attribution language for AADHum/tASP at the bottom

## major issues
* Card filter by category 
  * Completely broken, code (stolen from w3) doesn’t work
* Map.html mobile responsiveness
  * cards overlap at medium window size
* Index.html mobile responsiveness
  * Can background image resize at different browser sizes? Or are multiple images needed?
* Map popup population
  * Should be populated with the data at geoJSON.features.properties.popupContent

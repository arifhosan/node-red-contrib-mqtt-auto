# Changelog

## [v2.1.0] - 2024-09-05

### Added

* feat: add mqtt rap & rh options


### Changed

* ref: extract DynMQTT class
* chore: add comments
* chore: improve log
* ref: use async method for publish, subscribe & unsubscribe
* chore: add comments
* chore: improve log

### Fixed

* fix: subsciptions topic declaration


## [v2.0.0] - 2024-09-05


### Changed

* chore: update mqtt version (Removes support for all end of life node versions v12 and v14)

### Fixed

* fix: use destr module instead JSON.parse to be more robust ex: JSON.parse("False") => exception , destr("False") => false and avoid bugs

* fix:  this.status_callback({{ fill: "red", shape: "dot", text: err } }); =>  this.status_callback({ summary: { fill: "red", shape: "dot", text: err } }); (see issue https://github.com/eltonssilva/node-red-contrib-mqtt-auto/issues/1)

# MitchVendor Mobile App
### Turning Hours of Paperwork Into Seconds on your Phone or PC

### PURPOSE
The MitchVendor program is a combination of a web and mobile interface paired with shared database. Designed to streamline management and stocking of vending machines. This program was created for my freind in Southern Califrnia who mentioned how he spends a major portion of his time at work filling out paperwork and reading locations off a sheet. He asked if it would be possible to digitize and streamline this work and I said of course! Thus MitchVendor was born.

This is the mobile app which is the lifeblood of the system. The idea is that the mobile app handles every step of the process for you. You clock in at the start of the day. The app serves up your first location ont he route of the day and feeds that info to google maps automatically to give you directions. When you arrive you enter all the data points into the app: cash collected, change recieved, inventory restocked, any needed maitainence etc. When complete the app feeds all that data to the database then serves you the next location on the route. Rinse and repeat until the end of the day when you clock out. After hours data entries are possible too: fuel costs, per diem, lodging costs, etc.

### TECHNOLOGIES - MOBILE APP

The mobile app is written in Javascript and [React Native](https://reactnative.dev/) and uses [Expo](https://docs.expo.io/) for FaceID, containerization, and accelerated iteration and development. It uses the [Google Maps API](https://developers.google.com/maps/documentation) for maping, forward & reverse geocoding, and passing data directly to google maps app for directions through data URL's. The app passes JSON data objects to the [Google Firebase](https://firebase.google.com/) [Cloud Firestore](https://firebase.google.com/docs/firestore) to store data online between users and sessions. I am in the process of completing and finalizing the app enough to be approved for the Ios App Store.

### USAGE
Currently usage and testing is only possible through Expo. Public access is not availible at this time until approval for the Ios App Store.
If hands on testing of the app is absolutley neccesary email me at maxwellhoweth@gmail.com and acces can be hosted and shared to the Expo App through a URL

# Application Backend Communication Design

## Overview
The `/backend` folder houses all functionality regarding communication between the frontend of the application and backend. Functionality is divided by the services offered by the backend being the following:
* `/backend/clusterWebServer`: Houses all functionality related to communication cluster's Web Servers that stores PCAP and ROS recordings. Specifically, the OpenLiteSpeed web server is used for communication that is described [here](https://github.com/unr-ncar/File-Services).
* `/backend/fileService`: Houses all functionality related to communication to the cluster's File Services related to querying the cluster's Mongo database for captured recordings. The Mongo database and file services is described [here](https://github.com/unr-ncar/File-Services).
* `/backend/graphqlService`: Houses all functionality related to the GraphQL Service running on the cluster. Used for query edge devices metadata and status (e.g., capture status and storage status). The Mongo database and file services is described [here](https://github.com/unr-ncar/File-Services).
* `/backend/metadataService`: Houses all functionality related to the Metadata Service in which describe the metadata for the intersections (i.e., site deployments) and sensors (i.e., LiDARs) such as corner, direction, street, cross street, etc. The Mongo database and metadata services is described [here](https://github.com/unr-ncar/File-Services). Additionally, the endpoint hosts a redoc endpoint in which describe the information schema given by the endpoints with querying parameters at the `/redoc` endpoint. As of September 2024, the endpoint is located at `http://134.197.75.31:31538/redoc`.

An exception to this rule is the `edgeRecordingService` folder in which houses functionality for both the ROS recording service and PCAP recoding service. Information regarding these the design of these web services are [here](https://github.com/unr-ncar/Record-Web-Services).

## Technology Stack and Related Technology
The backend communication design is composed of a series of technology directly responsible for communicating to the backend and technology indirectly used to cache responses from the backend to the frontend IndexedDB database.
* Communication Technology
  * Axios (HTTP Client)
  * TanStack Query (Asynchronous State Management)
* Caching Technology
  * IndexedDB (browser database)
  * Dexie.js (wrapper for IndexedDB)
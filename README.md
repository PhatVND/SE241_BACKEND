# HCMUT_SPSS_NoHope

## ABOUT THIS PROJECT

This project aims at providing a solution for HCMUT's student needs for printing documents for studying and researching purposed, including:

- Printing documents for students and learners at HCMUT.
- Managing printing activity for staffs.
- Reporting and summarizing on basic on the system usage.

## Built with

- [NodeJS](https://nodejs.org/en/): version 22.04
- [MongoDB](https://www.mongodb.com/): version 2.0.2
- [React](https://react.dev/): version 18.2.0

## Getting started

### Installation

1. Install NodeJS and MongoDB from the link above.
1. Clone this repository:
   ```sh
   git clone https://github.com/Cyese/HCMUT_SSPS_NoHope
   ```
1. Install dependencies:
   - Window **_command prompt_**
   ```cmd
   init.cmd
   ```
   - UNIX based system **_bash/zsh_**
   ```bash
   ./init.sh
   ```
1. Import data into your local database:
   #### Using MongoDB compass
   1. Open MongoDB compass
   1. Create a new **Connection** with this URI
   ```link
   mongodb://localhost:27017
   ```
   3. Create a new database name **hcmut_spss_dev**
   4. Click on **import data** and choose _.json_ file in
   #### Using Mongossh
   **_To be implemented_**

### Usage

1. Start server app:
   ```sh
   npm start
   ```
2. Create another prompt and run:
   ```cmd
   cd source\views\ && npm start
   ```
   or
   ```sh
   cd source/views/ && npm start
   ```
   #### You can launch the app on
   ```url
   localhost:8080
   ```
3. If you have root permission on bash you can also use this command to run it in default HTTP port
   ```bash
   cd source/views/ && sudo npm run deploy
   ```
   #### Which make your app can be access through
   ```url
   localhost
   ```
4. Default user credential:
   #### StudentID: `admin@example.com`
   #### Password: `admin`
5. SPSO login: _this authentication have not be implemented, please use below credintal_
   #### StudentID: `1`
   #### Password: `Any`

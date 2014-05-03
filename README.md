Miami Dade Local Business REST API Documentation
===========

API source code for Miami Dade Local Business tax data

Author: Juan Lopez
Documentation: Ernie Hsiung

This is a REST API wrapper for the CSV file of Local Business Tax receipts given to us by Miami-Dade County (https://github.com/Code-for-Miami/Miami-2014-LBT-Receipts)

### Implementation:
As of 10 February 2014, the API can be accessed through the following URL:
http://lbt.miamicode.org/

The API is formatted in JSON. And is available in read access (GET) only.

### Parameters
All endpoints can take a limit and skip in query string. ie: ?limit=10&skip=0 
* limit: returns the amount of sets. Default value is ten.
* Skip: The amount of values it should skip over - mostly used for applications with pagination. Default value is zero.

### Commands
/accounts
Returns all account numbers that exist in the database.
Sample URL: http://lbt.miamicode.org/accounts
```
{
  "status": "OK",
  "count": 2,
  "data": [
    {
      "Account_Number": "6398077"
    },
    {
      "Account_Number": "6542998"
    }
  ],
  "dte": "2014-02-11T18:07:45.958Z"
}
```

#### /account/:actNum
Returns a particular business result via account number where :actNum is the account
Sample URL: http://lbt.miamicode.org/account/6231450
```
{
  "status": "OK",
  "data": [
    {
      "Receipt_Number": "6496020",
      "Physical_Business_Location": "30 - UNIN DADE COUNTY",
      "Account_Number": "6231450",
      "Owner_Address_Name": "0001 ALICEA BAIL BONDS INC",
      "Business_Name": "001 ALICEA BAIL BONDS INC",
      "Business_Address": "20936 S DIXIE HWY MIAMI, FL 33189 ",
      "Category_Code": "BBB",
      "Category_Name": "BAIL BOND BUSINESS",
      "Mailing_Address_Name": "0001 ALICEA BAIL BONDS INC LUIS ALICEA PRES",
      "Mailing_Address_Line_1": "20936 S DIXIE HWY",
      "Mailing_Address_Line_2": "",
      "Mailing_Address_City": "MIAMI",
      "Mailing_Address_State": "FL",
      "Mailing_Address_ZIP": "33189",
      "Number_of_Units": "",
      "Account_Status": "Active",
      "Balance_Status": "Unpaid",
      "Date_Paid_In_Full": "",
      "Exemption_Code": null,
      "Exemption_Description": null,
      "Business_Phone": "786-251-4303",
      "RE_Account_Number": "30-6007-005-0540",
      "Tangible_Account_Number": "",
      "Custom_Flags": "Enforcement",
      "Receipt_Application_Date": "4/29/08",
      "Year": 2014,
      "Class_Code": "207",
      "Class_Name": "Administrative office, operation center or Other unclassified businesses"
    }
  ],
  "dte": "2014-02-11T18:06:55.677Z"
}
```

#### /receipt/:recNum 
Returns a particular business result via receipt number where :recNum is the receipt
Sample URL: http://lbt.miamicode.org/receipt/6666052
```
{
  "status": "OK",
  "data": [
    {
      "Receipt_Number": "6666052",
      "Physical_Business_Location": "04 - HIALEAH",
      "Account_Number": "6398077",
      "Owner_Address_Name": "#1 RX LIBERTY PHARMACY DISC CORP",
      "Business_Name": "# 1 RX LIBERTY PHARMACY DISCOUNT CORP",
      "Business_Address": "972 E 25 ST HIALEAH, FL 33013 ",
      "Category_Code": "PHA-RPH",
      "Category_Name": "PHARMACY",
      "Mailing_Address_Name": "#1 RX LIBERTY PHARMACY DISC CORP PEDRO PABLO ROSADO  PRES",
      "Mailing_Address_Line_1": "972 E 25 ST",
      "Mailing_Address_Line_2": "",
      "Mailing_Address_City": "HIALEAH",
      "Mailing_Address_State": "FL",
      "Mailing_Address_ZIP": "33013",
      "Number_of_Units": "3",
      "Account_Status": "Active",
      "Balance_Status": "Unpaid",
      "Date_Paid_In_Full": "",
      "Exemption_Code": null,
      "Exemption_Description": null,
      "Business_Phone": "305-691-6686",
      "RE_Account_Number": "04-3108-002-2300",
      "Tangible_Account_Number": "",
      "Custom_Flags": null,
      "Receipt_Application_Date": "3/12/09",
      "Year": 2014,
      "Class_Code": "214",
      "Class_Name": "Retail sales"
    }
  ],
  "dte": "2014-02-11T18:06:09.164Z"
}
```

#### /pbls
Returns a list of codes assigned to physical business locations
http://lbt.miamicode.org/pbls 
```
{
  "status": "OK",
  "count": 2,
  "data": [
    {
      "Physical_Business_Location": "01 - MIAMI"
    },
    {
      "Physical_Business_Location": "02 - MIAMI BEACH"
    }
  ],
  "dte": "2014-02-11T18:06:09.164Z"
}
```

#### /categorycodesnames
Returns category codes & names
http://lbt.miamicode.org/categorycodesnames
```
{
  "status": "OK",
  "count": 2,
  "data": [
    {
      "Category_Code": "ABR",
      "Category_Name": "ATTORNEY (BRANCH OFFICE)"
    },
    {
      "Category_Code": "ACL",
      "Category_Name": "ASSISTED LIVING FACILITY"
    }
  ],
  "dte": "2014-02-11T17:50:43.282Z"
}
```

#### /classcodesnames
Returns class codes & names
http://lbt.miamicode.org/classcodesnames
```
{
  "status": "OK",
  "count": 3,
  "data": [
    {
      "Class_Code": "\"207, 215, 221\"",
      "Class_Name": "EDU-ITT, MEM, SAM"
    },
    {
      "Class_Code": "0",
      "Class_Name": "Various"
    },
    {
      "Class_Code": "173",
      "Class_Name": "Non-profit charitable, religious or educational institutions"
    }
  ],
  "dte": "2014-02-11T18:05:26.140Z"
}
```

### Sample Apps with APIs:
http://lbt.miamicode.org/mapit - maps all businesses who are on the Local Business Tax with a category code of "Pharmacy" list to a map of Miami-Dade County.

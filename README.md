# Travel Discussion App


### Schema

```
{
  "users": {
    "$userId": {
      "name": "Khalid",
      "photo": "dwad.jpg",
      "email": "dwad@dwad.com"
    }
  },
  "user-countries": { // countries visited by user
    "$userId": {
      "$countryId": {
        "$commentId": {
          "commenterName": "",
          "commentText": "blabvla"
        }
      }
    }
  },
  "user-comments": { // comments made by user
    "$userId": {
      "$countryId": {
        "$commentId": {
          "commenterName": "",
          "commentText": "blabvla"
        }
      }
    }
  },
  "countries" : { // full country list
    "$countryId": {
      "countryName": "Kuwait"
    }
  },
  "country-comments": { // all comments made on a country
    "$countryId": {
      "$commentId": {
        "commenterName": "",
        "commentText": "blabvla"
      }
    }
  }
}
```
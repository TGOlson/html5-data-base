# HTML5 Data Base

A data storage system created using HTML5 data attributes.

This is a beta proof-of-concept design. Many things are hard-coded and rigid, but the possibility of the design is on display. All data entries are stored within html elements of this document, with properties saved as data-attributes of each element. Go ahead and inspect the document to learn more - open up the 'data-base' div.

Current data structure is as follows (although currently you can type whatever you want):


```javascript
Object {
  id: uniq_int,
  leaves: int,
  color: string
}
```

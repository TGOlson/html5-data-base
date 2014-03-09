$( function () {


})



var DataBase = ( function () {

  function count () {
    return {count: $('#data-base-storage').children().length}
  }

  function first () {
    return $('#data-base-storage').children().first().data()
  }

  function last () {
    return $('#data-base-storage').children().last().data()
  }

  function create ( properties ) {
    var newEntryTemplate = $('#data-template').clone()

    newEntryTemplate.attr('id', count().count + 1 )
    newEntryTemplate.attr('data-id', count().count + 1 )

    for( var i in properties ) {
      newEntryTemplate.attr('data-' + i, properties[i])
    }

    $('#data-base-storage').append( newEntryTemplate )
    return newEntryTemplate.data()
  }

  function find ( id ) {
    return $('#' + id ).data()
  }

  function where ( attribute, value ) {
    var searchString = '[data-'+ attribute +'="'+ value +'"]'

    var entries = $( searchString )

    var entryData = []

    $.map(entries, function( value, i ) {
      entryData.push( $(value).data() )
    })
    return entryData
  }

  function destroy ( id ) {
    var entry = $('#' +  id )
    entry.remove()
    return entry.data()
  }

  return {
    create: create ,
    find: find,
    where: where,
    destroy: destroy,
    count: count,
    first: first,
    last: last
  }

})();

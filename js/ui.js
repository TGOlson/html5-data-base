$( function () {

  $('#find').on('submit', function ( e ) {
    e.preventDefault();

    var value = $('#find-id').val()

    var returnVal = DataBase.find( value )
    showResults( [returnVal] )

    $('#find-id').val('')
  })

  $('#where').on('submit', function ( e ) {
    e.preventDefault();

    var property = $('#where-property').val()
    var value    = $('#where-value').val()

    var returnVals = DataBase.where( property, value )

    showResults( returnVals )

    $('#where-property').val('')
    $('#where-value').val('')
  })

  $('#create').on('submit', function ( e ) {
    e.preventDefault();

    var color  = $('#create-color-value').val()
    var leaves = $('#create-leaves-value').val()

    var newEntry = DataBase.create( {color: color, leaves: leaves} )

    showResults( [newEntry] )

    $('#create-color-value').val('')
    $('#create-leaves-value').val('')
  })

  $('#destroy').on('submit', function ( e ) {
    e.preventDefault();

    var value = $('#destroy-id').val()

    var returnVal = DataBase.destroy( value )
    showResults( [returnVal] )

    $('#destroy-id').val('')
  })

  $('#other').on('submit', function ( e ) {
    e.preventDefault();

    var value = $('#other-command').val()

    var returnVal = eval('DataBase.' + value + '()')

    console.log(returnVal)

    showResults( [returnVal] )

    $('#other-command').val('')
  })

})

function showResults ( objects ) {
  var formatedDiv = formatForView( objects )

  $('#results').html( formatedDiv )
}

function formatForView ( objects ) {

  $('#result-notices').text('')

  var count;

  if( objects[0] === undefined ){
    count = 0;

    objects[0] = {notice: 'No Results Found' }
  } else {

    count = objects.length
  }

  $('#result-count').text('Results found: ' + count)

  var formattedResults = []

  $.each(objects, function ( i, object ) {

    var result = $('<div>').attr('class', 'result')

    var p = $('<p>')

    var props = []

    $.each(object, function ( index, value ) {

      props.push(index + ': ' + value)

    })

    p.text( props.join(', '))

    result.append(p)

    formattedResults.push( result )


    // console.log(i)

    if( i >= 100) {
      $('#result-notices').text('(displaying first 100 entries)')
      return false;
    }

  })

  return formattedResults
}

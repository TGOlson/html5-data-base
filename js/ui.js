$( function () {

  // $.get('./data/flowers.html', function (e, response) {
  //   console.log(e, response)
  // })

  $('form').on('submit', runDbAction)
  $('#save-data').on('click', function () {

    var data = $('#data-base-storage').html()
    console.log(data)

    // uriContent = "data:application/octet-stream," + encodeURIComponent( markup );

    // console.log( uriContent )

    // newWindow=window.open(uriContent, 'neuesDokument');
  })
})


function runDbAction ( e ) {
    e.preventDefault();

    var inputValue = $(this).find('input[type=text]')

    var notice;
    var returnVal;

    switch( e.target.id )
    {

    case 'create':
      var color  = inputValue.first().val()
      var leaves = inputValue.last().val()

      notice = 'New entry created.'

      returnVal = [ DataBase.create( {color: color, leaves: leaves} ) ]

      break;

    case 'find':
      returnVal = [ DataBase.find( inputValue.val() ) ]

      break;

    case 'where':
      var property = inputValue.first().val()
      var value    = inputValue.last().val()

      returnVal = DataBase.where( property, value )

      break;

    case 'destroy':
      returnVal = [ DataBase.destroy( inputValue.val() ) ]

      notice = 'Entry destroyed.'

      break;

    case 'other':
      returnVal = [ eval('DataBase.' + inputValue.val() + '()') ]

      break;

    default:
      displayNotice( 'Query Failed. Check for illegal syntax.' )
    }

  displayNotice( notice )
  showResults( returnVal )
}

function displayNotice ( notice ) {

  if(notice){
    $('#result-notices').html('Notice: ' + notice)
  } else {
    $('#result-notices').html('')
  }
}

function showResults ( objects ) {
  var formatedDiv = formatForView( objects )

  $('#results').html( formatedDiv )

  clearInputValues()
}

function formatForView ( objects ) {

  if( objects[0] === undefined ){
    objects = []
    displayNotice ('No results found.')
  }

  var count = objects.length

  displayResultsCount( count )

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

    if( i >= 100 ) {
      displayNotice('Displaying first 100 entries.')
      return false;
    }

  })

  return formattedResults
}

function displayResultsCount ( count ) {
  $('#result-count').text('Results found: ' + count)
}

function clearInputValues () {
    $('#db-actions input[type=text]').val('')
}

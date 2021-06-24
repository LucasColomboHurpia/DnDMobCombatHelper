const showLogs = (string) => {
    $('#logList').append(`
      <li class="list-group-item list-group-item-action list-group-item-secondary logitem">
         ${string}
      </li>
    `)
}

const changeLogBtn = () => {
    $('#showLogsBtn').toggleClass('btn-info')
    $('#showLogsBtn').toggleClass('btn-dark')

    let currentHTML =  $('#showLogsBtn').html()

    if( currentHTML == 'LOGS') {$('#showLogsBtn').html('X')}
    if( currentHTML == 'X') {$('#showLogsBtn').html('LOGS')}
}
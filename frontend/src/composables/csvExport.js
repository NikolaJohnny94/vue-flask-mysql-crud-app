export const csvExport = (csv, columnTitles, users, today) => {
  csv = ''
  // Column's Titles
  columnTitles.forEach((columnTitle) => {
    if (columnTitles.indexOf(columnTitle) + 1 < columnTitles.length) {
      csv += columnTitle + ','
    } else {
      csv += columnTitle + '\n'
    }
  })
  //Cell Values
  users.forEach((user) => {
    csv +=
      user.firstname +
      ',' +
      '"' +
      user.lastname +
      '",' +
      '"' +
      user.email +
      '",' +
      '"' +
      user.country +
      '",' +
      '"' +
      user.city +
      '",'
    csv += '\n'
  })
  //Create element and download csv file
  let download = document.createElement('a')
  download.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv)
  download.download = `Exported_data_[${today.toLocaleDateString()}]_.csv`
  download.click()
}

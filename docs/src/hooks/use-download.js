export const useDownload = (fileName, text) => {
  return event => {
    const blob = new Blob([text], {
      type: 'text/csv;charset=utf8;',
    });

    // create hidden link
    const element = document.createElement('a');
    document.body.appendChild(element);
    element.setAttribute('href', window.URL.createObjectURL(blob));
    element.setAttribute('download', fileName);
    element.style.display = '';

    element.click();

    document.body.removeChild(element);
    event.stopPropagation();
  };
};

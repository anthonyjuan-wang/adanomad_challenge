import React from 'react';
import { Document, Page } from 'react-pdf';


class PDFViewer extends React.Component {
  state = {
    selectedFile: null,
    numPages: null,
    pageNumber: 1,
  }

  onFileLoad = ({ target: { result } }) => {
    this.setState({ pdfData: result });
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  render() {
    const { pageNumber, numPages, pdfData } = this.state;
    return (
      <>
        <input type="file" accept=".pdf" onChange={(event) => this.onFileLoad(event)} />

        {pdfData && (
          <Document file={pdfData} onLoadSuccess={this.onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        )}

        {pdfData && (
          <p>Page {pageNumber} of {numPages}</p>
        )}
      </>
    );
  }
}

export default PDFViewer;
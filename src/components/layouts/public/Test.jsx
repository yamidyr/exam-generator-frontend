import axios from 'axios'


export const Test = () => {

  const downloadPDF = () => {
    const axiosConfig = {
      responseType: 'arraybuffer',
      headers:{
        Accept: 'application/json'
      }
    }
    axios.get('http://localhost:3900/api/user/test-user', axiosConfig).then((response) => {
      // this response contains pdf file
      // download pdf now
      const url =  window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'article.pdf');
      document.body.appendChild(link);
      link.click();
    }).catch((error) => {
      console.log("error al descargar: ",error.message);
    })
  }

  const generatePDF = () => {
    axios.get('http://localhost:3900/api/user/test-generate-pdf',{
      headers:{
        Accept: 'application/json'
      }
    }).then((response) => {
      console.log("Archivo generado, ahora se puede descargar.. eso espero: ", response)
    }).catch((error) => {
      console.log("error al descargar: ",error.message);
    })
  }


  return (
    <>
        <h1>Donwload pdf file</h1>
        <button onClick={downloadPDF}>
          Download pdf
        </button>
        <button onClick = {generatePDF}>
          Generar pdf
        </button>
    </>
  )
}

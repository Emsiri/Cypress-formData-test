/// <reference types="Cypress" />
describe('test pets APIs', function () {
  // Setting up data for tests
  const id = new Date().getTime();
  const name = 'Fido'

  it('I add a new pet', function () {
    const url = 'https://petstore.swagger.io/v2/pet'
    const body = {
      "id": id,
      "category": {
        "id": id,
        "name": "string"
      },
      "name": name,
      "photoUrls": [
        "string"
      ],
      "tags": [{
        "id": id,
        "name": "string"
      }],
      "status": "available"
    }
    cy.request('POST', url, body)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.eq(id);
        expect(response.body.name).to.eq(name);
      })
  });

  it('Should submit the formData correctly', function () {
    const url = `https://petstore.swagger.io/v2/pet/${id}/uploadImage`
    let fileName = 'dog.jpeg';
    const fileType = 'image/jpeg';
    // Get file from fixtures as binary
    cy.fixture(fileName, 'binary').then((image) => {
      // File in binary format gets converted to blob so it can be sent as Form data
      Cypress.Blob.binaryStringToBlob(image, fileType).then((blob) => {
        // Build up the form
        const formData = new FormData();
        formData.set('file', blob);
        formData.set('petId', id);
        formData.set('additionalMetadata', 'This is test metadata');
        // Perform the request
        cy.form_request(formData, url).then(response => {
          cy.task('log', response);
          expect(response.status).to.eq(200);
          expect(false).to.eq(true);
        })
      })
    })
  });

  it('Should submit the formData using the alternative request correctly', function () {
    const url = `https://petstore.swagger.io/v2/pet/${id}/uploadImage`
    let fileName = 'dog.jpeg';
    const fileType = 'image/jpeg';
    // Get file from fixtures as binary
    cy.fixture(fileName, 'binary').then((image) => {
      // File in binary format gets converted to blob so it can be sent as Form data
      Cypress.Blob.binaryStringToBlob(image, fileType).then((blob) => {
        // Build up the form
        const formData = new FormData();
        formData.set('file', blob);
        formData.set('petId', id);
        formData.set('additionalMetadata', 'This is test metadata');
        // Perform the request
        cy.form_request_alternative(formData, url, function (response) {
          cy.task('log', response);
          expect(response.status).to.eq(200);
          expect(false).to.eq(true);
        });
      })
    })
  });

  it('I delete the pet via id', function () {
    var path = 'https://petstore.swagger.io/v2/pet/';
    var path = path.concat(id);
    cy.request({
        method: 'DELETE',
        url: path
      })
      .then((response) => {
        expect(response.status).to.eq(200);
      })
  });
});

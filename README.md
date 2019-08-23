# FormData issue
When submitting a multipart/formdata request in Cypress runner (aka cypress open) everything works fine.
When you run it in the Cypress headless command (aka cypress run) the tests pass regardless of the assertion.
## API details
API is a public test endpoint that can be found here: https://petstore.swagger.io/
With the Upload section here: https://petstore.swagger.io/#/pet/uploadFile
## To test
Run 
`npx cypress open`
The test should fail on the assertion "expected false to equal true" (in chrome)
Now run the following
`npx cypress run`
The test will pass.
You can change the response code assertion to anything other than 200 and it will still pass
## Notes
It seems when running the test with electron in open mode also incorrectly passes the test.
Also when clicking into the formData tests, Cypress has the message "No commands were issued in this test."
